/*
  Warnings:

  - You are about to drop the column `userGiven` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `userNotif` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_userGiven_fkey`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `userGiven`,
    ADD COLUMN `userNotif` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userNotif_fkey` FOREIGN KEY (`userNotif`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
