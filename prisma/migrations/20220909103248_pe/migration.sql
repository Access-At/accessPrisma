-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_showId_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_threadId_fkey`;

-- AlterTable
ALTER TABLE `Notifications` MODIFY `threadId` VARCHAR(191) NULL,
    MODIFY `showId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_showId_fkey` FOREIGN KEY (`showId`) REFERENCES `ShowCase`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
