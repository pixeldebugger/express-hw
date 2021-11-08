const Author = require('../databases/Author');
const {CREATED, OK} = require("../configs/statusCodes.enum");


module.exports = {

    addAuthor: async (req, res, next) => {
        try {

            let createdAuthor = await Author.create({...req.body});

            res.status(CREATED).json(createdAuthor);
        } catch (e) {
            next(e);
        }
    },
    removeAuthor: async (req, res, next) => {
        try {
            const {params: {author_id}} = req;

            await Author.findOneAndDelete({id: author_id});

            res.status(OK).json('Deleted successfully');
        } catch (e) {
            next(e);
        }
    },

    getAllAuthors: async (req, res, next) => {
        try {
            const allAuthors = await Author.find({}).populate("posts");

            res.status(OK).json(allAuthors);
        } catch (e) {
            next(e);
        }
    },
    renameAuthor: async (req, res, next) => {
        try {
            const {author} = req;

            const updatedAuthor = await Author.findByIdAndUpdate(author, req.body);

            res.status(OK).json(updatedAuthor);
        } catch (e) {
            next(e);
        }
    }
};
