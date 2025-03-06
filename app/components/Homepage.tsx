"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
   
      {/* <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-purple-200 p-2 rounded-full">
            <span className="text-purple-700 font-bold text-lg">Stack</span>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-gray-700">
          <Link href="#">Home</Link>
          <Link href="#">Browse</Link>
          <Link href="#">All Tools</Link>
        </div>
        <button className="px-4 py-2 text-sm bg-gray-200 rounded-full">
          Newsletter
        </button>
      </nav> */}

      {/* Hero Section */}
      <section className="flex flex-col text-center mt-16 px-6 max-w-3xl">
        <h1 className="text-6xl font-bold text-gray-900">
          Publication & Newsletter <br /> Template for Figma
        </h1>
        <p className="mt-4 text-gray-600">
          Elevate your projects effortlessly with our contemporary designs and
          user-friendly customization. Redefine your design journey. Explore
          now.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-purple-800 text-white rounded-lg">
            Newsletter
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg">
            Contact Us
          </button>
        </div>
      </section>


      <section className="mt-12 text-center">
        <p className="text-gray-500">Trusted by 50,000+ businesses</p>
        {/* <div className="mt-4 flex gap-6 justify-center">
          <span className="text-gray-500">🔳 Medium</span>
          <span className="text-gray-500">▢ Square</span>
          <span className="text-gray-500">⚡ Linear</span>
          <span className="text-gray-500">📧 Mailchimp</span>
          <span className="text-gray-500">🗂️ Dropbox</span>
        </div> */}
      </section>
    </div>
  );
}
