const Posts = require('../model/Posts');
const upload = require('./mediaUpload')


const userPost = async (req,res) => {
    try {
        if(req.files){
            const id = parseInt(req.params.id)
            const file = req.files.file
            console.log(file)
                    const {uploadFile} = upload
                      await uploadFile(file).then(async data => {
                          req.body.type = file.mimetype
                        await Posts.userPost(id,req.body,file)
                        res.status(200).redirect(`/app/users/${id}`)
                      })
           }else {
               const id = parseInt(req.params.id)
              const media = await Posts.userPost(id,req.body)
              console.log(media)
              res.status(200).redirect(`/app/users/${id}`)

           }  
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const deletePost = async (req, res)=>{
    try{
        // console.log(req)
        const postId = req.params.id;
        const userId = req.session.user.id;
        // console.log(postId,userid)
        await Posts.deletePost(postId, userId).then(resp => {
            res.status(200).send({"ok":`${resp.rows[0].id}`})
        });
        
    }
    catch (error) {
        console.log(error)
        res.status(500);
    }
}
const comment = async (req, res)=>{
    try {
        const postId = parseInt(req.params.id)
        const userId = parseInt(req.session.user.id)
        Posts.postComment(userId,postId,req.body).then(res.status(200).send('ok'))
    } catch (error) {
        res.sendStatus(500)
    }
}
const getComments = async (req, res)=>{
    try {
        const postId = parseInt(req.params.id)
        Posts.getPostComments(postId).then(resp => {
            res.status(200).send(resp.rows)
        })
    } catch (error) {
        res.sendStatus(500)
    }
}


module.exports = {
    userPost,
    deletePost,
    comment,
    getComments
}   