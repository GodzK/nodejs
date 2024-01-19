logevent = require("./logEvent");

const emitter = require("events");
class myemitter extends emitter{};

const Myemitter  = new myemitter();

Myemitter.on('log', (msg) =>logevent(msg));

setTimeout(() => {
    Myemitter.emit('log', 'log emitted!')
}, 2000);