#!/bin/sh
#before start:
#docker create network camundanet

#start without docker-compose:

#docker run -d --net=camundanet --hostname camunda -p 8080:8080 camunda/camunda-bpm-platform &
#docker run -d --net=camundanet --rm hotel:latest &
#docker run -d --net=camundanet --rm car:latest &
#docker run -d --net=camundanet --rm flight:latest &

#start with docker-compose:

#to start
docker stack deploy -c docker-compose.yml camundaTrip

#to stop
docker stack rm camundaTrip
