"use client";

import React, { useState } from "react";
import { LoaderCircle, QrCode, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");

    const newQrCode = { qrcode: url, url: url };
    const existingQrCodes = JSON.parse(localStorage.getItem("qrCode")) || [];
    const alreadyExists = existingQrCodes.some((qr) => qr.url === url);

    if (!alreadyExists) {
      existingQrCodes.push(newQrCode);
      localStorage.setItem("qrCode", JSON.stringify(existingQrCodes));
    }

    router.push("/qrCode-generate/result");
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
            <QrCode className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Generate QR Code
          </h1>
          <p className="text-slate-400">
            Convert any URL into a scannable QR code
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 md:p-6">
          {/* Input */}
          <div className="mb-4">
            <label className="text-slate-300 font-medium mb-2 block text-sm">
              <Link2 className="w-4 h-4 inline-block mr-2 text-cyan-400" />
              Enter URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;