import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Checkout from "@/pages/checkout";
import Progress from "@/pages/progress";
import Certificates from "@/pages/certificates";
import FinancialAid from "@/pages/financial-aid";
import Contact from "@/pages/contact";
import Universities from "@/pages/universities";
import About from "@/pages/about";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/courses" component={Courses} />
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/universities" component={Universities} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/checkout/:courseId" component={Checkout} />
          <Route path="/progress" component={Progress} />
          <Route path="/certificates" component={Certificates} />
          <Route path="/financial-aid" component={FinancialAid} />
          <Route path="/universities" component={Universities} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
