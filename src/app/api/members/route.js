import { NextResponse } from "next/server";
import { databases } from "@/utils/appwrite";

export async function GET() {
  try {
    const databaseId = process.env.DATABASE_ID 
    const collectionId =process.env.MEMBERS_COLLECTION_ID

    const response = await databases.listDocuments(databaseId, collectionId);

    return NextResponse.json({
      success: true,
      message: "Members fetched successfully",
      data: response.documents,
    });
  } catch (error) {
    console.error("Error fetching members:", error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch members",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    try {
      const body = await req.json();
      const { name, phoneNumber,initialAmount } = body;
  
      if (!name || !phoneNumber) {
        return NextResponse.json(
          {
            success: false,
            message: "Name and phone number are required to add a member.",
          },
          { status: 400 }
        );
      }
  
      const databaseId = process.env.DATABASE_ID;
      const collectionId = process.env.MEMBERS_COLLECTION_ID;
  
      const documentId = "unique()";
  
      const totalContributions = initialAmount ? parseFloat(initialAmount) : 0.0;
  
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        documentId,
        { name, phoneNumber, total_contributions: totalContributions }
      );
  
      return NextResponse.json({
        success: true,
        message: "Member added successfully",
        data: response,
      });
    } catch (error) {
      console.error("Error adding member:", error);
  
      return NextResponse.json(
        {
          success: false,
          message: "Failed to add member",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }