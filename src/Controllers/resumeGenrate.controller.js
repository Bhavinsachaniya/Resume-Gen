const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");

const Resume = require('../Models/ResumeSchema.model');
const User = require('../Models/UserSchema.model');


const formatMonthYear = (dateString) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    //* Validate the input format

    if (!/^\d{4}-\d{2}$/.test(dateString)) {
        return "Invalid date format. Use YYYY-MM.";
    }

    //* Extract year and month from the input

    const [year, month] = dateString.split("-");

    //* Convert month to integer and get corresponding month name

    const monthIndex = parseInt(month, 10) - 1;

    //* Check if the month is valid

    if (monthIndex < 0 || monthIndex > 11) {
        return "Invalid month in date.";
    }

    const monthName = months[monthIndex];

    //* Return formatted date

    return `${monthName} ${year}`;
}

const dataFormat = (inputData) => {
    const outputData = {
        firstname: inputData.contactfirstname,
        lastname: inputData.contactlastname,
        city: inputData.contactcity,
        postalcode: inputData.contactpostalcode,
        phone: inputData.contactphone,
        email: inputData.contactemail,
        experience: inputData.jobTitle.map((jobTitle, index) => ({
            jobTitle: jobTitle,
            companyName: inputData.companyName[index],
            expCity: inputData.expCity[index],
            country: inputData.country[index],
            startDate: formatMonthYear(inputData.startDate[index]),
            endDate: formatMonthYear(inputData.endDate[index]),
            description: inputData.descriptions[index]
        })),
        education: inputData.eduschool.map((school, index) => ({
            school: school,
            degree: inputData.edudegree[index],
            city: inputData.educity[index],
            country: inputData.educountry[index],
            startDate: formatMonthYear(inputData.edustartdate[index]),
            endDate: formatMonthYear(inputData.eduenddate[index]),
            edugpa: inputData.edugpa[index],
        })),
        Achievement: inputData.Achievementstitle.map((Achievementstitle, index) => ({
            atitle: Achievementstitle,
            /* alink: inputData.Achievementslink[index], */
        })),
        Project: inputData.projecttitle.map((projecttitle, index) => ({
            ptitle: projecttitle,
            pstartDate: formatMonthYear(inputData.projectStartDate[index]),
            penddate: formatMonthYear(inputData.projectEndDate[index]),
            poverview: inputData.projectoverview[index],
        })),
        skills: inputData.skill.map(skill => ({
            skill
        })),
        hobbies: inputData.hobbies.map(hobbies => ({
            hobbies
        })),
        about: inputData.abouttext
    };

    return outputData;
}


