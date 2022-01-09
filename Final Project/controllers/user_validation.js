const User = require('../models/user');

async function validateUsername(username){
    var error = "";
    const find_user = await User.find({ userName: username });
    const len = find_user.length;
    if ( len !== 0 && len !== undefined) 
        error = "This username is already taken !";

    if (error) return (error);
    else return;
}

function validatePassword(password){
    var error = "";

    //Minimum length 
    if (password.length < 8) 
        error = "Minimum Password length is 8";
    //Should contain Lower Case & Upper Case
    else if ((password.isUpper)==false)
        error = "Password should contain a Upper Case Letter"; 
    else if ((password.isLower)==false)
        error = "Password should contain a Lower Case Letter"; 
    else if ((password.isNumeric)==false)
        error = "Password should contain a Number"; 

    if (error) return (error);
    else return;
}

function validateEmail(email){
    var error = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!(email.match(mailformat))) error = "Enter a Valid Email Address";

    if (error) return (error);
    else return;
}

exports.validateUserReq = async function (body){
    
    var error = await validateUsername(body.userName);
    if (error) return error;
    error = validatePassword(body.password);
    if (error) return error;
    error = validateEmail(body.email);
    if (error) return error;
}