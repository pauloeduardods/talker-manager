FROM node:erbium-alpine3.14

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]

EXPOSE 3000