const userDelivery = require('./delivery/http/routes/routes');
const repo = require('./repository/repo');
const questionRepo = require('../questions/repository/repo');
const answerRepo = require('../answers/repository/repo');
const usecase = require('./usecase/usecase');

//register service
const repoInstance = new repo();
const questionRepoInstance = new questionRepo();
const answerRepoInstance = new answerRepo();
const usecaseInstance = new usecase(repoInstance,questionRepoInstance,answerRepoInstance);
userDelivery.userDelivery(usecaseInstance)

module.exports = {
    userService: userDelivery.api
}