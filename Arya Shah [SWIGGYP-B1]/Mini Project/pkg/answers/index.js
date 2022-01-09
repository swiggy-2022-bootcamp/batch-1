const answerDelivery = require('./delivery/http/routes/routes');
const repo = require('./repository/repo');
const questionRepo = require('../questions/repository/repo');
const usecase = require('./usecase/usecase');

//register service
const repoInstance = new repo();
const questionRepoInstance = new questionRepo();
const usecaseInstance = new usecase(repoInstance, questionRepoInstance);
answerDelivery.answerDelivery(usecaseInstance)

module.exports = {
    answerService: answerDelivery.api
}