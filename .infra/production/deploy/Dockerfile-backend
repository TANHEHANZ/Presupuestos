FROM node:22-alpine AS development
WORKDIR /code

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN npx prisma generate
RUN pnpm run build

FROM node:22-alpine AS prod
WORKDIR /code

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --only=production

COPY --from=development /code/dist ./dist
COPY prisma ./prisma
COPY .env.docker .env
RUN npx prisma generate

ENV TZ=America/La_Paz
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["node", "dist/app.js"]