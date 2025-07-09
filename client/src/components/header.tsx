import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  GraduationCap, 
  Bell, 
  User, 
  LogOut, 
  Award, 
  BookOpen, 
  CreditCard,
  Menu
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [language, setLanguage] = useState("en");

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 gradient-logo rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-900">Talenta</span>
                <span className="text-sm text-gray-600 ml-2">African IT Education</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/courses" className="text-gray-900 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="/certificates" className="text-gray-900 hover:text-purple-600 transition-colors">
              Certifications
            </Link>
            <Link href="/universities" className="text-gray-900 hover:text-purple-600 transition-colors">
              Universities
            </Link>
            <Link href="/financial-aid" className="text-gray-900 hover:text-purple-600 transition-colors">
              Financial Aid
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {language === "en" ? "English" : "አማርኛ"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("am")}>
                  አማርኛ (Amharic)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <img 
                        src={user?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/progress">
                        <BookOpen className="w-4 h-4 mr-2" />
                        My Learning
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/certificates">
                        <Award className="w-4 h-4 mr-2" />
                        Certificates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/financial-aid">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Financial Aid
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/api/logout"}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                className="bg-talenta-purple hover:bg-purple-700"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
