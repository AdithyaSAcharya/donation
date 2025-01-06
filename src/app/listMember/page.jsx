"use client";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaCheckCircle, FaExclamationCircle, FaMoneyBillWave } from "react-icons/fa";
import Loader from "../component/Loader";
const BASE_AMOUNT = 200;

const ListMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setMembers(data?.data || []);
      } catch (error) {
        setError(error.message || "An error occurred while fetching members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getContributionMessage = (totalContributions) => {
    if (totalContributions >= BASE_AMOUNT) {
      return (
        <span className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" /> Exceeds the base amount by ₹
          {totalContributions - BASE_AMOUNT}
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-red-600">
          <FaExclamationCircle className="mr-2" /> Due amount: ₹
          {BASE_AMOUNT - totalContributions}
        </span>
      );
    }
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          List of Members
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="ml-4 text-gray-600"><Loader /></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : members.length === 0 ? (
          <p className="text-center text-gray-600">No members found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.$id}
                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-medium text-gray-800">
                  {member.name}
                </h2>
                <p className="text-gray-600 mt-2 flex items-center">
                  <FaPhoneAlt className="mr-2 text-gray-700" />
                  <span className="font-semibold text-gray-700">
                    Phone Number:
                  </span>{" "}
                  {member.phoneNumber}
                </p>
                <p className="text-gray-600 mt-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-gray-700" />
                  <span className="font-semibold text-gray-700">
                    Total Contributions:
                  </span>{" "}
                  ₹{member.total_contributions?.toLocaleString() || 0}
                </p>
                <p className="mt-2">{getContributionMessage(member.total_contributions || 0)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMembersPage;
