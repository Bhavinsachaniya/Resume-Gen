
let experienceCount = 1
let projectCount = 1
let educationCount = 1

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the form with event listeners and remove buttons
  initializeFormSections()

  function initializeFormSections () {
    // Set up the experience section
    setupSection(
      'experience',
      'experience-list',
      experienceCount,
      addExperience
    )

    // Set up the project section
    setupSection('project', 'project-list', projectCount, addProject)

    // Set up the education section
    setupSection('education', 'education-list', educationCount, addEducation)
  }

  /**
   * Sets up a section with proper event listeners and remove buttons
   * @param {string} sectionType - Type of section (experience, project, education)
   * @param {string} listId - ID of the list container element
   * @param {number} count - Current count of items in the section
   * @param {Function} addFunction - Function to add a new item to this section
   */
  function setupSection (sectionType, listId, count, addFunction) {
    const list = document.getElementById(listId)
    if (!list) return

    // Add remove buttons to existing items if needed
    const items = list.querySelectorAll(`.${sectionType}-item`)
    if (items.length > 0) {
      items.forEach((item, index) => {
        // Add remove button if not present
        if (!item.querySelector(`.remove-${sectionType}-btn`)) {
          addRemoveButton(item, sectionType, list)
        }

        // Remove existing add buttons
        const addButtons = item.querySelectorAll(`.button-add-${sectionType}`)
        addButtons.forEach(btn => btn.remove())

        // Add the add button only to the last item
        if (index === items.length - 1) {
          addAddButton(item, sectionType, addFunction)
        }
      })
    }

    // Add listeners to existing buttons
    const addBtn = list.querySelector(`.button-add-${sectionType}`)
    if (addBtn) {
      // Remove existing listeners to prevent duplicates
      const newAddBtn = addBtn.cloneNode(true)
      addBtn.parentNode.replaceChild(newAddBtn, addBtn)
      newAddBtn.addEventListener('click', addFunction)
    }
  }

  /**
   * Adds a remove button to a section item
   * @param {HTMLElement} item - The section item element
   * @param {string} sectionType - Type of section (experience, project, education)
   * @param {HTMLElement} list - The parent list element
   */
  function addRemoveButton (item, sectionType, list) {
    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.className = `button button-danger remove-${sectionType}-btn`
    removeButton.textContent = `Remove ${
      sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
    }`

    // Add the remove event listener
    removeButton.addEventListener('click', function () {
      handleRemoveItem(item, list, sectionType)
    })

    // Insert before any existing add button or append to the end
    const addButton = item.querySelector(`[class*="button-add-"]`)
    if (addButton) {
      item.insertBefore(removeButton, addButton)
    } else {
      item.appendChild(removeButton)
    }
  }

  /**
   * Adds an add button to a section item
   * @param {HTMLElement} item - The section item element
   * @param {string} sectionType - Type of section (experience, project, education)
   * @param {Function} addFunction - Function to add a new item to this section
   */
  function addAddButton (item, sectionType, addFunction) {
    const addButton = document.createElement('button')
    addButton.type = 'button'
    addButton.className = `button button-add-${sectionType}`
    addButton.textContent = `Add ${
      sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
    }`
    addButton.addEventListener('click', addFunction)
    item.appendChild(addButton)
  }

  /**
   * Handles removal of a section item
   * @param {HTMLElement} item - The item to remove
   * @param {HTMLElement} list - The parent list element
   * @param {string} sectionType - Type of section (experience, project, education)
   */
  function handleRemoveItem (item, list, sectionType) {
    // Don't remove if it's the only item - just clear the fields
    if (list.children.length <= 1) {
      clearFormFields(item)
      return
    }

    // Check if this is the last item with the add button
    const hasAddButton = item.querySelector(`.button-add-${sectionType}`)

    // Remove the item
    list.removeChild(item)

    // If we removed the item with the add button, add it to the new last item
    if (hasAddButton) {
      const newLastItem = list.querySelector(`.${sectionType}-item:last-child`)
      if (newLastItem) {
        addAddButton(
          newLastItem,
          sectionType,
          sectionType === 'experience'
            ? addExperience
            : sectionType === 'project'
            ? addProject
            : addEducation
        )
      }
    }
  }

  /**
   * Clears all form fields in an element
   * @param {HTMLElement} element - The element containing form fields to clear
   */
  function clearFormFields (element) {
    const inputs = element.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.value = ''
    })
  }

  /**
   * Add Experience Function - Creates a new experience item
   */
  function addExperience () {
    console.log(experienceCount)
    experienceCount++
    console.log(experienceCount)
    const experienceList = document.getElementById('experience-list')

    if (!experienceList) {
      console.error('Experience list container not found')
      return
    }

    // Remove all existing add buttons
    removeAddButtons(experienceList, 'experience')

    // Create new experience item
    const experienceDiv = document.createElement('div')
    experienceDiv.classList.add('experience-item')

    experienceDiv.innerHTML = `
            <div class="form-grid">
                <div><label>Job Title</label><input type="text" name="jobTitle${experienceCount}" required></div>
                <div><label>Company Name</label><input type="text" name="company${experienceCount}" required></div>
                <div><label>City</label><input type="text" name="jobCity${experienceCount}" required></div>
                <div><label>Country</label><input type="text" name="jobCountry${experienceCount}" required></div>
                <div><label>Start Date</label><input type="month" name="jobStart${experienceCount}" required></div>
                <div><label>End Date</label><input type="month" name="jobEnd${experienceCount}" required></div>
            </div>

            <div class="description-container-1-1-1">
              <label>Description</label>
              <textarea name="jobDesc"  id="Experience-description-${experienceCount}" required></textarea>
                <button class="generate-button"id="Experience-genratewithai-${experienceCount}"  onclick="AIGenratedData('Experience-description-${experienceCount}' , 'Experience-genratewithai-${experienceCount}', '1')" type="button">Generate with AI</button>
          </div>
        `

    experienceList.appendChild(experienceDiv)

    // Add remove button
    addRemoveButton(experienceDiv, 'experience', experienceList)

    // Add add button to the new last item
    addAddButton(experienceDiv, 'experience', addExperience)
  }

  /**
   * Add Project Function - Creates a new project item
   */
  function addProject () {
    projectCount++
    const projectList = document.getElementById('project-list')

    if (!projectList) {
      console.error('Project list container not found')
      return
    }

    // Remove all existing add buttons
    removeAddButtons(projectList, 'project')

    // Create new project item
    const projectDiv = document.createElement('div')
    projectDiv.classList.add('project-item')

    projectDiv.innerHTML = `
            <div class="form-grid">
                <div><label>Project Title</label><input type="text" name="ProjectTitle${projectCount}" required></div>
                <div><label>Project Start Date</label><input type="month" name="ProjectStartDate${projectCount}" required></div>
                <div><label>Project End Date</label><input type="month" name="ProjectEndDate${projectCount}" required></div>
            </div>

            <div class="description-container-1-1-1">
        <label>Project Overview</label>
        <textarea name="Project-overview" id="Project-description-${projectCount}" required></textarea>
        <button class="generate-button" id="Project-genratewithai-${projectCount}"  onclick='AIGenratedData("Project-description-${projectCount}' , 'Project-genratewithai-${projectCount}' , '2')" type="button">Generate with AI</button>
</div>
        `

    projectList.appendChild(projectDiv)

    // Add remove button
    addRemoveButton(projectDiv, 'project', projectList)

    // Add add button to the new last item
    addAddButton(projectDiv, 'project', addProject)
  }

  /**
   * Add Education Function - Creates a new education item
   */
  function addEducation () {
    educationCount++
    const educationList = document.getElementById('education-list')

    if (!educationList) {
      console.error('Education list container not found')
      return
    }

    // Remove all existing add buttons
    removeAddButtons(educationList, 'education')

    // Create new education item
    const educationDiv = document.createElement('div')
    educationDiv.classList.add('education-item')

    educationDiv.innerHTML = `
            <div class="form-grid">
                <div>
                    <label>School / University</label>
                    <input type="text" name="eduschool${educationCount}" placeholder="e.g. Stanford University" required>
                </div>
                <div>
                    <label>Degree</label>
                    <input type="text" name="edudegree${educationCount}" placeholder="e.g. B.Tech in IT" required>
                </div>
                <div>
                    <label>City</label>
                    <input type="text" name="educity${educationCount}" placeholder="e.g. Ahmedabad" required>
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" name="educountry${educationCount}" placeholder="e.g. India" required>
                </div>
                <div>
                    <label>Start Date</label>
                    <input type="month" name="edustartdate${educationCount}" required>
                </div>
                <div>
                    <label>End Date</label>
                    <input type="month" name="eduenddate${educationCount}" required>
                </div>
            </div>

            <div class="description-container-1-1-1">
                <label>GPA / Percentage</label>
                <input type="text" name="edugpa${educationCount}" placeholder="e.g. 8.5 CGPA or 75%" required>
            </div>
        `

    educationList.appendChild(educationDiv)

    // Add remove button
    addRemoveButton(educationDiv, 'education', educationList)

    // Add add button to the new last item
    addAddButton(educationDiv, 'education', addEducation)
  }

  /**
   * Removes all add buttons from a section list
   * @param {HTMLElement} list - The list element to process
   * @param {string} sectionType - Type of section (experience, project, education)
   */
  function removeAddButtons (list, sectionType) {
    const addButtons = list.querySelectorAll(`.button-add-${sectionType}`)
    addButtons.forEach(button => button.remove())
  }
})
const steps = document.querySelectorAll('.container-1-1-1')
let currentStep = 0

