FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
ENV PORT=1024
EXPOSE 1024
LABEL version="2.0a"
LABEL org.opencontainers.image.authors="aite@nabla.ooo"
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
