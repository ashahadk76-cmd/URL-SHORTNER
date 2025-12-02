"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Copy, Check, Link2, BarChart3, Sparkles, ExternalLink } from "lucide-react";

export default function Page() {
  const [myLinks, setMyLinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("links")) || [];
    setMyLinks(storedLinks);
  }, []);

  const domain = process.env.NEXT_PUBLIC_URL || "https://urlino.com";
  const latestLink = myLinks[myLinks.length - 1];
  const shortUrl = latestLink ? `${domain}/${latestLink.shortUrl}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            URL Shortened! 🎉
          </h1>
          <p className="text-slate-400">
            Your link is ready to share
          </p>
        </div>

        {/* URL Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 md:p-6 mb-6">
          {/* Short URL */}
          <div className="mb-4">
            <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">
              Short URL
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-cyan-400 font-medium text-sm md:text-base"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  copied
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-cyan-500 text-white hover:bg-cyan-600"
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Original URL */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">
              Original URL
            </label>
            <div className="flex items-center gap-2 text-slate-400 text-sm break-all">
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {latestLink?.orignalUrl || "No URL found"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/clicks" className="w-full">
            <button className="w-full py-3 bg-slate-700/50 border border-slate-600 text-white rounded-xl font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              View Click Analytics
            </button>
          </Link>

          <Link href="/shortner" className="w-full">
            <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Shorten Another URL
            </button>
          </Link>

          <Link href="/yourlinks" className="w-full">
            <button className="w-full py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2">
              <Link2 className="w-5 h-5 text-blue-400" />
              View All Links
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}