"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Context from "../components/appcontext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

const Register = () => {
  const router = useRouter();
  const { setLoggedInUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const storedEmail = localStorage.getItem(email);

    if (storedEmail) {
      setErrorMessage(
        "User already exists. Please register with a different email."
      );
    } else {
      localStorage.setItem(
        email,
        JSON.stringify({
          username: email,
          movies: [],
          listName: "My personal watchlist",
        })
      );

      setLoggedInUser(email);
      router.push(`/?user=${email}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
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
          Register
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      <p className="mt-4 text-center">
        Already registered?{" "}
        <a href="/login" className="text-blue-500">
          Login
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

export default Register;
