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
La prueba la he abordado dividiéndola en tres fases principales. En primer lugar, he realizado una lectura completa del código para comprender su estructura y funcionamiento antes de comenzar a desarrollar. Tras ello, he desplegado el proyecto para verlo en ejecución y entender mejor como funciona.

Una vez familiarizado con el entorno, he ido resolviendo las tareas de forma ordenada, respetando la arquitectura del proyecto. He comenzado por los cambios en la base de datos, continuando con las modificaciones en el backend (implementación de endpoints y lógica de negocio) y finalizando con la adaptación del frontend.

En cada fase he realizado pruebas para validar el correcto funcionamiento. Por ejemplo, en el backend he probado las peticiones mediante Insomnia antes de integrarlas definitivamente. Solo tras verificar que todo funcionaba correctamente, he subido los cambios al repositorio.

Por último, tras comprobar que la funcionalidad completa operaba de manera correcta, he dado por cerrada cada tarea antes de pasar a la siguiente, manteniendo esta misma forma de trabajo hasta finalizar la prueba.

2. **¿Has encontrado alguna dificultad?**

Durante el desarrollo de la prueba tuve dificultades al trabajar con el método HTTP PATCH. Aunque conceptualmente entendía que se usa para actualizaciones parciales, al implementarlo me encontré con errores como Invalid HTTP method: PATCH, que no estaban relacionados directamente con la lógica de negocio sino con limitaciones de configuración y del entorno. Esto me hizo perder tiempo porque al principio parecía un fallo del endpoint, cuando en realidad era un problema técnico de soporte del método. 
Finalmente, tras intentar solucionarlo durante bastante tiempo sin éxito, decidí utilizar el método PUT para esa petición, ya que me permitía realizar la funcionalidad necesaria sin problemas y continuar con el desarrollo de las pruebas.

3. **Si tuvieras más tiempo, ¿qué mejoras añadirías?**
Si hubiera tenido más tiempo, me habría gustado pulir mejor algunas cosas que ahora mismo funcionan pero podrían estar mejor hechas. Por ejemplo, arreglaría el tema de que el progreso del curso cambie de forma aleatoria cada vez que se pulsa cualquier botón, ya que realmente no representa un progreso real y es algo que debería mantenerse estable. También implementaría un sistema de login para que cada usuario pudiera acceder con su propia cuenta y ver solo los cursos que le corresponden, gestionando bien los permisos según su rol. Además, intentaría mejorar la organización del código, tanto en el backend como en el frontend, para que fuera más limpio y fácil de mantener, por ejemplo, haría uso de DTOs en backend para servir los datos. Finalmente, mejoraría la gestión de errores para que la aplicación fuera más estable y hubiera menos riesgo de que haya un error fatal.