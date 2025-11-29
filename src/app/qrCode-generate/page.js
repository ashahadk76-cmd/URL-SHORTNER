"use client"
import React, { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [loading, setloading] = useState(false)
  const [url, setUrl] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter()

  const Generate = () => {
    setloading(true)
    if (!url.trim()) {
      setloading(false)
      setError("Please write your URL");
      return;
    }

    const newqrcode = { qrcode: url, url: url };
    const existingqrCode = JSON.parse(localStorage.getItem("qrCode")) || [];
    const alreadyExists = existingqrCode.some((QrCode) => QrCode.url === url);

    if (!alreadyExists) {
      existingqrCode.push(newqrcode);
      localStorage.setItem("qrCode", JSON.stringify(existingqrCode));
    }

    setError(null);
    router.push("/qrCode-generate/result")
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">

      {/* Background blobs */}
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/20 rounded-full blur-3xl top-20 left-10 -z-10"></div>
      <div className="absolute w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 -z-10"></div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-lg p-6 sm:p-8 relative overflow-hidden">

        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-400/20 opacity-30 rounded-3xl pointer-events-none" />

        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 tracking-wide drop-shadow-md">
          Generate Your QR Code Easily
        </h2>

        <div className="space-y-4">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Paste your URL here..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20
                        border border-white/20 transition-all duration-300"
          />

          <button
            onClick={Generate}
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 text-white transition-all duration-300 ${loading
              ? "bg-gray-400 opacity-80 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:shadow-pink-500/30"
              }`}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin text-white" />
                <span>Generating...</span>
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-4 font-medium">
            ❌ {error}
          </p>
        )}
      </div>
    </main>
  );
}

export default Page;
