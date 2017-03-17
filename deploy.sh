#!/usr/bin/env bash

set -xeuo pipefail

export ENVIRONMENT=deployment
source ./configuration/${ENVIRONMENT}/config

cd frontend && make build
cd ../
cd backend && make build
cd ../

cp ./configuration/${ENVIRONMENT}/compose.config compose_config
source compose_config

readonly DOCKER_COMPOSE="docker-compose -p jda${ENVIRONMENT} -f docker-compose.yml -f docker-${ENVIRONMENT}.yml"
${DOCKER_COMPOSE} build 
${DOCKER_COMPOSE} kill 
${DOCKER_COMPOSE} rm -f 
${DOCKER_COMPOSE} up -d
