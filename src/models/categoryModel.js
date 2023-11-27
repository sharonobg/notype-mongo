import mongoose,{models,Schema} from "mongoose";

const CategorySchema = new Schema(
    {   title:{
            type: String,
            required: true,
            unique: true,
            min:6
        },
    },
    {timestamps: true}
);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;