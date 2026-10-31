FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund
COPY server.js ./
ENV PORT=8008
EXPOSE 8008
USER node
CMD ["node", "server.js"]
