"use client";

import React from "react";
import Link from "next/link";
import {
  Link2,
  QrCode,
  BarChart3,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Urlino</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Shorten URLs, generate QR codes, and track clicks — all in one place.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shortner" className="text-slate-400 hover:text-cyan-400 text-sm flex items-center gap-2 transition-colors">
                  <Link2 className="w-4 h-4" /> URL Shortener
                </Link>
              </li>
              <li>
                <Link href="/qrCode-generate" className="text-slate-400 hover:text-cyan-400 text-sm flex items-center gap-2 transition-colors">
                  <QrCode className="w-4 h-4" /> QR Generator
                </Link>
              </li>
              <li>
                <Link href="/clicks" className="text-slate-400 hover:text-cyan-400 text-sm flex items-center gap-2 transition-colors">
                  <BarChart3 className="w-4 h-4" /> Click Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/yourlinks" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Your Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2025 Urlino. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> by Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;