-- AlterTable
ALTER TABLE `order` ADD COLUMN `addressId` VARCHAR(191) NULL,
    ADD COLUMN `deliveryCity` VARCHAR(191) NULL,
    ADD COLUMN `deliveryComplement` VARCHAR(191) NULL,
    ADD COLUMN `deliveryNeighborhood` VARCHAR(191) NULL,
    ADD COLUMN `deliveryNumber` VARCHAR(191) NULL,
    ADD COLUMN `deliveryPhone` VARCHAR(191) NULL,
    ADD COLUMN `deliveryState` VARCHAR(191) NULL,
    ADD COLUMN `deliveryStreet` VARCHAR(191) NULL,
    ADD COLUMN `deliveryZipCode` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NULL,
    ADD COLUMN `number` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `street` VARCHAR(191) NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
