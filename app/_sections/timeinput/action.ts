"use server";
import prisma from "@/db/db";

export const saveFavourite = async (
  timeZoneFrom: string,
  timeZoneTo: string,
  name: string,
  email: string
) => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      console.log("User not found.");
      return;
    }

    // Save favourite with userId
    const saveFavourite = await prisma.favourites.create({
      data: {
        name,
        timeZoneFrom,
        timeZoneTo,
        userId: user.id, // Assuming `userId` is the correct field in your favourites table
      },
    });

    console.log("Favourite Saved.");
  } catch (error) {
    console.log("Failed to add favourite.", error);
  }
};
