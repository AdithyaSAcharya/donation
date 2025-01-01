"use client";
import React, { useState } from "react";
import { FiUser, FiPhone } from "react-icons/fi";

const AddMemberPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (name.trim().length < 5) {
      newErrors.name = "Name must be at least 5 characters long.";
    }

    // Phone number validation (valid Indian phone number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Indian phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Member added successfully!");
      // Reset form
      setName("");
      setPhoneNumber("");
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Add Member</h1>
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

          {/* Phone Number Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
