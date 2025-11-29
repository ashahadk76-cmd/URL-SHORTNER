"use client"

import React, { useState, useEffect } from 'react'
import { LoaderCircle , CreditCard,PoundSterling } from 'lucide-react'
import { useRouter } from 'next/navigation'

const page = () => {
    const [orignalUrl, setOrignalUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [Loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "orignalUrl": orignalUrl,
            "shortUrl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setLoading(false)
                    setOrignalUrl("")
                    setShortUrl("")
                    // alert(result.message);
                    const newLink = {orignalUrl:orignalUrl,shortUrl:shortUrl}
                    const existingLinks = JSON.parse(localStorage.getItem("links")) || [];
                    const alreadyExists = existingLinks.find(link => link.shortUrl === shortUrl);
                    if(!alreadyExists){
                        existingLinks.push(newLink)
                        localStorage.setItem("links",JSON.stringify(existingLinks))
                    }
                   router.push(`/shortner/your-shortUrl`)
                   

                } else {
                    setLoading(false)
                    alert(result.message);
                }
                console.log(result)
            })

            .catch((error) =>
                console.error(error));


    }


    return (
        <div>
            <form onSubmit={handleSubmit}   className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    <CreditCard className="inline-block w-6 h-6 mr-2 text-blue-500 animate-bounce" />
                    Create a Short URL</h2>
                <div className="mb-4">
                    <label htmlFor="orignalUrl" className="block text-gray-700 font-semibold mb-2">Original URL</label>
                    <input onChange={(e) => setOrignalUrl(e.target.value)}   value={orignalUrl} type="url" id="orignalUrl" name="orignalUrl" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="shortUrl" className="block text-gray-700 font-semibold mb-2">Custom Short URL</label>
                    <input onChange={(e) => setShortUrl(e.target.value)}  value={shortUrl}  type="text" id="shortUrl" name="shortUrl" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    {Loading ? (
                        <>
                            <LoaderCircle className='animate-spin w-3 h-3' />
                            <p className='animate-pulse'>
                                <PoundSterling className='inline-block w-4 h-4 mr-2 ' />
                                generating</p>
                        </>
                    ) : (
                        "Generate Short URL"
                    )}

                </button>
            </form>
        </div>
    )
}

export default page
