"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Loading..." },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const reply = data.reply || "No response content";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Error generating response." },
      ]);
    }
  };

return (
    <div className="flex flex-col h-screen bg-pink-50">
        {/* Navbar */}
        <nav className="bg-red-600 text-white shadow-md py-3 px-4" >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 mx-auto">
                    <span className="font-bold text-xl">LovePal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                
            </div>
        </nav>
        
        {/* Chat container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[80%] ${
                        msg.role === "user" 
                            ? "bg-red-600 text-white ml-auto rounded-br-none shadow-sm" 
                            : "bg-white text-gray-800 border border-gray-200 mr-auto rounded-bl-none shadow-sm"
                    }`}
                >
                    {msg.content}
                </div>
            ))}
        </div>
        
        {/* Message form */}
        <form 
            id="message-form" 
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-gray-200 p-4"
        >
            <input
                id="message-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-black placeholder-black"
            />
            <button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
                Send
            </button>
        </form>
    </div>
);
}
