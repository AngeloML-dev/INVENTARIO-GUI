-- BORRAR TODAS LAS TABLAS EXISTENTES
DROP TABLE IF EXISTS equipos CASCADE;
DROP TABLE IF EXISTS ambientes CASCADE;

-- CREAR TABLA AMBIENTES
CREATE TABLE ambientes (
  id SERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  ubicacion TEXT NOT NULL
);

-- CREAR TABLA EQUIPOS
CREATE TABLE equipos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  estado TEXT NOT NULL,
  ambiente_id INTEGER REFERENCES ambientes(id)
);

-- HABILITAR RLS (SEGURIDAD)
ALTER TABLE ambientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipos ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO
CREATE POLICY "Permitir leer ambientes" ON ambientes FOR SELECT USING (true);
CREATE POLICY "Permitir leer equipos con ambientes" ON equipos FOR SELECT USING (true);
CREATE POLICY "Permitir insertar equipos" ON equipos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar equipos" ON equipos FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminar equipos" ON equipos FOR DELETE USING (true);

-- INSERTAR DATOS DE EJEMPLO
INSERT INTO ambientes (codigo, nombre, ubicacion) VALUES
('A001', 'Aula 101', 'Edificio A - Piso 1'),
('A002', 'Laboratorio Computo', 'Edificio A - Piso 2'),
('B001', 'Sala Reuniones', 'Edificio B - Piso 1');

INSERT INTO equipos (nombre, marca, modelo, estado, ambiente_id) VALUES
('Computadora Dell', 'Dell', 'Optiplex 7000', 'Bueno', 1),
('Proyector Epson', 'Epson', 'S41', 'Nuevo', 2);
