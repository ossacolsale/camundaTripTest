//id processo: FlowingTripBookingSaga

const { Client, logger, Variables } = require('camunda-external-task-client-js');
//const open2 = require('open');
//const config = { baseUrl: 'http://127.0.0.1:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 }; //versione Fargate
const config = { baseUrl: 'http://camunda:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('book-hotel', async function ({ task, taskService }) {
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

    console.log('book-hotel');
    const hasDrivingLicence = processVariables.hasDrivingLicence;
    const hasPassport = processVariables.hasPassport;
    
    if (hasDrivingLicence || hasPassport) {
      v.set('hotelBooked', true);
    } else {
      throw new Error('no driving licence or passport');
    }
    
    await taskService.complete(task, v);
  }
  catch (e)
  {
    v.set('errorMessage','Hotel booking failed: ' + e.message);
    await taskService.handleBpmnError(task, 'BookingFailed', 'Booking failed', v);
  }
});


client.subscribe('cancel-hotel', async function ({ task, taskService }) {
  const v = new Variables();
  v.set('hotelBooked', false);
  console.log('cancel-hotel');
  await taskService.complete(task, v);
});