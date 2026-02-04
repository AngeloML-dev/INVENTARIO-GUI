-- Agregar campo descripcion a la tabla equipos
ALTER TABLE equipos ADD COLUMN IF NOT EXISTS descripcion TEXT;

-- Verificar que el campo se agregó
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'equipos'
ORDER BY ordinal_position;
