-- CreateTable
CREATE TABLE `ImageShowcase` (
    `id` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `showcaseId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageShowcase` ADD CONSTRAINT `ImageShowcase_showcaseId_fkey` FOREIGN KEY (`showcaseId`) REFERENCES `ShowCase`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
