# Pokemon Data

Una aplicación web de Pokédex construida con Next.js 15, React 19 y Drizzle ORM.

Los datos provienen de la [PokéAPI](https://pokeapi.co/), pero para optimizar las queries y no sobrecargar la API, el proyecto cuenta con un script para transferir los datos necesarios de la API a una base de datos SQLite.

## 🚀 Tecnologías

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Drizzle ORM** - ORM para base de datos
- **Tailwind CSS** - Framework de CSS
- **Jotai** - Gestión de estado
- **Zod** - Validación de esquemas

## 📋 Requisitos Previos

- Node.js 20 o superior
- npm

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/nicodeheza/pokemon-data.git
cd pokemon-data
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente variable de entorno:

```
DATABASE_URL="file:./db.sqlite"
```

4. Configura y llena la base de datos:

```bash
npm run db:seed
```

## 🚀 Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## 🎨 Características

- 📱 Diseño responsivo
- 🔍 Búsqueda de Pokémon
- 🎯 Filtrado por tipo, nombre y generación.
- 📄 Paginación
- 📊 Vista detallada de cada Pokémon
- ⚡ Optimizado con React Server Components
