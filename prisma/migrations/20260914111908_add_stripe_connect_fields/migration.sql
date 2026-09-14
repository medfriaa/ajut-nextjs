-- AlterTable
ALTER TABLE "ProviderProfile" ADD COLUMN     "stripeAccountId" TEXT,
ADD COLUMN     "stripeOnboarded" BOOLEAN NOT NULL DEFAULT false;
