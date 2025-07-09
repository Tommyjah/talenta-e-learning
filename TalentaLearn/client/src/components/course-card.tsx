import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users, DollarSign } from "lucide-react";
import { Link } from "wouter";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    brief: string;
    category: string;
    duration: string;
    price: string;
    priceEtb: string;
    rating: string;
    enrollmentCount: number;
    imageUrl?: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <img 
        src={course.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
        alt={course.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-talenta-green text-white">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{course.rating} ({course.enrollmentCount})</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.brief}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.enrollmentCount}
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-purple-600">${course.price}</span>
            <span className="text-sm text-gray-500 block">or {course.priceEtb} ETB</span>
          </div>
        </div>
        
        <Button asChild className="w-full bg-talenta-purple hover:bg-purple-700">
          <Link href={`/course/${course.id}`}>
            <DollarSign className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
