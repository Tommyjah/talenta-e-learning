import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Play,
  CheckCircle,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { Link } from "wouter";

export default function ProgressPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: isAuthenticated,
  });

  const { data: certificates = [] } = useQuery({
    queryKey: ["/api/certificates"],
    enabled: isAuthenticated,
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

  const completedCourses = enrollments.filter((e: any) => Number(e.progress) >= 100);
  const inProgressCourses = enrollments.filter((e: any) => Number(e.progress) > 0 && Number(e.progress) < 100);
  const totalProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((sum: number, e: any) => sum + Number(e.progress), 0) / enrollments.length)
    : 0;

  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: enrollments.length,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TrendingUp,
      label: "Average Progress",
      value: `${totalProgress}%`,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Trophy,
      label: "Completed",
      value: completedCourses.length,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Award,
      label: "Certificates",
      value: certificates.length,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Learning Progress</h1>
            <p className="text-xl text-gray-600">Track your journey and achievements</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* In Progress Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                {inProgressCourses.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressCourses.map((enrollment: any) => (
                      <div key={enrollment.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={enrollment.course.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
                            alt={enrollment.course.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{enrollment.course.title}</h3>
                            <Badge variant="secondary" className="mb-2">{enrollment.course.category}</Badge>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Progress</span>
                                <span className="text-sm font-medium">{enrollment.progress}%</span>
                              </div>
                              <Progress value={Number(enrollment.progress)} className="w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button asChild size="sm">
                              <Link href={`/course/${enrollment.course.id}`}>Continue</Link>
                            </Button>
                            <p className="text-xs text-gray-500 text-center">
                              {enrollment.completedModules?.length || 0} of {enrollment.course.modules?.length || 0} modules
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Play className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No courses in progress</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Completed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Completed Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {completedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedCourses.map((enrollment: any) => (
                      <div key={enrollment.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{enrollment.course.title}</h3>
                            <p className="text-sm text-gray-600">
                              Completed on {new Date(enrollment.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No completed courses yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Complete 3 courses</h4>
                    <p className="text-sm text-purple-700">
                      Progress: {completedCourses.length}/3 courses
                    </p>
                    <Progress value={(completedCourses.length / 3) * 100} className="mt-2" />
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">Earn 2 certificates</h4>
                    <p className="text-sm text-green-700">
                      Progress: {certificates.length}/2 certificates
                    </p>
                    <Progress value={(certificates.length / 2) * 100} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollments.slice(0, 5).map((enrollment: any) => (
                    <div key={enrollment.id} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-gray-900">
                          Progress updated in {enrollment.course.title}
                        </p>
                        <p className="text-gray-500">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/courses">Browse New Courses</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/certificates">View Certificates</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/financial-aid">Apply for Financial Aid</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
