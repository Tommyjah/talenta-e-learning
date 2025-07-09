import Header from "@/components/header";
import Hero from "@/components/hero";
import CourseCard from "@/components/course-card";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Search, Code, Database, Shield, Smartphone, Cloud, Users, GraduationCap, Book, University, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Landing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses", searchTerm, selectedCategory],
  });

  const { data: universities = [] } = useQuery({
    queryKey: ["/api/universities"],
  });

  const featuredCourses = courses.filter((course: any) => course.isFeatured).slice(0, 3);
  const stats = [
    { icon: Users, label: "Active Students", value: "25,000+", color: "text-purple-600" },
    { icon: GraduationCap, label: "Certifications Issued", value: "5,000+", color: "text-green-600" },
    { icon: Book, label: "IT Courses", value: "150+", color: "text-yellow-600" },
    { icon: University, label: "Partner Universities", value: "12", color: "text-blue-600" },
  ];

  const categories = [
    { name: "Programming", icon: Code, color: "bg-green-500" },
    { name: "Data Science", icon: Database, color: "bg-gray-500" },
    { name: "Cybersecurity", icon: Shield, color: "bg-red-500" },
    { name: "Mobile Development", icon: Smartphone, color: "bg-gray-500" },
    { name: "Cloud Computing", icon: Cloud, color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Course Search Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Course</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search through our comprehensive library of IT courses designed for African learners
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search courses, technologies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Button className="bg-talenta-purple hover:bg-purple-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`${selectedCategory === category.name ? category.color : ""} text-sm`}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated IT courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-talenta-purple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our University Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Collaborate with leading African universities to provide accredited education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {universities.slice(0, 3).map((university: any) => (
              <div key={university.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={university.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"} 
                  alt={university.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
                <p className="text-gray-600 mb-4">{university.description}</p>
                <div className="flex items-center text-purple-600">
                  <span className="text-sm">View Programs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
