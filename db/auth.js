// const jwt = require('jsonwebtoken');

class Auth {
    //take in a user's id and return a token
    // static encryptToken(user_id){
    //   return jwt.sign({id: user_id}, "thisistheway")
    // }
  
    // //take in a token and return a user's id
    // static decryptToken(token){
    //   return jwt.verify(token, "thisistheway").id
    // } 
    static session() {
        return 'marcyGramApp'
    }
    static aws() {
       return {
           accessKey: 'AKIAVPPZIB36VZLS55CA',
          secretAccessKey: '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'
       }
    }

}
  module.exports = Auth