import settings from './azureSettings';
import graphHelper from './graphHelper';

export async function greetUserAsync() {
  console.log('Hello, User!');
}

export async function displayAccessTokenAsync() {
  console.log('Access Token: XYZ'); // Replace 'XYZ' with the actual access token
}

export async function listInboxAsync() {
  console.log('Listing emails from the inbox...'); // Implement the logic to list emails
}

export async function sendMailAsync() {
  console.log('Sending an email...'); // Implement the logic to send an email
}

export async function makeGraphCallAsync() {
  console.log('Making a Graph API call...'); // Implement the logic to make a Graph API call
}
