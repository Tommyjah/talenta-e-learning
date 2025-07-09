import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  BookOpen, 
  Award,
  Globe,
  Mail,
  Phone
} from "lucide-react";

export default function Universities() {
  const { data: universities = [], isLoading } = useQuery({
    queryKey: ["/api/universities"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const partnershipBenefits = [
    {
      icon: Award,
      title: "Accredited Courses",
      description: "All courses are recognized by partner universities and industry standards",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from distinguished professors and industry professionals",
    },
    {
      icon: BookOpen,
      title: "Academic Credit",
      description: "Earn transferable credits that count towards your degree",
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Certificates recognized internationally and by employers",
    },
  ];

  const mockUniversities = [
    {
      id: 1,
      name: "University of Cape Town",
      description: "Leading research university offering computer science and engineering programs with strong industry connections",
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.uct.ac.za",
      country: "South Africa",
      partneredAt: "2023-01-15",
      programs: ["Computer Science", "Data Science", "Software Engineering"],
      students: 28000,
      established: 1829,
    },
    {
      id: 2,
      name: "Addis Ababa University",
      description: "Ethiopia's premier university with strong IT and engineering departments, pioneering technology education in East Africa",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.aau.edu.et",
      country: "Ethiopia",
      partneredAt: "2023-03-20",
      programs: ["Information Technology", "Computer Engineering", "Cybersecurity"],
      students: 45000,
      established: 1950,
    },
    {
      id: 3,
      name: "University of Nairobi",
      description: "Kenya's top university with innovative technology programs and strong connections to Silicon Savannah",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.uonbi.ac.ke",
      country: "Kenya",
      partneredAt: "2023-02-10",
      programs: ["Mobile Development", "AI & Machine Learning", "Cloud Computing"],
      students: 84000,
      established: 1970,
    },
    {
      id: 4,
      name: "Makerere University",
      description: "Uganda's oldest and most prestigious university with a growing technology and innovation hub",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.mak.ac.ug",
      country: "Uganda",
      partneredAt: "2023-04-05",
      programs: ["Software Development", "Network Security", "Digital Innovation"],
      students: 38000,
      established: 1922,
    },
    {
      id: 5,
      name: "University of Ghana",
      description: "Leading West African university with strong emphasis on technology and digital transformation",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.ug.edu.gh",
      country: "Ghana",
      partneredAt: "2023-05-12",
      programs: ["Web Development", "Database Systems", "IT Management"],
      students: 40000,
      established: 1948,
    },
    {
      id: 6,
      name: "University of the Witwatersrand",
      description: "South Africa's premier research university with cutting-edge technology and engineering programs",
      imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      website: "https://www.wits.ac.za",
      country: "South Africa",
      partneredAt: "2023-06-18",
      programs: ["Artificial Intelligence", "Blockchain Technology", "IoT Development"],
      students: 37000,
      established: 1922,
    },
  ];

  const displayUniversities = universities.length > 0 ? universities : mockUniversities;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">University Partners</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborate with leading African universities to provide world-class, accredited IT education
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partnership Benefits */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our university partnerships ensure you receive quality education that's recognized globally
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* University Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partner Universities</h2>
            <p className="text-gray-600">
              Collaborating with {displayUniversities.length} prestigious African institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayUniversities.map((university: any) => (
              <Card key={university.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={university.imageUrl} 
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">
                      {university.country}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{university.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{university.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {university.established}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{university.students?.toLocaleString()} students</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Programs Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.programs?.map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          Partner since {new Date(university.partneredAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(university.website, '_blank')}
                    >
                      Visit Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Inquiry */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-center">Interested in Partnership?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                If you represent a university and would like to partner with Talenta to offer 
                accredited IT education to African students, we'd love to hear from you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-600">partnerships@talenta.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+251 11 123 4567</p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-talenta-purple hover:bg-purple-700">
                Get in Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
