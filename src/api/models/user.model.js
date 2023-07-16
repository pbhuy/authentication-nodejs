const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        imageURL: String,
        address: String,
        phone: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.verifyPassword = async function (candidatePassword) {
    const currentPassword = this.password
    return await bcrypt.compare(candidatePassword, currentPassword)
}

const User = mongoose.model('user', userSchema)
module.exports = User
