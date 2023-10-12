import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



/*  Ability to read code and respond to questions about it the user may have.  */
export const readCode = async (req, res) =>{
    try {
        console.log(req.body.prompt)
        const response = await openai.createCompletion("text-davinci-001", {
            prompt: req.body.prompt,
            temperature: 0.4,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.send(response.data);
    } catch (error) {
        res.send(error)
    }
}

/* Natural language to open ai api.*/
export const naturalLandguageToAiAPI = async (req, res)=> {
    try{
        const response = await openai.createCompletion("code-davinci-002", {
            prompt:req.body.prompt,
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""],
        });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
    
};

/* Natural language to stripe api.*/
export const naturalLandguageToStripAPI = async (req, res)=> {
    try{
        const response = await openai.createCompletion("code-davinci-003", {
            prompt: req.body.prompt,
            temperature: 0,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""],
        });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

/*  Sql translate */
export const sqlTRanslate = async (req, res)=> {
    try{
        const response = await openai.createCompletion("code-davinci-004", {
            prompt: req.body.prompt,
            temperature: 0,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["#", ";"],
        });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//sql request
export const sqlRequest = async (req, res) =>{
    try{
        const response = await openai.createCompletion("text-davinci-005", { 
            prompt: req.body.prompt,
            credits:"", 
            temperature: 0.3, 
            max_tokens: 60, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Parse unstructured data
export const parseUnstructureData = async (req, res) =>{
    try{
        const response = await openai.createCompletion("text-davinci-006", { 
            prompt:req.body.prompt,
            temperature: 0, 
            max_tokens: 100, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Python to natural language
export const pythonToNaturalLanguage = async (req, res) =>{
    try{
    const response = await openai.createCompletion("code-davinci-007", { 
    prompt:req.body.prompt,
    temperature: 0, 
    max_tokens: 64, 
    top_p: 1.0, 
    frequency_penalty: 0.0, 
    presence_penalty: 0.0, 
    stop: ["#"], 
  });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Calculate time complexity
export const calculateTime = async (req, res) =>{
    try{
        
const response = await openai.createCompletion("text-davinci-008", { 
    prompt:req.body.prompt, 
    temperature: 0, 
    max_tokens: 64, 
    top_p: 1.0, 
    frequency_penalty: 0.0, 
    presence_penalty: 0.0, 
    stop: ["\n"], 
    });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Translating/converting programming languages
export const translateProgrammingLanguage = async (req, res) =>{
    try{   
    const response = await openai.createCompletion("code-davinci-009", { 
    prompt:req.body.prompt, 
    temperature: 0, 
    max_tokens: 54, 
    top_p: 1.0, 
    frequency_penalty: 0.0, 
    presence_penalty: 0.0, 
    stop: ["###"], 
    });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Explain code
export const explainCode = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("code-davinci-010", { 
            prompt:req.body.prompt, 
            temperature: 0, 
            max_tokens: 64, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
            stop: ["\"\"\""], 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Python bug fixer
export const pythonBugFixer = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("code-davinci-011", { 
            prompt:req.body.prompt, 
            temperature: 0, 
            max_tokens: 182, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
            stop: ["###"], 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Javascript helper chatbox
export const jsChatboxHelper = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("code-davinci-012", { 
            prompt:req.body.prompt, 
            temperature: 0, 
            max_tokens: 60, 
            top_p: 1.0, 
            frequency_penalty: 0.5, 
            presence_penalty: 0.0, 
            stop: ["You:"], 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

//Write python docstring
export const writePythonDoc = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("code-davinci-013", { 
            prompt:req.body.prompt, 
            temperature: 0, 
            max_tokens: 150, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
            stop: ["#", "\"\"\""], 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

// Javascript one line function
export const jsOneLineFunction = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("code-davinci-014", { 
            prompt:req.body.prompt,
            max_tokens: 60, 
            top_p: 1.0, 
            frequency_penalty: 0.0, 
            presence_penalty: 0.0, 
            stop: [";"], 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};

// Completions
export const completions = async (req, res) =>{
    try{   
        const response = await openai.createCompletion("text-davinci-015", { 
            prompt: req.body.post, 
            temperature: 0.7, 
            max_tokens: 256, 
            top_p: 1, 
            frequency_penalty: 0, 
            presence_penalty: 0, 
          });
        res.send(response.data);
    }catch(err){
        res.send(err)
    }
};


// export default {
//     readCode,
//     naturalLandguageToAiAPI,
//     naturalLandguageToStripAPI,
//     sqlTRanslate,
//     sqlRequest,
//     parseUnstructureData,
//     pythonToNaturalLanguage,
//     calculateTime,
//     translateProgrammingLanguage,
//     explainCode,
//     pythonBugFixer,
//     jsChatboxHelper,
//     writePythonDoc,
//     jsOneLineFunction,
//     completions
// }