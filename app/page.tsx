"use client";

import React, { useState, useTransition } from "react";

import axios from "axios";
import Form from "next/form";
import Image from "next/image";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        // setLoading(true);
        const res = await axios.post("/api/link", {
          longUrl: formData.get("url"),
        });
        console.log("res ->");

        console.log(res.data.message);

        setShortUrl(
          `${process.env.NEXT_PUBLIC_BASE_URL}/short/${res.data.shortUrl}`
        );
        setError("");
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        // setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center  font-mono sm:py-12 text-zinc-50">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4  sm:text-lg sm:leading-7">
                <div className="flex items-center mb-8">
                  <Image
                    src={"/favicon.ico"}
                    width={50}
                    height={50}
                    alt="icon"
                  />
                  <h1 className="text-2xl font-bold text-center flex-1 ">
                    URL Shortener
                  </h1>
                </div>
                <Form action={handleSubmit} className="space-y-4">
                  <input
                    type="url"
                    name="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter your URL"
                    required
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                  {isPending ? (
                    <button className="w-full bg-yellow-900  py-2 px-4 rounded-md hover:bg-yellow-900">
                      Shortening...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-600">
                      Shorten URL
                    </button>
                  )}
                </Form>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {shortUrl && (
                  <div className="mt-4">
                    <p className="font-semibold">Your shortened URL:</p>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 break-all">
                      {shortUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
