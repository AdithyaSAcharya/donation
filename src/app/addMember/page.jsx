"use client";
import React, { useState } from "react";
import { FiUser, FiPhone } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";


const AddMemberPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (name.trim().length < 5) {
      newErrors.name = "Name must be at least 5 characters long.";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Indian phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading
      setResponseMessage(""); // Reset response message

      try {
        const res = await fetch("/api/members", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber,
            initialAmount
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setNotificationType("success");
          setResponseMessage("Member added successfully!");
          setName(""); // Reset form fields
          setPhoneNumber("");
          setInitialAmount(0);
        } else {
          setNotificationType("error");
          setResponseMessage(data.message || "Failed to add member.");
        }
      } catch (error) {
        setNotificationType("error");
        setResponseMessage("An error occurred while adding the member.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Add Member
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Name
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <FiUser className="text-slate-400 absolute left-3" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  errors.name ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter member's name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <FiPhone className="text-slate-400 absolute left-3" />
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  errors.phoneNumber ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter member's phone number"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="intialAmount"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Inital Amount
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <FaRupeeSign className="text-slate-400 absolute left-3" />
              <input
                id="initialAmount"
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className={`w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  errors.name ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter inital amount"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-600 hover:bg-slate-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Member"}
          </button>
        </form>

        {/* Notification */}
        {responseMessage && (
          <div
            className={`mt-4 p-3 rounded-md ${
              notificationType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMemberPage;

