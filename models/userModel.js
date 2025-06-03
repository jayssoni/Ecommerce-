const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",

    },
    isBlocked: {
        type:Boolean,
        default:false,

    },
    cart:{
        type:Array,
        default:[],

    },
    address:[{type:mongoose.Schema.Types.ObjectId,ref:"Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
},
    {
        timestamps:true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();

    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createJWT = function () {
    return jwt.sign(
        { _id: this._id, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );
};
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex") + this._id;
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resetToken;
}
//Export the model  
module.exports = mongoose.model('User', userSchema);