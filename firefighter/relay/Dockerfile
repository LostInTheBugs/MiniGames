FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund
COPY server.js ./
RUN mkdir -p /data && chown node:node /data
ENV PORT=8008 FF_SCORES_FILE=/data/scores.json
VOLUME /data
EXPOSE 8008
USER node
CMD ["node", "server.js"]
