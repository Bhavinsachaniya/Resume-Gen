//* Add Experience, Project and Education with improved remove functionality
// Initialize counter variables for section IDs
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
                <div><label>Job Title</label><input type="text" name="jobTitle" required></div>
                <div><label>Company Name</label><input type="text" name="company" required></div>
                <div><label>City</label><input type="text" name="jobCity" required></div>
                <div><label>Country</label><input type="text" name="jobCountry" required></div>
                <div><label>Start Date</label><input type="month" name="jobStart" required></div>
                <div><label>End Date</label><input type="month" name="jobEnd" required></div>
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
                <div><label>Project Title</label><input type="text" name="ProjectTitle" required></div>
                <div><label>Project Start Date</label><input type="month" name="ProjectStartDate" required></div>
                <div><label>Project End Date</label><input type="month" name="ProjectEndDate" required></div>
            </div>

            <div class="description-container-1-1-1">
        <label>Project Overview</label>
        <textarea name="Project-overview" id="Project-description-${projectCount}" required></textarea>
        <button class="generate-button" id="Project-genratewithai-${projectCount}"  onclick="AIGenratedData('Project-description-${projectCount}' , 'Project-genratewithai-${projectCount}' , '2')" type="button">Generate with AI</button>
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
                    <input type="text" name="eduschool" placeholder="e.g. Stanford University" required>
                </div>
                <div>
                    <label>Degree</label>
                    <input type="text" name="edudegree" placeholder="e.g. B.Tech in IT" required>
                </div>
                <div>
                    <label>City</label>
                    <input type="text" name="educity" placeholder="e.g. Ahmedabad" required>
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" name="educountry" placeholder="e.g. India" required>
                </div>
                <div>
                    <label>Start Date</label>
                    <input type="month" name="edustartdate" required>
                </div>
                <div>
                    <label>End Date</label>
                    <input type="month" name="eduenddate" required>
                </div>
            </div>

            <div class="description-container-1-1-1">
                <label>GPA / Percentage</label>
                <input type="text" name="edugpa" placeholder="e.g. 8.5 CGPA or 75%" required>
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

function achievementTitle () {
  const container = document.getElementById('AchievementContainer')
  const div = document.createElement('div')
  div.classList.add('Achievement-input')
  div.innerHTML = `<input type="text" name="achievementTitle[]" placeholder="Enter a Achievement Title">`
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

  // Experience data
  const experienceItems = document.querySelectorAll('.experience-item');
  const jobTitle = Array.from(experienceItems).map(item => item.querySelector('input[name^="jobTitle"]')?.value || '');
  const companyName = Array.from(experienceItems).map(item => item.querySelector('input[name^="company"]')?.value || '');
  const expCity = Array.from(experienceItems).map(item => item.querySelector('input[name^="jobCity"]')?.value || '');
  const country = Array.from(experienceItems).map(item => item.querySelector('input[name^="jobCountry"]')?.value || '');
  const startDate = Array.from(experienceItems).map(item => item.querySelector('input[name^="jobstart"]')?.value || '');
  const endDate = Array.from(experienceItems).map(item => item.querySelector('input[name^="jobEnd"]')?.value || '');
  const descriptions = Array.from(experienceItems).map(item => item.querySelector('textarea[name^="jobDesc"]')?.value || '');

  // Education data
  const educationItems = document.querySelectorAll('.education-item');
  const eduschool = Array.from(educationItems).map(item => item.querySelector('input[name^="eduschool"]')?.value || '');
  const edudegree = Array.from(educationItems).map(item => item.querySelector('input[name^="edudegree"]')?.value || '');
  const educity = Array.from(educationItems).map(item => item.querySelector('input[name^="educity"]')?.value || '');
  const educountry = Array.from(educationItems).map(item => item.querySelector('input[name^="educountry"]')?.value || '');
  const edustartdate = Array.from(educationItems).map(item => item.querySelector('input[name^="edustartdate"]')?.value || '');
  const eduenddate = Array.from(educationItems).map(item => item.querySelector('input[name^="eduenddate"]')?.value || '');
  const edugpa = Array.from(educationItems).map(item => item.querySelector('input[name^="edugpa"]')?.value || '');

  // Project data
  const projectItems = document.querySelectorAll('.project-item');
  const projecttitle = Array.from(projectItems).map(item => item.querySelector('input[name^="ProjectTitle"]')?.value || '');
  const projectStartDate = Array.from(projectItems).map(item => item.querySelector('input[name^="ProjectStartDate"]')?.value || '');
  const projectEndDate = Array.from(projectItems).map(item => item.querySelector('input[name^="ProjectEndDate"]')?.value || '');
  const projectoverview = Array.from(projectItems).map(item => item.querySelector('textarea[name^="Project-overview"]')?.value || '');

  // Achievements (if any added later)
  
  const Achievementstitle = Array.from(document.querySelectorAll('input[name="achievementTitle[]"]'))
    .map(input => input.value.trim())
    .filter(val => val !== '');

  // Hobbies (same idea)
  const hobbies = Array.from(document.querySelectorAll('.hobby-item')).map(item =>
    item.querySelector('input[name^="hobby"]')?.value || ''
  );

  // Skills
  const skill = Array.from(document.querySelectorAll('input[name="skills[]"]'))
    .map(input => input.value.trim())
    .filter(val => val !== '');

  // About text
  const abouttext = document.querySelector('textarea[name="summary"]')?.value || '';

  // Final flat return structure
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
