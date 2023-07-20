-- CreateTable
CREATE TABLE "Study" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "vulva_vagina" TEXT NOT NULL,
    "colposcopia" TEXT NOT NULL,
    "cervix" TEXT NOT NULL,
    "zonaTransformacion" TEXT NOT NULL,
    "epitelioAcetoblanco" TEXT NOT NULL,
    "bordes" TEXT NOT NULL,
    "superficie" TEXT NOT NULL,
    "pruebaSchiller" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "diagnosticoColposcopico" TEXT NOT NULL,
    "otras" TEXT NOT NULL,
    "planAccion" TEXT NOT NULL,
    CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
