const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    FirstName : {
        type: String , 
        required :  true
    },
    SecondName :{
        type : String  ,
        required : true 
    },
  email: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
})

// static signup method
userSchema.statics.signup = async function(FirstName,SecondName,email, password) {
    if (!email || !password) {
        throw Error('all fields must be filled ')
    }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Registration Number already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({FirstName , SecondName, email, password: hash  })

  return user
}
// static login 
userSchema.statics.login = async function(email , password)  {
      
      const user = await this.findOne({ email })
      if (!user) {
        throw Error('Incorrect Registration Number')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw Error('Incorrect password')
      }
    
      return user
}
module.exports = mongoose.model('User', userSchema)