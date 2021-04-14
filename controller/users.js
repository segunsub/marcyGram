// const path = require('path')
const Users = require('../model/Users')
const upload = require('./mediaUpload')
const bcrypt = require('bcrypt');
const { post } = require('../route/post');

const saltRounds = 10;

const middleware = (req, res, next) => {
    console.log(req.method,req.path)
    // console.log(req.session)
    next()
    // if(req.session.user) {
    //     next()
    // }else {
    //     res.redirect('/login')
    // }
    // next()
}
const loginMiddleWare = (req, res, next) => {
    console.log(req.method,req.path)
    next()
    // if(req.session.user) {
    //     next()
    // }else {
    //     res.redirect('/')
    //     // next()
    // }
} 


const home = async (req, res) => {
    if(req.session.user){
    //    const arrayBuffer = req.session.user.img_data.data
    //    const fileContents = Buffer.from(arrayBuffer, 'base64')
    // fileContents.toString('base64')
    // console.log(req.session)
    const imgLink = req.session.user.file_src
       res.status(200).render('home', {
           title: 'Home',
           image: imgLink,
           user: req.session.user
       })
    }else {
        res.redirect('/login')
    }
  } 
const login = async (req,res) => {
        res.render('login', {
            title: 'login'
            // image: arrayBuffer.
        })
}
const signup = (req,res) => {
    res.status(200)
    res.render('signup', {
        title: 'signup'
    })
}
const userSignUp = async (req, res) => {
    try {  
        // when the user has the image uploaded
        if(req.files) {
            // console.log(req.files.formFile)
            const file = req.files.formFile
            const {uploadFile} = upload
              await uploadFile(file).then(async data => {
                  if(data) {
                    const {userpassword} = req.body
                            bcrypt.hash(userpassword, saltRounds).then(async hash => {
                            // Store hash in your password DB.
                            req.body.userpassword = hash
                            const createUser = await Users.signUp(req.body, file);
                            req.session.user = createUser
                                res.redirect(`/`)
                        }); 
                  }
              })
                // console.log(await uploadFile(file).response)
                // console.log(`https://d3ha1ibsrmz5u7.cloudfront.net/${file.name}`)
            
            // const {userpassword} = req.body
            // bcrypt.hash(userpassword, saltRounds).then(async hash => {
            // // Store hash in your password DB.
            // req.body.userpassword = hash
            // const createUser = await Users.signUp(req.body, req.files.formFile);
            // req.session.user = createUser
            // res.redirect(`/`)
        // });
        }
        // when there is no image the user gets a default profile pic
        else {
            const {userpassword} = req.body
            bcrypt.hash(userpassword, saltRounds).then(async hash => {
            // Store hash in your password DB.
            req.body.userpassword = hash
            const createUser = await Users.signUp(req.body);
            req.session.user = createUser
            res.redirect(`/`)
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
        
    }
}

const userLogin = async (req, res) => {
    try{
        const {useremail, userpassword} = req.body;
        const user = await Users.login(useremail);
        const validPassword = await bcrypt.compare(userpassword, user.encrypted_password);
        if(user && validPassword){
            req.session.user = user
            res.status(200)
            res.redirect(`/`)
            
        }else {
            return res.status(403).send("Incorrect Login Info");
        }
    } catch (err){
        res.send(err)

    }
}
const userprofile = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
       await Users.getUser(id).then(async user => {
           await Users.getPosts(id).then(posts => {
            console.log(user,posts)
            res.render('userProfile', {
                title: 'User Profile',
                user: user,
                posts: posts
            })
           })
       })
       
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const editProfile = async (req, res) => {
    res.render('editProfile', {
        title: 'Edit Profile',
        user: req.session.user,
        check: ''
    })
}

const follow = async (req, res) => {
   await Users.getUsers().then(async users => {    
    await Users.getAllPosts().then(posts => {
        users.map((each, i) => {each.postCount = posts[i].count})
        const all = users.filter(each => each.id !== req.session.user.id)
         
        res.render('follow', {
            title: 'Follow User',
            user: req.session.user,
            array: all
        })
       })
   })

}
const update = async (req, res) => {
    console.log(req.body)
    const {username,useremail,userpassword} = req.body
    await Users.getUser(req.params.id).then(async user => {
        await bcrypt.compare(userpassword, user.encrypted_password).then(async verify => {
          if(verify) {
             user = Object.assign(user,req.body)
             req.session.user = user
             await Users.updateUser(user).then(res.status(200).redirect(`/app/users/${req.params.id}`))
          }else {
            res.render('editProfile', {
                title: 'Edit Profile',
                user: req.session.user,
                check: 'is-invalid'
            })
          }
        })
    })

}

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}




module.exports = {
    middleware,
    home,
    loginMiddleWare,
    login,
    signup,
    userSignUp,
    userLogin,
    userprofile,
    editProfile,
    follow,
    logout,
    update
}