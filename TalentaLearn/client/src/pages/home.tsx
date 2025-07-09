import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Award, TrendingUp, Star, Play } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
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

  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses", "", "", true], // featured courses
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

  const recentEnrollments = enrollments.slice(0, 3);
  const recentCertificates = certificates.slice(0, 3);
  const featuredCourses = courses.filter((course: any) => course.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Welcome Section */}
      <section className="gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.firstName || 'Learner'}!
            </h1>
            <p className="text-xl mb-8">
              Continue your IT learning journey with Talenta
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentEnrollments.length > 0 ? (
                  <div className="space-y-4">
                    {recentEnrollments.map((enrollment: any) => (
                      <div key={enrollment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={enrollment.course.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
                          alt={enrollment.course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{enrollment.course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{enrollment.course.category}</p>
                          <Progress value={Number(enrollment.progress)} className="w-full" />
                          <p className="text-xs text-gray-500 mt-1">{enrollment.progress}% complete</p>
                        </div>
                        <Button asChild size="sm">
                          <Link href={`/course/${enrollment.course.id}`}>Continue</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No enrolled courses yet. Start learning today!</p>
                    <Button asChild className="mt-4">
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentCertificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentCertificates.map((cert: any) => (
                      <div key={cert.id} className="p-4 bg-gradient-to-br from-purple-50 to-green-50 rounded-lg border-2 border-yellow-200">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{cert.course.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(cert.issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No certificates earned yet. Complete a course to get your first certificate!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Enrolled Courses</span>
                  <Badge variant="secondary">{enrollments.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Certificates Earned</span>
                  <Badge variant="secondary">{certificates.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Progress</span>
                  <Badge variant="secondary">
                    {enrollments.length > 0 
                      ? Math.round(enrollments.reduce((sum: number, e: any) => sum + Number(e.progress), 0) / enrollments.length)
                      : 0}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Featured Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Featured Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredCourses.map((course: any) => (
                    <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{course.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{course.rating}</span>
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/course/${course.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
