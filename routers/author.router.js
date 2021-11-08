const router = require('express').Router();

const {authorMiddleware} = require("../middlewares");
const {authorController } = require("../controllers");


router.post('/add',
    authorMiddleware.isRequestDataCorrect,
    authorController.addAuthor
);

router.delete('/:author_id', authorMiddleware.isAuthorByIdExist, authorController.removeAuthor);

router.put('/:author_id', authorMiddleware.isAuthorByIdExist, authorController.renameAuthor);

router.get('/all', authorController.getAllAuthors);



module.exports = router;
