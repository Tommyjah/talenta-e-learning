import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PaymentModal from "@/components/payment-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  Star, 
  Users, 
  Play, 
  CheckCircle,
  DollarSign,
  Globe,
  Award,
  BookOpen,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const { data: course, isLoading } = useQuery({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: [`/api/courses/${id}/reviews`],
    enabled: !!id,
  });

  const { data: enrollment } = useQuery({
    queryKey: [`/api/enrollments`],
    enabled: isAuthenticated,
    select: (data: any[]) => data.find((e: any) => e.courseId === parseInt(id!)),
  });

  const enrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/enrollments", {
        courseId: parseInt(id!),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Successfully enrolled in the course",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ rating, comment }: { rating: number; comment: string }) => {
      return apiRequest("POST", "/api/reviews", {
        courseId: parseInt(id!),
        rating,
        comment,
      });
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      setReviewComment("");
      setReviewRating(5);
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/reviews`] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const modules = course.modules || [];
  const completedModules = enrollment?.completedModules || [];
  const progress = Number(enrollment?.progress || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Course Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.brief}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrollmentCount} students
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  English & አማርኛ
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <img 
                    src={course.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-purple-600">${course.price}</span>
                      <span className="text-sm text-gray-500 ml-2">or {course.priceEtb} ETB</span>
                    </div>
                  </div>
                  
                  {enrollment ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                      <Button className="w-full" size="lg">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {isAuthenticated ? (
                        <>
                          <Button 
                            className="w-full bg-talenta-purple hover:bg-purple-700" 
                            size="lg"
                            onClick={() => setShowPaymentModal(true)}
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Enroll Now
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => enrollMutation.mutate()}
                            disabled={enrollMutation.isPending}
                          >
                            {enrollMutation.isPending ? "Processing..." : "Free Trial"}
                          </Button>
                        </>
                      ) : (
                        <Button 
                          className="w-full bg-talenta-purple hover:bg-purple-700" 
                          size="lg"
                          onClick={() => window.location.href = "/api/login"}
                        >
                          Sign In to Enroll
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Community support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map((module: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {completedModules.includes(index) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.duration}</p>
                        </div>
                        {enrollment && (
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {isAuthenticated && enrollment && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setReviewRating(star)}
                                className={`w-8 h-8 ${star <= reviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                              >
                                <Star className="w-full h-full fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Comment</label>
                          <Textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Share your experience with this course..."
                            rows={4}
                          />
                        </div>
                        <Button
                          onClick={() => reviewMutation.mutate({ rating: reviewRating, comment: reviewComment })}
                          disabled={reviewMutation.isPending || !reviewComment.trim()}
                        >
                          {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-center gap-3 mb-3">
                              <img 
                                src={review.user.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                                alt={review.user.firstName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-medium">{review.user.firstName} {review.user.lastName}</h4>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star}
                                      className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this course!</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meet Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt="Instructor"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Dr. Amara Okafor</h3>
                      <p className="text-gray-600">Senior Software Engineer & Educator</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Dr. Amara Okafor is a seasoned software engineer with over 10 years of experience in the tech industry. 
                    She holds a PhD in Computer Science from the University of Cape Town and has worked with leading tech companies across Africa.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {showPaymentModal && (
        <PaymentModal
          course={course}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            enrollMutation.mutate();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
