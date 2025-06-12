/*
  Warnings:

  - The values [UNIDAD_EJECUTORA] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_Responsables` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unidadId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('OPERADOR', 'ADMIN', 'PRESUPUESTOS');
ALTER TABLE "User" ALTER COLUMN "rol" TYPE "Role_new" USING ("rol"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_Responsables" DROP CONSTRAINT "_Responsables_A_fkey";

-- DropForeignKey
ALTER TABLE "_Responsables" DROP CONSTRAINT "_Responsables_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "unidadId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_Responsables";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "UnidadEjecutora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
