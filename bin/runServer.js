const { run } = require('../lib/server');

run()
    .catch(e => {
        console.log(e, 'Service startup failed. terminating...');
        process.exit(1);
    });