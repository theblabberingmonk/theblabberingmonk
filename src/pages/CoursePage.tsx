
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Circle, Play, Book, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardSidebar from "@/components/DashboardSidebar";

const CoursePage = () => {
  const { trackId } = useParams();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const courses = {
    fundamentals: {
      title: "LLM Fundamentals",
      description: "Master the basics of Large Language Models",
      duration: "4 weeks",
      students: "2.1k",
      progress: 25,
      lessons: [
        { id: "1", title: "Introduction to LLMs", duration: "45 min", completed: true },
        { id: "2", title: "How Transformers Work", duration: "60 min", completed: true },
        { id: "3", title: "Training Data & Preprocessing", duration: "50 min", completed: false },
        { id: "4", title: "Fine-tuning Basics", duration: "70 min", completed: false },
        { id: "5", title: "Prompt Engineering", duration: "55 min", completed: false },
        { id: "6", title: "Evaluation Metrics", duration: "40 min", completed: false },
      ]
    },
    "data-scientist": {
      title: "LLM Data Scientist",
      description: "Advanced techniques for data scientists working with LLMs",
      duration: "6 weeks",
      students: "856",
      progress: 10,
      lessons: [
        { id: "1", title: "Data Collection for LLMs", duration: "60 min", completed: true },
        { id: "2", title: "Feature Engineering", duration: "75 min", completed: false },
        { id: "3", title: "Model Selection & Comparison", duration: "65 min", completed: false },
        { id: "4", title: "Advanced Fine-tuning", duration: "90 min", completed: false },
        { id: "5", title: "Performance Optimization", duration: "80 min", completed: false },
        { id: "6", title: "Production Deployment", duration: "85 min", completed: false },
      ]
    },
    engineer: {
      title: "LLM Engineer",
      description: "Build and deploy LLM applications in production",
      duration: "8 weeks",
      students: "1.3k",
      progress: 0,
      lessons: [
        { id: "1", title: "System Architecture", duration: "90 min", completed: false },
        { id: "2", title: "API Design & Development", duration: "100 min", completed: false },
        { id: "3", title: "Scaling & Load Balancing", duration: "85 min", completed: false },
        { id: "4", title: "Security & Privacy", duration: "75 min", completed: false },
        { id: "5", title: "Monitoring & Logging", duration: "70 min", completed: false },
        { id: "6", title: "CI/CD for ML Models", duration: "95 min", completed: false },
      ]
    }
  };

  const currentCourse = courses[trackId as keyof typeof courses];

  if (!currentCourse) {
    return <div>Course not found</div>;
  }

  const completedCount = currentCourse.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = currentCourse.lessons.length;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1">
        {/* Sticky Progress Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{currentCourse.title}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{completedCount}/{totalLessons} lessons completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <span className="text-sm font-medium text-tbm-600">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Course Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-tbm-500 to-tbm-600 text-white rounded-2xl p-8">
              <h1 className="text-4xl font-bold mb-4">{currentCourse.title}</h1>
              <p className="text-xl text-tbm-100 mb-6">{currentCourse.description}</p>
              
              <div className="flex items-center space-x-8 text-tbm-100">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{currentCourse.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{currentCourse.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Book className="h-5 w-5" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Course Content</h2>
            
            {currentCourse.lessons.map((lesson, index) => (
              <Card key={lesson.id} className={`hover:shadow-md transition-shadow ${lesson.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      {lesson.completed ? (
                        <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="mr-3 h-5 w-5 text-gray-400" />
                      )}
                      <span className="mr-3 text-sm font-medium text-gray-500">
                        Lesson {index + 1}
                      </span>
                      {lesson.title}
                    </CardTitle>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      <Button 
                        size="sm" 
                        variant={lesson.completed ? "outline" : "default"}
                        className="flex items-center"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {lesson.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Course Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-tbm-600 mb-2">{progressPercentage}%</div>
                <p className="text-gray-600">Course completion</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Time Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((completedCount * 60) / 60)}h
                </div>
                <p className="text-gray-600">Hours of learning</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {totalLessons - completedCount}
                </div>
                <p className="text-gray-600">Lessons remaining</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
