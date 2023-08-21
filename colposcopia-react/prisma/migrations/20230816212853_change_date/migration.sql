/*
  Warnings:

  - You are about to alter the column `start` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" DATETIME NOT NULL
);
INSERT INTO "new_Schedule" ("id", "start", "title") SELECT "id", "start", "title" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
