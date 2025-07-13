FROM alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
RUN apk add nodejs

FROM base AS base-pnpm
RUN apk add pnpm

FROM base-pnpm AS build
COPY . .
RUN pnpm install --frozen-lockfile && pnpm build

FROM base-pnpm AS prod
COPY --from=build /app/build build
COPY . .
RUN pnpm install --prod --frozen-lockfile

FROM base AS start
COPY --from=prod /app .
CMD ["node", "build"]
