
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Circle, Play, Book, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const CoursePage = () => {
  const { trackId } = useParams();
  const { user, isLoaded } = useUser();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const courses = {
    fundamentals: {
      title: "LLM Fundamentals",
      description: "Master the core concepts of Large Language Models from the ground up. Learn about tokenization, embeddings, attention mechanisms, and transformer architecture.",
      duration: "4 weeks",
      students: "2.1k",
      progress: 8,
      lessons: [
        { id: "1", title: "Introduction to Language Models", duration: "45 min", completed: true, description: "Understanding what language models are and their evolution" },
        { id: "2", title: "Tokenization and Vocabularies", duration: "50 min", completed: false, description: "How text is broken down into tokens and vocabulary creation" },
        { id: "3", title: "Word Embeddings and Vector Spaces", duration: "55 min", completed: false, description: "Understanding how words are represented as vectors" },
        { id: "4", title: "Attention Mechanisms", duration: "60 min", completed: false, description: "The key innovation that powers modern language models" },
        { id: "5", title: "Transformer Architecture", duration: "70 min", completed: false, description: "Deep dive into the architecture that changed everything" },
        { id: "6", title: "Pre-training vs Fine-tuning", duration: "45 min", completed: false, description: "Understanding the two-stage training process" },
        { id: "7", title: "Prompt Engineering Basics", duration: "50 min", completed: false, description: "Learning to communicate effectively with language models" },
        { id: "8", title: "Few-shot and Zero-shot Learning", duration: "45 min", completed: false, description: "Making models perform tasks without specific training" },
        { id: "9", title: "Model Evaluation and Metrics", duration: "55 min", completed: false, description: "How to measure language model performance" },
        { id: "10", title: "Common LLM Architectures", duration: "60 min", completed: false, description: "Overview of popular model architectures" },
        { id: "11", title: "Limitations and Biases", duration: "40 min", completed: false, description: "Understanding the challenges and ethical considerations" },
        { id: "12", title: "Future of Language Models", duration: "35 min", completed: false, description: "Emerging trends and future directions" },
      ]
    },
    "data-scientist": {
      title: "LLM Data Scientist",
      description: "Advanced techniques for data scientists working with LLMs. Learn data collection, preprocessing, evaluation, and analysis for language model applications.",
      duration: "6 weeks",
      students: "856",
      progress: 7,
      lessons: [
        { id: "1", title: "Data Collection for LLMs", duration: "60 min", completed: true, description: "Strategies for gathering high-quality training data" },
        { id: "2", title: "Text Preprocessing and Cleaning", duration: "65 min", completed: false, description: "Cleaning and preparing text data for model training" },
        { id: "3", title: "Dataset Quality Assessment", duration: "55 min", completed: false, description: "Methods to evaluate and improve dataset quality" },
        { id: "4", title: "Tokenization Strategies", duration: "50 min", completed: false, description: "Advanced tokenization techniques and their impact" },
        { id: "5", title: "Creating Training Datasets", duration: "70 min", completed: false, description: "Building datasets optimized for specific tasks" },
        { id: "6", title: "Data Augmentation Techniques", duration: "60 min", completed: false, description: "Expanding datasets through augmentation methods" },
        { id: "7", title: "Evaluation Dataset Design", duration: "55 min", completed: false, description: "Designing robust evaluation benchmarks" },
        { id: "8", title: "Fine-tuning Data Preparation", duration: "65 min", completed: false, description: "Preparing data for domain-specific fine-tuning" },
        { id: "9", title: "Domain-Specific Data Curation", duration: "70 min", completed: false, description: "Curating data for specialized domains" },
        { id: "10", title: "Data Privacy and Ethics", duration: "45 min", completed: false, description: "Ethical considerations in data collection and use" },
        { id: "11", title: "Monitoring Data Drift", duration: "50 min", completed: false, description: "Detecting and handling changes in data distribution" },
        { id: "12", title: "Scaling Data Pipelines", duration: "75 min", completed: false, description: "Building scalable data processing workflows" },
        { id: "13", title: "Advanced Data Analysis", duration: "80 min", completed: false, description: "Statistical analysis and insights from language data" },
        { id: "14", title: "Dataset Versioning", duration: "40 min", completed: false, description: "Managing dataset versions and reproducibility" },
        { id: "15", title: "Bias Detection and Mitigation", duration: "65 min", completed: false, description: "Identifying and addressing bias in datasets" },
      ]
    },
    engineer: {
      title: "LLM Engineer",
      description: "Build production-ready LLM applications and systems. Learn system architecture, deployment, scaling, and best practices for LLM engineering.",
      duration: "8 weeks",
      students: "1.3k",
      progress: 0,
      lessons: [
        { id: "1", title: "Production LLM Architecture", duration: "90 min", completed: false, description: "Designing scalable architectures for LLM applications" },
        { id: "2", title: "API Design for LLM Services", duration: "85 min", completed: false, description: "Building robust APIs for language model services" },
        { id: "3", title: "LangChain Framework", duration: "100 min", completed: false, description: "Using LangChain for rapid LLM application development" },
        { id: "4", title: "Vector Databases and Embeddings", duration: "95 min", completed: false, description: "Implementing semantic search and similarity matching" },
        { id: "5", title: "Building RAG Systems", duration: "110 min", completed: false, description: "Retrieval-Augmented Generation for knowledge-enhanced models" },
        { id: "6", title: "AI Agent Development", duration: "105 min", completed: false, description: "Creating autonomous AI agents with LLMs" },
        { id: "7", title: "Model Serving and Deployment", duration: "90 min", completed: false, description: "Deploying models to production environments" },
        { id: "8", title: "Scaling LLM Applications", duration: "100 min", completed: false, description: "Handling high-traffic and large-scale deployments" },
        { id: "9", title: "Performance Optimization", duration: "95 min", completed: false, description: "Optimizing inference speed and resource usage" },
        { id: "10", title: "Monitoring and Observability", duration: "80 min", completed: false, description: "Implementing comprehensive monitoring systems" },
        { id: "11", title: "Security Best Practices", duration: "85 min", completed: false, description: "Securing LLM applications and user data" },
        { id: "12", title: "Cost Optimization Strategies", duration: "75 min", completed: false, description: "Minimizing operational costs while maintaining performance" },
        { id: "13", title: "Multi-modal AI Systems", duration: "120 min", completed: false, description: "Integrating text, image, and audio processing" },
        { id: "14", title: "Testing LLM Applications", duration: "90 min", completed: false, description: "Comprehensive testing strategies for AI systems" },
        { id: "15", title: "CI/CD for AI Systems", duration: "85 min", completed: false, description: "Continuous integration and deployment for ML models" },
        { id: "16", title: "Advanced Prompt Engineering", duration: "100 min", completed: false, description: "Sophisticated prompting techniques for complex tasks" },
        { id: "17", title: "Custom Model Integration", duration: "110 min", completed: false, description: "Integrating custom and fine-tuned models" },
        { id: "18", title: "Production Troubleshooting", duration: "80 min", completed: false, description: "Debugging and resolving production issues" },
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
                  <CardDescription className="ml-8 mt-2">
                    {lesson.description}
                  </CardDescription>
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
