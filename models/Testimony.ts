const { default: mongoose } = require("mongoose");
const User = require('./User.ts')

const TestimonySchema = new mongoose.Schema({
    testimony: {
        type: String,
        required: true
    },
    
    tags: {
        tag: {
            type: String,
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Testimony', TestimonySchema)