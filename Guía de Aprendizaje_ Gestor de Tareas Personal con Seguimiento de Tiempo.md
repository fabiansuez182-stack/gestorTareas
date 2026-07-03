## **Guía de Aprendizaje: Gestor de Tareas Personal con Seguimiento de Tiempo** 

## **Índice del Proyecto** 

- **Fase 0: Creación de Épicas e Historias de Usuario** _(Actual)_ 

- **Fase 1:** Creación de cuenta de Google Developer y base de datos en Firestore 

- **Fase 2:** Configuración del servicio de Autenticación 

- **Fase 3:** Configuración de Firebase Cloud Storage 

- **Fase 4:** Arquitectura React (Estructura, Componentes, Patrones, SOLID) 

- **Fase 5:** Implementación del código principal (Hooks estándar y personalizados) 

- **Fase 6:** Detalles finales, conversión a PWA y reportes 

- **Fase X:** Pruebas unitarias con Jest 

## **Introducción** 

¡Hola! Soy Ed, tu instructor en este viaje hacia el desarrollo de software profesional. 

En la industria tecnológica actual, no basta con saber escribir código; es fundamental saber resolver problemas reales aplicando buenas prácticas, escribiendo código limpio (Clean Code) y diseñando arquitecturas escalables. Por esta razón, he diseñado esta guía basada en un **aprendizaje orientado a proyectos** . 

Durante las siguientes fases, no solo memorizaremos conceptos, sino que construiremos desde cero un "Gestor de Tareas Personal con Seguimiento de Tiempo". Usaremos **React** para el Frontend y **Firebase** como nuestro Backend as a Service (BaaS), aplicando un diseño moderno basado en _Glassmorfismo_ y convirtiendo nuestra aplicación en una **PWA** (Progressive Web App). 

**Mi consejo principal:** No copies y pegues el código ciegamente. Lee, comprende y argumenta cada línea. Utiliza herramientas de Inteligencia Artificial como un mentor para depurar errores, no para que hagan el trabajo por ti. Al finalizar este proyecto, tendrás una pieza robusta para tu portafolio y un dominio profundo sobre el ecosistema de React. 

¡Comencemos a codificar! 

- Fase 0: Creación de Épicas e Historias de Usuario 

Antes de tocar una sola línea de código, necesitamos estructurar qué vamos a construir. **¿Por qué?** Porque en el desarrollo de software (especialmente bajo metodologías ágiles como Scrum), saltar directamente al código sin una planificación genera arquitecturas frágiles y retrabajos constantes. 

Las **Épicas** son grandes bloques funcionales del sistema, y las **Historias de Usuario (HU)** dividen esas épicas en características pequeñas, estimables y testeables desde la perspectiva del usuario final. 

A continuación, estructuramos el mapa de ruta de nuestra aplicación: 

## **Épica 1: Autenticación y Seguridad** 

_Esta épica abarca todo lo relacionado con el acceso y protección de la información del usuario._ 

- **HU 1.1 - Registro e Inicio de Sesión:** Como usuario, quiero poder registrarme e iniciar sesión usando mi correo/contraseña o mi cuenta de Google, para proteger mis datos de tareas. 

   - _Criterios de Aceptación:_ Debe validar formatos de correo, exigir contraseñas seguras y mostrar alertas usando SweetAlert2 en caso de error. 

- **HU 1.2 - Recuperación de Contraseña:** Como usuario, quiero poder solicitar un enlace de recuperación a mi correo electrónico en caso de olvidar mi contraseña, para recuperar el acceso a mi cuenta. 

## **Épica 2: Gestión Central de Tareas (CRUD)** 

_El núcleo de la aplicación. Define cómo interactúa el usuario con la información principal._ 

- **HU 2.1 - Creación de Tareas:** Como usuario, quiero crear una tarea indicando su nombre (obligatorio), descripción y tiempo estimado, para organizar mi día. 

   - _Criterios de Aceptación:_ Generación de UUID automático por cada tarea. Alertas si el nombre está vacío. 

- **HU 2.2 - Visualización en Acordeón (Kanban de 1 columna):** Como usuario, quiero ver una lista de mis tareas en un formato de columna única y poder expandirlas (acordeón) para ver los detalles, para mantener una interfaz limpia. 

- **HU 2.3 - Edición y Archivo de Tareas:** Como usuario, quiero poder editar los detalles de una tarea o archivarla (soft delete) en lugar de borrarla, para mantener un registro histórico recuperable. 

- **HU 2.4 - Eliminación Definitiva:** Como usuario, quiero poder eliminar una tarea definitivamente, confirmando previamente la acción, para limpiar mi base de datos de errores. 

## **Épica 3: Trazabilidad y Medición del Tiempo** 

