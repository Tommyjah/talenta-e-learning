import { Link } from "wouter";
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 gradient-logo rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="ml-3 text-xl font-bold">Talenta</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering African IT professionals through quality education and certification.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/courses?category=Programming" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/courses?category=Data Science" className="hover:text-white transition-colors">Data Science</Link></li>
              <li><Link href="/courses?category=Mobile Development" className="hover:text-white transition-colors">Mobile Development</Link></li>
              <li><Link href="/courses?category=Cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              <li><Link href="/courses?category=Cloud Computing" className="hover:text-white transition-colors">Cloud Computing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/financial-aid" className="hover:text-white transition-colors">Financial Aid</Link></li>
              <li><Link href="/certificates" className="hover:text-white transition-colors">Certification</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">University Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Talenta. All rights reserved. Made with ❤️ for African learners.</p>
        </div>
      </div>
    </footer>
  );
}
