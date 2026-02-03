-- Verificar si RLS está habilitado
SELECT tablename, rowlevelsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Si RLS está habilitado, crear políticas para permitir acceso público
-- Para ambiente
DROP POLICY IF EXISTS "Permitir lectura pública ambiente" ON ambiente;
CREATE POLICY "Permitir lectura pública ambiente" ON ambiente
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserción autenticada ambiente" ON ambiente;
CREATE POLICY "Permitir inserción autenticada ambiente" ON ambiente
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualización autenticada ambiente" ON ambiente;
CREATE POLICY "Permitir actualización autenticada ambiente" ON ambiente
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir eliminación autenticada ambiente" ON ambiente;
CREATE POLICY "Permitir eliminación autenticada ambiente" ON ambiente
  FOR DELETE USING (true);

-- Para equipo
DROP POLICY IF EXISTS "Permitir lectura pública equipo" ON equipo;
CREATE POLICY "Permitir lectura pública equipo" ON equipo
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserción autenticada equipo" ON equipo;
CREATE POLICY "Permitir inserción autenticada equipo" ON equipo
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualización autenticada equipo" ON equipo;
CREATE POLICY "Permitir actualización autenticada equipo" ON equipo
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir eliminación autenticada equipo" ON equipo;
CREATE POLICY "Permitir eliminación autenticada equipo" ON equipo
  FOR DELETE USING (true);
