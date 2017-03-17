.PHONY: build

DOCKER_REGISTRY=localhost:5000
PROJECT=vault-frontend
TAG=latest
IMAGE=$(DOCKER_REGISTRY)/$(PROJECT)

build: 
	echo $(IMAGE)
	@docker build -t $(IMAGE) .
	@docker push $(IMAGE):$(TAG)
