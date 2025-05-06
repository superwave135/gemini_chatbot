import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotComponent from './ChatbotComponent';
import { MessageSquare } from 'lucide-react';

export default function Layout({ children }) {
  // State to track chatbot visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>

      {/* Chatbot section above footer */}
      <div className="w-full bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need help? Chat with our AI Assistant
            </h2>
            
            {isChatOpen ? (
              <div className="w-full max-w-xl mb-6"> {/* Increased width from max-w-md to max-w-xl */}
                <ChatbotComponent 
                  isVisible={true} 
                  onClose={() => setIsChatOpen(false)}
                />
              </div>
            ) : (
              <button 
                onClick={toggleChat}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 flex items-center space-x-2"
                aria-label="Open chat"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start chatting</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


      {/* Chatbot section above footer
      <div className="w-full bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need help? Chat with Dreamie AI
            </h2>
            
            {isChatOpen ? (
              <div className="w-full max-w-md mb-6">
                <ChatbotComponent 
                  isVisible={true} 
                  onClose={() => setIsChatOpen(false)}
                />
              </div>
            ) : (
              <button 
                onClick={toggleChat}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 flex items-center space-x-2"
                aria-label="Open chat"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start chatting</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} */}



















