
import React from "react";
import { useParams, Link } from "react-router-dom";
import TBMNavbar from "@/components/TBMNavbar";
import TBMFooter from "@/components/TBMFooter";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from a CMS or API
  const post = {
    title: "Understanding Transformer Architecture",
    excerpt: "A comprehensive deep dive into the architecture that powers modern language models",
    author: "TBM Team",
    readTime: "8 min read",
    date: "2024-01-15",
    track: "fundamentals",
    content: `
# Understanding Transformer Architecture

The Transformer architecture, introduced in the groundbreaking paper "Attention Is All You Need" by Vaswani et al., revolutionized the field of natural language processing and became the foundation for modern large language models.

## What Makes Transformers Special?

Unlike previous architectures that processed sequences step-by-step, Transformers can process all positions in a sequence simultaneously, making them much more efficient to train and capable of capturing long-range dependencies.

### Key Components

1. **Self-Attention Mechanism**
   - Allows the model to focus on relevant parts of the input
   - Computes attention weights for all positions simultaneously
   - Enables parallel processing

2. **Multi-Head Attention**
   - Uses multiple attention heads to capture different types of relationships
   - Each head learns different aspects of the data
   - Results are concatenated and linearly transformed

3. **Position Encoding**
   - Since there's no inherent order in parallel processing
   - Adds positional information to input embeddings
   - Uses sinusoidal functions for consistent position representation

## The Architecture Deep Dive

### Encoder Stack
The encoder consists of 6 identical layers, each containing:
- Multi-head self-attention mechanism
- Position-wise fully connected feed-forward network
- Residual connections around each sub-layer
- Layer normalization

### Decoder Stack
The decoder also has 6 identical layers with:
- Masked multi-head self-attention
- Multi-head attention over encoder output
- Position-wise feed-forward network
- Residual connections and layer normalization

## Why Transformers Work So Well

1. **Parallelization**: Unlike RNNs, all positions can be processed simultaneously
2. **Long-range Dependencies**: Direct connections between any two positions
3. **Interpretability**: Attention weights provide insights into model decisions
4. **Scalability**: Architecture scales well with increased data and compute

## Modern Applications

Today's language models like GPT, BERT, and T5 are all based on the Transformer architecture, proving its effectiveness across various NLP tasks.

Understanding Transformers is crucial for anyone working with modern AI systems, as they form the backbone of most state-of-the-art models.
    `
  };

  return (
    <div className="min-h-screen">
      <TBMNavbar />
      
      <main className="pt-20">
        <article className="py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-tbm-500 hover:text-tbm-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-tbm-100 text-tbm-700 px-3 py-1 rounded-full font-medium">
                  LLM Fundamentals
                </span>
                <span className="text-xs text-gray-500">
                  Beginner Level
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-12">${line.substring(2)}</h1>`;
                      } else if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">${line.substring(3)}</h2>`;
                      } else if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">${line.substring(4)}</h3>`;
                      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                        return `<li class="mb-2">${line.substring(3)}</li>`;
                      } else if (line.startsWith('- ')) {
                        return `<li class="mb-2">${line.substring(2)}</li>`;
                      } else if (line.trim() === '') {
                        return '<br>';
                      } else {
                        return `<p class="mb-4">${line}</p>`;
                      }
                    })
                    .join('')
                }}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link 
                  to="/blog" 
                  className="button-secondary"
                >
                  More Posts
                </Link>
                <Link 
                  to="/track/fundamentals" 
                  className="button-primary"
                >
                  Continue Learning Track
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <TBMFooter />
    </div>
  );
};

export default BlogPost;
