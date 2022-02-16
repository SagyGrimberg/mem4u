import mongoose from "mongoose";

const adSchema = mongoose.Schema({
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        image: {
            type: mongoose.Schema.Types.String,
            required: false,
        }
    },
    {timestamps: true}
)
const Ad = mongoose.model(`Ad`, adSchema);

export default Ad;
