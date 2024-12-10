"use client";

import React, { useState } from "react";

import axios from "axios";
import Form from "next/form";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-8 text-center">
                  URL Shortener
                </h1>
                <Form action={handleSubmit} className="space-y-4">
                  <input
                    type="url"
                    name="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter your URL"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {loading ? (
                    <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-900">
                      Shortening...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
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