document.querySelectorAll('.next').forEach(button => {
  button.addEventListener('click', () => {
    steps[currentStep].classList.remove('active')
    currentStep = Math.min(currentStep + 1, steps.length - 1)
    steps[currentStep].classList.add('active')
  })
})

document.querySelectorAll('.prev').forEach(button => {
  button.addEventListener('click', () => {
    steps[currentStep].classList.remove('active')
    currentStep = Math.max(currentStep - 1, 0)
    steps[currentStep].classList.add('active')
  })
})

function addSkill () {
  const container = document.getElementById('skillsContainer')
  const div = document.createElement('div')
  div.classList.add('skill-input')
  div.innerHTML = `<input type="text" name="skills[]" placeholder="Enter a skill">`
  container.appendChild(div)
}

async function AIGenratedData(questionid, id, number) {
  const generatewithai = document.getElementById(id)
  console.log(`Button clicked by ${id}`)

  console.log(generatewithai)

  const question = document.getElementById(questionid).value
  console.log(question)

  //* Get value from the textarea
  console.log('Button clicked, function 1 executed')

  try {
    //* Sending the question to the backend

    let response = await fetch(
      'http://localhost:3000/api/resumeform/genrateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          number
        }) //* Send the question in the request body
      }
    )

    //* Parse the backend response

    let backendresponse = await response.json()

    if (backendresponse.answer) {
      document.getElementById(questionid).value = backendresponse.answer
    } else {
      console.log('Error: No answer returned from backend.')
    }

    //* Check if the backend response's question matches the original question

    if (question === backendresponse.question) {
      //* Update the textarea with the AI-generated answer

      document.getElementById(questionid).value = backendresponse.answer
    } else {
      console.log('Error: The response does not match the question.')
    }
  } catch (error) {
    //* Log any errors during the fetch operation

    console.log('Error:', error)
  }
}


