const express = require('express');
const Resume = require('../Models/ResumeSchema.model');
const mongoose = require('mongoose');



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

const Update = async (req, res) => {
    // Get userId from the session
    const userId = req.session.user?._id;
    
    // Access the updated data from the request body
    const updatedData = await dataFormat(req.body);

    console.log('User ID from session:', userId);
    console.log('Updated Data:', updatedData);

    // Input validation
    if (!userId) {
        return res.status(400).json({ message: 'Session not found' });
    }

    if (!updatedData || typeof updatedData !== 'object') {
        return res.status(400).json({ message: 'Invalid data for update' });
    }

    try {
        // Find the resume document by the user ID
        const userData = await Resume.findOne({ user: new mongoose.Types.ObjectId(userId) });

        if (!userData) {
            return res.status(404).json({ message: 'Resume not found for user' });
        }

        console.log('Found existing user data:', userData);

        // Use findByIdAndUpdate with proper options
        const updatedResume = await Resume.findByIdAndUpdate(
            userData._id,
            { $set: updatedData },
            {
                new: true,                    // Returns the updated document
                runValidators: true,          // Runs schema validators
                overwrite: false              // Prevents unintended field deletion
            }
        );

        if (!updatedResume) {
            return res.status(500).json({ message: 'Failed to update the resume' });
        }

        console.log('Updated Resume:', updatedResume);
        return res.status(200).json({
            message: 'Resume updated successfully',
            updatedResume
        });
    } catch (error) {
        console.error('Error updating resume:', error.message);
        return res.status(500).json({ 
            message: 'Error updating resume',
            error: error.message 
        });
    }
};

module.exports = Update;