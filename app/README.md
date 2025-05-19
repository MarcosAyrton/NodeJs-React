# CRUD Geller

CRUD Geller es una aplicación web desarrollada con React que permite gestionar usuarios y productos. La aplicación
incluye funcionalidades completas de creación, lectura, actualización y eliminación (CRUD) para ambas entidades, además
de características interactivas y personalizadas para mejorar la experiencia del usuario.

## **Características principales**

### **1. Gestión de Usuarios**

- **Crear Usuario**: Permite agregar un nuevo usuario con los campos `nombre`, `email` y `edad`.
- **Editar Usuario**: Permite modificar los datos de un usuario existente.
- **Eliminar Usuario**: Permite eliminar un usuario de la lista.
- **Buscar Usuario**: Incluye un motor de búsqueda para filtrar usuarios por `nombre`, `email` o `edad`.
- **Exportar Usuarios**: Permite exportar la lista de usuarios en formato PDF.

### **2. Gestión de Productos**

- **Crear Producto**: Permite agregar un nuevo producto con los campos `nombre`, `precio`, `stock` y `fecha de carga`.
- **Editar Producto**: Permite modificar los datos de un producto existente.
- **Eliminar Producto**: Permite eliminar un producto de la lista.
- **Buscar Producto**: Incluye un motor de búsqueda para filtrar productos por `nombre`, `precio` o `stock`.
- **Exportar Productos**: Permite exportar la lista de productos en formato PDF.

### **3. Página de Inicio**

- **Modal interactivo**: Al cargar la página por primera vez, aparece un modal que solicita al usuario ingresar su
  nombre. Este nombre se guarda en `localStorage` y se utiliza para personalizar la experiencia.
- **Mensaje de bienvenida**: Muestra un mensaje personalizado con el nombre ingresado en el modal.
- **Navegación**: Incluye botones para acceder a las secciones de usuarios y productos.

### **4. Barra de Navegación**

- **Inicio**: Enlace para volver a la página de inicio.
- **Usuarios**: Enlace para acceder a la gestión de usuarios.
- **Productos**: Enlace para acceder a la gestión de productos.
- **Dejar de trabajar**: Botón que elimina el nombre del usuario de `localStorage` y redirige al modal de inicio.

## **Estructura del Proyecto**

```
src/
├── App.jsx
├── components/
│   └── ExportPDF.jsx
├── context/
│   ├── UsersContext.jsx
│   └── ProductosContext.jsx
├── layouts/
│   └── NavBar.jsx
├── pages/
│   ├── home/
│   │   └── Home.jsx
│   ├── users/
│   │   ├── index.jsx
│   │   ├── UsersView.jsx
│   │   └── UserForm.jsx
│   ├── productos/
│       ├── index.jsx
│       ├── ProductosView.jsx
│       └── ProductoForm.jsx
└── styles/
    └── App.css
```

## **Cómo funciona la aplicación**

### **1. Inicio**

- Al cargar la aplicación, el usuario es recibido con un modal que solicita su nombre.
- El nombre ingresado se guarda en `localStorage` y se utiliza para personalizar el mensaje de bienvenida en la página
  de inicio.

### **2. Gestión de Usuarios**

- La sección de usuarios permite realizar operaciones CRUD completas.
- Los usuarios se muestran en una tabla con opciones para editar o eliminar.
- Incluye un motor de búsqueda para filtrar usuarios y un botón para exportar la lista en formato PDF.

### **3. Gestión de Productos**

- La sección de productos permite realizar operaciones CRUD completas.
- Los productos se muestran en una tabla con opciones para editar o eliminar.
- Incluye un motor de búsqueda para filtrar productos y un botón para exportar la lista en formato PDF.

### **4. Barra de Navegación**

- La barra de navegación permite moverse entre las secciones de la aplicación.
- El botón "Dejar de trabajar" elimina el nombre del usuario de `localStorage` y redirige al modal de inicio.

## **Cómo ejecutar el proyecto**

### **1. Requisitos previos**

- Node.js instalado en tu máquina.

### **2. Instalación**

1. Instala las dependencias:
   ```bash
   npm install
   ```

### **3. Ejecución**

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre tu navegador y ve a `http://localhost:5173` o al link que te aparezca en tu terminal una vez ejecutado el
   comando.

## **Dependencias principales**

- **React**: Biblioteca principal para construir la interfaz de usuario.
- **React Router**: Manejo de rutas en la aplicación.
- **Framer Motion**: Animaciones para el modal y otros elementos interactivos.
- **jspdf** y **jspdf-autotable**: Generación de archivos PDF para exportar datos.
- **TailwindCSS**: Estilizado y creacion de componentes.