function collectFormData() {
  // Contact details
  const contactfirstname = document.querySelector('input[name="firstName"]').value;
  const contactlastname = document.querySelector('input[name="lastName"]').value;
  const contactcity = document.querySelector('input[name="city"]').value;
  const contactpostalcode = document.querySelector('input[name="postal"]').value;
  const contactphone = document.querySelector('input[name="phone"]').value;
  const contactemail = document.querySelector('input[name="email"]').value;

  // Experience data - collect all experiences
  const jobTitle = [];
  const companyName = [];
  const expCity = [];
  const country = [];
  const startDate = [];
  const endDate = [];
  const descriptions = [];
  
  document.querySelectorAll('.experience-item').forEach((item, index) => {
    const nameIndex = index === 0 ? '' : index + 1;
    jobTitle.push(item.querySelector(`input[name="jobTitle${nameIndex}"]`)?.value || '');
    companyName.push(item.querySelector(`input[name="companyName${nameIndex}"]`)?.value || '');
    expCity.push(item.querySelector(`input[name="expCity${nameIndex}"]`)?.value || '');
    country.push(item.querySelector(`input[name="country${nameIndex}"]`)?.value || '');
    startDate.push(item.querySelector(`input[name="startDate${nameIndex}"]`)?.value || '');
    endDate.push(item.querySelector(`input[name="endDate${nameIndex}"]`)?.value || '');
    descriptions.push(item.querySelector(`textarea[name="description${nameIndex}"]`)?.value || '');
  });

  // Education data - collect all educations
  const eduschool = Array.from(document.querySelectorAll('input[name="eduschool"], input[name="eduschool[]"]')).map(input => input.value);
  const edudegree = Array.from(document.querySelectorAll('input[name="edudegree"], input[name="edudegree[]"]')).map(input => input.value);
  const educity = Array.from(document.querySelectorAll('input[name="educity"], input[name="educity[]"]')).map(input => input.value);
  const educountry = Array.from(document.querySelectorAll('input[name="educountry"], input[name="educountry[]"]')).map(input => input.value);
  const edustartdate = Array.from(document.querySelectorAll('input[name="edustartdate"], input[name="edustartdate[]"]')).map(input => input.value);
  const eduenddate = Array.from(document.querySelectorAll('input[name="eduenddate"], input[name="eduenddate[]"]')).map(input => input.value);
  const edugpa = Array.from(document.querySelectorAll('input[name="edugpa"], input[name="edugpa[]"]')).map(input => input.value);

  // Project data
  const projecttitle = [document.querySelector('input[name="ProjectTitle"]').value];
  const projectStartDate = [document.querySelector('input[name="ProjectStartDate"]').value];
  const projectEndDate = [document.querySelector('input[name="ProjectEndDate"]').value];
  const projectoverview = [document.querySelector('textarea[name="Project-overview"]').value];

  // Achievements data (empty array since it's not in your form)
  const Achievementstitle = [];

  // Hobbies data (empty array since it's not in your form)
  const hobbies = [];

  // Skills data
  const skillInputs = document.querySelectorAll('input[name="skills[]"]');
  const skill = Array.from(skillInputs).map(input => input.value).filter(val => val.trim() !== '');

  // About data
  const abouttext = document.querySelector('textarea[name="summary"]').value;
  
  return {
    // Contact data
    contactfirstname,
    contactlastname,
    contactcity,
    contactpostalcode,
    contactphone,
    contactemail,

    // Experience data
    jobTitle,
    companyName,
    expCity,
    country,
    startDate,
    endDate,
    descriptions,

    // Education data
    eduschool,
    edudegree,
    educity,
    educountry,
    edustartdate,
    eduenddate,
    edugpa,

    // Achievements data
    Achievementstitle,

    // Project data
    projecttitle,
    projectStartDate,
    projectEndDate,
    projectoverview,

    // Hobbies data
    hobbies,

    // Skills data
    skill,

    // About data
    abouttext,
  };
}

