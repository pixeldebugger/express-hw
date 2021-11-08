const Post = require('../databases/Post');
const Author = require('../databases/Author');

const {OK} = require("../configs/statusCodes.enum");

module.exports = {

    createPost: async (req, res, next) => {
        try {
            const {author_id} = req.params;
            const {text, id} = req.body;

            const createdPost = await Post.create({text, id, author: author_id});

            const authorById = await Author.findById(author_id);

            authorById.posts.push(createdPost);
            await authorById.save();

            res.status(OK).json(authorById);
        } catch (e) {
            next(e);
        }
    },

    postsByAuthor: async (req, res) => {

        const {author_id} = req.params;

        const postsByAuthor = await Post.find({author: author_id});

        res.json(postsByAuthor);
    },

    singlePostByAuthor: async (req, res) => {

        const {author_id, post_id} = req.params;

        const post  = await Post.find({author: author_id, id: post_id});

        res.json(post);
    }


};
