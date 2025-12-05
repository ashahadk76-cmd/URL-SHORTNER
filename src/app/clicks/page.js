"use client";

import React, { useState,useRef } from "react";
import { LoaderCircle, BarChart3, Search, MousePointerClick } from "lucide-react";

const Page = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  
  

  const handleClick = () => {
    if (!shortUrl.trim()) {
      setError("Please enter a valid short URL.");
      setClicks(null);
      return;
    }
    setLoading(true);
    setError("");

    let short = shortUrl.trim();
    try {
      const urlObj = new URL(short);
      short = urlObj.pathname.replace(/^\/+/, "");
    } catch (e) {}

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shortUrl: short }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.success) {
          setClicks(result.clicks);
          setError("");
        } else {
          setClicks(null);
          setError("Short URL not found");
          setShortUrl("")
        }
      })
      .catch(() => {
        setLoading(false);
        setError("An error occurred while fetching clicks.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Click Analytics
          </h1>
          <p className="text-slate-400 text-sm">
            Track how many times your shortened URL was clicked
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 md:p-6">
          {/* Input */}
          <div className="mb-4">
            <label className="text-slate-300 font-medium mb-2 block text-sm">
              Enter Short URL
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                type="text"
                placeholder="urlino.com/your-code or just your-code"
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleClick}
            disabled={loading}
            className=" cursor-pointer  w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Counting...
              </>
            ) : (
              <>
                <MousePointerClick className="w-5 h-5" />
                Count Clicks
              </>
            )}
          </button>  

          {/* Results */}
          {clicks !== null && (
            <div className="mt-5 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center  ">
              <p className="text-green-400 text-sm mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-white">{clicks}</p>
            </div>
          )}

          {error && (
            <div className="mt-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;