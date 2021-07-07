#!/bin/sh

###########################
#image build:
###########################
#docker build --pull --rm -f "../flight/Dockerfile" -t flight:latest "flight"
#docker build --pull --rm -f "../car/Dockerfile" -t car:latest "car"
#docker build --pull --rm -f "../hotel/Dockerfile" -t hotel:latest "hotel"


###########################
#before start without docker-compose:
###########################
#docker network create camundanet


###########################
#start without docker-compose:
###########################
#docker run -d --net=camundanet --hostname camunda -p 8080:8080 camunda/camunda-bpm-platform &
#docker run -d --net=camundanet --rm hotel:latest &
#docker run -d --net=camundanet --rm car:latest &
#docker run -d --net=camundanet --rm flight:latest &

###########################
#start with docker-compose:
###########################

#to start and to update stack after editing docker-compose file:
docker stack deploy -c docker-compose.yml camundaTrip

#to stop:
docker stack rm camundaTrip
