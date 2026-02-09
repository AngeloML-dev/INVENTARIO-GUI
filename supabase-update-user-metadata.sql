-- Script para actualizar el display_name de un usuario existente
-- Reemplaza 'TU NOMBRE AQUÍ' con el nombre que quieras mostrar

UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{display_name}',
  '"Marc Lozano"'::jsonb
)
WHERE email = 'marc.lozano@adexperu.edu.pe';

-- Verificar el cambio
SELECT 
  email,
  raw_user_meta_data->>'display_name' as display_name
FROM auth.users
WHERE email = 'marc.lozano@adexperu.edu.pe';
