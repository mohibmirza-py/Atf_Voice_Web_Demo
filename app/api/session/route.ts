import { NextResponse } from 'next/server';

// Add interface for request body
interface SessionRequestBody {
  instructions?: string;
  voice?: string;
}

export async function POST(request: Request) {
    try {        
        if (!process.env.OPENAI_API_KEY){
            throw new Error(`OPENAI_API_KEY is not set`);
        }

        // Get custom instructions and voice from request body
        const body: SessionRequestBody = await request.json();
        
        // Use the provided instructions or fall back to a minimal default
        const instructions = body.instructions || "Start conversation with the user.";

        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: body.voice || "alloy",
                modalities: ["audio", "text"],
                instructions: instructions,
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${JSON.stringify(response)}`);
        }

        const data = await response.json();

        // Return the JSON response to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}