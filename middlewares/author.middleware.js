const ErrorHandler = require('../errors/ErrorHandler');
const Author = require('../databases/Author')
const {BAD_REQUEST} = require("../configs/statusCodes.enum");

module.exports = {

    isRequestDataCorrect: async (req, res, next) => {
        try {

            if(!req.body.name || !req.body.id) {
                throw new ErrorHandler(BAD_REQUEST, 'no author or id');
            }

            const authorById = await Author.findOne({ id: req.body.id })

            if(authorById) {
                throw new ErrorHandler(BAD_REQUEST, 'id already exists');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isAuthorByIdExist: async (req, res, next) => {
        try {
            const { author_id } = req.params;

            const author = await Author.find({id: author_id});

            if (!author) {
                throw new ErrorHandler(BAD_REQUEST, 'id is not found');

            }

            req.author = author;

            next();
        } catch (err) {
            next(err);
        }
    },
};
