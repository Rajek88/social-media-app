const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
    },
    //this define object id of liked object
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel',
    },
    //this field is used to define type of liked object since this is sdynamic reference
    onModel : {
        type : String,
        required : true,
        enum : ['Post', 'Comment'],
    }
}, {
    timestamps : true,
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;