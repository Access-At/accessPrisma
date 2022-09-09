/*
  Warnings:

  - You are about to drop the column `userId` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `userGiven` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_userId_fkey`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `userId`,
    ADD COLUMN `userGiven` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userGiven_fkey` FOREIGN KEY (`userGiven`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
