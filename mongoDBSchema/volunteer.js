const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjId = mongoose.Schema.Types.ObjectId;


var vol = new Schema({
    vol_UserName : {type : String, required: true},
    vol_Password : {type : String, required: true},
    vol_EmailId : {type : String, required: true},
    vol_Name : {type : String, required: true},
    vol_SP : {type : Number, default: 0},
    vol_Rep : {type : Number, default: 0},
    vol_TimeInRural : {type : Number, default: 0},
    vol_appliedEvents : [{
        event_UID : {type : String, required: true},
        event_Name : {type: String, required : true},
        vol_RegUID : {type : String, required: true},
        vol_RegStatus : {type : String, default: "waiting for approval"},
    }],
    vol_ApprovedEvents : [{
        event_UID : {type : String, required: true},
        event_Name : {type: String, required : true},
        vol_RegUID : {type : String, required: true},
    }],
    vol_CompEvents : [{
        event_UID : {type : String, required: true},
        event_Name : {type: String, required : true},
        vol_RegUID : {type : String, required: true},
    }],
    vol_Diary : [{
        vol_DiaryUID : {type : String, required: true},
        event_UID : {type : String, required: true},
        event_Name : {type: String, required : true},
        vol_DiaryDate : {type : Number, required: true}, // ********************************
        vol_DiaryEntry : {type : String, required: true},
        vol_DiaryImgURL : {type : String, default: "http://images.newindianexpress.com/uploads/user/imagelibrary/2018/3/4/w600X300/Wide.jpg"},
        vol_DiaryLikes : {type : Number, default: 0},
    }],
    vol_Pref : {
        pref_Loc : {
            loc_State : {type : String, required: false},
            loc_District : {type : String, required: false},
        },
        pref_DurationOfEvent : {type : Number, default: -1},
    },
});


module.exports = mongoose.model('Vol', vol);