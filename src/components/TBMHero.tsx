
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Brain, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const TBMHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section 
      className="overflow-hidden relative bg-gradient-to-br from-tbm-50 to-white" 
      id="hero" 
      style={{
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-tbm-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="tbm-chip mb-3 sm:mb-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-tbm-500 text-white mr-2">AI</span>
              <span>Secure & Private</span>
            </div>
            
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.3s" }}
            >
              Welcome to TBM Labs<br className="hidden sm:inline" />
              <span className="text-tbm-500">The AI Playground for Everyone</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-700 font-normal text-base sm:text-lg text-left"
            >
              Create an account to access our suite of AI tools, track your learning progress, and securely store your API keys. Build, learn, and grow with our privacy-first platform.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <Link 
                to="/auth"
                className="button-primary flex items-center justify-center group w-full sm:w-auto text-center"
              >
                <UserPlus className="mr-2 w-4 h-4" />
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="#tools" 
                className="button-secondary w-full sm:w-auto text-center"
              >
                Explore Tools
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-tbm-100 to-tbm-200 p-8 sm:p-12">
                <div className="flex items-center justify-center">
                  <Brain className="w-32 h-32 sm:w-48 sm:h-48 text-tbm-500 animate-pulse-slow" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-tbm-500/10 to-transparent"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-tbm-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-tbm-400 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-tbm-100/30 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default TBMHero;
