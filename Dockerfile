FROM node:12.13

RUN export DEBIAN_FRONTEND=noninteractive && apt-get update && apt-get install -y --force-yes \
    libreoffice \
    unzip \
    zip \
    && rm -rf /var/lib/apt/lists/* 


RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app

EXPOSE 8000
CMD [ "node", "server.js" ]
