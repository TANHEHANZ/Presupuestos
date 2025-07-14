
# Proyecto de Presupuestos

Este proyecto es una aplicación web para la gestión de presupuestos, desarrollada con **Angular** en el frontend y **Node.js + Express** con **TypeScript** en el backend.

---

## Tecnologías

- **Frontend:** Angular  
- **Backend:** Node.js, Express.js, TypeScript  
- **Base de datos:** (Indicar si usas alguna, ej. MongoDB, PostgreSQL, etc.)  
- **Herramientas:** npm, Angular CLI, ts-node, nodemon  

---

## Estructura del proyecto

```
/backend
  ├── src
  │   ├── controllers
  │   ├── models
  │   ├── routes
  │   ├── services
  │   └── index.ts
  ├── package.json
  └── tsconfig.json

/frontend
  ├── src
  │   ├── app
  │   ├── assets
  │   └── environments
  ├── angular.json
  └── package.json
```

---

## Instalación

### Backend

1. Navega al directorio backend:

```bash
cd backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno (crear archivo `.env` si aplica).

4. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

---

### Frontend

1. Navega al directorio frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta la aplicación Angular en modo desarrollo:

```bash
ng serve
```

---

## Uso

- Accede a la aplicación en el navegador en [http://localhost:4200](http://localhost:4200).  
- El backend corre en [http://localhost:3000](http://localhost:3000) (o el puerto que hayas configurado).  

---

## Funcionalidades

- Crear, editar y eliminar presupuestos.  
- Visualizar listado de presupuestos.  
- Gestión de categorías de gastos.  
- Autenticación y autorización (si aplica).  
- API RESTful para integración con el frontend.  

---

## Scripts útiles

### Backend

| Comando       | Descripción                                   |
| ------------- | --------------------------------------------- |
| `npm run dev` | Ejecuta servidor en modo desarrollo con hot reload |
| `npm run build` | Compila TypeScript a JavaScript              |
| `npm start`   | Ejecuta la app compilada                      |

### Frontend

| Comando     | Descripción                      |
| ----------- | -------------------------------- |
| `ng serve`  | Levanta servidor de desarrollo Angular |
| `ng build`  | Compila la app para producción          |

---

## Consideraciones

- Asegúrate de tener instalado Node.js (versión XX o superior).  
- Angular CLI instalado globalmente para correr el frontend (`npm install -g @angular/cli`).  
- Configura las variables de entorno necesarias para la conexión a base de datos y otros servicios.  

---

## Contacto

Para dudas o sugerencias, puedes contactarme en:

- GitHub: [HANZ TAPIA ](https://github.com/TANHEHANZ)  

---

## Licencia

Este proyecto está bajo la licencia MIT.
