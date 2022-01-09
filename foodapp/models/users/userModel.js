var datetime = require('node-datetime');
class User{
    constructor(username,email,password,address){
        this.username=username;
        this.email=email;
        this.password=password;
        this.address=address;
        this.id= new Date();
    }
}
module.exports=User;