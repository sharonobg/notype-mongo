import mongoose,{models,Schema} from "mongoose";

const UserSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true,
            min:4
        },
        //role:{
        //    title:String,
        //    enum:[
        //        admin,
        //        user
        //    ],
        //    required: false
        //},
        email:{
            type: String,
            required: true,
            unique:true,
        },
        password:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;