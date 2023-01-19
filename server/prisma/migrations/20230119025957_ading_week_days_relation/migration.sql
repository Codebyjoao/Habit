/*
  Warnings:

  - Added the required column `habitId` to the `habit_weekdays` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit_weekdays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "habitId" TEXT NOT NULL,
    CONSTRAINT "habit_weekdays_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit_weekdays" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "habit_weekdays";
DROP TABLE "habit_weekdays";
ALTER TABLE "new_habit_weekdays" RENAME TO "habit_weekdays";
CREATE UNIQUE INDEX "habit_weekdays_habit_id_week_day_key" ON "habit_weekdays"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
