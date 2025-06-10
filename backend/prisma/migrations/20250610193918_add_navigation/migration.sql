-- CreateTable
CREATE TABLE "Navigation" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "path" TEXT,
    "icon" TEXT,
    "estado" "U_estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Navigation_pkey" PRIMARY KEY ("id")
);
