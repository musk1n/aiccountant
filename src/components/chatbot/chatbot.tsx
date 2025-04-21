import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            prompt: {
              messages: [{ author: 'user', content: input }],
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      
        const replyText = res.data?.candidates?.[0]?.content;
      
        if (replyText) {
          setMessages([...newMessages, { role: 'assistant', content: replyText }]);
        } else {
          setMessages([
            ...newMessages,
            { role: 'assistant', content: 'Hmm... no response. Try again later!' },
          ]);
        }
      } catch (error) {
        console.error('Gemini error:', error);
        setMessages([
          ...newMessages,
          { role: 'assistant', content: 'Something went wrong. Please try again!' },
        ]);
      }
    }      

    return (
        <div className="fixed bottom-4 right-4 w-80 shadow-xl rounded-xl bg-white border border-gray-200 flex flex-col h-96 z-50">
          <div className="p-3 border-b font-semibold text-gray-700">🤖 AICCountant Assistant</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block p-2 rounded-md ${msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 text-sm border rounded-md mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about finance, matching, summaries..."
            />
            <button onClick={handleSend} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">Send</button>
          </div>
        </div>
      );
    };
    
    export default Chatbot;