const router = require('express').Router();

const {postMiddleware} = require("../middlewares");
const { postController } = require("../controllers");


router.post('/:author_id/add-post',
    postMiddleware.isPostValid,
    postController.createPost
);

router.get('/:author_id/posts',
    postController.postsByAuthor
);

router.get('/:author_id/posts/:post_id',
    postController.singlePostByAuthor
);


module.exports = router;
