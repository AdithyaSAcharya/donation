"use client";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const members = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Daniel Brown" },
  { id: 6, name: "Samantha Green" },
  { id: 7, name: "Olivia White" },
  { id: 8, name: "James Taylor" },
];

const donationAmounts = [50, 100, 150, 200];

const AddDonationPage = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddDonation = () => {
    if (selectedMember && selectedAmount) {
      if (isEditing) {
        // Update the existing donation
        setDonations((prevDonations) =>
          prevDonations.map((donation, index) =>
            index === editIndex
              ? { member: selectedMember, amount: selectedAmount }
              : donation
          )
        );
        setIsEditing(false); // Reset editing state
      } else {
        // Add new donation
        setDonations((prevDonations) => [
          ...prevDonations,
          { member: selectedMember, amount: selectedAmount },
        ]);
      }

      // Reset form
      setSelectedMember("");
      setSelectedAmount(50);
    }
  };

  const handleEditDonation = (index) => {
    setSelectedMember(donations[index].member);
    setSelectedAmount(donations[index].amount);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="p-8">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          {isEditing ? "Edit Donation" : "Add Donation"}
        </h1>

        {/* Donation Form */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">Select Member</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full mt-2 p-2 border border-slate-300 rounded-lg"
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option
                key={member.id}
                value={member.name}
                disabled={donations.some((donation) => donation.member === member.name)}
              >
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">Donation Amount</label>
          <select
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="w-full mt-2 p-2 border border-slate-300 rounded-lg"
          >
            {donationAmounts.map((amount) => (
              <option key={amount} value={amount}>
                ₹{amount}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddDonation}
          className="w-full mt-4 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-700 transition duration-300"
        >
          {isEditing ? "Update Donation" : "Add Donation"}
        </button>
      </div>

      {/* Donation List Section */}
      {donations.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-white shadow-md rounded-lg p-6 mx-auto">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Donations Made:</h2>
          <div className="h-64 overflow-y-auto">
            <ul className="space-y-2">
              {donations.map((donation, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span className="flex-1">{donation.member}</span>
                  <span className="flex-none">₹{donation.amount}</span>
                  <button
                    onClick={() => handleEditDonation(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDonationPage;
