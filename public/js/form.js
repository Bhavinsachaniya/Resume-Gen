//* scroll button at the top

function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
                window.scrollTo({
                    //* Offset by the navbar height
                    top: section.offsetTop - document.querySelector('.nav-section').offsetHeight, 
                    behavior: 'smooth', // Smooth scrolling effect
                });
    }

}

let projectcount = 1;

function addProject() {
    projectcount++;
    let projectList = document.getElementById('projects-list');

    if (!projectList) {
        console.error('project list container not found');
        return;
    }

    let projectDiv = document.createElement('div');
    projectDiv.classList.add('experience-item');

    projectDiv.innerHTML = `
                            <div class="form-group" id="form-group-Project">
                                <label for="Projecttitle" class="form-label">Project Title</label>
                                <input type="text" id="Projecttitle" name="Projecttitle" class="form-input" required aria-required="true">
                            </div>

                            <div class="form-row">
                            <div class="form-field">
                                <label for="projectStartDate" class="form-label">Start</label>
                                <input type="month" id="ProjectStartDate" name="ProjectStartDate" class="form-input" required aria-required="true">
                            </div>
                            <div class="form-field">
                                <label for="ProjectEndDate" class="form-label">End</label>
                                <input type="month" id="ProjectEndDate" name="ProjectEndDate" class="form-input">
                            </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="Project-overview" class="form-label">Project overview</label>
                                <textarea id="Project-overview-${projectcount}" name="Project-overview" class="description form-input text-area" required aria-required="true"></textarea>
                                <button type="button" id="Project-overview-genrate-with-ai-${projectcount}" onclick="Genratedata('Project-overview-${projectcount}' , 'Project-overview-genrate-with-ai-${projectcount}' , '3')" class="genratewithai btn btn-primary">Generate with AI</button>
                            </div>  

                            <button type="button" class="btn btn-danger remove-btn">Remove Achievement</button>
                            <button type="button" id="addProjects" class="btn btn-outline-projects">Add Project</button>
                            `;

    projectList.appendChild(projectDiv);

    //* Remove the "Add Experience" button after it has been clicked

    let projectsButton = document.querySelector('.btn-outline-projects');

    if (projectsButton) {
        projectsButton.remove();
    }

    //* Attach event listener to the remove button

    projectDiv
            .querySelector('.remove-btn')
            .addEventListener('click', function () {
                projectList.removeChild(projectDiv);
            });
}

//* Using the ID for the "Add Achievements" button

document
        .getElementById('addProjects') 
        .addEventListener('click', addProject);




//* add Achievements


function addAchievement() {

    const achievementsForm = document.getElementById('AchievementsForm'); 

    if (!achievementsForm) {
        console.error('Achievements form container not found');
        return;
    }

    //* Create a wrapper for the new achievement fields

    const achievementDiv = document.createElement('div');
    achievementDiv.classList.add('form-group', 'achievement-item');

    //*Add the HTML structure for the new achievement

    achievementDiv.innerHTML = `
                                <div class="form-group">
                                    <label for="Achievements" class="form-label">Achievement Title</label>
                                    <input type="text" id="Achievements" name="Achievements" class="form-input" required aria-required="true">
                                </div>
                                
                                <button type="button" class="btn btn-danger remove-btn">Remove Achievement</button>
                            `;



    //* Append the new achievement fields to the form

    achievementsForm.appendChild(achievementDiv);

    //* Attach an event listener to the remove button

    achievementDiv
                .querySelector('.remove-btn')
                .addEventListener('click', function () {
                    achievementsForm.removeChild(achievementDiv);
                });

}

//* Using the ID for the "Add Achievements" button

document
        .getElementById('addAchievements') 
        .addEventListener('click', addAchievement);




//* add skills

function addskill() {

    console.log('addskill function triggered');

    let formGroupSkill = document.getElementById('form-group-skill');

    //*Create a new div container for each skill input

    let newSkillGroup = document.createElement('div');
    newSkillGroup.classList.add('form-group');

    //*Create the label and input elements

    let label = document.createElement('label');
    let input = document.createElement('input');

    //* Set the label and input properties

    label.classList.add('form-label');
    label.textContent = 'Skill';
    input.type = 'text';
    input.classList.add('form-input');
    input.setAttribute('name', 'skill');
    input.setAttribute('required', 'true');
    input.setAttribute('aria-required', 'true');

    //* Create the cross button (X)

    let removeButton = document.createElement('button');
    removeButton.textContent = '×'; // Cross symbol
    removeButton.classList.add('remove-skill');
    removeButton.type = 'button';

    //* Add event listener to remove the skill input when clicked

    removeButton.addEventListener('click', function () {
        newSkillGroup.remove(); 
    });

    //* Append label, input, and remove button to the new skill group

    newSkillGroup.appendChild(label);
    newSkillGroup.appendChild(input);
    newSkillGroup.appendChild(removeButton);

    //* Append the new skill group to the form

    formGroupSkill.appendChild(newSkillGroup);

    //* Optionally clear the current input field (optional)

    let currentInput = formGroupSkill.querySelector('input');
    
}

