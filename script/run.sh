#!/bin/sh
# docker create network camundanet
#senza docker-compose:

#docker run -d --net=camundanet --hostname camunda -p 8080:8080 camunda/camunda-bpm-platform &
#docker run -d --net=camundanet --rm albergo &
#docker run -d --net=camundanet --rm automobile &
#docker run -d --net=camundanet --rm volo &

#con docker-compose

#per partire
docker stack deploy -c docker-compose.yml sistdist

#per fermare
docker stack rm sistdist