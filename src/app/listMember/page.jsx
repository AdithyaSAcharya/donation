"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaMoneyBillWave } from "react-icons/fa";
import Loader from "../component/Loader";

const START_DATE = "2024-10-03"; // Start date of donations
const WEEKLY_AMOUNT = 50; // Weekly contribution in rupees

const ListMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const calculateCurrentAmount = () => {
      const localStorageKey = "currentAmount";
      const cachedData = localStorage.getItem(localStorageKey);
  
      // Use cached data if available
      if (cachedData) {
        setCurrentAmount(JSON.parse(cachedData));
        return;
      }
  
      const today = new Date();
      const startDate = new Date(START_DATE);
  
      // Align the start date to the nearest Thursday (if not already)
      let currentThursday = new Date(startDate);
      if (startDate.getDay() !== 4) {
        const daysToNextThursday = (4 - startDate.getDay() + 7) % 7;
        currentThursday.setDate(currentThursday.getDate() + daysToNextThursday);
      }
  
      // Count all Thursdays including and after the aligned start date
      let thursdayCount = 0;
      while (currentThursday <= today) {
        thursdayCount++;
        currentThursday.setDate(currentThursday.getDate() + 7); // Move to the next Thursday
      }
  
      console.log("Thursday Count:", thursdayCount);
  
      // Calculate the total amount
      const totalAmount = thursdayCount * WEEKLY_AMOUNT;
  
      // Save to localStorage and set state
      localStorage.setItem(localStorageKey, JSON.stringify(totalAmount));
      setCurrentAmount(totalAmount);
    };
  
    calculateCurrentAmount();
  }, []);
  
  

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

  const getDueMessage = (totalContributions) => {
    const dueAmount = currentAmount - (totalContributions || 0);

    if (dueAmount <= 0) {
      return (
        <span className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" /> No dues
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-red-600">
          <FaExclamationCircle className="mr-2" /> Due amount: ₹{dueAmount}
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
            <div className="ml-4 text-gray-600">
              <Loader />
            </div>
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
                <h2 className="text-xl font-medium text-gray-800">{member.name}</h2>
                <p className="text-gray-600 mt-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-gray-700" />
                  <span className="font-semibold text-gray-700">
                    Total Contributions:
                  </span>{" "}
                  ₹{member.total_contributions?.toLocaleString() || 0}
                </p>
                <p className="mt-2">{getDueMessage(member.total_contributions || 0)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMembersPage;
