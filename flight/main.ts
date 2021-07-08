//id processo: FlowingTripBookingSaga

const { Client, logger, Variables } = require('camunda-external-task-client-js');
//const open2 = require('open');
//const config = { baseUrl: 'http://127.0.0.1:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 }; //versione Fargate
const config = { baseUrl: 'http://camunda:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);
const sleep_time = () => Math.random()*10000;
let st;



client.subscribe('book-flight', async function ({ task, taskService }) {
    const processVariables = task.variables.getAll();
    const v = new Variables();
  
    //random sleep to simulate a variable execution time and avoid Optimistic Locking Exception in parallel gateway
    console.log('Sleeping '+(st = sleep_time())+' ms');
  await new Promise((resolve, reject) => setTimeout(resolve, st));

    try {
      /* variabili:
  
        - hasDrivingLicence: bool
        - hasPassport: bool
  
        - carBooked: bool
        - flightBooked: bool
        - hotelBooked: bool
  
        - errorMessage: string
      */
  
      console.log('book-flight');
      const hasPassport = processVariables.hasPassport;
      
      if (hasPassport) {
        v.set('flightBooked', true);
      } else {
        throw new Error('no passport');
      }
      
      await taskService.complete(task, v);
    }
    catch (e)
    {
      v.set('errorMessage','Flight booking failed: ' + e.message);
      await taskService.handleBpmnError(task, 'BookingFailed', 'Booking failed', v);
    }
  });
  
  
  client.subscribe('cancel-flight', async function ({ task, taskService }) {
    console.log('Sleeping '+(st = sleep_time())+' ms');
    await new Promise((resolve, reject) => setTimeout(resolve, st));
    const v = new Variables();
    v.set('flightBooked', false);
    console.log('cancel-flight');
    await taskService.complete(task, v);
  });