_Características avanzadas que diferencian este gestor de un simple "To-Do List"._ 

- **HU 3.1 - Cronómetro (Timer):** Como usuario, quiero un botón en cada tarea activa para iniciar/pausar un cronómetro, para medir el tiempo real que invierto en ella frente al propuesto. 

- **HU 3.2 - Adjuntos de Archivos:** Como usuario, quiero poder subir imágenes o PDFs (Firebase Storage) a los detalles de mi tarea, para tener todos los recursos necesarios centralizados. 

- **HU 3.3 - Registro de Comentarios:** Como usuario, quiero agregar comentarios o trazas en mi tarea, para documentar avances o bloqueos. 

## **Épica 4: Exportación, Interfaz y PWA** 

_Enfocada en la experiencia de usuario (UX) y la utilidad externa de los datos._ 

   - **HU 4.1 - Interfaz Glassmorfismo:** Como usuario, quiero navegar por una interfaz responsiva con efecto cristal (transparencias y desenfoques), para tener una experiencia visual moderna y agradable. 

   - **HU 4.2 - Generación de Reportes:** Como usuario, quiero exportar un resumen de mis métricas (tareas completadas vs pendientes y tiempos invertidos) en formato PDF, Excel o CSV, para analizar mi productividad. 

   - **HU 4.3 - Acceso Offline (PWA):** Como usuario, quiero poder instalar la aplicación en mi dispositivo móvil o de escritorio como una PWA, para acceder a la interfaz rápidamente de manera nativa. 

- Fase 1: Creación del Proyecto en Firebase y Base de Datos en Firestore 

Excelente. Vamos a construir los cimientos de nuestra aplicación. Antes de escribir código en React, necesitamos un lugar donde vivan nuestros datos. 

## **¿Por qué Firebase y Firestore?** 

Como ingenieros, no elegimos herramientas por moda, sino por eficiencia. Firebase nos proporciona un **Backend as a Service (BaaS)** , lo que significa que nos resuelve la autenticación, base de datos y almacenamiento de archivos sin tener que configurar servidores desde cero. Esto nos permite enfocarnos al 100% en la lógica del Frontend (React). 

Específicamente, utilizaremos **Cloud Firestore** como nuestra base de datos. Es una base de datos NoSQL orientada a documentos. La preferimos sobre el antiguo "Realtime Database" porque Firestore permite consultas mucho más complejas y escala de manera óptima organizando la información en jerarquías de **Colecciones** y **Documentos** . Para un gestor de tareas que va a crecer con múltiples usuarios, esta estructura es obligatoria. 

## **Paso 1: Configurar el Proyecto en Firebase Console** 

- Dirígete a Firebase Console e inicia sesión con una cuenta de Google. 

- Haz clic en **"Crear un proyecto de Firebase nuevo"** .Asigna un nombre descriptivo, por ejemplo: `gestor-tareas-pwa` . 

- **Google Analytics:** Para este proyecto de aprendizaje, puedes **deshabilitar** Google Analytics para simplificar la creación. Si lo dejas activo, te pedirá configurar una cuenta de Analytics, lo cual es útil en producción, pero innecesario ahora. 

- Haz clic en **"Crear proyecto"** y espera a que se aprovisionen los recursos. 

## **Paso 2: Inicializar Cloud Firestore** 

Nuestra base de datos almacenará las tareas y los perfiles de los usuarios. 

- En el menú lateral izquierdo de tu nuevo proyecto, ve a la sección **Bases de Datos** y almacenamiento, luego selecciona **Firestore.** 

- Haz clic en **"Crear base de datos"** . 

- Selecciona Edición estándar - id(default) - ubicación(nam5(United States)) y das click en “Siguiente” 

- Terminar la configuración en modo de prueba, y damos clic en crear. 

- En este paso ya estamos en el entorno de nuestra Base de datos 

## **Paso 3: Configurar las Reglas de Seguridad (Clean Code / Buenas Prácticas)** 

Dejar la base de datos en "modo de prueba" de forma permanente es un error común de novatos que expone toda tu información a vulnerabilidades críticas en internet. Vamos a aplicar una regla básica inmediata para asegurar que solo los usuarios autenticados puedan interactuar con los datos. 

- En la pestaña superior de tu panel de Firestore, ve a **Reglas (Rules)** . 

- Reemplaza el código existente por el siguiente: 

