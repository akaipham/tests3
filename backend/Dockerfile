FROM node:6.9.0

RUN apt-get update && apt-get -y --no-install-recommends install \
    imagemagick ghostscript poppler-utils vim curl

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD typings.json /app/typings.json
RUN npm run typings

ADD . /app
RUN npm run compile

ENV NODE_ENV production
ENV DEBUG false
RUN mkdir -p tmp && mkdir -p upload && chmod 777 tmp upload
EXPOSE 3333
CMD npm start
