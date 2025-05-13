const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    experience: [{
        jobTitle: {
            type: String,
            required: false  
        },
        companyName: {
            type: String,
            required: false  
        },
        expCity: {
            type: String,
            required: false  
        },
        country: {
            type: String,
            required: false  
        },
        startDate: {
            type: String,
            required: false  
        },
        endDate: {
            type: String,
            required: false  
        },
        description: {
            type: String,
            required: false  
        }
    }],

    education: [{
        school: {
            type: String,
            required: false  
        },
        degree: {
            type: String,
            required: false  
        },
        city: {
            type: String,
            required: false  
        },
        country: {
            type: String,
            required: false  
        },
        startDate: {
            type: String,
            required: false  
        },
        endDate: {
            type: String,
            required: false  
        },
        edugpa: {
            type: String,
            required: false  
        }
    }],

    Achievement: [{
        atitle: {
            type: String,
            required: false  
        }
    }],

    Project: [{
        ptitle: {
            type: String,
            required: false  
        },
        pstartDate: {
            type: String,
            required: false  
        },
        penddate: {
            type: String,
            required: false  
        },
        poverview: {
            type: String,
            required: false  
        }
    }],

    skills: [{
        skill: {
            type: String,
            required: false  
        }
    }],

    hobbies: [{
        hobbies: {
            type: String,
            required: false  
        }
    }],

    about: {
        type: String,
        required: false  
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);
