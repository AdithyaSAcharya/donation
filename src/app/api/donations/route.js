import { NextResponse } from "next/server";
import { databases } from "@/utils/appwrite";

export async function POST(req) {
  try {
    const body = await req.json();
    const { donations } = body;

    if (!donations || donations.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No donations provided.",
        },
        { status: 400 }
      );
    }

    const databaseId = process.env.DATABASE_ID;
    const collectionId = process.env.DONATION_COLLECTION_ID;

    const donationPromises = donations.map((donation) => {
      const documentId = "unique()";
      const { memberId, member, amount } = donation;

      return databases.createDocument(
        databaseId,
        collectionId,
        documentId,
        {
          member_id: memberId, // Use memberId instead of member name
          amount: amount,
          name: member, // If you need to store the name as well
        }
      );
    });

    // Await all the promises to be resolved (i.e., insert all donations)
    await Promise.all(donationPromises);

    return NextResponse.json({
      success: true,
      message: "Donations submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting donations:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit donations",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const databaseId = process.env.DATABASE_ID;
    const collectionId = process.env.DONATION_COLLECTION_ID;

    // Fetch all donations from the database
    const response = await databases.listDocuments(databaseId, collectionId);
    const donations = response.documents;

    if (!donations || donations.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No donations found.",
        },
        { status: 404 }
      );
    }

    // Group donations by date
    const groupedDonations = donations.reduce((acc, donation) => {
      const date = new Date(donation.$createdAt).toISOString().split("T")[0]; // Extract the date (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        member_id: donation.member_id,
        amount: donation.amount,
        name: donation.name,
      });

      return acc;
    }, {});

    // Format the response to have dates as keys
    const responseObject = Object.fromEntries(
      Object.entries(groupedDonations).map(([date, donations]) => [
        date,
        { date, donations },
      ])
    );

    return NextResponse.json({
      success: true,
      data: responseObject,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch donations",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

