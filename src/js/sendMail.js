



function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
}

function validateEmailInput(email){
    const emailContainer = document.getElementById('emailContainer');
    const emailErrorMessage = emailContainer.children[0].children[1];
    const emailInput = emailContainer.children[1].children[0];
    const emailIcon = emailContainer.children[1].children[1];

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!re.test(email.value)){
        emailErrorMessage.classList.remove('hidden');
        emailInput.classList.remove('border-80082-LightGray');
        emailInput.classList.add('border-red-500');
        emailIcon.classList.remove('fa-circle-check', 'hidden');
        emailIcon.classList.add('fa-regular', 'fa-xl','fa-circle-xmark', 'text-red-500');

        return false;
    }
    emailErrorMessage.classList.add('hidden');
    emailInput.classList.remove('border-red-500');
    emailInput.classList.remove('border-80082-LightGray');
    emailInput.classList.add('border-lime-500');
    emailIcon.classList.remove('fa-circle-xmark', 'hidden', 'text-red-500');
    emailIcon.classList.add('fa-circle-check', 'text-lime-500');

    return true;
    
}


function validateNameInput(name){

    const nameContainer = document.getElementById('nameContainer');
    const nameErrorMessage = nameContainer.children[0].children[1];
    const nameInput = nameContainer.children[1];

    const namePattern = /^[a-zA-Z\s.'-]+$/;
    const sanitizeValue = sanitize(name.value);

    if(sanitizeValue.length < 2){
        nameErrorMessage.classList.remove('hidden');
        nameErrorMessage.textContent = 'Required: Name must be longer than 2 characters.';

        nameInput.classList.remove('border-80082-LightGray');
        nameInput.classList.add('border-red-500');
        return false;
    }

    if(sanitizeValue.length > 50){
        nameErrorMessage.classList.remove('hidden');
        nameErrorMessage.textContent = 'Required: Name must be shorter than 50 characters.';

        nameInput.classList.remove('border-80082-LightGray');
        nameInput.classList.add('border-red-500');
        return false;
    }

    if(!namePattern.test(sanitizeValue)){
        nameErrorMessage.classList.remove('hidden');
        nameErrorMessage.textContent = 'Required: Name must include valid characters.';

        nameInput.classList.remove('border-80082-LightGray');
        nameInput.classList.add('border-red-500');
        return false;
    }


    nameErrorMessage.classList.add('hidden');
    nameInput.classList.remove('border-80082-LightGray');
    nameInput.classList.remove('border-red-500');
    nameInput.classList.add('border-lime-500');


    return true;
}


function validateSubjectInput(subject){

    const subjectContainer = document.getElementById('subjectContainer');
    const subjectErrorMessage = subjectContainer.children[0].children[1];
    const subjectInput = subjectContainer.children[1];

    const subjectPattern = /^[a-zA-Z0-9\s.'-]+$/;
    const sanitizeValue = sanitize(subject.value);

    if(sanitizeValue.length < 2){
        subjectErrorMessage.classList.remove('hidden');
        subjectErrorMessage.textContent = 'Required: Subject be longer than 2 characters';

        subjectInput.classList.remove('border-80082-LightGray');
        subjectInput.classList.add('border-red-500');
        return false;
    }

    if(sanitizeValue.length > 100){
        subjectErrorMessage.classList.remove('hidden');
        subjectErrorMessage.textContent = 'Required: Subject be shorter than 100 characters';

        subjectInput.classList.remove('border-80082-LightGray');
        subjectInput.classList.add('border-red-500');
        return false;
    }

    if(!subjectPattern.test(sanitizeValue)){
        subjectErrorMessage.classList.remove('hidden');
        subjectErrorMessage.textContent = 'Required: Subject must include valid characters';

        subjectInput.classList.remove('border-80082-LightGray');
        subjectInput.classList.add('border-red-500');
        return false;
    }

    subjectErrorMessage.classList.add('hidden');
    subjectInput.classList.remove('border-80082-LightGray');
    subjectInput.classList.remove('border-red-500');
    subjectInput.classList.add('border-lime-500');

    return true;

    
}


function validateMessageInput(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageErrorMessage = messageContainer.children[0].children[1];
    const messageInput = messageContainer.children[1];

    const sanitizeValue = sanitize(message.value);

    if (sanitizeValue.length < 10) {
        messageErrorMessage.classList.remove('hidden');
        messageErrorMessage.textContent = "Required: Message must be longer than 10 characters.";

        messageInput.classList.remove('border-80082-LightGray');
        messageInput.classList.add('border-red-500');
        return false;
    }

    if (sanitizeValue.length > 2000) {
        messageErrorMessage.classList.remove('hidden');
        messageErrorMessage.textContent = "Required: Message must be shorter than 2000 characters.";

        messageInput.classList.remove('border-80082-LightGray');
        messageInput.classList.add('border-red-500');
        return false;
    }

    messageErrorMessage.classList.add('hidden');
    messageInput.classList.remove('border-red-500');
    messageInput.classList.remove('border-80082-LightGray');
    messageInput.classList.add('border-lime-500');

    return true;
}

function resetFormStyling() {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea');
    const icons = form.querySelector('i');
    
    inputs.forEach(input => {
        input.classList.remove('border-red-500', 'border-lime-500');
        input.classList.add('border-80082-LightGray');
        icons.classList.add('hidden');
    });


}


export function sendMail() {
    
    const form = document.getElementById('form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');


    name.addEventListener('input', () => validateNameInput(name));
    email.addEventListener('input', ()=> validateEmailInput(email));
    subject.addEventListener('input', () => validateSubjectInput(subject));
    message.addEventListener('input', ()=> validateMessageInput(message));
    
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!validateNameInput(name)){
            return;
        }

        if(!validateEmailInput(email)){
            return;
        }

        if(!validateSubjectInput(subject)){
            return;
        }

        if(!validateMessageInput(message)){
            return;
        }

        try{
            const formData = new FormData(form);
            const captchaResponse = grecaptcha.getResponse();
            
            if(!captchaResponse.length > 0){
                throw new Error("Missing reCAPTCHA");
            }
            
            const response = await fetch('/php/mailer.php', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
    
            if (data.status === 'success') {
                setTimeout(() => {
                form.reset();
                resetFormStyling();
                grecaptcha.reset();
                }, 2000); // Adjust the delay time as needed
            }
            
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        });
}



