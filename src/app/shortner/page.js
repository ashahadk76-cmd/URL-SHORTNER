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

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orignalUrl, shortUrl }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setGeneratedUrl(`${domain}/${shortUrl}`);
          setSuccess(true);
          setLoading(false);
        } else {
          setError(result.message);
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Failed to generate URL. Please try again.");
        setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-52 h-52 md:w-80 md:h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-52 h-52 md:w-80 md:h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md mb-4">
              <Link2 className="w-7 h-7 md:w-10 md:h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Shorten Your
              </span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                URLs
              </span>
            </h1>

            <p className="text-slate-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
              Transform long, ugly links into short, memorable URLs in seconds
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Side */}
            <div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">

                {!success ? (
                  <>
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
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

                    {/* Error */}
                    {error && (
                      <p className="p-3 mb-4 bg-red-500/10 border border-red-500/40 text-red-400 rounded-md text-sm">
                        {error}
                      </p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Original URL */}
                      <div>
                        <label className="text-slate-300 font-medium text-sm">
                          Original URL
                        </label>
                        <input
                          type="url"
                          required
                          value={orignalUrl}
                          onChange={(e) => setOrignalUrl(e.target.value)}
                          placeholder="https://example.com/your-long-url"
                          className="w-full mt-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 text-sm focus:border-cyan-500 outline-none"
                        />
                      </div>

                      {/* Short URL */}
                      <div>
                        <label className="text-slate-300 font-medium text-sm">
                          Custom Short URL
                        </label>

                        <div className="flex mt-1">
                          <span className="px-3 bg-slate-700/50 border border-r-0 border-slate-600 text-slate-400 rounded-l-xl text-sm">
                            {domain}/
                          </span>
                          <input
                            type="text"
                            required
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                            placeholder="my-custom-url"
                            className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-r-xl text-white placeholder-slate-500 text-sm focus:border-cyan-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        disabled={Loading}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                      >
                        {Loading ? (
                          <>
                            <LoaderCircle className="w-5 h-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            Generate Short URL
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (

                  /* Success Box */
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      URL Created
                    </h3>

                    <p className="text-slate-400 mt-2 mb-6">
                      Your short URL is ready
                    </p>

                    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-5 break-all">
                      <a
                        href={generatedUrl}
                        target="_blank"
                        className="text-cyan-400 font-semibold"
                      >
                        {generatedUrl}
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                      <button
                        onClick={handleCopy}
                        className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${copied
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-slate-700/50 text-white border border-slate-600"
                          }`}
                      >
                        {copied ? <Check /> : <Copy />}
                        {copied ? "Copied!" : "Copy URL"}
                      </button>

                      <button
                        onClick={resetForm}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl"
                      >
                        Create Another
                      </button>
                    </div>

                    <Link
                      href="/yourlinks"
                      className="mt-6 inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400"
                    >
                      View all your links <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Lightning Fast</h3>
                    <p className="text-slate-400 text-sm">
                      Generate URLs instantly with optimized infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Secure & Reliable
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Enterprise-grade protection for your links.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Custom URLs</h3>
                    <p className="text-slate-400 text-sm">
                      Create branded, memorable links with custom aliases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-800/40 p-4 rounded-xl text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
                    10K+
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">URLs</p>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-xl text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
                    99.9%
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Uptime</p>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-xl text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
                    50ms
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Redirect</p>
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
