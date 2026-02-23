# 🚀 Prueba Técnica - Junior Full Stack Developer (Plataforma E-learning)

¡Hola! 👋 Te damos la bienvenida a la prueba técnica para la posición de Junior Full Stack Developer. Nos alegra mucho que hayas llegado hasta aquí.

El objetivo de esta prueba no es que dediques un fin de semana entero a picar código, sino evaluar cómo te desenvuelves en un proyecto ya iniciado, tu comprensión de la arquitectura y cómo implementas nuevas características. 

⏳ **Tiempo máximo recomendado:** 48 horas desde la recepción de este repositorio.

## 🏗 Arquitectura del Proyecto

El equipo de arquitectura ha dejado preparado el esqueleto de nuestra plataforma de E-learning basándose en microservicios y el patrón **BFF (Backend for Frontend)**. El ecosistema consta de:

* **MariaDB (Puerto 3306):** Base de datos relacional (incluye un script `init.sql` que la inicializa con datos de prueba).
* **Course Service (Puerto 8080 - Spring Boot):** Microservicio core que gestiona la lógica de negocio y el acceso a la base de datos de los cursos.
* **BFF E-learning (Puerto 8081 - Spring Boot):** Nuestro Backend For Frontend. Actúa como intermediario. El frontend **solo** debe comunicarse con este servicio.
* **Angular App (Puerto 4200 - Angular):** Aplicación frontend que muestra el catálogo de cursos.

## ⚙️ Cómo levantar el entorno

1. **Base de datos:** Necesitarás Docker instalado. En la raíz del proyecto, ejecuta:
   ```bash
   docker-compose up -d
   ```


## 🎯 Tu Misión (Tareas a realizar)

El equipo de Producto ha definido dos nuevas "Historias de Usuario" que debes implementar. Tienes libertad para modificar el código existente donde lo consideres necesario.

## Tarea 1: Añadir "Nivel de Dificultad" a los cursos

Actualmente, los cursos solo muestran Título y Descripción. Queremos que los usuarios puedan ver la dificultad de cada curso.

- **Base de datos:** Modifica el archivo mariadb/init.sql para añadir la columna difficulty_level (ej: Principiante, Intermedio, Avanzado) a la tabla courses y actualiza los datos de prueba.

- **Backend:** Actualiza la entidad, los DTOs y asegúrate de que el dato viaje desde el course-service, pasando por el bff-elearning, hasta el frontend.

- **Frontend:** Modifica la tarjeta del curso en Angular para mostrar esta nueva información (puedes usar un pequeño badge o texto destacado).

## Tarea 2: Funcionalidad "Me Gusta"

Queremos que los estudiantes puedan marcar los cursos que más les gusten.

- **Base de datos:** Añade un campo booleano is_liked a la tabla de cursos (por simplicidad, lo haremos a nivel general de curso, no por usuario).

- **Course Service:** Crea un nuevo endpoint (ej. PATCH /api/courses/{id}/like) que invierta el valor de este campo en la base de datos.

- **BFF:** Crea el endpoint correspondiente que consumirá el frontend y que llamará internamente al course-service.

- **Frontend:** Añade un botón (puede ser un icono de corazón o estrella) en cada curso. Al hacer clic, debe llamar al BFF, actualizar el estado en el backend y cambiar visualmente en la pantalla sin recargar la página.

## 📋 Qué evaluaremos
Arquitectura: Respeto estricto del patrón BFF (Angular NO debe llamar a course-service).

Buenas prácticas en Spring Boot: Uso correcto de anotaciones, controladores, servicios y repositorios.

Buenas prácticas en Angular: Componentización básica, uso del HttpClient en servicios y buen manejo de Observables (RxJS).

Calidad del código: Código limpio, legible y nomenclatura coherente.

## 📦 Instrucciones de Entrega
1. Crea un Fork de este repositorio (o clónalo y súbelo a un repositorio privado tuyo en GitHub/GitLab).

2. Crea una rama para tu desarrollo: git checkout -b feature/prueba-tecnica.

3. Una vez finalizado, edita la sección "Notas del Candidato" al final de este README explicando brevemente cómo has abordado las tareas y las decisiones técnicas que has tomado.

4. Envíanos el enlace a tu repositorio. Si es privado, asegúrate de darnos acceso.

5. ¡Mucha suerte y diviértete programando! 💻

## 📝 Notas del Candidato (Rellena esta sección al terminar)
1. **¿Cómo has abordado la prueba?**

2. **¿Has encontrado alguna dificultad?**

3. **Si tuvieras más tiempo, ¿qué mejoras añadirías?**