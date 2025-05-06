import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dummy Next.js Website with Chatbot</title>
        <meta name="description" content="A dummy website built with Next.js featuring a Gemini-powered chatbot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to Dummy Next.js
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A sample website with a Gemini-powered chatbot in the bottom right corner.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white hover:shadow-md transition duration-300 ease-in-out">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-sky-600 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-lg font-medium text-gray-900">Lightning Fast</h2>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Built with Next.js for optimal performance and user experience.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white hover:shadow-md transition duration-300 ease-in-out">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-sky-600 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-lg font-medium text-gray-900">Customizable</h2>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Easily customize the design and functionality to suit your needs.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white hover:shadow-md transition duration-300 ease-in-out">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-sky-600 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-lg font-medium text-gray-900">Secure</h2>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  API keys are securely stored in environment variables, never exposed to the client.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white hover:shadow-md transition duration-300 ease-in-out">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-sky-600 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-lg font-medium text-gray-900">AI-Powered Chat</h2>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Integrated with Google's Gemini AI to provide intelligent responses to user queries.
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-action section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Try the chatbot!
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              Click the chat icon in the bottom right corner to start a conversation with our AI assistant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}