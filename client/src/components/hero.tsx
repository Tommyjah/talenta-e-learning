import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="gradient-hero text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empower Your Tech Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join thousands of African learners advancing their IT careers with world-class courses and certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/courses">Start Learning Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
