
JITSI_CONFIG = jitsi-meet-cfg/jvb/logging.properties
CERTS_DIR = .certs
UID = $(shell id -u)
GID = $(shell id -g)

docker-exec-frontend = docker-compose exec frontend /bin/bash -c "$1"

# Docker
up: $(JITSI_CONFIG) compose
.PHONY: up

compose: $(CERTS_DIR)
	docker-compose up --build -d
.PHONY: compose

build: halt
	docker-compose build --build-arg UID=$(UID) --build-arg GID=$(GID)
.PHONY: build

halt:
	docker-compose stop
.PHONY: halt

destroy:
	docker-compose down --remove-orphans
.PHONY: destroy



$(CERTS_DIR):
	$(MAKE) certs

certs:
	mkdir -p $(CERTS_DIR)
	mkcert -install
	mkcert -cert-file $(CERTS_DIR)/certificate.crt -key-file $(CERTS_DIR)/certificate.key localhost
.PHONY: certs

provision: provision-jitsi
.PHONY: provision

# JITSI
$(JITSI_CONFIG):
	$(MAKE) provision-jitsi

provision-jitsi:
	mkdir -p jitsi-meet-cfg/{prosody/config,prosody/prosody-plugins-custom,jicofo,jvb}
	rm -rf jitsi-meet-cfg/prosody/config/*
	rm -rf jitsi-meet-cfg/prosody/prosody-plugins-custom/*
	rm -rf jitsi-meet-cfg/jicofo/*
	rm -rf jitsi-meet-cfg/jvb/*
.PHONY: provision-jitsi