JavaScript 

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Bloqueo de seguridad: Solo permite leer y escribir
      // si el usuario ha iniciado sesión (request.auth existe)
      allow read, write: if request.auth != null;
    }
  }
}
```

- Haz clic en **Publicar** . 

**Argumento técnico:** Con la regla `if request.auth != null;` , estamos delegando la primera capa de seguridad al servicio de Autenticación (que configuraremos en la Fase 2). Si alguien intenta acceder a tu base de datos desde una terminal o un script externo sin un token JWT válido de Firebase, la petición será rechazada automáticamente con un Error 403 (Forbidden). 

## **Paso 4: Registrar la App Web (Interfaz 2026)** 

Para conectar el frontend en React con el backend, Firebase necesita generar las llaves cifradas de acceso correspondientes al SDK (Software Development Kit). 

- Ubícate en el panel principal de la **Descripción general del proyecto** . 

- Justo debajo del título central de tu proyecto ( `gestor-tareas-pwa` ) y de la etiqueta _Plan Spark_ haz clic en el botón **`+ Agregar app`** . 

- En el menú desplegable que aparece con las diferentes plataformas, selecciona el ícono redondo con los corchetes angulares **`</>`** (Web). 

- Registra el apodo de la aplicación (por ejemplo, `GestorTareasWeb` ). Deja desmarcada la opción de Firebase Hosting; el despliegue en la nube lo configuraremos de manera incremental en las etapas finales del roadmap. 

- Haz clic en el botón **Registrar app** . 

- Copia el objeto JSON de configuración llamado `firebaseConfig` que la consola generará automáticamente en la pantalla. Lo guardaremos temporalmente para inyectarlo dentro de la arquitectura limpia de Vite durante la Fase 4. El objeto tendrá esta estructura: 

## JavaScript 

```
const firebaseConfig = {
  apiKey: "AIzaSyB-xxxxxxxxxxxxxxx",
  authDomain: "gestor-tareas-pwa.firebaseapp.com",
  projectId: "gestor-tareas-pwa",
  storageBucket: "gestor-tareas-pwa.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

**Argumento técnico:** Centralizar el registro desde el botón de cabecera principal garantiza la vinculación inmediata del cliente web dentro del entorno del proyecto. Omitir la configuración de Hosting en este paso responde al principio de desarrollo enfocado: primero aislamos y probamos la persistencia de datos de forma local antes de introducir variables de entorno complejas ligadas a redes de distribución de contenido (CDN). 

- **Fase 2: Configuración del Servicio de Autenticación (Actualizado 2026)** 

## **¿Por qué delegar la Autenticación a Firebase Auth?** 

Implementar un sistema de autenticación seguro desde cero requiere gestionar el hash de contraseñas (con algoritmos robustos como Argon2 o bcrypt), manejar de forma segura la expiración y rotación de tokens de sesión, y mitigar ataques de fuerza bruta. Esto incrementa de forma innecesaria la superficie de ataque y los costos de mantenimiento del backend. 

**Firebase Auth** centraliza la seguridad abstrayendo esta complejidad. Maneja de forma nativa los estándares OAuth 2.0 y JWT (JSON Web Tokens). Cuando un usuario inicia sesión, Firebase genera un token de identidad ( `IdToken` ) firmado digitalmente que se propaga automáticamente en cada petición a Firestore y Storage, permitiendo que las reglas de protección validen la identidad de manera síncrona y aislada en la nube. 

*** Activar los Proveedores de Identidad (Interfaz 2026)** 

Para cumplir con la Historia de Usuario ( **HU 1.1** ), habilitaremos dos métodos de acceso que equilibran la flexibilidad y la facilidad de uso del aplicativo. 

1. En el menú lateral izquierdo de la consola de Firebase, ubica la sección **Categorías de producto** y despliega el menú **Seguridad** . 

2. Haz clic en la opción **Authentication** . 

3. En el panel central, haz clic en el botón **Comenzar** (Get Started). 

   4. En el menú de pestañas superiores, ve a **Método de inicio de sesión** (Sign-in method). 

   5. Haz clic en el botón **Agregar nuevo proveedor** (Add new provider) y configura los siguientes accesos: 

      - **Correo electrónico/Contraseña:** Actívalo. Asegúrate de dejar la opción _"Vínculo por correo_ 

      - _electrónico"_ desactivada para exigir el uso de contraseñas tradicionales. Haz clic en Guardar. 

      - **Google:** Actívalo. Define el nombre público del proyecto (el que visualizarán los usuarios al 

      - autenticarse) y elige el correo de soporte del proyecto. Haz clic en Guardar. 

*** Paso 2: Configurar la Plantilla de Recuperación de Contraseña y Dominios** 

La **HU 1.2** exige que el usuario pueda recuperar su acceso de forma autónoma. Firebase automatiza este flujo enviando un correo con un enlace de un solo uso que redirige a una pantalla segura de cambio de credenciales. 

1. Dentro del panel de Authentication, ve a la pestaña superior **Plantillas** (Templates). 

2. Selecciona **Restablecimiento de contraseña** (Password reset) en el menú de la izquierda para personalizar el asunto y el cuerpo del mensaje. 

3. **Paso crítico para desarrollo local en 2026:** Cambia a la pestaña **Configuración** (Settings) y entra a **Dominios autorizados** (Authorized domains). Verifica que `localhost` esté listado como origen permitido. Si no aparece, haz clic en "Agregar dominio" e introduce `localhost` . **Análisis técnico:** Por defecto, Firebase procesa el cambio de contraseñas en un entorno aislado ( `proyecto.firebaseapp.com/__/auth/action` ). Al verificar y restringir los dominios autorizados a `localhost` (para desarrollo con Vite) y al dominio de producción final, mitigas vulnerabilidades críticas como ataques de _phishing_ o el secuestro de sesiones ( _Session Hijacking_ ) en el cliente. 

## **Paso 3: Estrategia de Seguridad en el Cliente (Clean Code)** 

Aunque Firebase valida las credenciales de forma robusta en sus servidores, el _Principio de Robustez_ (Ley de Postel) dicta que el frontend debe ser estricto con los datos antes de despacharlos. En la Fase 5 programaremos las expresiones regulares en React, pero desde la etapa de infraestructura dejamos definidos los parámetros mínimos normativos para el Login y Registro: **CampoParámetro MínimoJustificación TécnicaEmail** Expresión Regular Estricta ( `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` )Filtra entradas mal formadas en el cliente, evitando peticiones innecesarias a la API que degraden la cuota gratuita del servicio. **Contraseña** Mínimo 8 

caracteres, 1 número, 1 letra mayúsculaDetiene ataques de diccionario comunes directamente en el navegador antes de que el hash sea procesado por los servidores de Firebase. 

Con el servicio de Authentication activo y configurado bajo el estándar de la interfaz de 2026, la infraestructura está completamente lista para emitir y validar los tokens JWT necesarios para interactuar de forma segura con el resto del ecosistema del proyecto. 

- Fase 3: Configuración de Cloudinary (Storage Desacoplado) 

## **Paso 1: Obtener las Credenciales Base** 

1. Inicie sesión en su consola de Cloudinary. 

2. En el panel principal ( **Dashboard** ), ubique y copie su **Cloud Name** . Este es el identificador público de su servidor de almacenamiento y lo necesitará para construir la URL de destino de sus archivos. 

## **Paso 2: Crear un Upload Preset No Firmado (Unsigned)** 

Para que la aplicación cliente (frontend) pueda subir archivos directamente a Cloudinary sin necesidad de un servidor backend propio, debemos autorizar la carga mediante un canal controlado llamado _Upload Preset_ . 

3. En la consola de Cloudinary, vaya a **Settings** (Icono de engranaje abajo a la izquierda). 

4. Seleccione la pestaña **Upload** y desplácese hasta la sección **Upload presets** . 

5. Haga clic en **Add upload preset** . 

6. Configure los siguientes campos básicos: 

   - **Upload preset name:** Asigne un nombre descriptivo (ej. `sena_preset_tareas` ). Anote este nombre exacto. 

   - **Signing Mode:** Cambie el valor estrictamente a **Unsigned** (No firmado). 

   - **Folder:** Defina una carpeta de destino (ej. `tareas_adjuntos` ) para mantener organizado el contenedor. 

7. Haga clic en **Save** (Guardar). 

## **Argumentación técnica del Preset No Firmado:** 

En arquitecturas _Serverless_ o Single Page Applications (SPA), exponer las llaves maestras de producción ( `API Secret` ) en el código del cliente es una vulnerabilidad crítica de seguridad. Al usar un preset _Unsigned_ , habilitamos un punto de acceso público pero restringido exclusivamente a la subida de archivos hacia la carpeta especificada, eliminando la necesidad de exponer credenciales privadas en el frontend. 

## **Paso 3: Anatomía de la Petición HTTP POST para Carga de Archivos** 

_Nota: La implementación detallada en código se abordará en la siguiente fase de desarrollo, pero como arquitectos debemos entender el protocolo de comunicación de la API._ 

Cuando el usuario selecciona un archivo en la aplicación, el frontend no interactúa con Firebase de inmediato. En su lugar, realiza una petición de red directa a la API REST de Cloudinary bajo el siguiente estándar: 

## 8. **Método HTTP:** `POST` 

## 9. **Endpoint (URL de destino):** 

```
https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/upload
```

10. **Cuerpo de la petición (Body):** Se envía codificado como `multipart/form-data` (el estándar web para transferencia de archivos binarios) y requiere obligatoriamente dos parámetros: 

   - `file` : El archivo binario capturado desde el dispositivo. 

   - `upload_preset` : El nombre del preset creado en el Paso 2 ( `sena_preset_tareas` ). 

## **El flujo del ciclo de vida de los datos es el siguiente:** 

```
[Cliente (UI)] --(1. POST con archivo + preset)--> [API Cloudinary] |
[Cliente (UI)] <--(2. Retorna JSON con secure_url)--------+ | +--------
```

```
(3. POST con texto plano: secure_url)----> [Firestore Database]
```

## **Explicación del flujo:** 

El servidor de Cloudinary procesa el binario, lo almacena en su CDN y devuelve inmediatamente una respuesta en formato JSON. De toda la respuesta, la propiedad fundamental que nos interesa es la **`secure_url`** , que es un enlace HTTPS directo al archivo. 

Finalmente, la aplicación toma esa cadena de texto ( `secure_url` ) y la guarda dentro del documento de la tarea en **Cloud Firestore** . De este modo, la base de datos de Firebase permanece ligera, rápida y económica. 

- Fase 4: Arquitectura React y Patrones de Diseño 

Antes de empezar a programar interfaces, debemos estructurar nuestro proyecto. Un error común al aprender React es colocar todo el código, la lógica y las llamadas a la base de datos dentro de los componentes visuales. Esto viola los principios de **Clean Code** y hace que el proyecto sea inmanejable a medida que crece. 

En esta fase, configuraremos nuestro entorno y definiremos una estructura de carpetas basada en la **Separación de Responsabilidades** (Separation of Concerns) y los principios **SOLID** . 

## **Paso 1: Inicialización del Proyecto y Dependencias** 

Para este proyecto usaremos **Vite** , la herramienta estándar moderna que ha reemplazado a Create React App por su velocidad y eficiencia en el empaquetado. 

Abre tu terminal y ejecuta: 

## Bash 

```
# 1. Crear el proyecto con Vite y React (JavaScript o TypeScript)
npm create vite@latest gestor-tareas-pwa -- --template react
```

```
# 2. Entrar a la carpeta
cd gestor-tareas-pwa
```

```
# 3. Instalar las dependencias principales que definimos en el Stack
npm install firebase styled-components react-icons sweetalert2 uuid react-router-dom
date-fns
```

## **Justificación técnica de las librerías:** 

1. `styled-components` : Nos permitirá aplicar el diseño de _Glassmorfismo_ encapsulando el CSS a nivel de componente. 

2. `react-router-dom` : Para manejar la navegación entre el Login y el Tablero (Kanban) sin recargar la página (Single Page Application). 

3. `date-fns` : Una librería ligera (mucho mejor que Moment.js) para calcular y formatear los tiempos de nuestras tareas. 

## **Paso 2: Estructura de Carpetas (Arquitectura Limpia)** 

Dentro de la carpeta `src` , vamos a crear una estructura modular. Esta organización facilita el mantenimiento y el trabajo en equipo. 

Crea las siguientes carpetas dentro de `src/` : 

## `src/` 

```
 ├── assets/          # Imágenes estáticas y recursos globales.
 ├── components/      # Componentes UI reutilizables (Botones, Inputs, Tarjetas).
 │    ├── common/     # Ej: Button.jsx, Modal.jsx
 │    └── tasks/      # Ej: TaskCard.jsx, TaskList.jsx
 ├── context/         # Estados globales usando React Context (ej. AuthContext).
 ├── hooks/           # Custom Hooks para encapsular lógica (ej. useTasks, useTimer).
 ├── pages/           # Vistas principales de la aplicación (ej. Login.jsx,
Dashboard.jsx).
```

```
 ├── services/        # Configuración y llamadas externas (ej. firebaseConfig.js,
authService.js).
 ├── styles/          # Variables globales y temas para styled-components.
 └── utils/           # Funciones de ayuda (ej. formatTime.js, validations.js).
```

## **Paso 3: Aplicación del Principio de Responsabilidad Única (SRP)** 

El principio de Responsabilidad Única (la "S" en SOLID) dicta que **cada módulo o función debe tener una y solo una razón para cambiar** . 

En React, aplicamos esto dividiendo la **Lógica de Negocio** de la **Interfaz de Usuario (UI)** . 

## **Ejemplo de Antipatrón (Lo que NO debes hacer):** 

Tener un componente `TaskCard.jsx` que muestre la tarjeta de la tarea, pero que también contenga la función para borrar la tarea directamente en Firebase. 

## **La forma correcta (Cómo lo haremos):** 

4. **Capa de Servicios (** **`services/firebaseTasks.js` ):** Aquí escribimos la función pura que se comunica con Firestore para borrar la tarea. 

5. **Capa Lógica (** **`hooks/useTasks.js` ):** Un Custom Hook que llama al servicio y actualiza el estado local de React. 

6. **Capa UI (** **`components/tasks/TaskCard.jsx` ):** El componente visual que solo recibe datos por `props` y emite un evento (ej. `onDelete` ) cuando el usuario hace clic. 

## **Paso 4: Conexión Inicial con Firebase** 

Tomamos las llaves de acceso que guardaste en la Fase 1 y las centralizamos en nuestra capa de servicios. 

Crea el archivo `src/services/firebaseConfig.js` : 

JavaScript 

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
```

```
// NUNCA subas estas llaves a GitHub directamente.
// En un proyecto real, usamos variables de entorno (.env).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Exportar los servicios para usarlos en el resto de la app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Directriz Pedagógica:** Si al configurar estas variables de entorno en Vite te encuentras con un error de "process is not defined" o las credenciales aparecen nulas, te animo a consultar con una IA pasándole tu mensaje de error y tu archivo de configuración. Leer y entender los errores de compilación es el 50% del trabajo de un desarrollador. 

- Fase 5: Implementación del Código Principal (Hooks Estándar y Personalizados) 

Entramos a la parte central de nuestra aplicación. En esta fase vamos a darle vida a la interfaz conectándola con Firebase. 

En la evaluación de proyectos de software, un error muy común es ver componentes visuales gigantescos (de más de 500 líneas) que mezclan HTML, estados locales y llamadas directas a la base de datos. Esto hace que el código sea imposible de testear y mantener. Para evitarlo, aplicaremos el patrón de **Custom Hooks** . 

## **1. Gestión del Estado Global: useContext y Auth** 

Nuestra aplicación necesita saber si el usuario está logueado en casi todas las pantallas. Pasar esta información de componente en componente ( _Prop Drilling_ ) es ineficiente. Usaremos la Context API de React. 

**Archivo:** `src/context/AuthContext.jsx` 

## JavaScript 

```
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
// 1. Creamos el contexto
const AuthContext = createContext();
// 2. Proveedor del contexto que envolverá la app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged es un listener de Firebase.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
```

```
      setLoading(false);
    });
    // Cleanup function: Desmonta el listener para evitar memory leaks
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
// 3. Custom Hook para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
```

**Argumentación técnica:** El `useEffect` con un arreglo vacío `[]` garantiza que el listener de Firebase se suscriba una sola vez. El `return () => unsubscribe()` previene fugas de memoria si el componente se desmonta. 

## **2. Inyección del Contexto en la Aplicación** 

Para que el contexto anterior sea funcional, toda la aplicación debe estar envuelta por el `AuthProvider` . De lo contrario, cualquier llamada a `useAuth()` arrojará un error. 

**Archivo:** `src/main.jsx` (o `src/index.js` dependiendo de tu entorno) 

JavaScript 

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

## **3. Encapsulando la Lógica de Negocio: El Custom Hook** **`useTasks`** 

Ahora, construiremos el motor de nuestro CRUD. Este Custom Hook se encargará de hablar con Firestore y le entregará a la interfaz los datos ya procesados. 

**Archivo:** `src/hooks/useTasks.js` 

JavaScript 

```
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from
'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
```

```
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) return;
    // Referencia a la subcolección de tareas del usuario actual
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
    const q = query(tasksRef);
    // onSnapshot establece conexión en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, [currentUser]);
  // Funciones CRUD aisladas de la UI
  const addTask = async (task) => {
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
    await addDoc(tasksRef, { ...task, createdAt: new Date() });
  };
  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, updatedData);
  };
  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await deleteDoc(taskRef);
  };
  return { tasks, addTask, updateTask, deleteTask };
};
```

**Argumentación técnica:** Al estructurar la base de datos como `users/{uid}/tasks` , garantizamos que cada usuario solo lea sus documentos. El uso de `onSnapshot` permite que nuestra UI reaccione instantáneamente (Realtime) sin recargar la página. 

## **4. Consumo en la Interfaz (Vista)** 

Finalmente, al tener la lógica extraída, la interfaz queda limpia y enfocada en pintar datos. 

**Archivo:** `src/pages/Dashboard.jsx` (o `src/components/Dashboard.jsx` ) 

JavaScript 

```
import { useTasks } from '../hooks/useTasks';
import Swal from 'sweetalert2';
export const Dashboard = () => {
  const { tasks, addTask, deleteTask } = useTasks();
  const handleCreate = () => {
    addTask({
      title: 'Nueva Tarea de Prueba',
      description: 'Descripción base',
```

```
      status: 'pending',
      timeSpent: 0
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) deleteTask(id);
    });
  };
  return (
    <div>
      <h1>Mis Tareas</h1>
      <button onClick={handleCreate}>Crear Tarea Rápida</button>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## **Conclusión y Resumen (Fase 5)** 

**Resumen:** Hemos organizado la conexión a la base de datos y la autenticación creando un sistema de tres capas: 

1. El proveedor de contexto en la raíz ( `main.jsx` ). 

2. La lógica de negocio encapsulada ( `useTasks.js` y `AuthContext.jsx` ). 

3. La interfaz visual que consume estos datos ( `Dashboard.jsx` ). 

**Conclusión de aprendizaje:** Con esta arquitectura basada en Custom Hooks, tu código cumple con el principio de _Clean Code_ . Si en el futuro decides cambiar Firebase por otra tecnología (como Supabase o una API propia en Node.js), solo tendrás que modificar el archivo `useTasks.js` . Ningún componente visual se romperá porque la vista no sabe ni le importa de dónde vienen los datos, solo sabe cómo mostrarlos. 

- Fase 6: Detalles Finales, Conversión a PWA y Reportes 

Llegamos a la etapa donde nuestro aplicativo pasa de ser un simple proyecto académico a un producto listo para producción. En esta fase puliremos la interfaz de usuario, agregaremos la funcionalidad de métricas y transformaremos la web en una aplicación instalable. 

## **1. Interfaz de Usuario: Implementando el Glassmorfismo** 

El "Glassmorfismo" es una tendencia de diseño que simula un cristal esmerilado flotando sobre un fondo colorido o complejo. Cumple con nuestra **HU 4.1** . 

En lugar de usar imágenes pesadas, logramos este efecto mediante CSS puro utilizando la propiedad `backdrop-filter` . 

Dentro de tu configuración de `styled-components` o tu archivo CSS global ( `src/styles/index.css` ), el contenedor principal de tus tarjetas de tarea debería verse así: 

CSS 

```
.glass-container {
  /* Fondo semi-transparente */
  background: rgba(255, 255, 255, 0.15);
  /* Borde redondeado sutil */
  border-radius: 16px;
  /* Sombra para dar profundidad (separación del fondo) */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* El desenfoque clave del cristal */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* Soporte para Safari */
  /* Borde blanco con baja opacidad para el reflejo */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

**Argumento técnico:** Usar CSS nativo ( `backdrop-filter` ) en lugar de superponer imágenes PNG 

transparentes mejora drásticamente el tiempo de renderizado (First Contentful Paint) y asegura que el efecto sea responsivo y se adapte al contenido dinámico de la tarea. 

## **2. Generación de Reportes (Exportar a CSV)** 

Para cumplir con la **HU 4.2** (analizar productividad), permitiremos al usuario descargar sus tareas. El formato CSV (Valores Separados por Comas) es el más eficiente porque es ligero y compatible nativamente con Excel y Google Sheets. 

Usaremos la librería `react-csv` . Instálala ejecutando: `npm install react-csv` 

Creamos el componente `src/components/tasks/ReportExport.jsx` : 

JavaScript 

```
import { CSVLink } from "react-csv";
import { useTasks } from "../../hooks/useTasks";
export const ReportExport = () => {
  const { tasks } = useTasks();
  // Mapeamos los datos crudos a un formato amigable para el reporte
  const reportData = tasks.map(task => ({
    "ID de Tarea": task.id,
    "Nombre": task.title,
    "Estado": task.status,
    "Tiempo Invertido (Min)": task.timeSpent,
    "Fecha de Creación": task.createdAt?.toDate().toLocaleDateString()
```

```
  }));
```

```
  return (
    <div className="glass-container">
      <h3>Reporte de Productividad</h3>
      {tasks.length > 0 ? (
        <CSVLink
          data={reportData}
          filename={"mis-tareas-reporte.csv"}
          className="btn-export"
        >
          Descargar Reporte en Excel
        </CSVLink>
      ) : (
        <p>No hay tareas para exportar.</p>
      )}
    </div>
  );
};
```

## **3. Conversión a PWA (Progressive Web App)** 

Una PWA permite que tu aplicación web se comporte como una app nativa: funciona sin conexión, se puede instalar en el celular o escritorio y tiene su propio icono ( **HU 4.3** ). 

Como estamos usando Vite, la conversión es casi automática utilizando un plugin oficial. 

**Paso 3.1:** Instala el plugin como dependencia de desarrollo: 

Bash 

```
npm install vite-plugin-pwa -D
```

**Paso 3.2:** Configura el archivo raíz `vite.config.js` : 

JavaScript 

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Gestor de Tareas Personal',
        short_name: 'TaskPWA',
        description: 'Gestiona tu tiempo y tareas eficientemente',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Esto oculta la barra del navegador
        icons: [
          {
            src: 'pwa-192x192.png', // Debes colocar estos íconos en tu carpeta
public/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
```

```
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
```

**Argumento técnico:** Al configurar `display: 'standalone'` en el `manifest` , obligamos al sistema operativo a renderizar la aplicación sin la barra de direcciones de Chrome o Safari. Además, el `Service Worker` que VitePWA genera por debajo se encarga de guardar en caché los archivos estáticos (JS, CSS, HTML), lo que permite que la aplicación cargue incluso si el aprendiz pierde la conexión a internet. 

- Fase X: Pruebas Unitarias y Aseguramiento de Calidad: 

Llegamos al final del camino. Todo desarrollador junior cree que el trabajo termina cuando la aplicación compila y se ve bonita, pero en el entorno profesional, el ciclo se cierra con las pruebas. Como instructor del SENA, siempre recalco en las fichas de aprendizaje una regla inquebrantable: **código que no tiene pruebas, es código legado desde el día uno.** 

En los requerimientos iniciales se sugirió **Jest** , pero como arquitectos de software debemos adaptarnos a nuestro ecosistema. Dado que en la Fase 4 construimos nuestra arquitectura usando **Vite** , la recomendación técnica obligatoria es usar **Vitest** . 

## **¿Por qué Vitest en lugar de Jest?** 

Porque Vitest está diseñado de forma nativa para Vite. Comparte el mismo archivo de configuración ( `vite.config.js` ), es inmensamente más rápido gracias al uso de _esbuild_ , y nos ahorra horas de dolores de cabeza configurando transpiladores de Babel para que Jest entienda la sintaxis moderna de React y ES6. 

## **Paso 1: Instalación del Entorno de Pruebas** 

En tu terminal, instala las librerías necesarias. Usaremos Vitest como motor de pruebas y **React Testing Library** para simular la interacción del usuario con la interfaz. 

Bash 

```
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## **Paso 2: Configuración de Vitest** 

Debemos indicarle a Vite cómo manejar el entorno de pruebas (simulando un navegador mediante `jsdom` ). Actualiza tu archivo `vite.config.js` : 

## JavaScript 

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [react(), VitePWA({ /* config previa */ })],
  test: {
    environment: 'jsdom',
```

```
    globals: true,
    setupFiles: './src/setupTests.js', // Archivo para cargar utilidades globales
  }
})
```

Luego, crea el archivo `src/setupTests.js` para tener a nuestra disposición los _matchers_ (comparadores) especiales para el DOM: 

JavaScript 

```
import '@testing-library/jest-dom';
```

## **Paso 3: Escribiendo tu Primera Prueba Unitaria** 

Siguiendo el principio de Responsabilidad Única, vamos a probar un componente aislado. No necesitamos levantar Firebase para saber si nuestra interfaz renderiza bien los datos crudos. 

Imagina que tenemos un componente puro `TaskItem.jsx` que solo recibe una tarea por `props` y la muestra. Creamos su archivo de prueba `src/components/tasks/TaskItem.test.jsx` : 

JavaScript 

```
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TaskItem from './TaskItem'; // Asumiendo que este es tu componente
describe('Pruebas en <TaskItem />', () => {
```

```
  const mockTask = {
    id: '123',
    title: 'Aprender Vitest',
    status: 'pending'
  };
  it('Debe renderizar el título de la tarea correctamente', () => {
    // 1. Arrange (Preparar)
    render(<TaskItem task={mockTask} />);
    // 2. Act (Actuar - buscar en el DOM)
    const titleElement = screen.getByText('Aprender Vitest');
    // 3. Assert (Afirmar)
    expect(titleElement).toBeInTheDocument();
  });
});
```

**Argumento técnico:** Este test sigue el patrón AAA (Arrange, Act, Assert). Al usar `screen.getByText` , estamos probando la aplicación tal como la usaría una persona real: buscando el texto en la pantalla, en lugar de verificar estados internos de los componentes de React, lo que hace que nuestra prueba sea resistente a refactorizaciones (si cambiamos el código interno pero la vista sigue igual, el test no se rompe). 

## **Paso 4: Ejecución y Validación** 

Agrega el script de pruebas a tu `package.json` : 

JSON 

```
"scripts": {
  "dev": "vite",
```

```
  "build": "vite build",
  "test": "vitest"
}
```

Ejecuta `npm run test` en tu terminal. Verás un panel en verde confirmando que tu código es funcional y comprobable. 

## **Cierre de la Guía** 

Con esto damos por concluida la estructuración del "Gestor de Tareas Personal con Seguimiento de Tiempo". Hemos ido desde la concepción de historias de usuario, pasando por el aprovisionamiento en la nube, hasta la arquitectura, diseño moderno y aseguramiento de calidad. 

Usa esta base, refactoriza lo que necesites, apóyate en la Inteligencia Artificial cuando la consola te lance un error incomprensible, pero siempre cuestiona el porqué de cada línea. ¡Mucho éxito con el desarrollo y a codificar de forma limpia! 

