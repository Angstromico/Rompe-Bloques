# Rompe Ladrillos

Un juego clásico de "Breakout" (rompe ladrillos) desarrollado con HTML5, CSS y JavaScript moderno.

## 🚀 Características

- **Motor de juego personalizado:** Implementación de un bucle de juego (game loop) eficiente.
- **Detección de colisiones:** Sistema modular para gestionar interacciones entre elementos.
- **Gestión de niveles:** Múltiples niveles con configuraciones de ladrillos dinámicas.
- **Efectos de sonido y música:** Integración de audio para una experiencia inmersiva.

## 📁 Estructura del Proyecto

El proyecto está organizado de forma modular para facilitar su mantenimiento y escalabilidad:

```text
Rompe-Bloques/
├── assets/             # Recursos multimedia
│   ├── img/            # Imágenes del juego (balón, ladrillos, etc.)
│   └── sounds/         # Efectos de sonido y música de fondo
├── js/                 # Lógica del juego (módulos ES6)
│   ├── balon.js        # Comportamiento y física de la pelota
│   ├── colisionador.js # Lógica de detección de colisiones
│   ├── input.js        # Manejo de entradas de usuario
│   ├── java.js         # Punto de entrada principal y bucle de juego
│   ├── juego.js        # Motor principal del juego (Game Engine)
│   ├── ladrillo.js     # Comportamiento de los ladrillos
│   ├── niveles.js      # Definiciones y generación de niveles
│   ├── paddle.js       # Comportamiento de la paleta (paddle)
│   └── sectores.js     # Gestión de secciones del juego
└── index.html          # Archivo principal de la interfaz
```

## 🛠️ Instalación y Uso

No requiere instalación de dependencias. Para jugar:

1. Clona el repositorio o descarga los archivos.
2. Abre el archivo `index.html` en cualquier navegador web moderno.

## 📝 Sugerencias de Commits Profesionales

Para este cambio de documentación, te sugiero los siguientes mensajes de commit siguiendo la convención de [Conventional Commits](https://www.conventionalcommits.org/):

1. `docs: add README with project overview and directory structure`
2. `docs: document project architecture and assets organization`
3. `docs: create initial README documentation`
