
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY prisma ./prisma
COPY prisma7.config.ts ./
COPY tsconfig.json ./
COPY src ./src

RUN DATABASE_URL="postgresql://app:app@localhost:5432/shop?schema=public" npx prisma generate --config prisma7.config.ts
RUN npm run build


FROM node:24-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma7.config.ts ./
COPY --from=build /app/src ./src

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy --config prisma7.config.ts && npx prisma db seed --config prisma7.config.ts && npm start"]
