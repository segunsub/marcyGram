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

 


}

module.exports = Posts