-- CreateTable
CREATE TABLE "U_permisos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "U_estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "U_permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermisosUsuarios" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermisosUsuarios_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PermisosUsuarios_B_index" ON "_PermisosUsuarios"("B");

-- AddForeignKey
ALTER TABLE "_PermisosUsuarios" ADD CONSTRAINT "_PermisosUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "U_permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisosUsuarios" ADD CONSTRAINT "_PermisosUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
