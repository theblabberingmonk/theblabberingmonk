
import React from "react";
import TBMNavbar from "@/components/TBMNavbar";
import TBMFooter from "@/components/TBMFooter";
import { Link } from "react-router-dom";
import { BookOpen, Database, Code, ArrowRight, Clock, User } from "lucide-react";

const Blog = () => {
  const tracks = [
    {
      id: "fundamentals",
      title: "LLM Fundamentals",
      description: "Perfect for beginners who want to understand how Large Language Models work, from tokenization to embeddings and prompt engineering.",
      icon: BookOpen,
      level: "Beginner",
      lessons: 12,
      color: "from-blue-500 to-blue-600",
      topics: ["Tokenization", "Embeddings", "Attention Mechanisms", "Prompt Design"]
    },
    {
      id: "data-scientist",
      title: "LLM Data Scientist",
      description: "Learn to build, analyze, and work with datasets for training and fine-tuning language models.",
      icon: Database,
      level: "Intermediate",
      lessons: 15,
      color: "from-purple-500 to-purple-600",
      topics: ["Dataset Creation", "Data Analysis", "Fine-tuning", "Model Evaluation"]
    },
    {
      id: "engineer",
      title: "LLM Engineer",
      description: "Build production-level AI applications, agents, and tools using modern frameworks like LangChain and vector databases.",
      icon: Code,
      level: "Advanced",
      lessons: 18,
      color: "from-green-500 to-green-600",
      topics: ["LangChain", "Vector Databases", "RAG Systems", "AI Agents"]
    }
  ];

  const recentPosts = [
    {
      title: "Understanding Transformer Architecture",
      excerpt: "A deep dive into the architecture that powers modern language models",
      author: "TBM Team",
      readTime: "8 min read",
      date: "2024-01-15",
      slug: "understanding-transformer-architecture",
      track: "fundamentals"
    },
    {
      title: "Building Your First RAG System",
      excerpt: "Step-by-step guide to creating a Retrieval-Augmented Generation system",
      author: "TBM Team",
      readTime: "12 min read",
      date: "2024-01-10",
      slug: "building-first-rag-system",
      track: "engineer"
    },
    {
      title: "Fine-tuning LLMs with Custom Data",
      excerpt: "Learn how to fine-tune language models for specific use cases",
      author: "TBM Team",
      readTime: "15 min read",
      date: "2024-01-05",
      slug: "fine-tuning-llms-custom-data",
      track: "data-scientist"
    }
  ];

  return (
    <div className="min-h-screen">
      <TBMNavbar />
      
      <main className="pt-20">
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-tbm-50 to-white">
          <div className="section-container">
            <div className="text-center mb-12">
              <div className="tbm-chip mx-auto mb-6">
                <span>Educational Hub</span>
              </div>
              <h1 className="section-title mb-6">
                Master Large Language Models
              </h1>
              <p className="section-subtitle mx-auto">
                Comprehensive learning tracks to take you from LLM novice to expert. Choose your path and start building with AI.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-12">Learning Tracks</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {tracks.map((track) => (
              <Link
                key={track.id}
                to={`/course/${track.id}`}
                className="group block"
              >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-tbm-300 h-full">
                    <div className={`h-32 bg-gradient-to-r ${track.color} relative`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute bottom-4 left-6">
                        <track.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {track.level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs bg-tbm-100 text-tbm-700 px-2 py-1 rounded-full font-medium">
                          {track.lessons} lessons
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-tbm-600 transition-colors">
                        {track.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {track.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {track.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-tbm-500 text-sm font-medium group-hover:text-tbm-600 transition-colors">
                        Start Learning
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Posts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-tbm-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs bg-tbm-100 text-tbm-700 px-2 py-1 rounded-full font-medium">
                            {tracks.find(t => t.id === post.track)?.title.split(' ')[1]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tbm-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <TBMFooter />
    </div>
  );
};

export default Blog;
