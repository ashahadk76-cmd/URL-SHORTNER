"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Scissors,
  User,
  Star,
  LayoutDashboard,
  Link2,
  BarChart3,
  QrCode,
  Scan,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Background Blur Effect - MOVED OUTSIDE NAV and before it */}
      {(open || mobileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => {
            setOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}

      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-3 md:py-4 px-4 md:px-8 shadow-2xl relative border-b border-slate-700 backdrop-blur-sm bg-opacity-95 z-50">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          {/* Logo - Rare & Professional */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              {/* Main Logo Icon */}
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/25 group-hover:scale-110 transition-all duration-500 rotate-0 group-hover:rotate-3">
                <svg
                  className="w-4 h-4 md:w-6 md:h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 3L13 11L21 11" strokeLinecap="round" />
                  <path d="M21 3L11 13" strokeLinecap="round" />
                  <path d="M21 13V21H3V3H11" strokeLinecap="round" />
                </svg>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-sm group-hover:blur-md transition-all duration-500 opacity-20 group-hover:opacity-30 -z-10"></div>
            </div>

            {/* Text */}
            <div className="ml-2 md:ml-3 flex flex-col">
              <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-500 font-bold text-lg md:text-xl tracking-tight">
                Urlino
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 group-hover:text-cyan-300 transition-colors duration-500 tracking-wide font-medium hidden sm:block">
                URL Mastery
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 md:gap-8">
            {/* Navigation Links */}
            <Link
              href="/"
              className="text-slate-300 hover:text-white flex items-center gap-2 group transition-all duration-300 hover:scale-105 relative"
            >
              <Home className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
              <span className="font-medium tracking-wide relative">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              href="/shortner"
              className="text-slate-300 hover:text-white flex items-center gap-2 group transition-all duration-300 hover:scale-105 relative"
            >
              <Scissors className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium tracking-wide relative">
                Shortner
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              href="/about"
              className="text-slate-300 hover:text-white flex items-center gap-2 group transition-all duration-300 hover:scale-105 relative"
            >
              <User className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
              <span className="font-medium tracking-wide relative">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              href="/features"
              className="text-slate-300 hover:text-white flex items-center gap-2 group transition-all duration-300 hover:scale-105 relative"
            >
              <Star className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium tracking-wide relative">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Dashboard Dropdown - Professional */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 flex items-center gap-2 md:gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-slate-600 hover:border-slate-500 group"
              >
                <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide text-sm md:text-base">
                  Dashboard
                </span>
                {open ? (
                  <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                ) : (
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 md:w-64 bg-slate-800/95 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden z-[60] border border-slate-600 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                  <Link
                    href="/shortner"
                    className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-300 group border-b border-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    <Scissors className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide text-sm md:text-base">
                      URL Shortner
                    </span>
                  </Link>

                  <Link
                    href="/clicks"
                    className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-300 group border-b border-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide text-sm md:text-base">
                      Links Analytics
                    </span>
                  </Link>

                  <Link
                    href="/yourlinks"
                    className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-300 group border-b border-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    <Link2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide text-sm md:text-base">
                      Your Links
                    </span>
                  </Link>

                  <Link
                    href="/qrCode-generate"
                    className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-300 group border-b border-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    <QrCode className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide text-sm md:text-base">
                      Generate QR
                    </span>
                  </Link>

                  <Link
                    href="/my-QrCode"
                    className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-300 group"
                    onClick={() => setOpen(false)}
                  >
                    <Scan className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium tracking-wide text-sm md:text-base">
                      My QR Codes
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 bg-slate-700 rounded-xl border border-slate-600 hover:bg-slate-600 hover:scale-105 transition-all duration-300 relative z-[60]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-slate-800/95 backdrop-blur-lg shadow-2xl border-t border-slate-700 z-[60]">
              <div className="flex flex-col p-4">
                {/* Mobile Navigation Links */}
                <Link
                  href="/"
                  className="flex items-center gap-3 py-4 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  href="/shortner"
                  className="flex items-center gap-3 py-4 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Scissors className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Shortner</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-3 py-4 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">About</span>
                </Link>

                <Link
                  href="/features"
                  className="flex items-center gap-3 py-4 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Features</span>
                </Link>

                {/* Mobile Dashboard Links */}
                <div className="mt-2 pt-4 border-t border-slate-700">
                  <div className="px-4 py-2 text-slate-400 text-sm font-semibold">
                    Dashboard
                  </div>

                  <Link
                    href="/shortner"
                    className="flex items-center gap-3 py-3 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Scissors className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">URL Shortner</span>
                  </Link>

                  <Link
                    href="/clicks"
                    className="flex items-center gap-3 py-3 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Links Analytics</span>
                  </Link>

                  <Link
                    href="/yourlinks"
                    className="flex items-center gap-3 py-3 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link2 className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Your Links</span>
                  </Link>

                  <Link
                    href="/qrCode-generate"
                    className="flex items-center gap-3 py-3 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <QrCode className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Generate QR</span>
                  </Link>

                  <Link
                    href="/my-QrCode"
                    className="flex items-center gap-3 py-3 px-4 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Scan className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">My QR Codes</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;