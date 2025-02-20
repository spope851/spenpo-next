-- CreateTable
CREATE TABLE `wp_nextauth_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `wp_nextauth_accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_nextauth_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `wp_nextauth_sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_nextauth_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `wp_nextauth_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_nextauth_verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `wp_nextauth_verification_tokens_token_key`(`token`),
    UNIQUE INDEX `wp_nextauth_verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_spenpo_products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `hide` BOOLEAN NOT NULL DEFAULT false,
    `learnMore` VARCHAR(191) NULL,
    `buyNow` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_spenpo_orders` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `metadata` JSON NULL,
    `complete` BOOLEAN NOT NULL DEFAULT false,
    `error` JSON NULL,
    `environment` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_spenpo_mandarin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `traditional` VARCHAR(191) NOT NULL,
    `simplified` VARCHAR(191) NOT NULL,
    `pinyin` VARCHAR(191) NOT NULL,
    `meaning` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_spenpo_truth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentence` VARCHAR(191) NOT NULL,
    `is_true` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wp_nextauth_accounts` ADD CONSTRAINT `wp_nextauth_accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `wp_nextauth_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wp_nextauth_sessions` ADD CONSTRAINT `wp_nextauth_sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `wp_nextauth_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wp_spenpo_orders` ADD CONSTRAINT `wp_spenpo_orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `wp_nextauth_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wp_spenpo_orders` ADD CONSTRAINT `wp_spenpo_orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `wp_spenpo_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
