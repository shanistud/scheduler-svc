const service = require('../lib/server');
const axios = require('axios').default;
const { get } = require('lodash');
const { expect } = require('chai');
const sinon = require('sinon');

// assumes running local redis instance
// happy path check only
describe('echoAtTime', () => {
    describe('when sneding echoAtTime with valid message and time', () => {

        let server;

        const params = {
            message:'Message printed after 5 seconds',
            time: new Date(Date.now() + 5000).toISOString()
        }

        before(async ()  => {
            sinon.spy(console, 'log');
            server = await service.run();
        });

        after(() => {
            server.close();
            console.log.restore();
        });

        it('should print that message after time', async () => {
            const response = await axios.post('http://localhost:3000/scheduler/echoAtTime', params);

            expect(response.status).to.equal(200);
            expect(response.data).to.exist;
            console.log(response.data)

            await sleep(5500);
            expect(console.log.calledWith(params.message)).to.be.true;
        }).timeout(6000);
    });
});


const sleep = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
};