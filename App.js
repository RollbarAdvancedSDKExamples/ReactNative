import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Client } from 'rollbar-react-native'
import { Client, Configuration } from 'rollbar-react-native'

/*
 Author Ian Flanagan Rollbar 2021 
 Basic react native app built using expo that generates some errors in rollbar.
 To use this project simply change <rollbar_token> to be your project token
 see the README in the project to get the expo server to run locally 
 */


let myID = generatetoken();
let myToken = '<rollbar_token>';
let transID = randomIntFromInterval(10000, 20000);
let myString = stringGen(10);

/*
 create the rollbar config 
 the wizard in the rollbar GUI has a different code example this is a best practice 
especially if you want to pass in more advanced features 
*/

const config = new Configuration(myToken, {

  //endpoint: 'https://api.rollbar.com/api/1/item/',
  //logLevel: 'info', // uncomment if only want to filter on messagest that are of the severity 
  // info or greater 
  environment: 'production',
  verbose: true, // sends more data great for initial troublehshooting 
  captureDeviceInfo: true,
  // payload is below 


  payload: {

    // use if you want to enable people tracking 
    person: {
      id: myID
      //  username: "imf",
      //  email: "test@rollbar.com"
    },
    // server object 
    server: {
      host: "web11",
      root: "DoneWithIt/",
      region: "aws-us-east-2"
    },
    // use if you want to pass in a custom field, this can be used by rollbar RQL to query 
    // for occurrences or you can use custom fingerprints to group based on custom data that is 
    // sent in via the payload 

    custom: {
      TransID: transID
    },

    client: {
      javascript: {
        source_map_enabled: true,
        // code_version is required if you want to leverage the rollbar versions API 
        code_version: '1.2',

      }
    }
  }
});
const rollbar = new Client(config);

rollbar.error('Error now');
rollbar.info('info error');

for (let i = 0; i <= 5; i++) {

  rollbar.critical(`${myString} Critical Error #${i} in react native app`);
}

// generateErrorNow();

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateErrorNow() {

  // throws an exception 
  let x;
  x.toString();


}

function generatetoken() {
  let myToken = Math.floor(Math.random() * 10) + 1;
  console.log('My token is:' + myToken);
  return myToken;
}

function stringGen(length) {
  var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  console.log(`My gitsha is: ${result}`);
  return result;
}


export default function App() {
  return (
    <View style={styles.container}>
      <Text>React Native Demo</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
