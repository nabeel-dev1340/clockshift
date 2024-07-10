-- CreateTable
CREATE TABLE "Favourites" (
    "favouriteID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeZoneFrom" TEXT NOT NULL,
    "timeZoneTo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("favouriteID")
);

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