const Template_Select = async (outputData, template_name) => {
    let selectedTemplate;
    const template_ = template_name;

    // ✅ New smarter checks:
    const hasExperience = outputData.experience && outputData.experience.some(exp => 
        exp.jobTitle.trim() !== '' ||
        exp.companyName.trim() !== '' ||
        exp.expCity.trim() !== '' ||
        exp.country.trim() !== '' ||
        (exp.startDate && !exp.startDate.includes("Invalid")) ||
        (exp.endDate && !exp.endDate.includes("Invalid")) ||
        exp.description.trim() !== ''
    );

    const hasProject = outputData.Project && outputData.Project.some(proj => 
        proj.ptitle.trim() !== '' ||
        (proj.pstartDate && !proj.pstartDate.includes("Invalid")) ||
        (proj.penddate && !proj.penddate.includes("Invalid")) ||
        proj.poverview.trim() !== ''
    );

    const hasCoursework = outputData.education && outputData.education.some(edu =>
        edu.school.trim() !== '' ||
        edu.degree.trim() !== '' ||
        edu.city.trim() !== '' ||
        edu.country.trim() !== '' ||
        (edu.startDate && !edu.startDate.includes("Invalid")) ||
        (edu.endDate && !edu.endDate.includes("Invalid")) ||
        edu.edugpa.trim() !== ''
    );

    //  Now same selection logic, but based on real meaningful data
    if (!hasExperience && !hasProject && !hasCoursework) {
        selectedTemplate = `${template_}_WITHOUT_EXPERIENCE_AND_PROJECT_AND_COURSEWORK`;
        console.log("No experience, no project, no coursework.");
    } else if (!hasExperience && !hasProject) {
        selectedTemplate = `${template_}_WITHOUT_EXPERIENCE_AND_PROJECT`;
        console.log("No experience, no project.");
    } else if (!hasProject && !hasCoursework) {
        selectedTemplate = `${template_}_WITHOUT_PROJECT_AND_COURSEWORK`;
        console.log("No project, no coursework.");
    } else if (!hasExperience) {
        selectedTemplate = `${template_}_WITHOUT_EXPERIENCE`;
        console.log("No experience.");
    } else if (!hasProject) {
        selectedTemplate = `${template_}_WITHOUT_PROJECT`;
        console.log("No project.");
    } else if (!hasCoursework) {
        selectedTemplate = `${template_}_WITHOUT_COURSEWORK`;
        console.log("No coursework.");
    } else {
        selectedTemplate = `${template_}_ALL`;
        console.log("All data available.");
    }

    console.log(`Selected Template: ${selectedTemplate}`);

    return selectedTemplate;
}

const dataStore = async (data, userId) => {
    try {
        const formattedData = await dataFormat(data);
        console.log(formattedData);

        const newResume = new Resume({
            user: userId,
            firstname: formattedData.firstname,
            lastname: formattedData.lastname,
            city: formattedData.city,
            postalcode: formattedData.postalcode,
            phone: formattedData.phone,
            email: formattedData.email,
            experience: formattedData.experience,
            education: formattedData.education,
            Achievement: formattedData.Achievement,
            Project: formattedData.Project,
            skills: formattedData.skills,
            hobbies: formattedData.hobbies,
            about: formattedData.about,
        });

        await newResume.save();
        console.log("Resume saved successfully!");
        return newResume;

    } catch (error) {
        console.error("Error saving resume:", error);
        throw new Error("Failed to save resume"); // ❗ Throw error to be caught in route
    }
};



const resumeDataSave = async (req, res) => {
    const inputData = req.body; // Get the data from the request body
    
    const userId = req.session.user._id; // Access user ID from session
    try {
        const resume = await dataStore(inputData, userId); // Data store call
        console.log(resume);
        
        res.status(201).json({ resumeId: resume._id, data: resume });
    } catch (error) {
        console.error('Error saving resume:', error);
        res.status(500).json({ error: 'Failed to save resume' }); // Error handling
    }
};
const resumeGenrate = async (req, res) => {
    try {
        const { resumeId, templateNumber } = req.params;  // Destructure params
        const resumedata = await Resume.findById(resumeId);

        if (!resumedata) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const outputData = resumedata;
        console.log('templateNumber is ' + templateNumber);

        // Use the template number to select the template
        const selectedTemplate = await Template_Select(outputData, templateNumber);
        const templatePath = path.resolve(__dirname, `../../templates/${selectedTemplate}.docx`);
        
        // Log and check if the file exists
        console.log('Template path:', templatePath);
        
        if (!fs.existsSync(templatePath)) {
            console.error('Template file not found:', templatePath);
            return res.status(404).json({ error: 'Template file not found' });
        }

        const content = fs.readFileSync(templatePath, 'binary');
        
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(outputData);

        const name = resumedata.firstname || 'resume';
        const buf = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        const fileName = `generated_resume_${name}.docx`;

        // ✅ Send extra info as headers
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('X-Message', 'Resume generated successfully');

        return res.status(200).send(buf); // 🧠 ONLY send buffer
    } catch (error) {
        console.error('Resume generation failed:', error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


module.exports = {resumeDataSave ,resumeGenrate};