//* Add event listener to the button

document.getElementById('addskill').addEventListener('click', addskill);




//* add hobbies

function addhobbies() {
    console.log('addhobbies function triggered');

    let formGrouphobbies = document.getElementById('form-group-hobbies');

    //*Create a new div container for each skill input

    let newhobbiesGroup = document.createElement('div');
    newhobbiesGroup.classList.add('form-group');

    //* Create the label and input elements

    let label = document.createElement('label');
    let input = document.createElement('input');

    //* Set the label and input properties
    
    label.classList.add('form-label');
    label.textContent = 'hobbies';
    input.type = 'text';
    input.classList.add('form-input');
    input.setAttribute('name', 'hobbies');
    input.setAttribute('required', 'true');
    input.setAttribute('aria-required', 'true');

    //* Create the cross button (X)

    let removeButton = document.createElement('button');
    removeButton.textContent = '×'; // Cross symbol
    removeButton.classList.add('remove-hobbies');
    removeButton.type = 'button';

    //* Add event listener to remove the skill input when clicked

    removeButton.addEventListener('click', function () {
        newhobbiesGroup.remove(); 
    });

    // *Append label, input, and remove button to the new skill group

    newhobbiesGroup.appendChild(input);
    newhobbiesGroup.appendChild(label);
    newhobbiesGroup.appendChild(removeButton);

    //* Append the new skill group to the form

    formGrouphobbies.appendChild(newhobbiesGroup);

    //* Optionally clear the current input field (optional)

    let currentInput = formGrouphobbies.querySelector('input');
    
}

//*Add event listener to the button

document.getElementById('addhobbies').addEventListener('click', addhobbies);





//* Add Experience

let descriptioncount = 1;

