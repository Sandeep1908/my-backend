 
import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new Schema( 
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true
        },
        
        email:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true
        },
        fullName:{
            type:String,
            required:true,
            lowecase:true,
            trim:true,
            index:true
        },

        password:{
            type:String,
            required:[true, 'password is required']
        },
        
        coverImage:{
            type:String,
        },

        avatar:{
            type:String,
            required:true,

        },

        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },

        refreshToken:{
            type:String
        }
        
        
    },
    {
        
        timestamps:true
    }
    
)


userSchema.pre('save',async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      return next();
    } catch (err) {
      return next(err);
    }

})


userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefereshToken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User= mongoose.model('User',userSchema)