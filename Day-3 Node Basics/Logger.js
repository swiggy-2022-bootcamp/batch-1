
const EventEmitter = require('events');
// delete emitter object

var url  = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        //send an HTTP request
        console.log(message);
    
        //Raise event after logging message
        //logger logs message so should be here instead of app module
        this.emit("messageLogged", { id:1, url: 'http://'}); //the {} is event argument
        //no longer need emmiter.emit() due to inheritance
    }


}


module.exports = Logger;
