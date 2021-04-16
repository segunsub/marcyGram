const db = require("../db/db");

class Users{
    static signUp(userObj, pfpObj){
        if(pfpObj) {
            const {username, useremail, userpassword} = userObj
            const {name} = pfpObj
            const fileSrc = `https://d3ha1ibsrmz5u7.cloudfront.net/${name}`
            const queryText = "INSERT INTO users (name, email, encrypted_password,file_src) VALUES ($1, $2, $3, $4) RETURNING *;";
            return db.query(queryText, [username, useremail, userpassword, fileSrc]).then(results => results.rows[0]);
        }else {
            const {username, useremail, userpassword} = userObj
            const queryText = "INSERT INTO users (name, email, encrypted_password) VALUES ($1, $2, $3) RETURNING *;";
            return db.query(queryText, [username, useremail, userpassword]).then(results => results.rows[0]);
        }
        
      }
      static login (email){
          const queryText = "SELECT * FROM users WHERE email = $1;";
          return db.query(queryText, [email]).then(results => results.rows[0])

      }

      static getUsers (){
        const queryText = 'SELECT * FROM users ORDER BY id;';
        return db.query(queryText).then(results => results.rows);
      }

      static getUser(id){
        const queryText = "SELECT * FROM users WHERE id = $1";
        return db.query(queryText, [id]).then(results => results.rows[0]);
      }
      static getPosts(id) {
        const queryText = "SELECT * FROM posts WHERE user_id = $1";
        return db.query(queryText, [id]).then(results => results.rows);
    
    }
    static getAllPosts() {
      const queryText = "SELECT posts.user_id,COUNT(user_id) FROM posts JOIN users ON user_id = users.id GROUP BY posts.user_id ORDER BY posts.user_id"
      return db.query(queryText).then(results => results.rows);
    }
    static updateUser(obj) {
      const {name, email,id} = obj
      const queryText = "UPDATE users SET name = $1, email = $2 WHERE id = $3";
      return db.query(queryText,[name,email,id]).then(results => results.rows[0]);
    }
    static updatePfp(pfp,id) {
      const {name} = pfp
      const fileSrc = `https://d3ha1ibsrmz5u7.cloudfront.net/${name}`
      const queryText = "UPDATE users SET file_src = $1 WHERE id = $2 RETURNING *";
      return db.query(queryText,[fileSrc,id]).then(results => results.rows[0])
    }
    static deleteUser (id) {
      const queryPost = 'DELETE FROM posts WHERE user_id = $1;'
      const queryText = 'DELETE FROM users WHERE id = $1;';
        db.query(queryPost,[id]);
      return db.query(queryText,[id]);
    }
    static followUser(userId,followId) {
      const queryText = 'INSERT INTO follows (user_id,follow_user_id) VALUES ($1,$2)'
      return db.query(queryText,[userId,followId])
    }


}

module.exports = Users
            
          