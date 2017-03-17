FROM node:6.9.0

ARG SOURCES_MIRROR=""
RUN if [ ! -z "${SOURCES_MIRROR}" ]; then echo "$SOURCES_MIRROR" > /etc/apt/sources.list ; fi
WORKDIR /app

# Cache npm install
COPY package.json /app/
RUN npm install

# Build the app
RUN npm build

EXPOSE 8888

ENV PHANTOMJS_BIN phantomjs

# Add code
COPY . /app

CMD npm start