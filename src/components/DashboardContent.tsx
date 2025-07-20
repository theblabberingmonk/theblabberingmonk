
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Sparkles, Zap, BookOpen, Lightbulb, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardContent = () => {
  const { user } = useUser();
  const userName = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || "Friend";

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hi {userName}! 🎉 Hope you're doing great!
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to <span className="text-tbm-600 font-semibold">The Blabbering Monk Labs!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gradient-to-br from-tbm-500 to-tbm-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Access Apps
            </CardTitle>
            <CardDescription className="text-tbm-100">
              Dive into our suite of AI-powered tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ready to unleash the power of AI? Jump into our collection of tools and start creating amazing things!
            </p>
            <Link to="/apps">
              <Button variant="secondary" className="bg-white text-tbm-600 hover:bg-gray-100">
                Explore Tools
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn & Grow
            </CardTitle>
            <CardDescription className="text-purple-100">
              Master LLMs with our comprehensive tracks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              From fundamentals to advanced engineering - we've got learning paths for every level!
            </p>
            <Link to="/track/fundamentals">
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Learning
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Suggest Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Got an idea for a new AI tool? We'd love to hear it!
            </p>
            <Button variant="outline" className="w-full">
              Share Your Idea
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-green-500" />
              Collaborate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Connect with other builders and learners in our community.
            </p>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
              What's New
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest tools and features.
            </p>
            <Button variant="outline" className="w-full">
              View Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
