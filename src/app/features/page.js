"use client";

import React from "react";
import {
  Link2,
  QrCode,
  BarChart3,
  Zap,
  Shield,
  Smartphone,
  Download,
  Pencil,
  Copy,
  Search,
  Trash2,
  ExternalLink,
  Globe,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const mainFeatures = [
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "URL Shortener",
      desc: "Transform long, ugly URLs into short, clean, and memorable links. Custom aliases supported.",
      color: "from-cyan-500 to-blue-500",
      features: ["Custom short URLs", "Instant generation", "One-click copy"],
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Generator",
      desc: "Generate beautiful QR codes for any URL. Download as PNG with white padding.",
      color: "from-purple-500 to-pink-500",
      features: ["Instant QR generation", "PNG download", "Rename & organize"],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Click Analytics",
      desc: "Track how many times your shortened URLs are clicked in real-time.",
      color: "from-green-500 to-emerald-500",
      features: ["Real-time tracking", "Click counter", "URL search"],
    },
  ];

  const allFeatures = [
    { icon: <Zap className="w-5 h-5" />, title: "Lightning Fast", desc: "Generate in milliseconds" },
    { icon: <Shield className="w-5 h-5" />, title: "Secure", desc: "Enterprise-grade security" },
    { icon: <Smartphone className="w-5 h-5" />, title: "Responsive", desc: "Works on all devices" },
    { icon: <Download className="w-5 h-5" />, title: "Download QR", desc: "Save as PNG image" },
    { icon: <Pencil className="w-5 h-5" />, title: "Rename QR", desc: "Custom QR code names" },
    { icon: <Copy className="w-5 h-5" />, title: "One-Click Copy", desc: "Copy URLs instantly" },
    { icon: <Search className="w-5 h-5" />, title: "Search Links", desc: "Find links quickly" },
    { icon: <Trash2 className="w-5 h-5" />, title: "Manage Links", desc: "Delete unwanted links" },
    { icon: <ExternalLink className="w-5 h-5" />, title: "Quick Redirect", desc: "Fast URL redirection" },
    { icon: <Globe className="w-5 h-5" />, title: "Custom Domain", desc: "Your own short domain" },
    { icon: <Clock className="w-5 h-5" />, title: "24/7 Available", desc: "Always online" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Modern UI", desc: "Beautiful dark theme" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg shadow-yellow-500/25 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Powerful{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Features
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to shorten URLs, generate QR codes, and track your links
            </p>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:scale-[1.02] transition-all group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{feature.desc}</p>

                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* All Features Grid */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              All Features
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/50 hover:border-slate-600 transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-slate-500 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-slate-700 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Start shortening URLs and generating QR codes for free. No signup required!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shortner"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Link2 className="w-5 h-5" />
                Shorten URL
              </Link>
              <Link
                href="/qrCode-generate"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Generate QR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;