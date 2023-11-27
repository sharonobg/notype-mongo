import mongoose from "mongoose";

export const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to Mongo");

    } catch (error) {
        console.log("no connection to Mongo",error);
    }
};
export default connect;