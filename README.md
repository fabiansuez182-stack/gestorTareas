# Gestor de Tareas Personal con Seguimiento de Tiempo

Aplicación web progresiva (PWA) para la gestión eficiente de tareas con trazabilidad de tiempo, autenticación segura, almacenamiento de archivos en la nube y generación de reportes de productividad.

**Proyecto formativo SENA ADSO — Ficha 2026**  
Instructor: Edwin Rozo

---

## 🌐 Demo

La aplicación está desplegada en Vercel:  
**[https://gestor-tareas-pwa.vercel.app](https://gestor-tareas-pwa.vercel.app)**

---

## 📋 Requisitos del Sistema

- Node.js 18+ (recomendado 22+)
- Cuenta gratuita en [Firebase](https://console.firebase.google.com/)
- Cuenta gratuita en [Cloudinary](https://cloudinary.com/)

### Servicios Externos

| Servicio | Uso | Plan |
|----------|-----|------|
| Firebase Authentication | Registro e inicio de sesión (email/contraseña + Google) | Spark (gratuito) |
| Cloud Firestore | Base de datos NoSQL en tiempo real | Spark (gratuito) |
| Cloudinary | Almacenamiento y CDN de archivos adjuntos | Free (25GB) |

---

## ✨ Funcionalidades

### Autenticación y Seguridad
- **HU-01:** Registro e inicio de sesión con correo electrónico/contraseña o cuenta de Google
- **HU-02:** Recuperación de contraseña mediante enlace al correo
- Validación de formatos de correo y contraseñas seguras (8+ caracteres, 1 mayúscula, 1 número)
- Alertas interactivas con SweetAlert2

### Gestión de Tareas (CRUD)
- **HU-03:** Creación de tareas con nombre, descripción y tiempo estimado
- **HU-04:** Visualización en formato acordeón expandible
- **HU-05:** Edición inline y archivado (soft delete) para mantener historial recuperable
- **HU-06:** Eliminación definitiva con confirmación previa

### Trazabilidad y Tiempo
- **HU-07:** Cronómetro por tarea con inicio, pausa y guardado automático del tiempo
- **HU-08:** Adjuntos de imágenes y PDFs subidos a Cloudinary con vista previa
- **HU-09:** Registro de comentarios con marca de tiempo y usuario

### Experiencia de Usuario
- **HU-10:** Interfaz Glassmorphism con diseño responsivo
- **HU-11:** Exportación de reportes en formato CSV, PDF y Excel
- **HU-12:** Progressive Web App instalable con soporte offline

### Extras
- Barra de búsqueda para filtrar tareas por nombre o descripción
- Filtro por estado (pendientes, en progreso, completadas)
- Ordenamiento por fecha de creación (más recientes/antiguas) o alfabético
- Skeleton loading mientras se cargan los datos

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 8 |
| Lenguaje | JavaScript (JSX) ES2022+ |
| Backend as a Service | Firebase 12 (Auth + Firestore) |
| Almacenamiento | Cloudinary (CDN) |
| Diseño UI | CSS Glassmorphism |
| Alertas | SweetAlert2 11 |
| Navegación | React Router DOM 7 |
| Estado Global | React Context API |
| Reportes | react-csv + jspdf + xlsx |
| PWA | vite-plugin-pwa + Workbox |
| Testing | Vitest 4 + React Testing Library |
| Linter | oxlint 1.x |

---

## 🏗️ Arquitectura

El proyecto sigue el principio de **Responsabilidad Única (SRP)** y **Clean Architecture** con separación clara de capas:

```
src/
├── services/       → Comunicación con APIs externas (Firebase, Cloudinary)
├── hooks/          → Lógica de negocio encapsulada (useTasks, useTimer)
├── context/        → Estado global (AuthContext)
├── components/     → UI pura basada en props y callbacks
│   ├── common/     → Navegación, componentes compartidos
│   └── tasks/      → TaskCard, TaskForm, TaskTimer, adjuntos, comentarios, acciones
├── pages/          → Vistas principales (Login, Register, Dashboard, Archived, Reports)
├── styles/         → Estilos globales con Glassmorphism
└── utils/          → Funciones auxiliares (formateo, validaciones)
```

### Flujo de datos

```
pages/Dashboard.jsx
  → hooks/useTasks.js (lógica CRUD + tiempo real con Firestore)
    → services/firebaseConfig.js (configuración de Firebase)
  → components/tasks/TaskCard.jsx (props desde el hook)
    → TaskTimer.jsx, TaskAttachments.jsx, TaskComments.jsx, TaskActions.jsx
```

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/fabiansuez182-stack/gestorTareas.git
cd gestorTareas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=1:tu_app_id:web:tu_web_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

### 4. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto
2. Habilita los proveedores de autenticación: **Correo electrónico/Contraseña** y **Google**
3. Crea una base de datos **Cloud Firestore** en modo de prueba
4. Registra una aplicación web para obtener las credenciales (`apiKey`, `authDomain`, etc.)
5. Agrega `localhost` y la URL de tu despliegue a los **dominios autorizados** en Authentication → Settings

#### Reglas de seguridad de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Configurar Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. En Settings → Upload, crea un **Upload Preset** con modo **Unsigned**
3. Copia el **Cloud Name** y el nombre del **Upload Preset** a tu `.env`

### 6. Iniciar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🧪 Pruebas

El proyecto incluye **53 pruebas unitarias** distribuidas en 8 archivos:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm test -- --coverage

# Modo watch (útil durante desarrollo)
npm test
```

### Archivos de prueba

| Archivo | Pruebas | Cobertura |
|---------|---------|-----------|
| `utils/formatTime.test.js` | 10 | Formateo de tiempo (segundos, minutos, horas, negativos) |
| `utils/validations.test.js` | 13 | Validación de email, contraseña y nombre de tarea |
| `hooks/useTimer.test.js` | 7 | Cronómetro: start, pause, reset, saveTime |
| `context/AuthContext.test.jsx` | 2 | Estado de autenticación |
| `components/tasks/TaskCard.test.jsx` | 5 | Renderizado, expansión, botones de acción |
| `components/tasks/TaskForm.test.jsx` | 4 | Creación de tareas, validación de campos |
| `pages/LoginPage.test.jsx` | 5 | Formulario de login, botones, enlaces |
| `pages/Dashboard.test.jsx` | 7 | Lista de tareas, filtros, formulario |

---

## 📦 Build de Producción

```bash
npm run build
```

El build genera archivos optimizados en `dist/` con:
- **Code-splitting:** Los vendors se separan en chunks independientes (react, firebase, pdf, excel, ui)
- **PWA:** Service Worker generado automáticamente con Workbox para caché de assets
- **Minificación:** CSS y JS comprimidos

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## ☁️ Despliegue

El proyecto está optimizado para desplegar en **Vercel**:

```bash
# Instalar Vercel CLI (opcional)
npm install -g vercel

# Desplegar
vercel --prod
```

O conectar el repositorio directamente desde [vercel.com](https://vercel.com) para deploys automáticos.

---

## 📁 Estructura del Proyecto

```
gestorTareas/
├── public/               # Archivos estáticos e iconos PWA
├── src/
│   ├── components/
│   │   ├── common/       # GlassNav (navegación)
│   │   └── tasks/        # TaskCard, TaskForm, TaskTimer, TaskAttachments, TaskComments, TaskActions, ReportExport, LoadingSkeleton
│   ├── context/          # AuthContext
│   ├── hooks/            # useTasks, useArchivedTasks, useTimer
│   ├── pages/            # LoginPage, RegisterPage, Dashboard, ArchivedPage, ReportsPage
│   ├── services/         # firebaseConfig, authService, cloudinaryService
│   ├── styles/           # index.css (glassmorphism + responsive)
│   └── utils/            # formatTime, validations
├── .env.example          # Plantilla de variables de entorno
├── vercel.json           # Configuración de despliegue Vercel
├── vite.config.js        # Configuración de Vite + PWA + code-splitting
└── package.json
```

---

## ✅ Verificación de Calidad

```bash
# Linter
npm run lint

# Build
npm run build

# Tests
npm test
```

Todos deben pasar sin errores antes de cada commit.

---

## 📄 Licencia

Proyecto académico — SENA ADSO Ficha 2026.
