"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Page() {
  const [MyLinks, setMyLinks] = useState([])
  const [copied, setCopied] = useState(false)
  const Ref = useRef(null)

  useEffect(() => {
    const StoredLinks = JSON.parse(localStorage.getItem("links")) || []
    if (StoredLinks) setMyLinks(StoredLinks)
  }, [])

  const handleCopy = () => {
    if (Ref.current) {
      navigator.clipboard.writeText(Ref.current.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const domain = process.env.NEXT_PUBLIC_URL

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Your Shortened URL</h1>
        <p className="text-gray-400 max-w-md mt-2">
          Copy the short link and share it anywhere.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md bg-gray-800 p-5 rounded-xl shadow-lg">
        <input
          ref={Ref}
          type="text"
          readOnly
          value={`${domain}/${MyLinks.length > 0 ? MyLinks[MyLinks.length - 1].shortUrl : ''}`}
          className="p-3 rounded bg-gray-700 border border-gray-600 w-full tracking-wide"
        />

        <button
          onClick={handleCopy}
          className="bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-gray-300 text-sm text-center mt-2">
        Original URL:{' '}
        <Link
          href={`/${MyLinks.length > 0 ? MyLinks[MyLinks.length - 1].url : ''}`}
          className="text-blue-400 underline hover:text-blue-500"
        >
          {MyLinks.length > 0 ? MyLinks[MyLinks.length - 1].url : 'No URL found'}
        </Link>
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
        <Link href="#">
          <button className="bg-purple-600 py-2 rounded-lg hover:bg-purple-700 transition font-semibold">
            Total Clicks
          </button>
        </Link>

        <Link href="/shortner">
          <button className="bg-green-600 py-2 rounded-lg hover:bg-green-700 transition font-semibold">
            Short Another URL
          </button>
        </Link>
      </div>
    </div>
  )
}