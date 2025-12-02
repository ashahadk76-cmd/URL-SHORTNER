"use client";

import React, { useState } from "react";
import {
  LoaderCircle,
  Link2,
  Sparkles,
  ArrowRight,
  Globe,
  Zap,
  Shield,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [orignalUrl, setOrignalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [Loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_URL || "https://urlino.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      orignalUrl: orignalUrl,
      shortUrl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setLoading(false);
          setGeneratedUrl(`${domain}/${shortUrl}`);
          setSuccess(true);

          const newLink = { orignalUrl: orignalUrl, shortUrl: shortUrl };
          const existingLinks =
            JSON.parse(localStorage.getItem("links")) || [];
          const alreadyExists = existingLinks.find(
            (link) => link.shortUrl === shortUrl
          );
          if (!alreadyExists) {
            existingLinks.push(newLink);
            localStorage.setItem("links", JSON.stringify(existingLinks));
          }
        } else {
          setLoading(false);
          setError(result.message || "Something went wrong!");
        }
        console.log(result);
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to generate URL. Please try again.");
        console.error(error);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setOrignalUrl("");
    setShortUrl("");
    setSuccess(false);
    setGeneratedUrl("");
    setError("");
  };

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

      <div className="relative z-10 px-4 py-8 md:px-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl md:rounded-3xl shadow-lg shadow-cyan-500/25 mb-4 md:mb-6 group hover:scale-110 transition-transform duration-300">
              <Link2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Shorten Your
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                URLs
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
              Transform long, ugly links into short, memorable URLs in seconds
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10">
                {!success ? (
                  <>
                    {/* Form Header */}
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                          Create Short URL
                        </h2>
                        <p className="text-slate-400 text-sm">
                          Enter your long URL below
                        </p>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                      {/* Original URL Input */}
                      <div>
                        <label
                          htmlFor="orignalUrl"
                          className="block text-slate-300 font-medium mb-2 text-sm md:text-base"
                        >
                          <Globe className="w-4 h-4 inline-block mr-2 text-cyan-400" />
                          Original URL
                        </label>
                        <input
                          onChange={(e) => setOrignalUrl(e.target.value)}
                          value={orignalUrl}
                          type="url"
                          id="orignalUrl"
                          name="orignalUrl"
                          required
                          placeholder="https://example.com/very-long-url-here"
                          className="w-full px-4 py-3 md:py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        />
                      </div>

                      {/* Short URL Input */}
                      <div>
                        <label
                          htmlFor="shortUrl"
                          className="block text-slate-300 font-medium mb-2 text-sm md:text-base"
                        >
                          <Zap className="w-4 h-4 inline-block mr-2 text-yellow-400" />
                          Custom Short URL
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 md:px-4 bg-slate-700/50 border border-r-0 border-slate-600 rounded-l-xl text-slate-400 text-sm md:text-base">
                            {domain}/
                          </span>
                          <input
                            onChange={(e) => setShortUrl(e.target.value)}
                            value={shortUrl}
                            type="text"
                            id="shortUrl"
                            name="shortUrl"
                            required
                            placeholder="my-custom-url"
                            className="flex-1 px-4 py-3 md:py-4 bg-slate-900/50 border border-slate-600 rounded-r-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                        <p className="text-slate-500 text-xs mt-2">
                          Only letters, numbers, and hyphens allowed
                        </p>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={Loading}
                        className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {Loading ? (
                          <>
                            <LoaderCircle className="w-5 h-5 animate-spin" />
                            <span className="animate-pulse">Generating...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Short URL</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-4">
                    {/* Success Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full mb-6 border border-green-500/50">
                      <Check className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      URL Created Successfully!
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Your short URL is ready to use
                    </p>

                    {/* Generated URL Box */}
                    <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-4 mb-6">
                      <p className="text-slate-400 text-sm mb-2">
                        Your Short URL
                      </p>
                      <div className="flex items-center gap-2 justify-center flex-wrap">
                        <a
                          href={generatedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 font-semibold text-lg md:text-xl hover:text-cyan-300 transition-colors break-all"
                        >
                          {generatedUrl}
                        </a>
                        <ExternalLink className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleCopy}
                        className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                          copied
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-slate-700/50 text-white border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-5 h-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy URL
                          </>
                        )}
                      </button>

                      <button
                        onClick={resetForm}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        Create Another
                      </button>
                    </div>

                    {/* View All Links */}
                    <Link
                      href="/yourlinks"
                      className="inline-flex items-center gap-2 mt-6 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      View all your links
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="order-1 lg:order-2">
              <div className="space-y-4 md:space-y-6">
                {/* Feature Cards */}
                <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Lightning Fast
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Generate short URLs instantly with our optimized
                        infrastructure
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Secure & Reliable
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Your links are secure with enterprise-grade protection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Custom URLs
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Create memorable, branded short URLs with custom aliases
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      10K+
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">
                      URLs Created
                    </p>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      99.9%
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">
                      Uptime
                    </p>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      50ms
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">
                      Redirect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;