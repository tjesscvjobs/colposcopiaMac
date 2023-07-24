-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Study" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "vulva_vagina" TEXT,
    "colposcopia" TEXT,
    "cervix" TEXT,
    "zonaTransformacion" TEXT,
    "epitelioAcetoblanco" TEXT,
    "bordes" TEXT,
    "superficie" TEXT,
    "pruebaSchiller" TEXT,
    "observaciones" TEXT,
    "diagnosticoColposcopico" TEXT,
    "otras" TEXT,
    "planAccion" TEXT,
    CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Study" ("bordes", "cervix", "colposcopia", "diagnosticoColposcopico", "epitelioAcetoblanco", "fecha", "id", "observaciones", "otras", "patientId", "planAccion", "pruebaSchiller", "superficie", "vulva_vagina", "zonaTransformacion") SELECT "bordes", "cervix", "colposcopia", "diagnosticoColposcopico", "epitelioAcetoblanco", "fecha", "id", "observaciones", "otras", "patientId", "planAccion", "pruebaSchiller", "superficie", "vulva_vagina", "zonaTransformacion" FROM "Study";
DROP TABLE "Study";
ALTER TABLE "new_Study" RENAME TO "Study";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
