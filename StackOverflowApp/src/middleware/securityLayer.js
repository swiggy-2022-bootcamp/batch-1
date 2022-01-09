//every REST request must go through this layer inorder to have some security checks
export const securityLayer = (req,res,next) =>{
    console.log("Layer to handle different cyber attacks like DoS attack.")
    next();
}