# Camunda Trip in Node.js / Docker with variables
This is the source code of the same sample Camunda process as https://github.com/berndruecker/flowing-trip-booking-saga-c-sharp but with the following differences and additional features:

- **external tasks written in node.js** (using https://github.com/camunda/camunda-external-task-client-js library)
- added a **parallelized version of bpmn** (through parallel gateway)
- added the **handling of state variables** (with process variables defined within the startup REST call)
- complete with **some docker-ready scripts** (bash for running, Dockerfile and docker-compose.yml)

## Camunda variables
For simulating a real use-case, I used the following variables:
- hasDrivingLicence: bool
- hasPassport: bool
- carBooked: bool
- flightBooked: bool
- hotelBooked: bool
- errorMessage: string
   
The first two represent the documents possessed by user. It's mandatory to have: any one between Driving Licence and Passport to book the hotel,
the Driving Licence to reserve the car and the Passport to book the flight. The errorMessage simply contains ana eventual explaination about the cause of failure.

To instance this variables, one should launch http://127.0.0.1:8080/engine-rest/process-definition/key/FlowingTripBookingSaga/start with the following body:

```JSON
{
 "variables":{
   "hasDrivingLicence" : {
     "value" : true,
     "type": "Boolean"},
   "hasPassport" : {
     "value" : true,
     "type": "Boolean"
    },
   "carBooked" : {
     "value" : false,
     "type": "Boolean"
    },
   "flightBooked" : {
     "value" : false,
     "type": "Boolean"
    },
   "hotelBooked" : {
     "value" : false,
     "type": "Boolean"
    },
   "errorMessage" : {
     "value" : "",
     "type": "String"
    }
 },
 "withVariablesInReturn": true
}

```
Notice the first two variables can be, arbitrarily, assigned true or false.


## Containers
Each of the three folders Car, Hotel and Flight, are ready to be containerized with docker image (node.js) and executed locally. Camuna image, instead,
has to be properly downloaded from the official Docker repository.

One way to run the images is throw the commands stored into "scripts" folder (be careful and take a look inside: for the moment these files are not well organized).
