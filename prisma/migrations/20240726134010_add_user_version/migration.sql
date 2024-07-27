/*
  Warnings:

  - You are about to drop the `Premium` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `version` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Premium_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Premium";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "version" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "password", "userId", "userName") SELECT "email", "password", "userId", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
