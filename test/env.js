'use strict';

function init(){
  require('aws-sdk').config.region = process.env.AWS_REGION;
  process.env.USER_TABLE = `serverless-cicd-user-${process.env.AWS_STAGE}`;

  //Note: in reality you would have a known dns name/pattern rather than the random address generated by api-g
  let stage = process.env.AWS_STAGE;
  if(stage === 'dev') {
    process.env.URL = process.env.DEV_URL;
  } else if (stage == 'test') {
    process.env.URL = process.env.TEST_URL;
  } else {
    throw new Error(`Stage is not configured for testing: ${stage}`);
  }

  console.log('api url: ', process.env.URL);
}

module.exports = {
  init
};