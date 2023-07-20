/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "informacion_adicional" TEXT
);

-- CreateTable
CREATE TABLE "Pregnancies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoParto" TEXT NOT NULL,
    "termino" TEXT NOT NULL,
    "resolucion" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "evolucion" TEXT NOT NULL,
    "alimentacion" TEXT NOT NULL,
    "comentarios" TEXT NOT NULL,
    "patientHistoryId" INTEGER,
    CONSTRAINT "Pregnancies_patientHistoryId_fkey" FOREIGN KEY ("patientHistoryId") REFERENCES "PatientHistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatientHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "menarca" TEXT NOT NULL,
    "ritmo" TEXT NOT NULL,
    "ivsa" TEXT NOT NULL,
    "parejas" TEXT NOT NULL,
    "g" TEXT NOT NULL,
    "p" TEXT NOT NULL,
    "a" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "mpf" TEXT NOT NULL,
    "fum" TEXT NOT NULL,
    "fpp" TEXT NOT NULL,
    "embarazoEctopico" TEXT NOT NULL,
    "cancerFamiliar" TEXT NOT NULL,
    "dispareunia" TEXT NOT NULL,
    "tratamientoHormonal" TEXT NOT NULL,
    "dismenorrea" TEXT NOT NULL,
    "enfermedades" TEXT NOT NULL,
    "medicamentos" TEXT NOT NULL,
    "adicciones" TEXT NOT NULL,
    "alergias" TEXT NOT NULL,
    "transfusiones" TEXT NOT NULL,
    "quirurgicos" TEXT NOT NULL,
    "grupoSanguineo" TEXT NOT NULL,
    "antecedentesNoPatologicos" TEXT NOT NULL,
    "antecedesntesFamOncologicos" TEXT NOT NULL,
    CONSTRAINT "PatientHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
