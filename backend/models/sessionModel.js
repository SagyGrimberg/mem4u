import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
        socketId: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    {timestamps: true}
)
const Session = mongoose.model(`Session`, sessionSchema);

export default Session;
