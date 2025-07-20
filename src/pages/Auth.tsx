import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";
import { Brain, ArrowLeft } from "lucide-react";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <SignedOut>
          <Link to="/" className="flex items-center justify-center mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <Brain className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-foreground">TBM Labs</span>
          </Link>
          
          <div className="bg-card rounded-lg shadow-xl p-8 border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome to TBM Labs
              </h1>
              <p className="text-muted-foreground">
                Sign in to access your dashboard and continue learning with The Blabbering Monk Labs
              </p>
            </div>
            
            <div className="space-y-4">
              <SignInButton mode="modal">
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-4 rounded-md transition-colors">
                  Sign In
                </button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium py-3 px-4 rounded-md transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </SignedOut>
        
        <SignedIn>
          <Navigate to="/dashboard" replace />
        </SignedIn>
      </div>
    </div>
  );
};

export default Auth;