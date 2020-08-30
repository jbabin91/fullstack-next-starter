THIS_FILE := $(lastword $(MAKEFILE_LIST))
.PHONY: help build up start down destroy stop restart logs logs-api ps login-timescale login-api db-shell
help:
				make -pRrq  -f $(THIS_FILE) : 2>/dev/null | awk -v RS= -F\: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
build:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml build $(c)
up:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d $(c)
start:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml start $(c)
down:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml down $(c)
destroy:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v $(c)
stop:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop $(c)
restart:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop $(c)
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d $(c)
logs:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs --tail=100 -f $(c)
logs-api:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs --tail=100 -f api
ps:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml ps
login-timescale:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec timescale /bin/bash
login-api:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec api /bin/bash
db-shell:
				docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec timescale psql -Upostgres
