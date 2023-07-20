/*
  Warnings:

  - Added the required column `fecha_nacimiento` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "fecha_nacimiento" TEXT NOT NULL,
    "informacion_adicional" TEXT
);
INSERT INTO "new_Patient" ("contacto", "id", "informacion_adicional", "nombre", "sexo") SELECT "contacto", "id", "informacion_adicional", "nombre", "sexo" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
