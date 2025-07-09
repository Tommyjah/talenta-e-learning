import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
              About Talenta
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering African minds with world-class IT education and skills training
            </p>
            <Badge className="px-4 py-2 bg-purple-100 text-purple-800 border-purple-300">
              Bridging the Digital Divide in Africa
            </Badge>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Target className="h-6 w-6" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To democratize access to quality IT education across Africa, providing learners with practical skills, industry-relevant knowledge, and globally recognized certifications that enable them to thrive in the digital economy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Globe className="h-6 w-6" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To become Africa's leading digital education platform, creating a generation of skilled technology professionals who drive innovation and economic growth across the continent.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why Choose Talenta */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Talenta?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Users className="h-6 w-6" />
                  Expert Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Learn from industry professionals and experienced educators who understand the African market and global standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Award className="h-6 w-6" />
                  Practical Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Hands-on projects and real-world applications ensure you're ready for the job market from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Globe className="h-6 w-6" />
                  Global Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Internationally recognized certifications that open doors to opportunities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-800">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  Founded in 2024, Talenta was born from a simple yet powerful idea: every African should have access to world-class technology education. Our founders, a team of passionate educators and tech industry veterans, recognized the immense potential of African talent and the need for quality, accessible IT training.
                </p>
                <p className="leading-relaxed">
                  We understand the unique challenges facing African learners - from limited internet connectivity to financial constraints. That's why we've designed our platform to be inclusive, offering multiple payment options including Ethiopian Birr, financial aid programs, and optimized content delivery.
                </p>
                <p className="leading-relaxed">
                  Today, we're proud to partner with leading African universities and serve thousands of students across the continent, helping them build careers in technology and contribute to Africa's digital transformation.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Impact Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 via-amber-600 to-green-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-purple-200">Students Enrolled</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-amber-200">Certificates Issued</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-green-200">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-200">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-purple-200 shadow-lg bg-gradient-to-r from-purple-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">Ready to Start Your Journey?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of African learners building their tech careers with Talenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white px-8 py-3 text-lg"
                onClick={() => window.location.href = '/courses'}
              >
                Explore Courses
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}