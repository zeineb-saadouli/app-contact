const mongoose = require('mongoose');
const {Schema} = mongoose;
const contactSchema = new Schema({
    Fullname:{type:String, required:[true,'full name is required']},
    email:{type:String, required:[true,'email is required'], unique:true, match:[/\S+@\S+\.\S+/, 'Please enter a valid email']},
    MobileNumber:{type:Number,required:[true,'mobile number is required'], min:[1000000000], max:[9999999999]}

});
const Contact= mongoose.model('Contact', contactSchema);