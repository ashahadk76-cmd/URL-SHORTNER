"use client";

import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { Download, Home, QrCode, Sparkles, ExternalLink, Check } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const qrRef = useRef(null);
  const [newQrCode, setNewQrCode] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const storedQrCode = JSON.parse(localStorage.getItem("qrCode")) || [];
    setNewQrCode(storedQrCode[storedQrCode.length - 1] || null);
  }, []);

  const handleDownload = () => {
    const canvas = qrRef.current;
    const padding = 20;
    const size = canvas.width + padding * 2;

    const paddedCanvas = document.createElement("canvas");
    paddedCanvas.width = size;
    paddedCanvas.height = size;

    const ctx = paddedCanvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(canvas, padding, padding);

    const link = document.createElement("a");
    link.href = paddedCanvas.toDataURL("image/png");
    link.download = "MyQRCode.png";
    link.click();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

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
            QR Code Generated! 🎉
          </h1>
          <p className="text-slate-400">Your QR code is ready to download</p>
        </div>

        {/* QR Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 md:p-6 mb-6">
          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-2xl">
              <QRCodeCanvas
                ref={qrRef}
                value={newQrCode?.qrcode || "https://urlino.com"}
                size={180}
              />
            </div>
          </div>

          {/* URL */}
          <div className="mb-4">
            <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block text-center">
              Encoded URL
            </label>
            <a
              href={newQrCode?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm break-all text-center"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-2">{newQrCode?.url || "No URL available"}</span>
            </a>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              downloaded
                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-5 h-5" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download QR Code
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/qrCode-generate")}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate Another
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/my-QrCode")}
              className="py-3 bg-slate-700/50 border border-slate-600 text-white rounded-xl font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5 text-purple-400" />
              My QR Codes
            </button>

            <button
              onClick={() => router.push("/")}
              className="py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5 text-cyan-400" />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;