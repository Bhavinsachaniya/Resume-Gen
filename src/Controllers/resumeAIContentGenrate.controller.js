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
            prompt = `Create a professional summary based on the following experience:
                        - Use 20-30 words
                        - Highlight key responsibilities and skills
                        - Mention tools or tech if applicable
                        - Keep it job-application ready
                        - if they Enter out of experience information so tell them to Enter Experience related information
                        Experience: ${question}`;

            break;


        case "2": //* about section prompt
            prompt = `Based on the data provided, generate a professional and concise project description:
                    - Keep it 20-30 words
                    - Mention project's goal and key tech used
                    - Briefly note challenges and solutions
                    - Share the final outcome or impact
                    - if user enter the out of topic information enter so tell them Enter the Project Related Information
                    Project Info: ${question}`;

            break;


        case "3": //* project section prompt
            prompt = `Generate a polished and concise resume summary:
                    - Limit to 20-30 words
                    - Emphasize skills and career goals
                    - Highlight achievements or focus areas
                    - If they Enter out of the about section or Education out question ask so just tell them Enter resume related or about section related information Enter
                    Info: ${question}`;

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