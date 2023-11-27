import mongoose from "mongoose"

const CommentSchema = new mongoos.Schema({
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    current_userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type:number,
    },
    paymentType:{
        type: String,
        required: true,
        enum: [// enum means must be one of these 
            "debitCard",
            "cash",
            "bankAcct",
            "bankAcctAlt1",
            "bankAcctAlt2",
        ]
    }
},
{timestamps: true}
)
const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
