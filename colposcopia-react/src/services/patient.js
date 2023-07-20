import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports = {
  newPatient: async function (data) {
    const result = await prisma.patient.create({
      data: data
    });
    return result
  },
};
