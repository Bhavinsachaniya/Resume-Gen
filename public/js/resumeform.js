//* Show Alert Container
function showAlert(message, type) {
    const container = document.getElementById('alert-container');

    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`);
    alert.innerText = message;

    container.appendChild(alert);

    // Animate in after 100ms
    setTimeout(() => {
        alert.classList.add('show');
    }, 100);

    // Remove alert and redirect after 3 seconds
    setTimeout(() => {
        alert.classList.remove('show');

        // Wait for animation to finish, then remove and redirect
        setTimeout(() => {
            alert.remove();
            if(type=='sucess'){
            window.location.href = '/home';
            }
            else{
                window.location.href = '/resumeform';
            }
        }, 400); // match your alert hide animation duration
    }, 3000); // how long the alert stays on screen
}