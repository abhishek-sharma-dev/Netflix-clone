function SignUpValidation(inputValues) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=(?:.*\d))(?=.*[a-z])(?=.*[^a-zA-Z0-9])[a-zA-Z0-9\S]{8,}$/;

    if (inputValues.username.length < 6) {
        error.username = "Username should be at least 6 characters."
    } 
    else {
        error.username = ''
    }
    
    if (!inputValues.email) {
        error.email = "Enter your email."
    }
    else if (!email_pattern.test(inputValues.email)) {
        error.email = 'Enter a valid Email Id.'
    }
    else{
        error.email = ''
    }
    
    if (!inputValues.password) {
        error.password = 'Enter a valid Password.'
    }
    else if (!password_pattern.test(inputValues.password)) {
        error.password = "The password needs to be 8 characters minimum with numbers and special characters."
    }
    else{
        error.password = ''
    }
    return error;
}

export default SignUpValidation