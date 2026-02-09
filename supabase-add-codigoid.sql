-- Agregar columna codigoid a la tabla equipo
ALTER TABLE equipo ADD COLUMN IF NOT EXISTS codigoid TEXT;

-- Crear índice único (permitirá valores NULL duplicados)
CREATE UNIQUE INDEX IF NOT EXISTS idx_equipo_codigoid ON equipo(codigoid) WHERE codigoid IS NOT NULL;
