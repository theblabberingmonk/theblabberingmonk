
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Database, Code, ArrowRight } from "lucide-react";

const TrackPreview = () => {
  const tracks = [
    {
      id: "fundamentals",
      title: "LLM Fundamentals",
      description: "Learn the basics of Large Language Models, tokenization, embeddings, and prompt design",
      icon: BookOpen,
      level: "Beginner",
      lessons: 12,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "data-scientist",
      title: "LLM Data Scientist",
      description: "Build and analyze datasets for training and fine-tuning language models",
      icon: Database,
      level: "Intermediate",
      lessons: 15,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "engineer",
      title: "LLM Engineer",
      description: "Build production-level AI applications, agents, and tools with modern frameworks",
      icon: Code,
      level: "Advanced",
      lessons: 18,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50" id="learning">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="tbm-chip mx-auto mb-6">
            <span>Learn with Us</span>
          </div>
          <h2 className="section-title mb-6">
            Master LLMs with Our <span className="text-tbm-500">Learning Tracks</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Whether you're just starting or looking to build production systems, our comprehensive tracks will guide you through the world of Large Language Models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tracks.map((track, index) => (
            <Link
              key={track.id}
              to={`/track/${track.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-tbm-300">
                <div className={`h-24 bg-gradient-to-r ${track.color} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-6">
                    <track.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-tbm-100 text-tbm-700 px-2 py-1 rounded-full font-medium">
                      {track.level}
                    </span>
                    <span className="text-xs text-gray-500">
                      {track.lessons} lessons
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tbm-600 transition-colors">
                    {track.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {track.description}
                  </p>
                  
                  <div className="flex items-center text-tbm-500 text-sm font-medium group-hover:text-tbm-600 transition-colors">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Want to explore all our educational content?
          </p>
          <Link to="/blog" className="button-primary">
            Visit Our Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrackPreview;
