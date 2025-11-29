"use client"
import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';

const Page = () => {
  const router = useRouter()
  const [newQrCode, setNewQrCode] = useState([])
  const qrRef = useRef(null)

  useEffect(() => {
    const storedQrCode = JSON.parse(localStorage.getItem("qrCode")) || [];
    setNewQrCode(storedQrCode[storedQrCode.length - 1] || null);
  }, []);

  const handleDownload = () => {
    const canvas = qrRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "MyQRCode.png";
    link.click();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 p-4 sm:p-6 relative overflow-hidden">

      {/* Background circles */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/30 rounded-full blur-3xl top-10 left-10 -z-10" />
      <div className="absolute w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-pink-500/20 rounded-full blur-3xl bottom-20 right-10 -z-10" />

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-md w-full border border-white/20">

        {/* QR Section */}
        <div className="flex flex-col items-center gap-3 w-full">
          <QRCodeCanvas
            ref={qrRef}
            value={newQrCode?.qrcode}
            size={200}
            className="rounded-xl border border-white/20 p-3 bg-white/10 shadow-lg"
          />

          <p className="text-sm sm:text-base text-gray-300 mt-2 break-all text-center">
            {newQrCode?.url || "No URL available"}
          </p>

          <div className="absolute top-9 right-1 md:top-9 md:right-0 flex flex-col justify-center items-center gap-1">
            <Download
              onClick={handleDownload}
              className="w-10 h-10 text-black bg-gray-200 p-2 rounded-full cursor-pointer animate-bounce"
            />
            <span className="text-xs animate-pulse text-white">download</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">

          <button
            onClick={() => router.push("/")}
            className="flex-1 cursor-pointer py-2 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Back to Home
          </button>

          <button
            onClick={() => router.push("/qrCode-generate")}
            className="flex-1 cursor-pointer py-2 rounded-xl bg-gradient-to-r from-green-400 via-teal-500 to-lime-400 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Generate Another
          </button>

          <button
            onClick={() => router.push("/my-QrCode")}
            className="flex-1 cursor-pointer py-2 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            My QR Codes
          </button>

        </div>
      </div>
    </main>
  )
}

export default Page;
