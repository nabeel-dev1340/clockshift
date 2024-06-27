"use server";
import prisma from "@/db/db";

export const getFavourites = async (email: string) => {
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

    // Find favourites by userId
    const favourites = await prisma.favourites.findMany({
      where: { userId: user.id },
    });

    return favourites;
  } catch (error) {
    console.log("Failed to get favourites.", error);
  }
};
