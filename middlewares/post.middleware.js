const ErrorHandler = require('../errors/ErrorHandler');
const Post = require('../databases/Post');
const {BAD_REQUEST} = require("../configs/statusCodes.enum");

module.exports = {

    isPostValid: async (req, res, next) => {
        try {

            if(!req.body.id || !req.body.text) {
                throw new ErrorHandler(BAD_REQUEST, 'no text or id');
            }

            const postById = await Post.findOne({ id: req.body.id });

            if(postById) {
                throw new ErrorHandler(BAD_REQUEST, 'id already exists');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
