FROM node:18 as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile



FROM node:18 as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules 

COPY . .

RUN npm run build


FROM node:18 as runner

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist


CMD [ "node", "dist/app","npm","run","dev" ]