"use client";

import React from "react";
import {
  Link2,
  QrCode,
  BarChart3,
  Zap,
  Shield,
  Smartphone,
  Github,
  Twitter,
  Linkedin,
  Heart,
  Sparkles,
  Globe,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const features = [
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "URL Shortener",
      desc: "Transform long URLs into short, memorable links",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Generator",
      desc: "Create scannable QR codes for any URL instantly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Click Analytics",
      desc: "Track how many times your links are clicked",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      desc: "Generate short URLs & QR codes in milliseconds",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      desc: "Your links are safe with enterprise-grade security",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Fully Responsive",
      desc: "Works perfectly on mobile, tablet & desktop",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "URLs Shortened", icon: <Link2 className="w-5 h-5" /> },
    { value: "5K+", label: "QR Codes Generated", icon: <QrCode className="w-5 h-5" /> },
    { value: "50K+", label: "Total Clicks", icon: <MousePointerClick className="w-5 h-5" /> },
    { value: "99.9%", label: "Uptime", icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-lg shadow-cyan-500/25 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                About{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Urlino
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Your all-in-one solution for URL shortening, QR code generation, and link analytics. Simple, fast, and powerful.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shortner"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Link2 className="w-5 h-5" />
                Start Shortening
              </Link>
              <Link
                href="/qrCode-generate"
                className="px-8 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 text-center hover:border-slate-600 transition-all"
              >
                <div className="flex justify-center mb-2 text-cyan-400">
                  {stat.icon}
                </div>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:scale-[1.02] transition-all group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Paste Your URL", desc: "Enter your long URL or any link you want to shorten" },
                { step: "2", title: "Customize", desc: "Add a custom alias or generate QR code" },
                { step: "3", title: "Share", desc: "Copy your short link and share it anywhere" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Section */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍💻</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Built with <Heart className="w-5 h-5 inline text-red-500" /> by Developer
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Urlino is crafted with modern technologies like Next.js, Tailwind CSS, and more to provide the best experience.
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-slate-500 text-sm">
            <p>© 2025 Urlino. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;