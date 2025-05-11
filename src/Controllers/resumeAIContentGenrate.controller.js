const express = require('express');
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gen_AI_Key); // gemini ai key
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

//* Genrate the Gemini response
const genrate =  async (prompt) => {
    try{
        let answer = await model.generateContent(prompt);
        return answer.response.text();      
    }
    catch(Error){
        console.log('Error in generate:', err);
        throw err; 
    }
};

//* Prompting 
const selectPrompt = async (question, questiontype) => {
    let prompt;
    switch (questiontype) {
        
        case "1": //* Expereince prompt
            prompt = `Create a professional 
                summary based on the following experience. 
                The summary should be between 20-30 words, 
                highlighting key skills and achievements 
                in a concise, polished manner, suitable for 
                a job application. Experience:${question}`;
            break;


        case "2": //* about section prompt
            prompt = `Create a polished, professional,
                and concise resume summary based on the 
                following information. The summary should 
                be 20-30 words, focusing on key skills, achievements,
                and career goals: ${question}`;
            break;


        case "3": //* project section prompt
            prompt = `${question}Based on the provided 
                data, generate a polished and concise 'About
                Text' for the project, highlighting the project's
                purpose, key technologies, challenges, solutions,
                and outcomes in a professional manner.`;
            break;


        default:
            prompt = `using this ${question} make a professional 
                summary in 20-30 words and only get answer in sort form 
                like 20-30 words in`;
            break;

    };

    return prompt;

};

//* Clean the Gemini Genrated text
const cleanText = (text) => {
    let cleanedText = text.replace(/\*\*/g, '') // Remove bold markers
                                        .replace(/\*/g, '') // Remove bullet points
                                        .replace(/\n/g, ' ') // Remove newlines
                                        .replace(/:\s+/g, ': '); // Clean up colons
    return cleanedText;
}


const genrateAnswer = async (req,res) => {

    try{
        const question = req.body.question;
        const questiontype = req.body.number;

        const prompt = await selectPrompt(question,questiontype);

        const rawanswer = await genrate(prompt);

        if (!rawanswer || rawanswer.trim() === "") {
            return res.status(500).json({
                success: false,
                message: "AI did not return a valid response."
            });
        };

        const answer = await cleanText(rawanswer);

        return res.status(200).json({
            success:true,
            message: 'Answer Generated',
            answer: answer 
        })
    }
    catch(error){

        console.error('Error processing the question:', error);
        res.status(500).json({
            success: false,
            message: 'Oops! Something went wrong while generating your summary. Try again shortly.',
        });
        
        
    }
    
}


module.exports = genrateAnswer;