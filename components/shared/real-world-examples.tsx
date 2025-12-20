"use client";

import React, { useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import CodeBlock from "@/app/utilities/components/code-block";

export interface RealWorldExample {
  title: string;
  description: string;
  code: string;
  preview?: React.ReactNode;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface RealWorldExamplesProps {
  title?: string;
  description?: string;
  examples: RealWorldExample[];
  categories?: string[];
  enableFilter?: boolean;
  showPreview?: boolean;
}

export function RealWorldExamples({
  title = "Real World Examples",
  description = "See how these utilities are used in practical applications.",
  examples,
  categories = [],
  enableFilter = true,
  showPreview = true,
}: RealWorldExamplesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { copy, copiedText } = useCopyToClipboard();

  // Extract unique categories if not provided
  const availableCategories = categories.length > 0 
    ? categories 
    : [...new Set(examples.map(ex => ex.category).filter(Boolean))];

  // Filter examples based on selected category
  const filteredExamples = selectedCategory === "all" 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  const copyCode = (code: string) => {
    copy(code);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner": return "text-green-600 bg-green-50";
      case "intermediate": return "text-yellow-600 bg-yellow-50";
      case "advanced": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <section className="space-y-6 border-t border-border pt-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {/* Category Filter */}
      {enableFilter && availableCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All ({examples.length})
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category} ({examples.filter(ex => ex.category === category).length})
            </button>
          ))}
        </div>
      )}

      {/* Examples Grid */}
      <div className="space-y-6">
        {filteredExamples.map((example, index) => (
          <div 
            key={index} 
            className="border border-border rounded-lg p-6 bg-card/30 hover:bg-card/40 transition-all"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-foreground">{example.title}</h3>
                  {example.difficulty && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                      {example.difficulty}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{example.description}</p>
              </div>
              
              <button
                onClick={() => copyCode(example.code)}
                className="px-4 py-2 rounded border border-border text-sm hover:bg-muted/20 transition-all flex-shrink-0"
              >
                {copiedText === example.code ? "Copied!" : "Copy Code"}
              </button>
            </div>

            {/* Preview */}
            {showPreview && example.preview && (
              <div className="mb-4">
                <div className="text-sm font-medium text-muted-foreground mb-2">Preview:</div>
                <div className="border border-border rounded-lg p-4 bg-slate-800">
                  {example.preview}
                </div>
              </div>
            )}

            {/* Code */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Implementation:</div>
                <code className="text-xs px-2 py-1 bg-muted rounded">
                  {example.category && `${example.category} • `}
                  {example.difficulty && `${example.difficulty} • `}
                  Click code to copy
                </code>
              </div>
              <div 
                className="cursor-pointer group"
                onClick={() => copyCode(example.code)}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Click to copy
                  </span>
                </div>
                <CodeBlock language="jsx" code={example.code} />
              </div>
            </div>

            {/* Category Badge */}
            {example.category && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  Category: <span className="font-medium">{example.category}</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredExamples.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No examples found for "{selectedCategory}"</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-2 text-blue-500 hover:underline"
          >
            View all examples
          </button>
        </div>
      )}
    </section>
  );
}