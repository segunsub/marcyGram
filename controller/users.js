// const path = require('path')
const Users = require('../model/Users')
const upload = require('./mediaUpload')
const bcrypt = require('bcrypt');

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
        const id = parseInt(req.session.user.id)
        await Users.followingsPosts(id).then(async posts => {
            posts.rows.forEach(post => {
                const time = Math.abs((post.created_at.getTime() / 1000).toFixed(0))
                const currDate = Math.abs((new Date().getTime() / 1000).toFixed(0))
                const diff = currDate - time
                const hours = Math.floor(diff/ 3600)
                post.timeSpan = hours
            })
            await Users.commentCount().then(comments => {
            res.status(200).render('home', {
                title: 'Home',
                posts: posts.rows,
                feed: comments.rows,
                user: req.session.user
            })
            })
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
            res.send(`/`)
            
        }else {
            return res.status(203).send("form-control is-invalid");
        }
    } catch (err){
        console.log(err)
        res.send(err)

    }
}
const userprofile = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
       await Users.getUser(id).then(async user => {
           await Users.getPosts(id).then(posts => {
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
    res.status(200)
    res.render('editProfile', {
        title: 'Edit Profile',
        user: req.session.user,
    })
}

const follow = async (req, res) => {
    try {
        await Users.getUsers().then(async users => {    
            await Users.getAllPosts().then(posts => {
                users.map(each => {
                        const postObj = posts.find(pObj => pObj.user_id === each.id)
                        if(postObj) {
                            each.postCount = postObj.count
                        }else {
                            each.postCount = 0
                        }
                    })
                 res.status(200)
                res.render('follow', {
                    title: 'Follow User',
                    user: req.session.user,
                    array: users
                })
               })
           })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


}
const update = async (req, res) => {
    
    const {userpassword} = req.body
    await Users.getUser(req.params.id).then(async user => {
        await bcrypt.compare(userpassword, user.encrypted_password).then(async verify => {
          if(verify) {
             user = Object.assign(user,req.body)
             req.session.user = user
             await Users.updateUser(user).then(res.status(200).send({"location":`/app/users/${req.params.id}`}))
          }else {
              res.status(200).send({"check" : 'is-invalid'})
          }
        })
    })

}

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
const updatepfp = async (req, res) => {
    try {
        if(req.files) {
            const id = parseInt(req.params.id)
            const file = req.files.pfp
            const {uploadFile} = upload
              await uploadFile(file).then(async data => {
                  Users.updatePfp(file,id).then(link => {
                      req.session.user.file_src = link.file_src
                     res.status(200).send(link.file_src)
                  })
              })
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        req.session.destroy();
        await Users.deleteUser(id)
        res.status(200).send({"redirect":'/'})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
}
const followUser = async (req, res) => {
    try {
        const followId = req.params.id;
        const userId = req.session.user.id
        await Users.followUser(userId,followId).then(res.sendStatus(200))
        // req.session.destroy();
        // await Users.deleteUser(id)
        // res.status(200).send({"redirect":'/'})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
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
    update,
    updatepfp,
    deleteUser,
    followUser
}