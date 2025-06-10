/*
  Warnings:

  - You are about to drop the `Navigation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Navigation";

-- CreateTable
CREATE TABLE "U_navigation" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "path" TEXT,
    "icon" TEXT,
    "estado" "U_estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "U_navigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermisosNavigation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermisosNavigation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PermisosNavigation_B_index" ON "_PermisosNavigation"("B");

-- AddForeignKey
ALTER TABLE "_PermisosNavigation" ADD CONSTRAINT "_PermisosNavigation_A_fkey" FOREIGN KEY ("A") REFERENCES "U_navigation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisosNavigation" ADD CONSTRAINT "_PermisosNavigation_B_fkey" FOREIGN KEY ("B") REFERENCES "U_permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
