"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const storedEmail = localStorage.getItem(email);

    if (storedEmail) {
      router.push(`/?user=${email}`);
    } else {
      setErrorMessage("User not found.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          className="border-gray-300 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md font-bold text-white"
        >
          Login
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      <p className="mt-4 text-center">
        Don`t have an account?{" "}
        <a href="/register" className="text-blue-500">
          Register
        </a>{" "}
        or browse as a{" "}
        <a href="/" className="text-blue-500">
          guest
        </a>
        .
      </p>
    </div>
  );
};

export default Login;
