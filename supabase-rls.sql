-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'equipo';

-- Eliminar políticas si existen y crear nuevas
DROP POLICY IF EXISTS "Permitir leer equipos" ON equipo;
CREATE POLICY "Permitir leer equipos" ON equipo FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insertar equipos" ON equipo;
CREATE POLICY "Permitir insertar equipos" ON equipo FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir actualizar equipos" ON equipo;
CREATE POLICY "Permitir actualizar equipos" ON equipo FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Permitir eliminar equipos" ON equipo;
CREATE POLICY "Permitir eliminar equipos" ON equipo FOR DELETE USING (true);

-- Lo mismo para ambiente
DROP POLICY IF EXISTS "Permitir leer ambientes" ON ambiente;
CREATE POLICY "Permitir leer ambientes" ON ambiente FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insertar ambientes" ON ambiente;
CREATE POLICY "Permitir insertar ambientes" ON ambiente FOR INSERT WITH CHECK (true);