document.addEventListener('DOMContentLoaded', function () {


    function addExperience() {

        descriptioncount++;
        let experienceList = document.getElementById('experience-list');

        if (!experienceList) {
            console.error('Experience list container not found');
            return;
        }

        let experienceDiv = document.createElement('div');

        experienceDiv.classList.add('experience-item');

        experienceDiv.innerHTML = `
                                            <div class="form-row">
                                                <div class="form-field">
                                                    <label for="jobTitle" class="form-label">Job Title</label>
                                                    <input type="text" name="jobTitle" class="form-input" required aria-required="true">
                                                </div>
                                                <div class="form-field">
                                                    <label for="companyName" class="form-label">Company Name</label>
                                                    <input type="text" name="companyName" class="form-input" required aria-required="true">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-field">
                                                    <label for="expCity" class="form-label">City</label>
                                                    <input type="text" name="expCity" class="form-input" required aria-required="true">
                                                </div>
                                                <div class="form-field">
                                                    <label for="country" class="form-label">Country</label>
                                                    <input type="text" name="country" class="form-input" required aria-required="true">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-field">
                                                    <label for="startDate" class="form-label">Start Date</label>
                                                    <input type="month" name="startDate" class="form-input" required aria-required="true">
                                                </div>
                                                <div class="form-field">
                                                    <label for="endDate" class="form-label">End Date</label>
                                                    <input type="month" name="endDate" class="form-input">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                            <label for="description" class="form-label">Description</label>
                                            <textarea id="description-${descriptioncount}" name="description" class="description form-input text-area" required aria-required="true"></textarea>
                                            <button type="button" id="genratewithai-${descriptioncount}" onclick="Genratedata('description-${descriptioncount}' , 'genratewithai-${descriptioncount}' , '1')" class="genratewithai btn btn-primary">Generate with AI</button>
                                            </div>
                                            
                                            <button type="button" class="btn btn-danger remove-btn">Remove Experience</button>
                                            <button type="button" class="btn btn-outline-experience">Add Experience</button>
                                        `;

        experienceList.appendChild(experienceDiv);

        //* Remove the "Add Experience" button after it has been clicked

        let experienceButton = document.querySelector('.btn-outline-experience');

        if (experienceButton) {
            experienceButton.remove();
        }

        //* Attach event listener to the remove button

        experienceDiv
            .querySelector('.remove-btn')
            .addEventListener('click', function () {
                experienceList.removeChild(experienceDiv);
            });
    }


        //* Add Education

        function addEducation() {
            let educationList = document.getElementById('education-list');

            if (!educationList) {
                console.error('Education list container not found');
                return;
            }

            let educationDiv = document.createElement('div');
            educationDiv.classList.add('education-item');

            educationDiv.innerHTML = `
                                    <div class="form-row">
                                    <div class="form-field">
                                    <label for="school" class="form-label">School</label>
                                    <input type="text" id="school" name="eduschool" class="form-input" required aria-required="true">
                                    </div>
                                    <div class="form-field">
                                    <label for="degree" class="form-label">Degree</label>
                                    <input type="text" id="degree" name="edudegree" class="form-input" required aria-required="true">
                                    </div>
                                    </div>
                    
                                    <div class="form-row">
                                    <div class="form-field">
                                    <label for="eduCity" class="form-label">City</label>
                                    <input type="text" id="eduCity" name="educity" class="form-input" required aria-required="true">
                                    </div>
                                    <div class="form-field">
                                    <label for="eduCountry" class="form-label">Country</label>
                                    <input type="text" id="eduCountry" name="educountry" class="form-input" required aria-required="true">
                                    </div>
                                    </div>
                    
                                    <div class="form-row">
                                    <div class="form-field">
                                    <label for="eduStartDate" class="form-label">Start date</label>
                                    <input type="month" id="eduStartDate" name="edustartdate" class="form-input" required aria-required="true">
                                    </div>
                                    <div class="form-field">
                                    <label for="eduEndDate" class="form-label">End date</label>
                                    <input type="month" id="eduEndDate" name="eduenddate" class="form-input">
                                    </div>  
                                    </div>

                                    <div class="form-row">
                                    <div class="form-field">
                                    <label for="eduGPA" class="form-label">GPA</label>
                                    <input type="number" id="eduGPA" name="eduGPA" class="form-input" placeholder="out of 4" required aria-required="true">
                                    </div>
                                    </div>

                                    <button type="button" class="btn btn-danger remove-btn">Remove Education</button>
                                    <button type="button" class="btn btn-outline-education">Add Education</button>
                                `;

            educationList.appendChild(educationDiv);

            //*Remove the "Add Education" button after it has been clicked

            let educationButton = document.querySelector('.btn-outline-education');
            if (educationButton) {
                educationButton.remove();
            }

            //* Attach event listener to the remove button

            educationDiv
                .querySelector('.remove-btn')
                .addEventListener('click', function () {
                    educationList.removeChild(educationDiv);
                });
        }

        //* Bind event listeners to their respective buttons

        document
                .querySelector('.btn-outline-experience')
                .addEventListener('click', addExperience);
        document
                .querySelector('.btn-outline-education')
                .addEventListener('click', addEducation);
            
});



//* ai genrated data create


async function Genratedata(questionid, id , number) {

    const generatewithai = document.getElementById(id);
    console.log(`Button clicked by ${id}`);

    console.log(generatewithai);

        const question = document.getElementById(questionid).value;
        console.log(question);

        //* Get value from the textarea
        console.log('Button clicked, function 1 executed');

        try
        {
            //* Sending the question to the backend

            let response = await fetch('http://localhost:3000/resumeform/genrate',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                        question: question,
                        number
                }),   //* Send the question in the request body
            });

            //* Parse the backend response

            let backendresponse = await response.json();

            if (backendresponse.answer) {
                document.getElementById(questionid).value = backendresponse.answer;
            } else {
                console.log('Error: No answer returned from backend.');
            }

            //* Check if the backend response's question matches the original question

            if (question === backendresponse.question)
            {
                //* Update the textarea with the AI-generated answer

                document.getElementById(questionid).value = backendresponse.answer;
            }
            else 
            {
                console.log('Error: The response does not match the question.');
            }
        } 
        catch (error) 
        {
            //* Log any errors during the fetch operation   

            console.log('Error:', error); 
        }
    };




//* TemplateSelectedIs(1) function for this
function TemplateSelectedIs(templateNumber) {
    // Redirect to /resumeform/templateNumber
    window.location.href = `/resumeform/${templateNumber}`;
    console.log("chalrha he");
}
