#!/bin/bash

set -e  # Detener el script si algo falla

case "$1" in
  deploy-prod)
    docker compose -f .infra/production/deploy/docker-compose-prod.yml up -d --build
    ;;
  down-prod)
    docker compose -f .infra/production/deploy/docker-compose-prod.yml down
    ;;
  logs-prod)
    docker compose -f .infra/production/deploy/docker-compose-prod.yml logs -f
    ;;
  deploy-dev)
    docker compose -f .infra/staging/deploy/docker-compose-dev.yml up -d --build
    ;;
  down-dev)
    docker compose -f .infra/staging/deploy/docker-compose-dev.yml down
    ;;
  logs-dev)
    docker compose -f .infra/staging/deploy/docker-compose-dev.yml logs -f
    ;;
  *)
    echo "❌ Uso incorrecto"
    echo "Uso: ./deploy.sh [deploy-prod | down-prod | logs-prod | deploy-dev | down-dev | logs-dev]"
    exit 1
    ;;
esac
