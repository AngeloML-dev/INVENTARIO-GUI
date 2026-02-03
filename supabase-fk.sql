-- Crear foreign key entre equipos y ambientes
-- La foreign key permite que Supabase sepa cómo relacionar las tablas

-- Verificar si la columna ambiente_id existe en la tabla equipos
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'equipos'
AND column_name = 'ambiente_id';

-- Si la columna ya existe, crear la foreign key:
ALTER TABLE equipos
ADD CONSTRAINT fk_equipos_ambientes
FOREIGN KEY (ambiente_id)
REFERENCES ambientes(id);

-- Habilitar Row Level Security
ALTER TABLE equipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambientes ENABLE ROW LEVEL SECURITY;

-- Crear políticas de acceso
CREATE POLICY "Permitir leer equipos con ambientes" ON equipos
  FOR SELECT USING (true);

CREATE POLICY "Permitir leer ambientes" ON ambientes
  FOR SELECT USING (true);
