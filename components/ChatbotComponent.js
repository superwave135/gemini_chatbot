// This component encapsulates the Chatbot's UI and logic.

import React, { useState, useRef, useEffect } from 'react';
// Import icons from lucide-react
import { Send, Bot, User, X } from 'lucide-react';

// Define the ChatbotComponent function which accepts props for visibility and closing
export default function ChatbotComponent({ isVisible, onClose }) {
  // State for storing the chat messages array
  const [messages, setMessages] = useState([
    // Initial message from the bot
    { sender: 'bot', text: "I'm Dreamie, your helpful AI assistant. How can I help you?" }
  ]);
  // State for the user's current input in the text field
  const [input, setInput] = useState('');
  // State to track if the bot is currently fetching a response (for loading indicator)
  const [isLoading, setIsLoading] = useState(false);
  // Ref to the container holding the messages, used for auto-scrolling
  const messagesEndRef = useRef(null);

  // Function to scroll the message container to the bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect hook to scroll down whenever new messages are added or the chat becomes visible
  useEffect(() => {
    // Only scroll if the chat window is visible
    if (isVisible) {
      scrollToBottom();
    }
  }, [messages, isVisible]); // Dependencies: run when messages or visibility changes

  // --- Function to get Bot Response via Backend API ---
  const getBotResponse = async (userInput) => {
    setIsLoading(true); // Set loading state to true
    try {
      // Make a POST request to the '/api/chat' endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        // Send the user's message in the request body
        body: JSON.stringify({ message: userInput }),
      });

      // Check if the API response status is OK (e.g., 200)
      if (!response.ok) {
        // If response is not OK, try to parse error details from the response body
        const errorData = await response.json().catch(() => ({ error: 'Unknown API error' })); // Handle cases where error response isn't valid JSON
        console.error('API Error:', errorData); // Log the error details
        // Add an error message to the chat interface
        setMessages(prev => [...prev, { sender: 'bot', text: `Sorry, something went wrong: ${errorData.error || 'Please try again.'}` }]);
      } else {
        // If response is OK, parse the JSON data containing the bot's reply
        const data = await response.json();
        // Add the bot's reply to the messages state
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (error) {
      // Catch network errors (e.g., failed to fetch, server unreachable)
      console.error('Network Error:', error); // Log the network error
      // Add a network error message to the chat interface
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I couldn\'t connect. Please check your connection and try again.' }]);
    } finally {
      // Regardless of success or error, set loading state back to false
      setIsLoading(false);
    }
  };
  // --- End of API Call Logic ---

  // --- Function to handle sending a message ---
  const handleSend = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    const trimmedInput = input.trim(); // Remove leading/trailing whitespace from input

    // Do nothing if the input is empty or if the bot is currently loading
    if (!trimmedInput || isLoading) return;

    // Add the user's message to the state immediately for a responsive feel
    setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
    setInput(''); // Clear the input field after sending

    // Call the function to fetch the bot's response from the backend API
    getBotResponse(trimmedInput);
  };

  // If the component is not supposed to be visible, render nothing
  if (!isVisible) {
    return null;
  }





  // --- Render the Chatbot User Interface ---
  return (
    // Main container for the chat window - Set background to light blue (e.g., bg-blue-100 or bg-sky-100)
    <div className="flex flex-col h-96 w-full max-w-lg sm:max-w-xl bg-sky-100 rounded-lg shadow-xl border border-gray-300 font-sans overflow-hidden"> {/* Changed height to h-96 and increased width */}
      {/* Chat Header Section - Using a complementary darker blue */}
      <div className="bg-sky-700 text-white p-3 rounded-t-lg flex items-center justify-between flex-shrink-0"> {/* Adjusted header color */}
        {/* Bot Icon and Title */}
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        {/* Close Button */}
        <button
          onClick={onClose} // Call the onClose function passed via props when clicked
          className="text-white p-1 rounded-full hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-white" // Adjusted hover color
          aria-label="Close chat" // Accessibility label
        >
          <X className="w-5 h-5" /> {/* Close icon */}
        </button>
      </div>

      {/* Message Display Area - Using white background for contrast */}
      <div className="flex-1 p-4 overflow-y-auto bg-white"> {/* Changed background to bg-white */}
        {/* Map through the messages array and render each message */}
        {messages.map((message, index) => (
          <div key={index} className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {/* Individual Message Bubble */}
            <div className={`px-4 py-2 rounded-lg max-w-[85%] break-words shadow-md ${
              message.sender === 'user'
                ? 'bg-sky-600 text-white' // Adjusted user message color
                : 'bg-gray-100 text-gray-800 border border-gray-200' // Bot messages light gray
            }`}>
              {message.text} {/* Display the message text */}
            </div>
          </div>
        ))}
        {/* Loading Indicator (shown when isLoading is true) */}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="p-3 rounded-lg bg-gray-100 text-gray-600 shadow-md border border-gray-200"> {/* Style consistent with bot messages */}
              {/* Pulsing animation for loading text */}
              <span className="animate-pulse">Bot is thinking...</span>
            </div>
          </div>
        )}
        {/* Invisible div used as a target for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area - Using a slightly off-white background */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-300 bg-gray-50 rounded-b-lg flex-shrink-0"> {/* Changed background to bg-gray-50 */}
        <div className="flex items-center space-x-2">
          {/* Text Input Field */}
          <input
            type="text"
            value={input} // Controlled input value
            onChange={(e) => setInput(e.target.value)} // Update state on change
            placeholder="Type your message..." // Placeholder text
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100" // Adjusted focus ring color
            disabled={isLoading} // Disable input while loading
            aria-label="Chat input" // Accessibility label
          />
          {/* Send Button */}
          <button
            type="submit" // Submit the form on click
            // Dynamic styling based on loading state and input content
            className={`p-2 rounded-full text-white transition-colors duration-200 ${
              isLoading || !input.trim() // Disable conditions
                ? 'bg-gray-400 cursor-not-allowed' // Disabled style
                : 'bg-sky-600 hover:bg-sky-700' // Adjusted button color
            } focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-70`}
            disabled={isLoading || !input.trim()} // Disable button based on conditions
            aria-label="Send message" // Accessibility label
          >
            <Send className="w-5 h-5" /> {/* Send icon */}
          </button>
        </div>
      </form>
    </div>
  );
}
















