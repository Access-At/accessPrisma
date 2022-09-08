/*
  Warnings:

  - You are about to drop the column `slug` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Thread` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Thread_slug_key` ON `Thread`;

-- AlterTable
ALTER TABLE `Thread` DROP COLUMN `slug`,
    DROP COLUMN `title`,
    DROP COLUMN `views`;

-- CreateTable
CREATE TABLE `ThreadView` (
    `id` VARCHAR(191) NOT NULL,
    `threadId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ThreadView` ADD CONSTRAINT `ThreadView_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThreadView` ADD CONSTRAINT `ThreadView_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
