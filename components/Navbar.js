import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Replace with your actual logo */}
              <Link href="/">
                <span className="h-8 w-8 mr-2 bg-sky-600 rounded flex items-center justify-center text-white font-bold">
                  DN
                </span>
              </Link>
              <Link href="/" className="text-xl font-bold text-gray-800">
                Dummy Next
              </Link>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-sky-500">
                Home
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300">
                About
              </Link>
              <Link href="/services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300">
                Services
              </Link>
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}