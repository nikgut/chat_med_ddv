

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const admin = require('firebase-admin');
admin.initializeApp();

process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

function saveName(agent) {
  const nameParam = agent.parameters.name;
  const name = nameParam;

//  agent.add('Hei ' + name + '!');

  return admin.database().ref('/names').push({name: name}).then((snapshot) => {
    console.log('database write sucessful: ' + snapshot.ref.toString);
  });
}

let intentMap = new Map();
intentMap.set('Default Welcome Intent', saveName);

agent.handleRequest(intentMap);
});
//test 
