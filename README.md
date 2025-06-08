# 🚀 Opportunity Tracker API (Backend)

Esta es la API del backend para el proyecto Opportunity Tracker. Provee los endpoints necesarios para gestionar oportunidades y postulaciones, y está diseñada para ser consumida por un cliente de React.

## ✨ Tecnologías Utilizadas

[cite_start]Este proyecto está construido con las siguientes tecnologías:
* **Entorno de ejecución:** Node.js
* **Framework:** Express.js
* **Lenguaje:** TypeScript
* **ORM:** Prisma
* **Base de Datos:** PostgreSQL

---

## ⚙️ Configuración y Ejecución Local

Sigue estos pasos para levantar el servidor en tu máquina local.

### **Prerrequisitos**
* Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
* Tener una instancia de [PostgreSQL](https://www.postgresql.org/) corriendo.

### **Pasos para la Instalación**

1.  **Clona el repositorio** (si aún no lo has hecho):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Navega a la carpeta del servidor:**
    ```bash
    cd opportunity-tracker-mvp/server
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    * Crea un archivo `.env` en la raíz de la carpeta `server/`.
    * Copia el contenido del archivo `.env.example` (si existe) o usa la siguiente plantilla:
        ```env
        # URL de conexión a tu base de datos PostgreSQL
        DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_DB"
        ```

5.  **Aplica las migraciones de la base de datos:**
    Este comando creará las tablas (`Opportunity`, `Application`) en tu base de datos.
    ```bash
    npx prisma migrate dev
    ```

6.  **(Opcional) Puebla la base de datos con datos de prueba:**
    Puedes usar el script SQL proporcionado para tener datos con los que trabajar desde el principio.

7.  **Inicia el servidor en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor estará corriendo en `http://localhost:3001`.

---

## Endpoints de la API

[cite_start]A continuación se detallan los endpoints disponibles para probar con Postman o cualquier otro cliente de API.

### 1. Obtener todas las Oportunidades
* **Método:** `GET`
* **URL:** `/api/opportunities`
* **Descripción:** Devuelve un arreglo de todas las oportunidades disponibles.
* **Respuesta Exitosa (200 OK):**
    ```json
    [
      {
        "id": 1,
        "title": "Curso de React Avanzado",
        "shortDescription": "Aprende hooks y patrones avanzados.",
        "deadline": "2025-12-31T23:59:59.000Z"
      }
    ]
    ```

### 2. Obtener una Oportunidad por ID
* **Método:** `GET`
* **URL:** `/api/opportunities/:id`
* **Ejemplo:** `/api/opportunities/1`
* **Descripción:** Devuelve los detalles completos de una oportunidad específica.
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "id": 1,
      "title": "Curso de React Avanzado",
      "shortDescription": "Aprende hooks y patrones avanzados.",
      "deadline": "2025-12-31T23:59:59.000Z",
      "createdAt": "2025-06-08T20:45:00.000Z",
      "updatedAt": "2025-06-08T20:45:00.000Z"
    }
    ```
    
### 3. Crear una Postulación
* **Método:** `POST`
* **URL:** `/api/applications`
* **Descripción:** Crea una nueva postulación. Captura datos del usuario y parámetros UTM.
* **Cuerpo de la Petición (Body - JSON):**
    ```json
    {
      "name": "Carlos Ruiz",
      "email": "carlos.ruiz@example.com",
      "message": "Estoy muy motivado para participar en este programa.",
      "opportunityId": 1,
      "utm_source": "linkedin",
      "utm_medium": "social",
      "utm_campaign": "q3_hiring"
    }
    ```
* **Respuesta Exitosa (201 Created):** Devuelve el objeto de la postulación recién creada.

### 4. Obtener todas las Postulaciones (Vista Admin)
* **Método:** `GET`
* **URL:** `/api/applications`
* **Descripción:** Devuelve un arreglo de todas las postulaciones recibidas, incluyendo la información de la oportunidad asociada.
* **Respuesta Exitosa (200 OK):**
    ```json
    [
      {
        "id": 1,
        "name": "Carlos Ruiz",
        "email": "carlos.ruiz@example.com",
        "message": "Estoy muy motivado para participar en este programa.",
        "opportunityId": 1,
        "utm_source": "linkedin",
        "utm_medium": "social",
        "utm_campaign": "q3_hiring",
        "timestamp": "2025-06-08T20:50:00.000Z",
        "opportunity": {
          "title": "Curso de React Avanzado"
        }
      }
    ]
    ```

# 🎨 Opportunity Tracker (Cliente Frontend)

Esta es la aplicación de frontend para el proyecto Opportunity Tracker, construida con React. Proporciona la interfaz de usuario para que los postulantes puedan ver las oportunidades y enviar sus aplicaciones.

## ✨ Tecnologías Utilizadas

Este proyecto está construido con las siguientes tecnologías:
* **Librería:** React
* **Lenguaje:** TypeScript
* **Bundler:** Vite
* **Estilos:** Tailwind CSS
* **Enrutamiento:** React Router DOM
* **Cliente HTTP:** Axios

---

## 🚀 Funcionalidades

La aplicación cuenta con las siguientes características:
* **Lista de Oportunidades:** Muestra las oportunidades disponibles obtenidas desde la API.
* **Formulario de Postulación:** Permite a los usuarios postularse a una oportunidad específica.
* **Captura de UTMs:** Captura automáticamente los parámetros `utm_source`, `utm_medium` y `utm_campaign` de la URL y los envía con la postulación.
* **Vista de Administrador (Opcional):** Una página simple en la ruta `/admin` para visualizar todas las postulaciones recibidas.

---

## ⚙️ Configuración y Ejecución Local

Sigue estos pasos para levantar la aplicación de React en tu máquina local.

### **Prerrequisitos**
* Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
* Tener el **servidor del backend corriendo** en `http://localhost:3001`.

### **Pasos para la Instalación**

1.  **Clona el repositorio** (si aún no lo has hecho):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Navega a la carpeta del cliente:**
    ```bash
    cd opportunity-tracker-mvp/client
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    * Crea un archivo `.env` en la raíz de la carpeta `client/`.
    * Añade la siguiente línea para apuntar a tu API local:
        ```env
        VITE_API_URL=http://localhost:3001/api
        ```

5.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite en la consola).