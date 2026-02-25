FROM node:lts AS build
WORKDIR /encube-challenge
COPY . .
RUN corepack enable
RUN corepack install
RUN pnpm install --frozen-lockfile
RUN pnpm run verify
RUN pnpm run build

FROM nginx:stable
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /encube-challenge/dist /usr/share/nginx/html
