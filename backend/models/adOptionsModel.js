import mongoose from "mongoose";

const adOptionsSchema = mongoose.Schema({
        defaultFrequency: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    {timestamps: true}
)
const AdOptions = mongoose.model(`Session`, adOptionsSchema);

export default AdOptions;
