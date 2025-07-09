import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  Share2, 
  Calendar,
  BookOpen,
  ExternalLink,
  Trophy
} from "lucide-react";
import { format } from "date-fns";

export default function Certificates() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  const { data: certificates = [] } = useQuery({
    queryKey: ["/api/certificates"],
    enabled: isAuthenticated,
  });

  // Sample certificates for demonstration
  const sampleCertificates = [
    {
      id: "CERT-TLN-001",
      course: {
        title: "Full Stack Web Development",
        category: "Programming",
        duration: "16 weeks"
      },
      issuedAt: "2024-03-15T10:30:00Z",
      studentName: "John Doe",
      completionDate: "2024-03-15",
      certificateUrl: "#"
    },
    {
      id: "CERT-TLN-002", 
      course: {
        title: "Data Science & Analytics",
        category: "Data Science",
        duration: "12 weeks"
      },
      issuedAt: "2024-02-20T14:15:00Z",
      studentName: "John Doe",
      completionDate: "2024-02-20",
      certificateUrl: "#"
    },
    {
      id: "CERT-TLN-003",
      course: {
        title: "Mobile App Development",
        category: "Mobile Development",
        duration: "14 weeks"
      },
      issuedAt: "2024-01-10T09:00:00Z",
      studentName: "John Doe",
      completionDate: "2024-01-10",
      certificateUrl: "#"
    }
  ];

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

  const displayCertificates = certificates.length > 0 ? certificates : sampleCertificates;

  const generateCertificatePreview = (cert: any) => {
    const certificateWindow = window.open('', '_blank');
    if (certificateWindow) {
      certificateWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate - ${cert.course?.title}</title>
            <style>
              body { 
                font-family: 'Times New Roman', serif; 
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .certificate { 
                background: white; 
                padding: 80px 60px; 
                border: 20px solid #8B5CF6; 
                border-radius: 20px;
                text-align: center;
                max-width: 900px;
                width: 100%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                position: relative;
                overflow: hidden;
              }
              .certificate::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                transform: rotate(-45deg);
                animation: shine 3s infinite;
              }
              @keyframes shine {
                0% { transform: translateX(-100%) translateY(-100%) rotate(-45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(-45deg); }
              }
              .header { 
                color: #8B5CF6; 
                font-size: 48px; 
                font-weight: bold; 
                margin-bottom: 30px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
              }
              .subheader {
                color: #6B7280;
                font-size: 18px;
                margin-bottom: 40px;
                font-style: italic;
              }
              .title { 
                font-size: 32px; 
                margin: 30px 0; 
                color: #1F2937;
                font-weight: normal;
              }
              .name { 
                font-size: 42px; 
                font-weight: bold; 
                color: #F59E0B; 
                margin: 40px 0; 
                text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                border-bottom: 3px solid #F59E0B;
                padding-bottom: 10px;
                display: inline-block;
              }
              .course { 
                font-size: 28px; 
                color: #059669; 
                margin: 30px 0; 
                font-weight: 600;
              }
              .completion-text {
                font-size: 18px;
                color: #374151;
                margin: 20px 0;
              }
              .date { 
                font-size: 18px; 
                color: #6B7280; 
                margin: 40px 0; 
                font-style: italic;
              }
              .signatures {
                display: flex;
                justify-content: space-between;
                margin-top: 60px;
                padding-top: 30px;
                border-top: 2px solid #E5E7EB;
              }
              .signature {
                text-align: center;
                flex: 1;
                margin: 0 20px;
              }
              .signature-line {
                border-top: 2px solid #374151;
                width: 200px;
                margin: 0 auto 10px;
              }
              .signature-title {
                font-size: 14px;
                color: #6B7280;
                font-weight: 600;
              }
              .id { 
                font-size: 12px; 
                color: #9CA3AF; 
                margin-top: 40px;
                font-family: 'Courier New', monospace;
                letter-spacing: 1px;
              }
              .badge {
                position: absolute;
                top: 30px;
                right: 30px;
                background: linear-gradient(45deg, #8B5CF6, #F59E0B);
                color: white;
                padding: 10px 20px;
                border-radius: 50px;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="badge">Verified Certificate</div>
              <div class="header">TALENTA</div>
              <div class="subheader">African IT Education Platform</div>
              <div class="title">Certificate of Completion</div>
              <div class="completion-text">This is to certify that</div>
              <div class="name">${cert.studentName || user?.firstName || 'Student Name'}</div>
              <div class="completion-text">has successfully completed the course</div>
              <div class="course">${cert.course?.title}</div>
              <div class="completion-text">Duration: ${cert.course?.duration || 'N/A'} | Category: ${cert.course?.category || 'N/A'}</div>
              <div class="date">Completed on ${format(new Date(cert.completionDate), "MMMM d, yyyy")}</div>
              <div class="signatures">
                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Course Instructor</div>
                </div>
                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Academic Director</div>
                </div>
              </div>
              <div class="id">Certificate ID: ${cert.id} | Verify at: talenta.edu/verify</div>
            </div>
          </body>
        </html>
      `);
      certificateWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-green-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
            My Certificates
          </h1>
          <p className="text-xl text-gray-600">
            View and download your earned certificates
          </p>
        </div>

        {displayCertificates.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayCertificates.map((cert: any) => (
                <Card key={cert.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-amber-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-amber-600/10"></div>
                      <div className="relative z-10 text-center">
                        <Trophy className="w-16 h-16 text-purple-600 mx-auto mb-2" />
                        <div className="text-xs font-medium text-purple-800 bg-white/80 px-3 py-1 rounded-full">
                          Certificate of Completion
                        </div>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        Verified
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-center">{cert.course?.title}</CardTitle>
                    <CardDescription className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        Completed {format(new Date(cert.completionDate), "MMM d, yyyy")}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {cert.course?.category}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Certificate ID:</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {cert.id}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700"
                          onClick={() => generateCertificatePreview(cert)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.origin + '/certificate/' + cert.id);
                            toast({
                              title: "Link copied!",
                              description: "Certificate link copied to clipboard",
                            });
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certificate Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{displayCertificates.length}</div>
                  <div className="text-sm text-gray-600">Certificates Earned</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-600">{new Set(displayCertificates.map(c => c.course?.category)).size}</div>
                  <div className="text-sm text-gray-600">Skill Categories</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 mb-6">
                Complete a course to earn your first certificate
              </p>
              <Button 
                onClick={() => window.location.href = '/courses'}
                className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700"
              >
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}