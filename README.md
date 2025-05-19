# Proyecto Node.js con API REST

Este proyecto es una API REST desarrollada con Node.js y Express para la gestión de usuarios y productos. Además,
incluye un frontend ubicado en la carpeta `app`.

---

## 🔗 Endpoints

### Usuarios

#### 📥 GET - Obtener Todos los Usuarios

- **URL:** `http://localhost:3000/api/getUsuarios`
- **Método:** `GET`
- **Descripción:** Retorna una lista de todos los usuarios.

---

#### 🔍 GET - Obtener Usuario por ID

- **URL:** `http://localhost:3000/api/getUsuarios/:id`
- **Ejemplo:** `http://localhost:3000/api/getUsuarios/2`
- **Método:** `GET`
- **Descripción:** Retorna los datos del usuario con el ID especificado.

---

#### ➕ POST - Crear Usuario

- **URL:** `http://localhost:3000/api/createUsuario`
- **Método:** `POST`
- **Descripción:** Crea un nuevo usuario en la base de datos.

#### 📝 Body (JSON)

```json
{
  "nombre": "Marcos",
  "email": "marcos@gmail.com",
  "edad": "22"
}
```

---

#### 📝 PUT - Actualizar Usuario

- **URL:** `http://localhost:3000/api/updateUsuario/:id`
- **Ejemplo:** `http://localhost:3000/api/updateUsuario/4`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de un usuario existente.

#### 📝 Body (JSON)

```json
{
  "nombre": "juanroberto",
  "email": "juancito@gmail.com",
  "edad": "69"
}
```

---

#### ❌ DELETE - Eliminar Usuario

- **URL:** `http://localhost:3000/api/deleteUsuario/:id`
- **Ejemplo:** `http://localhost:3000/api/deleteUsuario/4`
- **Método:** `DELETE`
- **Descripción:** Elimina al usuario con el ID especificado.

---

### Productos

#### 📥 GET - Obtener Todos los Productos

- **URL:** `http://localhost:3000/api/getProductos`
- **Método:** `GET`
- **Descripción:** Retorna una lista de todos los productos.

---

#### 🔍 GET - Obtener Producto por ID

- **URL:** `http://localhost:3000/api/getProductos/:id`
- **Ejemplo:** `http://localhost:3000/api/getProductos/1`
- **Método:** `GET`
- **Descripción:** Retorna los datos del producto con el ID especificado.

---

#### ➕ POST - Crear Producto

- **URL:** `http://localhost:3000/api/createProducto`
- **Método:** `POST`
- **Descripción:** Crea un nuevo producto en la base de datos.

#### 📝 Body (JSON)

```json
{
  "nombre": "Mochila",
  "precio": "150000.0",
  "stock": "34"
}
```

---

#### 📝 PUT - Actualizar Producto

- **URL:** `http://localhost:3000/api/updateProducto/:id`
- **Ejemplo:** `http://localhost:3000/api/updateProducto/1`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de un producto existente.

#### 📝 Body (JSON)

```json
{
  "nombre": "Mochila Actualizada",
  "precio": "160000.0",
  "stock": "30",
  "fechaCarga": "20/05/2025"
}
```

---

#### ❌ DELETE - Eliminar Producto

- **URL:** `http://localhost:3000/api/deleteProducto/:id`
- **Ejemplo:** `http://localhost:3000/api/deleteProducto/1`
- **Método:** `DELETE`
- **Descripción:** Elimina el producto con el ID especificado.

---

## ⚙️ Requisitos

- Node.js
- Express

---

## 🛠️ Instalación del Backend

1. Clona el repositorio:

   ```bash
   git clone https://github.com/MarcosAyrton/NodeJs-React.git
   cd NodeJs-React
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor:

   ```bash
   npm run dev
   ```

---

## 🖥️ Configuración del Frontend

El frontend del proyecto se encuentra en la carpeta `app`. Sigue estos pasos para configurarlo:

1. Accede a la carpeta del frontend:

   ```bash
   cd app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Accede al frontend desde tu navegador en la URL que se indique en la terminal.

---

¡Listo! Ahora puedes usar tanto el backend como el frontend de tu proyecto.
