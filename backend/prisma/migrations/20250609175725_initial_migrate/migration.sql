-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UNIDAD_EJECUTORA', 'PRESUPUESTOS');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('PENDIENTE', 'VALIDADO', 'RECHAZADO', 'HISTORICO', 'ELIMINADO', 'ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "U_estado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" "Role" NOT NULL,
    "estado" "U_estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnidadEjecutora" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "U_estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnidadEjecutora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presupuesto" (
    "id" TEXT NOT NULL,
    "mes" TIMESTAMP(3) NOT NULL,
    "codigoObjetoGasto" TEXT NOT NULL,
    "objetoGasto" TEXT NOT NULL,
    "presupuestoVigente" DECIMAL(65,30) NOT NULL,
    "devengado" DECIMAL(65,30) NOT NULL,
    "porcentajeEjecucion" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "motivoRechazo" TEXT,
    "unidadId" TEXT NOT NULL,
    "creadoPorId" TEXT NOT NULL,

    CONSTRAINT "Presupuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialCambio" (
    "id" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "detalle" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "presupuestoId" TEXT,
    "unidadId" TEXT,

    CONSTRAINT "HistorialCambio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Responsables" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Responsables_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ci_key" ON "User"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UnidadEjecutora_codigo_key" ON "UnidadEjecutora"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Presupuesto_unidadId_codigoObjetoGasto_mes_key" ON "Presupuesto"("unidadId", "codigoObjetoGasto", "mes");

-- CreateIndex
CREATE INDEX "_Responsables_B_index" ON "_Responsables"("B");

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "UnidadEjecutora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCambio" ADD CONSTRAINT "HistorialCambio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCambio" ADD CONSTRAINT "HistorialCambio_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "Presupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCambio" ADD CONSTRAINT "HistorialCambio_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "UnidadEjecutora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Responsables" ADD CONSTRAINT "_Responsables_A_fkey" FOREIGN KEY ("A") REFERENCES "UnidadEjecutora"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Responsables" ADD CONSTRAINT "_Responsables_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
