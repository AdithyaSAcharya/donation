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
    const donationCollectionId = process.env.DONATION_COLLECTION_ID;
    const memberCollectionId = process.env.MEMBERS_COLLECTION_ID;

    const donationPromises = donations.map(async (donation) => {
      const documentId = "unique()";
      const { memberId, member, amount } = donation;

      // Create the donation document
      await databases.createDocument(
        databaseId,
        donationCollectionId,
        documentId,
        {
          member_id: memberId,
          amount,
          name: member,
        }
      );

      // Fetch the member document to get the current total_contributions
      const memberDocument = await databases.getDocument(
        databaseId,
        memberCollectionId,
        memberId
      );


      const currentTotal = memberDocument.total_contributions || 0;

      // Update the total_contributions for the member
      await databases.updateDocument(
        databaseId,
        memberCollectionId,
        memberId,
        {
          total_contributions: currentTotal + amount,
        }
      );

    });


    // Await all the promises to be resolved
    await Promise.all(donationPromises);

    return NextResponse.json({
      success: true,
      message: "Donations submitted successfully, and total contributions updated.",
    });
  } catch (error) {
    console.error("Error submitting donations and updating contributions:", error);

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
      return NextResponse.json({
        success: true,
        data: {}, // Return an empty object to indicate no donations
        message: "No donations found.",
      });
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

