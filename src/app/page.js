"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Link2,
  QrCode,
  BarChart3,
  Zap,
  ArrowRight,
  Check,
  Mail,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";
import { set } from "mongoose";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.success) {
          setMessage("Subscribed Successfully! 🎉");
          setEmail("");
          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage("Failed: " + result.message);
          setTimeout(() => setMessage(""), 3000);
          setEmail("");
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage("Something went wrong!");
      });
  };

  const features = [
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "URL Shortener",
      desc: "Shorten long URLs instantly",
      color: "from-cyan-500 to-blue-500",
      href: "/shortner",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Generator",
      desc: "Create QR codes for any link",
      color: "from-purple-500 to-pink-500",
      href: "/qrCode-generate",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Click Analytics",
      desc: "Track your link clicks",
      color: "from-green-500 to-emerald-500",
      href: "/clicks",
    },
  ];

  const stats = [
    { value: "10K+", label: "URLs Shortened" },
    { value: "5K+", label: "QR Codes" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 py-12 md:px-8 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            {/* Logo Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-lg shadow-cyan-500/25 mb-6 animate-bounce">
              <Link2 className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Welcome to{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Urlino
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Shorten URLs, generate QR codes, and track clicks — all in one place. Fast, free, and easy to use.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/shortner"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Shortening
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/qrCode-generate"
                className="px-8 py-4 bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:scale-[1.02] transition-all group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </Link>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-10 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Why Choose Urlino?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Generate short URLs in milliseconds" },
                { icon: <Shield className="w-6 h-6" />, title: "Secure & Reliable", desc: "Your links are always safe" },
                { icon: <Globe className="w-6 h-6" />, title: "Works Everywhere", desc: "Mobile, tablet & desktop ready" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-slate-700 rounded-3xl p-8 md:p-10 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-slate-400 mb-6">Get notified about new features and updates</p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </div>

              {message && (
                <div className="mt-4 flex items-center justify-center gap-2 text-cyan-50">
                  <Check className="w-5 h-5" />
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}