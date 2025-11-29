"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Link2,
  Copy,
  Check,
  Trash2,
  BarChart3,
  ExternalLink,
  Search,
  LinkIcon,
  AlertCircle,
} from "lucide-react";

const Page = () => {
  const [myLinks, setMyLinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("links")) || [];
    setMyLinks(storedLinks);
    setIsLoading(false);
  }, []);

  const handleDelete = (index) => {
    const updatedLinks = myLinks.filter((_, i) => i !== index);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setMyLinks(updatedLinks);
  };

  const domain = process.env.NEXT_PUBLIC_URL || "https://urlino.com";

  // Filter links based on search
  const filteredLinks = myLinks.filter(
    (link) =>
      link.shortUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="relative z-10 px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl md:rounded-3xl shadow-lg shadow-cyan-500/25 mb-4 md:mb-6 group hover:scale-110 transition-transform duration-300">
              <Link2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Your Shortened
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Links
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
              Manage all your shortened URLs in one place
            </p>

            {/* Stats Badge */}
            <div className="inline-flex items-center gap-2 mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
              <LinkIcon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              <span className="text-slate-300 text-sm md:text-base">
                Total Links:{" "}
              </span>
              <span className="text-white font-bold text-lg md:text-xl">
                {myLinks.length}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          {myLinks.length > 0 && (
            <div className="max-w-xl mx-auto mb-6 md:mb-8 px-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search your links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl md:rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Main Container */}
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
            {isLoading ? (
              // Loading State
              <div className="flex flex-col items-center justify-center py-16 md:py-24">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400">Loading your links...</p>
              </div>
            ) : myLinks.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-slate-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  No Links Yet
                </h3>
                <p className="text-slate-400 text-center mb-6 max-w-md">
                  You haven't created any shortened links yet. Start shortening
                  your URLs now!
                </p>
                <Link
                  href="/shortner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
                >
                  <LinkIcon className="w-5 h-5" />
                  Create Your First Link
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800/50 border-b border-slate-700">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                          #
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                          Short URL
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                          Original URL
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {filteredLinks.map((link, index) => (
                        <tr
                          key={index}
                          className="hover:bg-slate-700/30 transition-colors duration-200 group"
                        >
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-700/50 rounded-lg text-slate-300 font-medium text-sm">
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors break-all">
                                {`${domain}/${link.shortUrl}`}
                              </span>
                              <a
                                href={`${domain}/${link.shortUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                              </a>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-slate-300 break-all max-w-xs truncate">
                              {link.originalUrl}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {/* Copy Button */}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `${domain}/${link.shortUrl}`
                                  );
                                  setCopied(index);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  copied === index
                                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                    : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:text-white"
                                }`}
                              >
                                {copied === index ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    Copy
                                  </>
                                )}
                              </button>

                              {/* View Clicks Button */}
                              <Link
                                href="/clicks"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all duration-300"
                              >
                                <BarChart3 className="w-4 h-4" />
                                Clicks
                              </Link>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(index)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="lg:hidden divide-y divide-slate-700/50 max-h-[70vh] overflow-y-auto">
                  {filteredLinks.map((link, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-6 hover:bg-slate-700/20 transition-colors"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Short URL */}
                      <div className="mb-4">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                          Short URL
                        </label>
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`${domain}/${link.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors break-all text-sm md:text-base"
                          >
                            {`${domain}/${link.shortUrl}`}
                          </a>
                          <ExternalLink className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        </div>
                      </div>

                      {/* Original URL */}
                      <div className="mb-4">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                          Original URL
                        </label>
                        <p className="text-slate-300 break-all text-sm md:text-base line-clamp-2">
                          {link.originalUrl}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${domain}/${link.shortUrl}`
                            );
                            setCopied(index);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className={`flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                            copied === index
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600"
                          }`}
                        >
                          {copied === index ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>

                        <Link
                          href="/clicks"
                          className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-all duration-300"
                        >
                          <BarChart3 className="w-4 h-4" />
                          View Clicks
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results from Search */}
                {filteredLinks.length === 0 && searchTerm && (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Search className="w-12 h-12 text-slate-500 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No Results Found
                    </h3>
                    <p className="text-slate-400 text-center">
                      No links match "{searchTerm}"
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer CTA */}
          {myLinks.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/shortner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
              >
                <LinkIcon className="w-5 h-5" />
                Shorten Another URL
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;