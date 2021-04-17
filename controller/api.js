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

const seePostsByUser = async (req, res) => {
    const user_id = req.params.id;
    try{
        let user = await Users.getUser(user_id)
        let post = await Users.getUserPost(user_id);
        user.post = post
        res.status(200).json(user);
    } catch{
        res.sendStatus(500);
    }
}

const getAllPosts = (req, res) => {
    Posts.getAllPosts()
    .then((data) => res.json(data.rows))
    .catch((err) => {
        res.status(500).json({
            error: '500 error'
        });
    });
}

const getPost = async (req, res) => {
    const id = req.params.id;
    try{
        const foundPost = await Posts.getPost(id);
        if(foundPost){
            res.status(200).json(foundPost);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    } catch {
        res.status(500).send("err");
    }
}

const deletePostAPI = (req, res) => {
    const id = req.params.id;
    Posts.deletePost(id)
    .then((data) => {
        res.status(200).json({
            message: 'Successfully Deleted'
        })
    }).catch((err) => {
        res.status(500).json({
            error: '500 error'
        });
    });
}

const signUpAPI = async (req, res) => {
    const {username, useremail, userpassword} = req.body;
    try{
        if(username && useremail  && userpassword){
            const saltRounds = 10;
            const encrypted_password = await bcrypt.hash(userpassword, saltRounds);
            const createUser = await Users.signUp(username, useremail, encrypted_password); 
            res.status(200).json(createUser);
        } else {
            res.status(400).json('please fill in the form');
        }
    } catch {
        res.status(500).json("errorrrrrrrrrrrr");
    }
}

const loginAPI = async (req, res) => {
    try{
        const {useremail, userpassword} = req.body;
        const user = await Users.login(email);
        const validPassword = await bcrypt.compare(userpassword, user.encrypted_password);
        if(user && validPassword){
            req.session.user = user
            res.status(200).json(user)
            
        }else {
            return res.status(403).json("Incorrect Login Info");
        }
    } catch (err){
        res.send(err)

    }
}




module.exports = {
    getUsers,
    getSingleUser,
    seePostsByUser,
    getAllPosts,
    getPost,
    deletePostAPI,
    signUpAPI,
    loginAPI
}