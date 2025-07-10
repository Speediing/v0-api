import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chatId, message } = body;

    // In a real implementation, this would use the MCP server to call:
    // await mcp.chats.createMessage({ chatId, message })

    const mockResponse = {
      id: `message_${Date.now()}`,
      object: "message",
      chatId,
      url: `https://v0.dev/chat/${chatId}/message_${Date.now()}`,
      text: `Updated landing page based on your feedback: ${message}`,
      files: [
        {
          lang: "tsx",
          meta: {
            title: "Updated Landing Page",
          },
          source: `// Updated component based on feedback\nimport React from 'react';\n\nexport default function UpdatedLandingPage() {\n  return (\n    <div className="min-h-screen bg-white">\n      <div className="container mx-auto px-4 py-16">\n        <h1 className="text-5xl font-bold text-center mb-8">Improved Design</h1>\n        <p className="text-center text-gray-600 mb-8">Updated based on your feedback</p>\n      </div>\n    </div>\n  );\n}`,
        },
      ],
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Error in v0 message API:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
