const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjId = mongoose.Schema.Types.ObjectId;

// var user = new Schema({
//   userName : {type : String , required: true},
//   mobileNumber : {type : Number , required: true},
//   eMailID : {type : String , required: true},
//   state : {type : String , required: true},
//   district : {type : String , required: true},
//   village : {type : String , required: true},
//   pinCode : {type : Number , required: true},
//   testResponce : [{type : Number}],
//   testResult : [{type : Number}],
//   testResultCorrected : [{type : Number}],
//   timeMins : {type : Number},
//   timeSecs : {type : Number},
// });


var org = new Schema({
    org_Name : {type : String, required:true},
    org_Info : {type : String, required: true},
    org_Repu : {type : Number, default : 0},
    org_EventsDone : {type : Number, default : 0},
    org_Password : {type : String, required: true},
    org_EmailId : {type : String, required: true},
    org_UID : {type : String, required: true},
    org_UserRev : [
        {
            vol_UserName : {type : String, required: true},
            vol_ProfileLink : {type : String, required: true},
            vol_Rev : {type : String, required: true},
            vol_NoStars : {type : Number, required: true},
            vol_UID : {type : String, required: true},
        }
    ],
    org_mainImgUrl : {type : String, default:"http://4.bp.blogspot.com/-7gnGDqOEPzc/UvXHsGWHLVI/AAAAAAAADvM/V-VTfyxOOLQ/s1600/think-different-fb-profile-cover.jpg"},
    org_logoImgUrl : {type : String, default:"https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250"},
    org_contactInfo : {
        contactNo : {type : Number, default: 0000000000},
        EmailID : {type : String , default: this.org_EmailId},
        fbLink : {type : String , require: false},
    },
    org_Events : [{
        event_Name : {type : String , require:true},
        event_Discription : {type : String , require:true},
        event_Time : {type : String, required: true},
        event_Duration : {type : Number, required: true},
        event_ImgURL : {type: String, default:"https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250"},
        event_SlotsLeft : {type : Number, required: false},
        event_TotalSlots : {type : Number, required: true},
        event_Registrations : [{
            vol_Name : {type : String, required: true},
            vol_ProfileLink : {type : String, required: true},
            vol_RegUID : {type : String, required: true},
            vol_Note : {type : Number, default: "no Note"},
            Status : {type: String, default: "waiting for approval"},
        }],
        event_UID : {type : String, required: true},
        event_Location : {
            loc_State : {type : String, required: true},
            loc_District : {type: String, required: true},
            loc_Village : {type: String, required: true},
            loc_PinCode : {type: Number, required: true},
        },
    }],
});

module.exports = mongoose.model('Org', org);