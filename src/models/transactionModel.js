import mongoose,{models,Schema} from "mongoose";

const TransactionSchema = new Schema(
    {   transdate:{
        type: Date,
        default: new Date(),
        required:false,
        },
        descr:{
            type: String,
            required: true,
            min:6
        },
        acctype:{
            type: String,
            required: true,
            enum: [// enum means must be one of these 
                "debit",
                "cash",
                "bank_account",
                "other",
            ]
        },
        categoryTitle:{
            type:String,
            ref: "Category",
            required:false
        },
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required:false
        },
        authorId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        amount:{
            default:0,
            type:mongoose.Types.Decimal128,
            required:true
        }
    },
    {timestamps: true}
);
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;