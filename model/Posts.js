const db = require("../db/db");

class Posts{
    static userPost(id,obj,file) {
        if(file) {
            // console.log(file)
            const {type} = obj
            const {name} = file
            console.log(file)
            const fileSrc = `https://d3ha1ibsrmz5u7.cloudfront.net/${name}`
            const queryText = "INSERT INTO posts (user_id, post_src, file_type) VALUES ($1, $2, $3) RETURNING *;";
            return db.query(queryText, [id, fileSrc,type]).then(results => results.rows[0]);
        
        }else{
            const {messagetext} = obj
            const queryText = "INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING *;";
            return db.query(queryText, [id, messagetext]).then(results => results.rows[0]);
        
        }
   }

   static getPost (userID){
       const queryText = 'SELECT * FROM posts WHERE user_id = $1';
       return db.query(queryText,[userID]).then(results => results.rows[0]);
   }
   static deletePost (postId,userId){
       const queryText = "DELETE FROM posts WHERE id = $1 And user_id = $2 RETURNING *";
       return db.query(queryText,[postId, userId]);
   }
   static postComment(userId,postId,content) {
       const {comment} = content
       const queryText = "INSERT INTO comments (user_id,post_id,content) VALUES ($1, $2,$3)"
       return db.query(queryText, [userId,postId,comment])
   }
   static getPostComments(postId) {
       const queryText = "SELECT * FROM comments WHERE post_id = $1"
       return db.query(queryText,[postId])
   }
   static getAllPosts(){
       const queryText = 'SELECT * FROM posts;'
       return db.query(queryText);
   }
   static getPost(id){
    const queryText = 'SELECT * FROM posts WHERE id = $1;';
    return db.query(queryText, [id]).then(results => results.rows[0]);
   }
   static deletePost(id){
    const queryText = 'DELETE FROM posts WHERE id = $1 RETURNING *;';
    return db.query(queryText,[id]);
   }
   static updateLikes(likes,id) {
       const queryText = `UPDATE posts SET likes_count = $1 WHERE id = $2;`
       return db.query(queryText,[likes,id])
   }
   static saveLike(id) {
    const queryText = `UPDATE comments SET loved = $1 WHERE id = $2`
    return db.query(queryText,[1,id])
   }
 


}

module.exports = Posts