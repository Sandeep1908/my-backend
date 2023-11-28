 
import mongoose,{Schema} from "mongoose";

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



export const User= mongoose.model('User',userSchema)