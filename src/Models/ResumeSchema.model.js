const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }, // Reference to User

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
            required: false // Now optional
        },
        companyName: {
            type: String,
            required: false // Now optional
        },
        expCity: {
            type: String,
            required: false // Now optional
        },
        country: {
            type: String,
            required: false // Now optional
        },
        startDate: {
            type: String,
            required: false // Now optional
        },
        endDate: {
            type: String,
            required: false // Now optional
        },
        description: {
            type: String,
            required: false // Now optional
        }
    }],

    education: [{
        school: {
            type: String,
            required: false // Now optional
        },
        degree: {
            type: String,
            required: false // Now optional
        },
        city: {
            type: String,
            required: false // Now optional
        },
        country: {
            type: String,
            required: false // Now optional
        },
        startDate: {
            type: String,
            required: false // Now optional
        },
        endDate: {
            type: String,
            required: false // Now optional
        },
        edugpa: {
            type: String,
            required: false // Now optional
        }
    }],

    Achievement: [{
        atitle: {
            type: String,
            required: false // Now optional
        }
    }],

    Project: [{
        ptitle: {
            type: String,
            required: false // Now optional
        },
        pstartDate: {
            type: String,
            required: false // Now optional
        },
        penddate: {
            type: String,
            required: false // Now optional
        },
        poverview: {
            type: String,
            required: false // Now optional
        }
    }],

    skills: [{
        skill: {
            type: String,
            required: false // Now optional
        }
    }],

    hobbies: [{
        hobbies: {
            type: String,
            required: false // Now optional
        }
    }],

    about: {
        type: String,
        required: false // Now optional
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);
