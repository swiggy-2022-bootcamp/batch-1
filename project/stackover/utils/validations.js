
module.exports.restBodyValidationsFailed  = function  (request, mandatoryParams ) {
    console.log(request);
    console.log(mandatoryParams);
    for ( var i = 0 ; i < mandatoryParams.length; i++ ) {
        if ( request[mandatoryParams[i]] == null || request[mandatoryParams[i]] == "" ) {
            return true;
        }
    }
    return false;
}