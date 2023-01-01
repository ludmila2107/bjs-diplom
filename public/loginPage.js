'use strict'
let userForm = new UserForm();
userForm.loginFormCallback = function f(data) {
    if (data !== null) {
        ApiConnector.login({
            login: data.login,
            password: data.password
        }, (response) => {
            console.log(response);
            response.success ? location.reload() : userForm.setLoginErrorMessage(response.error);
        });
    }
};

userForm.registerFormCallback = function f(data) {
    if (data !== null) {
        ApiConnector.register({
                login: data.login,
                password: data.password
            },
            (response) => {
                console.log(response);
                response.success == true ?
                    location.reload() :
                    userForm.setRegisterErrorMessage(response.error);
            }
        );
    }
    
};