/*
  Warnings:

  - You are about to drop the column `views` on the `showcase` table. All the data in the column will be lost.
  - You are about to drop the `threadview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `threadview` DROP FOREIGN KEY `ThreadView_threadId_fkey`;

-- DropForeignKey
ALTER TABLE `threadview` DROP FOREIGN KEY `ThreadView_userId_fkey`;

-- AlterTable
ALTER TABLE `showcase` DROP COLUMN `views`;

-- DropTable
DROP TABLE `threadview`;

-- CreateTable
CREATE TABLE `ViewThread` (
    `id` VARCHAR(191) NOT NULL,
    `threadId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViewShowcase` (
    `id` VARCHAR(191) NOT NULL,
    `showcaseId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ViewThread` ADD CONSTRAINT `ViewThread_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewThread` ADD CONSTRAINT `ViewThread_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewShowcase` ADD CONSTRAINT `ViewShowcase_showcaseId_fkey` FOREIGN KEY (`showcaseId`) REFERENCES `ShowCase`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewShowcase` ADD CONSTRAINT `ViewShowcase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
