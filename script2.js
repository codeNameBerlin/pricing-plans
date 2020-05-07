const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

// show success outline 
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// validate email
const checkEmail = (input) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.value.trim())) {
    	showSuccess(input)
    } else {
    	showError(input, 'Email is not valid')
    }
}

// get field name
const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check required fields
const checkRequired = (inputArr) => {
	inputArr.forEach(function(input) {
		if (input.value === '') {
			showError(input, `${getFieldName(input)} is required`)
		} else {
			showSuccess(input)
		}
	})
}

// check input length
const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(input, 
		`${getFieldName(input)} must be at least ${min} characters`)
	} else if (input.value.length > max) {
		showError(input, 
		`${getFieldName(input)} must be less than ${max} characters`)
	} else {
		showSuccess(input)
	}
}

// check passwords match
const checkPasswordsMatch = (input1, input2) => {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match')
	}
}

// Event Listener
form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkRequired([username, email, password, password2])

	checkLength(username, 3, 13);
	checkLength(password, 6, 26);

	checkEmail(email);

	checkPasswordsMatch(password, password2);
})