const mongoose = require('mongoose');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.createComment = async(req,res) =>{
    try{
        //fetch data from req body
        const{post, user, body} = req.body;


        //Check if post is valid
        if (!mongoose.Types.ObjectId.isValid(post)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        //create a comment object
        const comment = new Comment({
            post, user, body,
        });


        //save the new comment into the database
        const savedComment = await comment.save();

        //find post by ID, add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comment: savedComment._id}}, {new:true})
                            .populate("comment") //populate the comments array with comment document
                            .exec();

        res.json({
            post: updatedPost,
        });

    }
    catch(err){
         return res.status(500).json({
            error:"Error while creating comment",
            details: err.message
        })
    }
}