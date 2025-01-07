"use client";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Loader from "../component/Loader";
import withAuth from "../component/WithAuth";

const donationAmounts = [50, 100, 150, 200];

const AddDonationPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch members.");
        }

        const data = await response.json();
        setMembers(data?.data || []); // Adjust to match your API's response structure
      } catch (error) {
        setError(error.message || "An error occurred while fetching members.");
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  const handleAddDonation = () => {
    if (selectedMember && selectedAmount) {
      const member = members.find((m) => m.name === selectedMember);
      const memberId = member?.$id; // Assuming the API response includes `$id` for member.

      if (isEditing) {
        // Update the existing donation
        setDonations((prevDonations) =>
          prevDonations.map((donation, index) =>
            index === editIndex
              ? { memberId, member: selectedMember, amount: selectedAmount }
              : donation
          )
        );
        setIsEditing(false); // Reset editing state
      } else {
        // Add new donation
        setDonations((prevDonations) => [
          ...prevDonations,
          { memberId, member: selectedMember, amount: selectedAmount },
        ]);
      }

      // Reset form
      setSelectedMember("");
      setSelectedAmount(50);
    }
  };

  const handleSubmitDonationData = async () => {
    setLoadingSubmit(true);
    const donationData = donations.map((donation) => ({
      memberId: members.find((member) => member.name === donation.member)?.$id,
      member: donation.member,
      amount: donation.amount,
    }));

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donations: donationData }), // Pass the donations array
      });

      const result = await response.json();

      if (result.success) {
        setNotification({ type: "success", message: "Donations submitted successfully!" });
        setDonations([]); // Clear the donations list on success
      } else {
        setNotification({ type: "error", message: result.message || "Failed to submit donations." });
      }
    } catch (error) {
      console.error("Error submitting donations:", error);
      setNotification({ type: "error", message: "An error occurred while submitting donations." });
    } finally {
      setLoadingSubmit(false);
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
          {loadingMembers ? (
            <div className="text-sm text-gray-600 mt-2"><Loader /></div>
          ) : error ? (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          ) : (
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full mt-2 p-2 border border-slate-300 rounded-lg"
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option
                  key={member.$id} // Assuming API returns a unique `$id`
                  value={member.name}
                  disabled={donations.some((donation) => donation.member === member.name)}
                >
                  {member.name}
                </option>
              ))}
            </select>
          )}
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

      {/* Notification */}
      {notification && (
        <div
          className={`mt-4 w-full max-w-lg mx-auto p-4 text-white rounded-lg ${
            notification.type === "success" ? "bg-green-100 text-green-500"  : "bg-red-100 text-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

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
          <button
            onClick={handleSubmitDonationData}
            className="w-full mt-4 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-700 transition duration-300"
            disabled={loadingSubmit} // Disable button while loading
          >
            {loadingSubmit ? <Loader /> : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(AddDonationPage);
