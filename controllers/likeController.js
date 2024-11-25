const Post = require("../models/postModel");
const Like = require("../models/likeModel");


exports.likePost = async(req, res) =>{
    try{
        const{post, user} = req.body;

        const like = new Like({
            post, user,
        });

        const savedLike = await like.save();

        //Update like array in post basis of this
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {likes: savedLike._id}}, {new:true})
                            .populate('likes')
                            .populate('comment')
                            .exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(err){
        return res.status(400).json({
            error : "Like not added",
            details: err.message,
        });
    }
}


exports.unlikePost = async(req, res) =>{
    try{
        const {post, like} = req.body;

        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});
        //update post and delete like

        const updatedPost = await Post.findByIdAndUpdate({_id: post}, {$pull: {likes: deletedLike._id}}, {new:true});
        
        res.json({
            post : updatedPost,
        });
    }
    catch(err){
        return res.status(400).json({
            error : "Like not deleted",
            details: err.message,
        })
    }
}