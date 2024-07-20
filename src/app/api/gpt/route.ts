// src/app/api/gpt/route.ts

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request to get the topic and language
    const { topic, language } = await req.json();

    // Retrieve the API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    // Make a POST request to the OpenAI API to generate the blog content
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // Specify the model to use
        messages: [
          {
            role: "system",
            content: "Be short and concise.", // Instructions for the model
          },
          {
            role: "user",
            content: `Create a blog on the topic of ${topic} in the language ${language}.`, // User's request
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse the JSON response from the OpenAI API
    const data = await response.json();

    // Extract the generated content from the response
    const assistantResponse = data.choices[0]?.message?.content;

    // Return the generated content as a JSON response
    return new Response(JSON.stringify({ content: assistantResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // Return an error response with the error message if something goes wrong
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
