import React, { useEffect } from 'react';
import settings from '../services/azureSettings';
import graphHelper from '../services/graphHelper';

const GraphWidget = () => {
    const initializeGraph = (settings) => {
        graphHelper.initializeGraphForUserAuth(settings, (info) => {
          console.log(info.message);
        });
      };


  const greetUserAsync = async () => {
    // TODO: Implement greetUserAsync function
  };

  const displayAccessTokenAsync = async () => {
    // TODO: Implement displayAccessTokenAsync function
  };

  const listInboxAsync = async () => {
    // TODO: Implement listInboxAsync function
  };

  const sendMailAsync = async () => {
    // TODO: Implement sendMailAsync function
  };

  const makeGraphCallAsync = async () => {
    // TODO: Implement makeGraphCallAsync function
  };

  useEffect(() => {
    console.log('JavaScript Graph Tutorial');
    initializeGraph(settings);
    greetUserAsync();
  }, []);

  return (
    <div>
      <h1>JavaScript Graph Tutorial</h1>
      <button onClick={displayAccessTokenAsync}>Display access token</button>
      <button onClick={listInboxAsync}>List my inbox</button>
      <button onClick={sendMailAsync}>Send mail</button>
      <button onClick={makeGraphCallAsync}>Make a Graph call</button>
    </div>
  );
};

export default GraphWidget;
