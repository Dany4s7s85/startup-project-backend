import {
    readCode,
    naturalLandguageToAiAPI,
    naturalLandguageToStripAPI,
    sqlTRanslate,
    sqlRequest,
    parseUnstructureData,
    pythonToNaturalLanguage,
    calculateTime,
    translateProgrammingLanguage,
    explainCode,
    pythonBugFixer,
    jsChatboxHelper,
    writePythonDoc,
    jsOneLineFunction,
    completions
} from "./../../controllers/codexapiControler.js"
import speechToTextApi from "./../../controllers/voice-to-textControler"
import express from 'express';
const router = express.Router();



router.post('/read-code-respond', readCode)
router.post('/natural-language-to-open-ai', naturalLandguageToAiAPI)
router.post('/natural-language-to-stripe-api', naturalLandguageToStripAPI)
router.post('/sql-translate', sqlTRanslate)
router.post('/sql-request', sqlRequest)
router.post('/parse-unstructured-data', parseUnstructureData)
router.post('/python-to-natural-language', pythonToNaturalLanguage)
router.post('/calculate-time-complexity', calculateTime)
router.post('/converting-programming-languages', translateProgrammingLanguage)
router.post('/explain-code', explainCode)
router.post('/python-bug-fixer', pythonBugFixer)
router.post('/javascript-helper-chatbox', jsChatboxHelper)
router.post('/write-python-docstring', writePythonDoc)
router.post('/javascript-one-line-function', jsOneLineFunction)
router.post('/completions', completions)
router.post('/voice-to-text', speechToTextApi)

export default router;