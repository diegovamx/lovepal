import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: NextRequest) {
    const {message} = await req.json();
    
    try {
        
        const response = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {

                    role: 'system',
                    content: 'You are a warm, thoughtful, and emotionally intelligent relationship coach. Your goal is to help users navigate romantic relationships, improve communication, and make healthy, respectful decisions. Always respond with empathy, clarity, and encouragement. Tailor your advice to the users emotional context. Avoid making assumptions or giving overly rigid answers—offer perspectives, ask reflective questions, and prioritize emotional safety. Be inclusive of all relationship types, cultural backgrounds, and orientations. If the user is in a potentially harmful or abusive situation, gently encourage seeking help from a professional or support service. If asked to analyze a message or journal entry, focus on the emotional tone, clarity, and intent behind the communication. Suggest ways to express oneself more effectively or understand the partners point of view.'
                },
                {
                    role: 'user',
                    content: message
                }
                
            ],
            temperature: 0.7,
        });
        
        return NextResponse.json({ reply: response.choices[0].message.content ?? 'No response content' });
        
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
        
    }

}