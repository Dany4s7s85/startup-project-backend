//voice-to-text converision
const GOOGLE_APPLICATION_CREDENTIALS= 'AIzaSyBpOIZcC8WHOvzgrUpXTS6ij4BpkkrZ0tQ'
require('dotenv').config();
  
const _ = require('lodash');
const speech = require('@google-cloud/speech');
const {Storage} = require('@google-cloud/storage');
const cloudStorage = new Storage()

const speechClient = new speech.SpeechClient();

function speechToTextApi(req, res){

    
// The path to the audio file to transcribe
const filePath = 'add voice there';
// Google Cloud storage
const bucketName = 'gcs-demo-bucket'; // Must exist in your Cloud Storage

const uploadToGcs = async () => {
  const storage = cloudStorage({
    projectId: GOOGLE_APPLICATION_CREDENTIALS,
  });

  const bucket = storage.bucket(bucketName);
  const fileName = path.basename(filePath);

  await bucket.upload(filePath);

  return `gs://${bucketName}/${fileName}`;
};

// Upload to Cloud Storage first, then detects speech in the audio file
uploadToGcs()
  .then(async (gcsUri) => {
    const audio = {
      uri: gcsUri,
    };

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 24000,
      languageCode: 'en-US',
    };

    const request = {
      audio,
      config,
    };

    speechClient.longRunningRecognize(request)
      .then((data) => {
        const operation = data[0];

        // The following Promise represents the final result of the job
        return operation.promise();
      })
      .then((data) => {
        const results = _.get(data[0], 'results', []);
        const transcription = results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log(`Transcription: ${transcription}`);
      })
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

}

export default speechToTextApi;
