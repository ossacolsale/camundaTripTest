//id processo: FlowingTripBookingSaga


const { Client, logger, Variables } = require('camunda-external-task-client-js');

//const config = { baseUrl: 'http://127.0.0.1:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 }; //versione Fargate
const config = { baseUrl: 'http://camunda:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);


client.subscribe('book-car', async function ({ task, taskService }) {
  const processVariables = task.variables.getAll();
  const v = new Variables();

  try {
    /* variabili:

      - hasDrivingLicence: bool
      - hasPassport: bool

      - carBooked: bool
      - flightBooked: bool
      - hotelBooked: bool

      - errorMessage: string
    */

    console.log('book-car');
    const hasDrivingLicence = processVariables.hasDrivingLicence;
    
    if (hasDrivingLicence) {
      v.set('carBooked', true);
    } else {
      throw new Error('no driving licence');
    }
    
    await taskService.complete(task, v);


  }
  catch (e)
  {
    
    v.set('errorMessage','Car booking failed: ' + e.message);
    await taskService.handleBpmnError(task, 'BookingFailed', 'Booking failed', v);
  }
});


client.subscribe('cancel-car', async function ({ task, taskService }) {
  const v = new Variables();
  v.set('carBooked',false);
  console.log('cancel-car');
  await taskService.complete(task, v);
});

/*
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8088); //the server object listens on port 8080
*/
