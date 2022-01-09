const bcrypt=require('bcryptjs'); 
const hashPassword = {
    salt:10,
    convertPassword(bodyPassword) {
        var salt = bcrypt.genSaltSync(this.salt);
        var hash = bcrypt.hashSync(bodyPassword,salt);
        return hash;
    },
    comparePassword(bodyPassword,hashPass) {
       return bcrypt.compareSync(bodyPassword, hashPass);
    }
}
module.exports=hashPassword;