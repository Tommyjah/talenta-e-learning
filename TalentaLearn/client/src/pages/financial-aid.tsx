import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HandHeart, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  FileText,
  Users,
  GraduationCap
} from "lucide-react";
import { Link } from "wouter";

const financialAidSchema = z.object({
  courseId: z.number(),
  reason: z.string().min(50, "Please provide a detailed reason (minimum 50 characters)"),
  income: z.string().min(1, "Please select your income range"),
});

type FinancialAidForm = z.infer<typeof financialAidSchema>;

export default function FinancialAid() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    enabled: isAuthenticated,
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["/api/financial-aid"],
    enabled: isAuthenticated,
  });

  const form = useForm<FinancialAidForm>({
    resolver: zodResolver(financialAidSchema),
    defaultValues: {
      courseId: 0,
      reason: "",
      income: "",
    },
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: FinancialAidForm) => {
      return apiRequest("POST", "/api/financial-aid", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your financial aid application has been submitted successfully",
      });
      form.reset();
      setSelectedCourse(null);
      queryClient.invalidateQueries({ queryKey: ["/api/financial-aid"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const onSubmit = (data: FinancialAidForm) => {
    applicationMutation.mutate(data);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Aid</h1>
            <p className="text-xl text-gray-600">Making quality education accessible to all African learners</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5" />
                  Apply for Financial Aid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="courseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Course</FormLabel>
                          <Select 
                            value={field.value.toString()} 
                            onValueChange={(value) => {
                              field.onChange(parseInt(value));
                              const course = courses.find((c: any) => c.id === parseInt(value));
                              setSelectedCourse(course);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses.map((course: any) => (
                                <SelectItem key={course.id} value={course.id.toString()}>
                                  {course.title} - ${course.price}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the course you need financial assistance for
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedCourse && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">Selected Course</h3>
                        <div className="flex items-center gap-4">
                          <img 
                            src={selectedCourse.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
                            alt={selectedCourse.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-blue-900">{selectedCourse.title}</h4>
                            <p className="text-sm text-blue-700">{selectedCourse.category}</p>
                            <p className="text-sm font-semibold text-blue-900">
                              ${selectedCourse.price} / {selectedCourse.priceEtb} ETB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income Range</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your income range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-500">Under $500 / 25,000 ETB</SelectItem>
                              <SelectItem value="500-1000">$500 - $1,000 / 25,000 - 50,000 ETB</SelectItem>
                              <SelectItem value="1000-2000">$1,000 - $2,000 / 50,000 - 100,000 ETB</SelectItem>
                              <SelectItem value="2000-plus">Over $2,000 / 100,000 ETB</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This helps us understand your financial situation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you need financial aid?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please explain your situation and how this course will help your career goals..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Be specific about your circumstances and goals (minimum 50 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Application Review Process</h4>
                          <p className="text-sm text-yellow-800 mt-1">
                            Our team will review your application within 2-3 business days. We consider factors like financial need, 
                            academic goals, and potential impact on your career.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-talenta-gold hover:bg-yellow-600"
                      disabled={applicationMutation.isPending}
                    >
                      {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Financial Aid Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Up to 70% Off</h4>
                    <p className="text-sm text-gray-600">Course fee reduction</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Priority Support</h4>
                    <p className="text-sm text-gray-600">Dedicated mentorship</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Career Placement</h4>
                    <p className="text-sm text-gray-600">Job placement assistance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    African resident or citizen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Demonstrated financial need
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Clear career goals in IT
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Commitment to complete course
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about the financial aid process? Our team is here to help.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application History */}
        {applications.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application: any) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.status)}
                        <div>
                          <h4 className="font-medium">{application.course?.title || "Course Not Found"}</h4>
                          <p className="text-sm text-gray-600">
                            Applied on {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                      {application.reviewedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Reviewed on {new Date(application.reviewedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
