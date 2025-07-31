/*
  Warnings:

  - You are about to drop the column `result` on the `history` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "uploadedCvUri" TEXT NOT NULL,
    "parsedTextUri" TEXT,
    "analysisResult" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_history" ("analysisResult", "createdAt", "id", "parsedTextUri", "updatedAt", "uploadedCvUri", "userId") SELECT "analysisResult", "createdAt", "id", "parsedTextUri", "updatedAt", "uploadedCvUri", "userId" FROM "history";
DROP TABLE "history";
ALTER TABLE "new_history" RENAME TO "history";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