async function submitFormData() {
  try {
    const formData = collectFormData();

    // Send data as JSON to backend API
    const response = await fetch('http://localhost:3000/api/resumeform/datasave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit form');
    }

    // Show success alert and redirect
    showAlert('Resume created successfully!', 'success');

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);

  } catch (error) {
    console.error('Error:', error);
    showAlert(error.message, 'error');
  }
}

function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `custom-alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
  alert.textContent = message;
  alertContainer.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

document.getElementById('finish').addEventListener('click', (e) => {
  e.preventDefault();
  submitFormData();
});



  
    let currentStep = 0;

    document.querySelectorAll('.next').forEach(button => {
      button.addEventListener('click', () => {
        steps[currentStep].classList.remove('active');
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        steps[currentStep].classList.add('active');
      });
    });

    document.querySelectorAll('.prev').forEach(button => {
      button.addEventListener('click', () => {
        steps[currentStep].classList.remove('active');
        currentStep = Math.max(currentStep - 1, 0);
        steps[currentStep].classList.add('active');
      });
    });

    function addSkill() {
      const container = document.getElementById('skillsContainer');
      const div = document.createElement('div');
      div.classList.add('skill-input');
      div.innerHTML = `<input type="text" name="skills[]" placeholder="Enter a skill">`;
      container.appendChild(div);
    }
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the data from the API before form submission
    const response = await fetch('http://localhost:3000/api/resumeform/show', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch resume data');
    }

    const data = await response.json();
    console.log('Fetched Resume Data:', data);

    // Auto-populate form fields with the fetched data

    // Contact data
    if (data.resume) {
      document.querySelector('input[name="firstName"]').value = data.resume.firstname || '';
      document.querySelector('input[name="lastName"]').value = data.resume.lastname || '';
      document.querySelector('input[name="city"]').value = data.resume.city || '';
      document.querySelector('input[name="postal"]').value = data.resume.postalcode || '';
      document.querySelector('input[name="phone"]').value = data.resume.phone || '';
      document.querySelector('input[name="email"]').value = data.resume.email || '';
    }

    // Experience data
    if (data.resume && data.resume.experience && Array.isArray(data.resume.experience)) {
      data.resume.experience.forEach((exp, index) => {
        // You may need to dynamically add rows for experience if there are multiple entries
        if (index === 0) { // Assuming only one experience field
          document.querySelector('input[name="jobTitle"]').value = exp.jobTitle || '';
          document.querySelector('input[name="company"]').value = exp.companyName || '';
          document.querySelector('input[name="jobCity"]').value = exp.expCity || '';
          document.querySelector('input[name="jobCountry"]').value = exp.country || '';
          document.querySelector('input[name="jobStart"]').value = exp.startDate || '';
          document.querySelector('input[name="jobEnd"]').value = exp.endDate || '';
          document.querySelector('textarea[name="jobDesc"]').value = exp.description || '';
        }
      });
    }

    // Education data
    if (data.resume && data.resume.education && Array.isArray(data.resume.education)) {
      data.resume.education.forEach((edu, index) => {
        // Dynamically add education fields if needed
        if (index === 0) { // Assuming only one education field
          document.querySelector('input[name="eduschool"]').value = edu.school || '';
          document.querySelector('input[name="edudegree"]').value = edu.degree || '';
          document.querySelector('input[name="educity"]').value = edu.city || '';
          document.querySelector('input[name="educountry"]').value = edu.country || '';
          document.querySelector('input[name="edustartdate"]').value = edu.startDate || '';
          document.querySelector('input[name="eduenddate"]').value = edu.endDate || '';
          document.querySelector('input[name="edugpa"]').value = edu.edugpa || '';
        }
      });
    }

    // Project data
    if (data.resume && data.resume.Project && Array.isArray(data.resume.Project)) {
      data.resume.Project.forEach((proj, index) => {
        // Dynamically add project fields if needed
        if (index === 0) { // Assuming only one project field
          document.querySelector('input[name="ProjectTitle"]').value = proj.ptitle || '';
          document.querySelector('input[name="ProjectStartDate"]').value = proj.pstartDate || '';
          document.querySelector('input[name="ProjectEndDate"]').value = proj.penddate || '';
          document.querySelector('textarea[name="Project-overview"]').value = proj.poverview || '';
        }
      });
    }

    // Skills data
    if (data.resume && data.resume.skills && Array.isArray(data.resume.skills)) {
      const skillInputs = document.querySelectorAll('input[name="skills[]"]');
      data.resume.skills.forEach((skill, index) => {
        if (skillInputs[index]) {
          skillInputs[index].value = skill.skill || ''; // Assuming skill is an object with 'skill' property
        }
      });
    }

    // About data
    if (data.resume && data.resume.about) {
      document.querySelector('textarea[name="summary"]').value = data.resume.about || '';
    }

  } catch (error) {
    console.error('Error fetching resume data:', error.message);
    showAlert('Failed to load resume data.', 'error');
  }
});


const finish = document.getElementById('finish');
finish.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Contact details
  const contactfirstname = document.querySelector('input[name="firstName"]').value;
  const contactlastname = document.querySelector('input[name="lastName"]').value;
  const contactcity = document.querySelector('input[name="city"]').value;
  const contactpostalcode = document.querySelector('input[name="postal"]').value;
  const contactphone = document.querySelector('input[name="phone"]').value;
  const contactemail = document.querySelector('input[name="email"]').value;

  // Experience data
  const jobTitle = [document.querySelector('input[name="jobTitle"]').value];
  const companyName = [document.querySelector('input[name="company"]').value];
  const expCity = [document.querySelector('input[name="jobCity"]').value];
  const country = [document.querySelector('input[name="jobCountry"]').value];
  const startDate = [document.querySelector('input[name="jobStart"]').value];
  const endDate = [document.querySelector('input[name="jobEnd"]').value];
  const descriptions = [document.querySelector('textarea[name="jobDesc"]').value];

  // Education data
  const eduschool = [document.querySelector('input[name="eduschool"]').value];
  const edudegree = [document.querySelector('input[name="edudegree"]').value];
  const educity = [document.querySelector('input[name="educity"]').value];
  const educountry = [document.querySelector('input[name="educountry"]').value];
  const edustartdate = [document.querySelector('input[name="edustartdate"]').value];
  const eduenddate = [document.querySelector('input[name="eduenddate"]').value];
  const edugpa = [document.querySelector('input[name="edugpa"]').value];

  // Project data
  const projecttitle = [document.querySelector('input[name="ProjectTitle"]').value];
  const projectStartDate = [document.querySelector('input[name="ProjectStartDate"]').value];
  const projectEndDate = [document.querySelector('input[name="ProjectEndDate"]').value];
  const projectoverview = [document.querySelector('textarea[name="Project-overview"]').value];

  // Achievements data
  const Achievementstitle = [];

  // Hobbies data
  const hobbies = [];

  // Skills data
  const skillInputs = document.querySelectorAll('input[name="skills[]"]');
  const skill = Array.from(skillInputs).map(input => input.value).filter(val => val.trim() !== '');

  // About data
  const abouttext = document.querySelector('textarea[name="summary"]').value;

  try {
    // Submit the data to the backend API
    const response = await fetch('http://localhost:3000/api/resumeform/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Contact data
        contactfirstname,
        contactlastname,
        contactcity,
        contactpostalcode,
        contactphone,
        contactemail,

        // Experience data
        jobTitle,
        companyName,
        expCity,
        country,
        startDate,
        endDate,
        descriptions,

        // Education data
        eduschool,
        edudegree,
        educity,
        educountry,
        edustartdate,
        eduenddate,
        edugpa,

        // Achievements data
        Achievementstitle,

        // Project data
        projecttitle,
        projectStartDate,
        projectEndDate,
        projectoverview,

        // Hobbies data
        hobbies,

        // Skills data
        skill,

        // About data
        abouttext,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit form');
    }

    // Show success alert and redirect
    showAlert('Resume created successfully!', 'success');
    
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
  } catch (error) {
    console.error('Error:', error.message);
    showAlert('An error occurred. Please try again.', 'error');
  }
});

    



























    
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the data from the API before form submission
    const response = await fetch('http://localhost:3000/api/resumeform/show', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch resume data');
    }

    const data = await response.json();
    console.log('Fetched Resume Data:', data);

    // Auto-populate form fields with the fetched data

    // Contact data
    if (data.resume) {
      document.querySelector('input[name="firstName"]').value = data.resume.firstname || '';
      document.querySelector('input[name="lastName"]').value = data.resume.lastname || '';
      document.querySelector('input[name="city"]').value = data.resume.city || '';
      document.querySelector('input[name="postal"]').value = data.resume.postalcode || '';
      document.querySelector('input[name="phone"]').value = data.resume.phone || '';
      document.querySelector('input[name="email"]').value = data.resume.email || '';
    }

    // Experience data
    if (data.resume && data.resume.experience && Array.isArray(data.resume.experience)) {
      data.resume.experience.forEach((exp, index) => {
        // You may need to dynamically add rows for experience if there are multiple entries
        if (index === 0) { // Assuming only one experience field
          document.querySelector('input[name="jobTitle"]').value = exp.jobTitle || '';
          document.querySelector('input[name="company"]').value = exp.companyName || '';
          document.querySelector('input[name="jobCity"]').value = exp.expCity || '';
          document.querySelector('input[name="jobCountry"]').value = exp.country || '';
          document.querySelector('input[name="jobStart"]').value = exp.startDate || '';
          document.querySelector('input[name="jobEnd"]').value = exp.endDate || '';
          document.querySelector('textarea[name="jobDesc"]').value = exp.description || '';
        }
      });
    }

    // Education data
    if (data.resume && data.resume.education && Array.isArray(data.resume.education)) {
      data.resume.education.forEach((edu, index) => {
        // Dynamically add education fields if needed
        if (index === 0) { // Assuming only one education field
          document.querySelector('input[name="eduschool"]').value = edu.school || '';
          document.querySelector('input[name="edudegree"]').value = edu.degree || '';
          document.querySelector('input[name="educity"]').value = edu.city || '';
          document.querySelector('input[name="educountry"]').value = edu.country || '';
          document.querySelector('input[name="edustartdate"]').value = edu.startDate || '';
          document.querySelector('input[name="eduenddate"]').value = edu.endDate || '';
          document.querySelector('input[name="edugpa"]').value = edu.edugpa || '';
        }
      });
    }

    // Project data
    if (data.resume && data.resume.Project && Array.isArray(data.resume.Project)) {
      data.resume.Project.forEach((proj, index) => {
        // Dynamically add project fields if needed
        if (index === 0) { // Assuming only one project field
          document.querySelector('input[name="ProjectTitle"]').value = proj.ptitle || '';
          document.querySelector('input[name="ProjectStartDate"]').value = proj.pstartDate || '';
          document.querySelector('input[name="ProjectEndDate"]').value = proj.penddate || '';
          document.querySelector('textarea[name="Project-overview"]').value = proj.poverview || '';
        }
      });
    }

    // Skills data
    if (data.resume && data.resume.skills && Array.isArray(data.resume.skills)) {
      const skillInputs = document.querySelectorAll('input[name="skills[]"]');
      data.resume.skills.forEach((skill, index) => {
        if (skillInputs[index]) {
          skillInputs[index].value = skill.skill || ''; // Assuming skill is an object with 'skill' property
        }
      });
    }

    // About data
    if (data.resume && data.resume.about) {
      document.querySelector('textarea[name="summary"]').value = data.resume.about || '';
    }

  } catch (error) {
    console.error('Error fetching resume data:', error.message);
    showAlert('Failed to load resume data.', 'error');
  }
});






const finish = document.getElementById('finish');
finish.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Contact details
  const contactfirstname = document.querySelector('input[name="firstName"]').value;
  const contactlastname = document.querySelector('input[name="lastName"]').value;
  const contactcity = document.querySelector('input[name="city"]').value;
  const contactpostalcode = document.querySelector('input[name="postal"]').value;
  const contactphone = document.querySelector('input[name="phone"]').value;
  const contactemail = document.querySelector('input[name="email"]').value;

  // Experience data
  const jobTitle = [document.querySelector('input[name="jobTitle"]').value];
  const companyName = [document.querySelector('input[name="company"]').value];
  const expCity = [document.querySelector('input[name="jobCity"]').value];
  const country = [document.querySelector('input[name="jobCountry"]').value];
  const startDate = [document.querySelector('input[name="jobStart"]').value];
  const endDate = [document.querySelector('input[name="jobEnd"]').value];
  const descriptions = [document.querySelector('textarea[name="jobDesc"]').value];

  // Education data
  const eduschool = [document.querySelector('input[name="eduschool"]').value];
  const edudegree = [document.querySelector('input[name="edudegree"]').value];
  const educity = [document.querySelector('input[name="educity"]').value];
  const educountry = [document.querySelector('input[name="educountry"]').value];
  const edustartdate = [document.querySelector('input[name="edustartdate"]').value];
  const eduenddate = [document.querySelector('input[name="eduenddate"]').value];
  const edugpa = [document.querySelector('input[name="edugpa"]').value];

  // Project data
  const projecttitle = [document.querySelector('input[name="ProjectTitle"]').value];
  const projectStartDate = [document.querySelector('input[name="ProjectStartDate"]').value];
  const projectEndDate = [document.querySelector('input[name="ProjectEndDate"]').value];
  const projectoverview = [document.querySelector('textarea[name="Project-overview"]').value];

  // Achievements data
  const Achievementstitle = [];

  // Hobbies data
  const hobbies = [];

  // Skills data
  const skillInputs = document.querySelectorAll('input[name="skills[]"]');
  const skill = Array.from(skillInputs).map(input => input.value).filter(val => val.trim() !== '');

  // About data
  const abouttext = document.querySelector('textarea[name="summary"]').value;

  try {
    // Submit the data to the backend API
    const response = await fetch('http://localhost:3000/api/resumeform/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Contact data
        contactfirstname,
        contactlastname,
        contactcity,
        contactpostalcode,
        contactphone,
        contactemail,

        // Experience data
        jobTitle,
        companyName,
        expCity,
        country,
        startDate,
        endDate,
        descriptions,

        // Education data
        eduschool,
        edudegree,
        educity,
        educountry,
        edustartdate,
        eduenddate,
        edugpa,

        // Achievements data
        Achievementstitle,

        // Project data
        projecttitle,
        projectStartDate,
        projectEndDate,
        projectoverview,

        // Hobbies data
        hobbies,

        // Skills data
        skill,

        // About data
        abouttext,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit form');
    }

    // Show success alert and redirect
    showAlert('Resume created successfully!', 'success');
    
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
  } catch (error) {
    console.error('Error:', error.message);
    showAlert('An error occurred. Please try again.', 'error');
  }
});

    
function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `custom-alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
  alert.textContent = message;
  alertContainer.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}
