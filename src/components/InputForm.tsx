// src/components/InputForm.tsx

"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// This component handles user input to generate a blog using the GPT-4 API
const InputForm = () => {
  // State variables to manage the form input and the generated blog content
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevents the browser from reloading the page on form submit
    setLoading(true);

    try {
      // Sends a POST request to the API to generate the blog content
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();

      setBlog(data.content);
    } catch (error) {
      console.error("Failed to generate blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <div className="my-6 text-center">
        <h1 className="text-4xl font-medium">AI Blog Generator</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border p-5 rounded-md border-white/30 text-sm"
      >
        <h2 className="font-semibold text-lg mb-4">
          Create a blog in any language
        </h2>

        <label className="mb-2">
          Topic
          <input
            type="text"
            placeholder="Enter the topic for the blog here"
            className="border bg-transparent w-full border-white/30 rounded-md p-1.5 mt-1"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>

        <label>
          Language
          <input
            type="text"
            placeholder="Enter the language you want to generate the blog in"
            className="border bg-transparent w-full border-white/30 rounded-md p-1.5 mt-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-white text-black p-2 mt-5 rounded-md"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {/* Displays the generated blog content */}
      {blog && (
        <div className="border p-5 rounded-md border-white/30 mt-5 whitespace-pre-wrap">
          <h2 className="font-semibold text-lg">Generated Blog</h2>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default InputForm;
