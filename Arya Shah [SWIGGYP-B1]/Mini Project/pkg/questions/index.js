const questionDelivery = require('./delivery/http/routes/routes');
const repo = require('./repository/repo');
const usecase = require('./usecase/usecase');

//register service
const repoInstance = new repo();
const usecaseInstance = new usecase(repoInstance);
questionDelivery.questionDelivery(usecaseInstance)

module.exports = {
    questionService: questionDelivery.api
}