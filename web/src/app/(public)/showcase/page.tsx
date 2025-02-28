import React from "react";
import { Search, Users, BookMarked, Code2 } from "lucide-react";

const DevConnectLanding = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-gray-800 p-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
            <span className="text-xl font-semibold">DevConnect</span>
          </div>
          <div className="hidden space-x-6 md:flex">
            <button className="hover:text-blue-400">Documentation</button>
            <button className="hover:text-blue-400">Showcase</button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 hover:text-blue-400">Sign In</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-12 space-y-4">
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
            Make it better
          </h1>
          <h1 className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
            Make it faster
          </h1>
          <h1 className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
            Make it happen
          </h1>
        </div>

        <p className="mb-8 text-xl text-gray-400">Connect your environment</p>

        {/* Sign In CTA */}
        <div className="w-full max-w-md space-y-4">
          <input
            type="email"
            placeholder="Enter your email to get started"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 transition-colors hover:bg-blue-700">
            Join DevConnect
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-gray-800 p-6">
            <Search className="mb-4 h-12 w-12 text-blue-400" />
            <h3 className="mb-2 text-xl font-semibold">Find Projects</h3>
            <p className="text-gray-400">
              Discover exciting mini-projects and collaboration opportunities
            </p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <Users className="mb-4 h-12 w-12 text-purple-400" />
            <h3 className="mb-2 text-xl font-semibold">Collaborate</h3>
            <p className="text-gray-400">
              Connect with other developers and build together
            </p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <Code2 className="mb-4 h-12 w-12 text-teal-400" />
            <h3 className="mb-2 text-xl font-semibold">Tech Stack</h3>
            <p className="text-gray-400">
              Filter projects by your preferred technologies
            </p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <BookMarked className="mb-4 h-12 w-12 text-pink-400" />
            <h3 className="mb-2 text-xl font-semibold">Bookmark</h3>
            <p className="text-gray-400">
              Save interesting projects to review later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevConnectLanding;
