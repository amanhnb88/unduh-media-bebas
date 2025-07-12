FROM node:23-alpine
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm && \
    pnpm install
COPY . .
RUN pnpm build
CMD ["node", "build"]