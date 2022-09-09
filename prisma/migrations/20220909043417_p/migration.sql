/*
  Warnings:

  - Added the required column `updateAt` to the `CommentShowCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `CommentThread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `LikeShowCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `LikeThread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `SaveShowCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `SaveThread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `ViewShowcase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CommentShowCase` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `CommentThread` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `LikeShowCase` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `LikeThread` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `SaveShowCase` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `SaveThread` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ViewShowcase` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
