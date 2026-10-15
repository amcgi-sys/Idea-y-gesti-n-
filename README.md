# Idea Gestión

Plataforma propia para la gestión integral de clientes de Idea Gestión (Ronda): portal de cliente, documentos, pendientes, mensajería, agenda, CRM, notificaciones, auditoría y futura integración con sistemas externos.

## Stack

- Next.js + TypeScript + App Router
- Tailwind CSS
- Prisma + PostgreSQL (modelo preparado)
- API Routes / Server Actions
- Arquitectura preparada para almacenamiento de documentos y adaptadores externos

## Arranque

```bash
npm install
npm run dev
```

Variables de entorno previstas:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/idea_gestion"
AUTH_SECRET="cambia-esta-clave-en-produccion"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Principios

- No se reutiliza código propietario de NCS.
- La integración con NCS queda encapsulada detrás de un adaptador para añadirla únicamente mediante interfaces autorizadas.
- El portal está pensado para migrar clientes actuales sin perder trazabilidad.
- Español como idioma principal.
