# Screeps Stats !!WIP!!
Statistics service for the Creeps game using Grafana and Prometheus

## Installation
 - Copy .env.example to .env `cp .env.example .env`
 - Set SCREEPS_TOKEN in .env
 - Run `docker-compose up -d`
 - Add a function to your bot from [collector.ts](src/collector.ts)

## Usage
 - Open Dashboard in [Grafana](http://localhost:3001) 
 - [Prometheus](http://localhost:9090) datasource
 - Check [metrics](http://localhost:3000/metrics)
