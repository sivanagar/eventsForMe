const { Schema,  model, Types } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema(
    {
        //? Address and Full Name
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: 'Email address is required',
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',

            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event',
              },
        ],

    },
    
);


// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  
  const User = model('User', userSchema);
  
  module.exports = User;
