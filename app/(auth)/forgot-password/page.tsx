// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage("Check your email for password reset instructions");
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset your password</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className="bg-green-100 text-green-600 p-3 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded py-2 px-4 hover:bg-gray-800"
          >
            Send reset instructions
          </button>
        </form>
      </div>
    </div>
  );
}