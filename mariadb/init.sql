CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Ingreso',
    status VARCHAR(50) DEFAULT 'Activo',
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified_user VARCHAR(100) DEFAULT 'admin'
);

INSERT INTO courses (title, description, category, status, last_modified, last_modified_user) VALUES 
('Curso QA', 'Curso de Quality Assurance.', 'Categoría Curso QA', 'Activo', '2026-01-28 10:34:00', 'jantonio'),
('Curso de Ingreso a Guardia Civil ...', 'Preparación completa para las oposiciones de Guardia Civil.', 'Ingreso', 'Activo', '2026-01-28 03:22:00', 'manuelg'),
('Curso SLP Ingles Cambridge B2 ...', 'Preparación para el examen de Cambridge B2 nivel SLP.', 'Ingreso', 'Activo', '2026-02-02 02:25:00', 'manuelg'),
('Ascenso Guardia Civil', 'Curso de preparación para ascenso en la Guardia Civil.', 'Sargento', 'Activo', '2026-02-11 11:50:00', 'jantonio'),
('Curso maestro ascenso cabo', 'Curso maestro para preparación de ascenso a cabo.', 'CABO', 'Activo', '2026-02-11 12:24:00', 'adrianmartinez'),
('Ingreso GC', 'Curso de ingreso a la Guardia Civil.', 'Ingreso', 'Activo', '2026-02-13 02:22:00', 'manuelg'),
('test', 'Curso de prueba para validación del sistema.', 'Ingreso', 'Inactivo', '2026-02-13 02:50:00', 'adrianmartinez');
