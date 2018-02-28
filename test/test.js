var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(require('chai-things'));
chai.use(require('chai-arrays'));
var chould = chai.should();
var expect = require('chai').expect;

var sinon = require('sinon');

var mongoose = require('mongoose');

var server = require('../server');

chai.use(chaiHttp);

var City = require('../api/models/city');
var TempObs = require('../api/models/tempobs');

describe('Api', () => {

    var sandbox;
    var clock;

    before((done) => {
        var testData = require('./testCollections.json');
        sandbox = sinon.sandbox.create();
        clock = sinon.useFakeTimers(new Date(testData.date_now).getTime());

        //connection.on('open') -> wait for database to connect
        mongoose.connection.on('open', () => {
            mongoose.connection.db.dropDatabase(() => {
                City.insertMany(testData.cities).then(() => {
                    TempObs.insertMany(testData.tempobs).then(() => {
                        done();
                    }); 
                });
            });
        });

        var date_now = new Date();
        var date_minus = date_now;
        date_minus.setHours(date_minus.getHours() - 24);
    });

    after(() => {
        sandbox.restore();
    });

    describe('/GET temperatures', () => {

        /**
         * Comparing results to testCollections.json with hardcoded values.
         */
        it('past 24 hours works corretly', (done) => {
            chai.request(server)
                .get('/api/temperatures')
                .end((err, res) => {
                    var temperatures = res.body;
                    //Helsinki:
                    expect(temperatures).to.have.deep.include({id: 2, name: 'Helsinki', latest: 7, min: 7, max: 8});
                    //Tokyo:
                    expect(temperatures).to.have.deep.include({id: 1, name: 'Tokyo', latest: -1, min: -1, max: 0});
                    done();
                });
        });

    });

});