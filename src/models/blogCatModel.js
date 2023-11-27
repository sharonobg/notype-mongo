import mongoose,{models,Schema} from "mongoose";

const BlogSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            min:4
        },
        description:{
            type: String,
            required: true,
            min:6
        },
        
        category: {
           type: String,
            required: true,
            enum: [// enum means must be one of these 
                "food_in",
                "food_out",
                "mortgage",
                "entertainment",
            ]
        },
        categoryId: {
            //[
                 type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
            //]
        }, //added the brackets.
        authorId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {timestamps: true}
);
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;