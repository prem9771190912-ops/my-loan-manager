import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Professional Loan Management</span>
            <br />
            <span className="gradient-text-accent">Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Calculate EMIs, track payments, and manage multiple loans with our comprehensive loan management platform. Perfect for individuals and financial professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="xl"
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl"
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
