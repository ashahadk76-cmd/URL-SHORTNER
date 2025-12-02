"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Pencil, Trash2, QrCode, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [qrTitle, setQrTitle] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const storedQrCode = JSON.parse(localStorage.getItem("qrCode")) || [];
    setQrCodes(storedQrCode);

    const storedTitles = JSON.parse(localStorage.getItem("qrTitles"));
    if (storedTitles && storedTitles.length === storedQrCode.length) {
      setQrTitle(storedTitles);
    } else {
      setQrTitle(storedQrCode.map((_, i) => `My QR Code ${i + 1}`));
    }
  }, []);

  useEffect(() => {
    if (qrTitle.length > 0) {
      localStorage.setItem("qrTitles", JSON.stringify(qrTitle));
    }
  }, [qrTitle]);

  const handleDelete = (index) => {
    const updatedQrCodes = qrCodes.filter((_, i) => i !== index);
    const updatedTitles = qrTitle.filter((_, i) => i !== index);
    setQrCodes(updatedQrCodes);
    setQrTitle(updatedTitles);
    localStorage.setItem("qrCode", JSON.stringify(updatedQrCodes));
    localStorage.setItem("qrTitles", JSON.stringify(updatedTitles));
  };

  const handleChange = (index, newValue) => {
    const updatedTitles = [...qrTitle];
    updatedTitles[index] = newValue;
    setQrTitle(updatedTitles);
  };

  const handleDownload = (index) => {
    const canvas = document.getElementById(`qr-${index}`);
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
    link.download = `${qrTitle[index] || `QR-${index + 1}`}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg shadow-purple-500/25 mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            My QR Codes
          </h1>
          <p className="text-slate-400">
            Total: <span className="text-white font-bold">{qrCodes.length}</span> QR codes
          </p>
        </div>

        {/* QR Codes Grid */}
        {qrCodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {qrCodes.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 md:p-5 hover:border-slate-600 transition-all"
              >
                {/* QR Code & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-white p-2 rounded-xl">
                    <QRCodeCanvas
                      id={`qr-${index}`}
                      value={item.qrcode}
                      size={70}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 uppercase mb-1">PNG</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={qrTitle[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        readOnly={isEditing !== index}
                        className={`bg-transparent text-white font-medium text-sm w-full ${
                          isEditing === index
                            ? "border border-cyan-500 px-2 py-1 rounded-lg"
                            : "border-none"
                        }`}
                      />
                      {isEditing === index ? (
                        <button
                          onClick={() => setIsEditing(null)}
                          className="p-1.5 bg-green-500/20 text-green-400 rounded-lg"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(index)}
                          className="p-1.5 bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* URL */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-4 truncate"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.url}</span>
                </a>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(index)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No QR Codes Yet</h3>
            <p className="text-slate-400 mb-6">Generate your first QR code now!</p>
            <Link
              href="/qrCode-generate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <QrCode className="w-5 h-5" />
              Generate QR Code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;