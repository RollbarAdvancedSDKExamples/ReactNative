import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Client } from 'rollbar-react-native'
import { Client, Configuration } from 'rollbar-react-native'


let myID = generatetoken();
let myToken = '<rollbar_token>';
let transID = randomIntFromInterval(10000, 20000);
let myString = stringGen(10);

const config = new Configuration(myToken, {

  //endpoint: 'https://api.rollbar.com/api/1/item/',
  //logLevel: 'info',
  environment: 'production',
  verbose: true,
  captureDeviceInfo: true,
  // payload is below 


  payload: {

    person: {
      id: myID
      //  username: "imf",
      //  email: "test@rollbar.com"
    },
    server: {
      host: "web11",



      root: "DoneWithIt/",
      region: "aws-us-east-2"
    },
    custom: {
      TransID: transID
    },

    client: {
      javascript: {
        source_map_enabled: true,
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
