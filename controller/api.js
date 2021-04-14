const Users = require('../model/Users');
const Posts = require('../model/Posts');
//api functions

//gets the api of all users
const getUsers = async (req, res) => {
    try{
        const users = await Users.getUsers();
        res.status(200).json(users);
    } catch{
        res.sendStatus(500);
    }
}

const getSingleUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Users.getUser(id);
        if(user){
            res.status(200).json(user)
        } else{
            res.status(404).json({message: "User not found"});
        }
    } catch{
        res.sendStatus(500);
    }
}

const getUsersPosts = async (req, res) => {
    try{
        let post = await Post.getPost(userID);
        res.status(200).json(post);

    } catch{
        res.sendStatus(500);
    }
}




module.exports = {
    getUsers,
    getSingleUser,
    getUsersPosts
}