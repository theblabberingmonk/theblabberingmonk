
import React from "react";
import { useParams, Link } from "react-router-dom";
import TBMNavbar from "@/components/TBMNavbar";
import TBMFooter from "@/components/TBMFooter";
import { ArrowLeft, BookOpen, Database, Code, CheckCircle, Circle, Clock } from "lucide-react";

const TrackPage = () => {
  const { trackId } = useParams();

  const tracks = {
    fundamentals: {
      title: "LLM Fundamentals",
      description: "Master the core concepts of Large Language Models from the ground up",
      icon: BookOpen,
      level: "Beginner",
      color: "from-blue-500 to-blue-600",
      lessons: [
        { title: "Introduction to Language Models", duration: "15 min", completed: false },
        { title: "Tokenization and Vocabularies", duration: "20 min", completed: false },
        { title: "Word Embeddings and Vector Spaces", duration: "25 min", completed: false },
        { title: "Understanding Attention Mechanisms", duration: "30 min", completed: false },
        { title: "Transformer Architecture Deep Dive", duration: "35 min", completed: false },
        { title: "Pre-training vs Fine-tuning", duration: "20 min", completed: false },
        { title: "Prompt Engineering Basics", duration: "25 min", completed: false },
        { title: "Few-shot and Zero-shot Learning", duration: "20 min", completed: false },
        { title: "Model Evaluation and Metrics", duration: "30 min", completed: false },
        { title: "Common LLM Architectures", duration: "25 min", completed: false },
        { title: "Limitations and Biases", duration: "20 min", completed: false },
        { title: "Future of Language Models", duration: "15 min", completed: false }
      ]
    },
    "data-scientist": {
      title: "LLM Data Scientist",
      description: "Learn to work with data for training and fine-tuning language models",
      icon: Database,
      level: "Intermediate",
      color: "from-purple-500 to-purple-600",
      lessons: [
        { title: "Data Collection for LLMs", duration: "20 min", completed: false },
        { title: "Text Preprocessing and Cleaning", duration: "25 min", completed: false },
        { title: "Dataset Quality Assessment", duration: "30 min", completed: false },
        { title: "Tokenization Strategies", duration: "25 min", completed: false },
        { title: "Creating Training Datasets", duration: "35 min", completed: false },
        { title: "Data Augmentation Techniques", duration: "30 min", completed: false },
        { title: "Evaluation Dataset Design", duration: "25 min", completed: false },
        { title: "Fine-tuning Data Preparation", duration: "30 min", completed: false },
        { title: "Domain-Specific Data Curation", duration: "35 min", completed: false },
        { title: "Data Privacy and Ethics", duration: "20 min", completed: false },
        { title: "Monitoring Data Drift", duration: "25 min", completed: false },
        { title: "Scaling Data Pipelines", duration: "30 min", completed: false },
        { title: "Advanced Data Analysis", duration: "40 min", completed: false },
        { title: "Dataset Versioning", duration: "20 min", completed: false },
        { title: "Bias Detection and Mitigation", duration: "35 min", completed: false }
      ]
    },
    engineer: {
      title: "LLM Engineer",
      description: "Build production-ready AI applications and systems",
      icon: Code,
      level: "Advanced",
      color: "from-green-500 to-green-600",
      lessons: [
        { title: "Production LLM Architecture", duration: "30 min", completed: false },
        { title: "API Design for LLM Services", duration: "35 min", completed: false },
        { title: "LangChain Framework", duration: "40 min", completed: false },
        { title: "Vector Databases and Embeddings", duration: "35 min", completed: false },
        { title: "Building RAG Systems", duration: "45 min", completed: false },
        { title: "AI Agent Development", duration: "40 min", completed: false },
        { title: "Model Serving and Deployment", duration: "35 min", completed: false },
        { title: "Scaling LLM Applications", duration: "40 min", completed: false },
        { title: "Monitoring and Observability", duration: "30 min", completed: false },
        { title: "Performance Optimization", duration: "45 min", completed: false },
        { title: "Security Best Practices", duration: "30 min", completed: false },
        { title: "Cost Optimization Strategies", duration: "25 min", completed: false },
        { title: "Multi-modal AI Systems", duration: "50 min", completed: false },
        { title: "Testing LLM Applications", duration: "35 min", completed: false },
        { title: "CI/CD for AI Systems", duration: "40 min", completed: false },
        { title: "Advanced Prompt Engineering", duration: "45 min", completed: false },
        { title: "Custom Model Integration", duration: "50 min", completed: false },
        { title: "Production Troubleshooting", duration: "30 min", completed: false }
      ]
    }
  };

  const track = tracks[trackId as keyof typeof tracks];

  if (!track) {
    return (
      <div className="min-h-screen">
        <TBMNavbar />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Not Found</h1>
            <p className="text-gray-600 mb-8">The learning track you're looking for doesn't exist.</p>
            <Link to="/blog" className="button-primary">
              Back to Blog
            </Link>
          </div>
        </main>
        <TBMFooter />
      </div>
    );
  }

  const totalDuration = track.lessons.reduce((total, lesson) => {
    const minutes = parseInt(lesson.duration.split(' ')[0]);
    return total + minutes;
  }, 0);

  const completedLessons = track.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / track.lessons.length) * 100;

  return (
    <div className="min-h-screen">
      <TBMNavbar />
      
      <main className="pt-20">
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-tbm-50 to-white">
          <div className="section-container">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-tbm-500 hover:text-tbm-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${track.color} rounded-2xl flex items-center justify-center`}>
                    <track.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">{track.title}</h1>
                      <span className="bg-tbm-100 text-tbm-700 px-3 py-1 rounded-full text-sm font-medium">
                        {track.level}
                      </span>
                    </div>
                    <p className="text-xl text-gray-600">{track.description}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
                    <span className="text-sm text-gray-600">
                      {completedLessons} of {track.lessons.length} completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-tbm-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium text-gray-900">{track.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium text-gray-900">{track.lessons.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Lessons</h2>
            
            <div className="space-y-4">
              {track.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-tbm-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-tbm-600 transition-colors">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-300 group-hover:text-tbm-300 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Ready to start your learning journey?
              </p>
              <Link to={`/course/${trackId}`} className="button-primary">
                Start Course
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <TBMFooter />
    </div>
  );
};

export default TrackPage;