//   // --- Render the Chatbot User Interface ---
//   return (
//     // Main container for the chat window - Set background to light blue (e.g., bg-blue-100 or bg-sky-100)
//     <div className="flex flex-col h-[500px] w-full max-w-sm sm:max-w-md bg-sky-100 rounded-lg shadow-xl border border-gray-300 font-sans overflow-hidden"> {/* Changed background to bg-sky-100, adjusted border */}
//       {/* Chat Header Section - Using a complementary darker blue */}
//       <div className="bg-sky-700 text-white p-3 rounded-t-lg flex items-center justify-between flex-shrink-0"> {/* Adjusted header color */}
//         {/* Bot Icon and Title */}
//         <div className="flex items-center">
//           <Bot className="w-6 h-6 mr-2" />
//           <h2 className="text-lg font-semibold">AI Assistant</h2>
//         </div>
//         {/* Close Button */}
//         <button
//           onClick={onClose} // Call the onClose function passed via props when clicked
//           className="text-white p-1 rounded-full hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-white" // Adjusted hover color
//           aria-label="Close chat" // Accessibility label
//         >
//           <X className="w-5 h-5" /> {/* Close icon */}
//         </button>
//       </div>

//       {/* Message Display Area - Using white background for contrast */}
//       <div className="flex-1 p-4 overflow-y-auto bg-white"> {/* Changed background to bg-white */}
//         {/* Map through the messages array and render each message */}
//         {messages.map((message, index) => (
//           <div key={index} className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             {/* Individual Message Bubble */}
//             <div className={`px-4 py-2 rounded-lg max-w-[85%] break-words shadow-md ${
//               message.sender === 'user'
//                 ? 'bg-sky-600 text-white' // Adjusted user message color
//                 : 'bg-gray-100 text-gray-800 border border-gray-200' // Bot messages light gray
//             }`}>
//               {message.text} {/* Display the message text */}
//             </div>
//           </div>
//         ))}
//         {/* Loading Indicator (shown when isLoading is true) */}
//         {isLoading && (
//           <div className="flex justify-start mb-3">
//             <div className="p-3 rounded-lg bg-gray-100 text-gray-600 shadow-md border border-gray-200"> {/* Style consistent with bot messages */}
//               {/* Pulsing animation for loading text */}
//               <span className="animate-pulse">Bot is thinking...</span>
//             </div>
//           </div>
//         )}
//         {/* Invisible div used as a target for scrolling to the bottom */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input Area - Using a slightly off-white background */}
//       <form onSubmit={handleSend} className="p-3 border-t border-gray-300 bg-gray-50 rounded-b-lg flex-shrink-0"> {/* Changed background to bg-gray-50 */}
//         <div className="flex items-center space-x-2">
//           {/* Text Input Field */}
//           <input
//             type="text"
//             value={input} // Controlled input value
//             onChange={(e) => setInput(e.target.value)} // Update state on change
//             placeholder="Type your message..." // Placeholder text
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100" // Adjusted focus ring color
//             disabled={isLoading} // Disable input while loading
//             aria-label="Chat input" // Accessibility label
//           />
//           {/* Send Button */}
//           <button
//             type="submit" // Submit the form on click
//             // Dynamic styling based on loading state and input content
//             className={`p-2 rounded-full text-white transition-colors duration-200 ${
//               isLoading || !input.trim() // Disable conditions
//                 ? 'bg-gray-400 cursor-not-allowed' // Disabled style
//                 : 'bg-sky-600 hover:bg-sky-700' // Adjusted button color
//             } focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-70`}
//             disabled={isLoading || !input.trim()} // Disable button based on conditions
//             aria-label="Send message" // Accessibility label
//           >
//             <Send className="w-5 h-5" /> {/* Send icon */}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }