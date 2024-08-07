/*
  Warnings:

  - Made the column `deadline` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "taskId" TEXT NOT NULL PRIMARY KEY,
    "taskDescription" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Incomplete',
    "order" INTEGER NOT NULL,
    "deadline" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("categoryId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("categoryId", "createdAt", "deadline", "order", "status", "taskDescription", "taskId", "updatedAt") SELECT "categoryId", "createdAt", "deadline", "order", "status", "taskDescription", "taskId", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "userImage" TEXT,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "version" TEXT NOT NULL DEFAULT 'Free',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "password", "updatedAt", "userId", "userImage", "userName", "version") SELECT "createdAt", "email", "password", "updatedAt", "userId", "userImage", "userName", "version" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
