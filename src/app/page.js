"use client";

import { LucideSquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handlesubsribe = (e) => {
    e.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/subscribe", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          // alert("Subscribed Successfully")
          setMessage("Subscribed Successfully")
          setEmail("")

          setTimeout(() => {
            if (result.success) {
              setMessage("")
            }
          }, 2000);

        } else {
          alert("Subscription Failed: " + result.message)
          setEmail("")
        }
      })
      .catch((error) => console.error(error));
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
          <LucideSquareArrowOutUpRight className="inline-block w-8 h-8 mr-2 animate-bounce" />
          Welcome to URL Shortener
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto">
          Paste your long link, shorten it, and share instantly — quick and easy.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto">

        </div>
      </div>

      <form onSubmit={handlesubsribe} >
        <div>
          <input
            className="border-1  items-center rounded-3xl  px-6 my-4 h-12 w-72 sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            id="subscribe" placeholder="subscribe" type="email" value={email} name="email" onChange={handleChange} />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors  ">
            Subscribe
          </button>
        </div>
        {message && <p className="mt-4 text-green-600 flex justify-center-safe items-center-safe animate-bounce ">{message}</p>}


      </form>

    </main>
  );
}
