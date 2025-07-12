
import React, { useEffect } from "react";
import TBMNavbar from "@/components/TBMNavbar";
import TBMHero from "@/components/TBMHero";
import ToolsShowcase from "@/components/ToolsShowcase";
import PrivacyHighlight from "@/components/PrivacyHighlight";
import TrackPreview from "@/components/TrackPreview";
import TBMFooter from "@/components/TBMFooter";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <TBMNavbar />
      <main className="space-y-4 sm:space-y-8">
        <TBMHero />
        <ToolsShowcase />
        <PrivacyHighlight />
        <TrackPreview />
      </main>
      <TBMFooter />
    </div>
  );
};

export default Index;
