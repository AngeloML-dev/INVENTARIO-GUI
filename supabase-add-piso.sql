-- Agregar campo piso a la tabla equipo
ALTER TABLE equipo ADD COLUMN IF NOT EXISTS piso TEXT;

-- Verificar que se agregó correctamente
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'equipo'
AND column_name IN ('piso', 'descripcion')
ORDER BY column_name;
