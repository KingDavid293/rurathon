
var authToken = $.cookie("example");
var eventsList = [];
var stringSelector = "";
$(document).ready(function(){
    if(authToken == null){
        // $('#signUpContainer').removeClass("noDisplay");
        $("#SignUpSubmit").click(function() {
            if ($('#vol_username').val() != "" && $('#vol_password').val() != "" && $('#vol_emailId').val() != "" && $('#vol_name').val() != "") {
                
                console.log("Sign Up validated");
                var username = $('#vol_username').val();
                var password = $('#vol_password').val();
                var emailId = $('#vol_emailId').val();
                var name = $('#vol_name').val();
    
                var da = {
                    "vol_username" : username,
                    "vol_password" : password,
                    "vol_emailId" : emailId,
                    "vol_name" : name
                };
    
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(da),
                    url: 'http://localhost:3000/VolSignUp',
                    success: function(data) {
                        if(data == "account created"){
                            $('#signUpContainer').addClass("noDisplay");
                            $('#signUp-loginTransission').removeClass("noDisplay");
                        } else {
                            if(data == "User Exists"){
                                alert("email exists");
                            } else{
                                alert("error occured");
                            }
                        }
                    }
                  });
    
                console.log(da);
            } else{
                alert("please fill the form");
            }
        });

        $('#LoginSubmit').click(() => {
            if($('#vol_Login_emailId').val() != "" && $('#vol_Login_password').val() != "" ){
                var email = $('#vol_Login_emailId').val();
                var password = $('#vol_Login_password').val();

                var da = {
                    "vol_Login_emailId" : email,
                    "vol_Login_password" : password,
                }

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(da),
                    url: 'http://localhost:3000/login',
                    success: function(data) {
                        if(data == "user dosent exist"){
                            alert("user dosent exist");
                        } else {
                            if(data == "wrong Password") {
                                alert("wrong Password");
                            } else {
                                if(data.loginSuccess){
                                    console.log(data.Token);
                                    $.cookie("example", data.Token);
                                    $('#loginContainer').addClass("noDisplay");
                                    $('#vol-dashboard').removeClass("noDisplay");
                                }
                            }
                        }
                    }
                    });
                
            } else {
                alert("fill the missing details");
            }
        })

        $('#movetoLoginPage').click(function(){
            $('#signUp-loginTransission').addClass("noDisplay");
            $('#loginContainer').removeClass("noDisplay");
        })

        $('#movetoLoginPageFronSignUp').click(function(){
            $('#signUpContainer').addClass("noDisplay");
            $('#loginContainer').removeClass("noDisplay");
        })

        $('#movetosignupFromLoginPage').click(function(){
            $('#loginContainer').addClass("noDisplay");
            $('#signUpContainer').removeClass("noDisplay");
        })
    } else {
        $('#signUpContainer').addClass("noDisplay");
        $('#vol-dashboard').removeClass("noDisplay");
    }

    $('#nav_events').click(()=>{
        var da = {
            "token" : authToken,
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(da),
            url: 'http://localhost:3000/getEvents',
            success: function(data) {
                if(data.success == false){
                    console.log("some error occured");
                } else {
                    var htmlString = "";
                    for(var i = 0; i < data.Data.length; i++){
                        eventsList.push("'#"+data.Data[i].event_UID+"'");
                        htmlString = htmlString + '<div class="eventContainer"><img class="eventImg" src="'+ data.Data[i].event_ImgURL + '" alt="diary entry img" srcset="http://images.newindianexpress.com/uploads/user/imagelibrary/2018/3/4/w600X300/Wide.jpg"><div class="entrytxtContainer"><div class="titleContainer" id="eventName'+i+'"><h4>'+data.Data[i].event_Name+'</h4></div><div class="titleContainer" id="eventDuration'+i+'"><h4>Duration :'+ data.Data[i].event_Duration +'</h4></div><div class="titleContainer" id="eventSLotsLeft'+i+'"><h4>slots Left : '+ data.Data[i].event_SlotsLeft +'</h4></div><div class="titleContainer" id="totalSlots'+i+'"><h4>Total Slota : '+ data.Data[i].event_TotalSlots +'</h4></div><div class="entryContent" id="eventDiscription'+i+'"><p>'+ data.Data[i].event_Discription +'</p></div></br> <p>'+ JSON.stringify(data.Data[i].event_Location) +'</p> <button class="btn-submit" name="registratonBtn" onclick="eventRegister(\''+data.Data[i].event_UID+ '\')" val="'+ data.Data[i].event_UID +'">Register</button></div></div>';
                    }
                    $("#eventsListContainer").append(htmlString);
                }
            }
        });
        $('#eventsListContainer').removeClass("noDisplay");
        $('#diaryContainer').addClass("noDisplay");
        $('#appliedEventsListContainer').addClass("noDisplay");
    });

    

    

    $('#appliedEvents').click(()=>{
        $('#eventsListContainer').addClass("noDisplay");
        $('#diaryContainer').addClass("noDisplay");
        $('#appliedEventsListContainer').removeClass("noDisplay");

    });

    $('#nav_diary').click(()=>{
        var da = {
            "token" : authToken,
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(da),
            url: 'http://localhost:3000/getDiary',
            success: function(data) {
                if(data.success == false){
                    console.log("some error occured");
                } else {
                    var htmlString = "";
                    for(var i = 0; i < data.Data.length; i++){
                        htmlString = htmlString + '<div class="diaryEntry"><img class="diaryImg" src="http://images.newindianexpress.com/uploads/user/imagelibrary/2018/3/4/w600X300/Wide.jpg" alt="diary entry img" srcset="http://images.newindianexpress.com/uploads/user/imagelibrary/2018/3/4/w600X300/Wide.jpg"><div class="entrytxtContainer"><div class="titleContainer"><h3>'+ data.Data[i].event_Name +' ['+ data.Data[i].vol_DiaryDate +']</h3></div><div class="entryContent"><p>'+ data.Data[i].vol_DiaryEntry +'</p></div></div></div>';
                    }
                    $("#diaryEntryContainer").append(htmlString);
                }
            }
        });
        $('#eventsListContainer').addClass("noDisplay");
        $('#diaryContainer').removeClass("noDisplay");
        $('#appliedEventsListContainer').addClass("noDisplay");
    });

    $('#addDiaryEntry').click(()=>{

        var da = {
            "token" : authToken,
        }
        $('#adddairyentry').removeClass("noDisplay");
        $('#diaryEntryContainer').addClass("noDisplay");
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(da),
            url: 'http://localhost:3000/getActiveEvents',
            success: function(data) {
                if(data.success == false){
                    console.log("some error occured");
                } else {
                    var htmlString = "";
                    for(var i = 0; i < data.Data.length; i++){
                        htmlString = htmlString + "<option value='" + data.Data[i].event_UID + "'>" + data.Data[i].event_Name, + "</option>";
                    }
                    $("#inputActiveEvent").append(htmlString);
                }
            }
        });
    }) 
});




function eventRegister(val){
    if(authToken != 0){
        var da = {
            "token" : authToken,
            "event_UID" : val
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(da),
            url: 'http://localhost:3000/registerForEvent',
            success: function(data) {
                if(data.success == false){
                    console.log("some error occured");
                } else {
                    alert("registration compleate, the organisaton will contact you")
                }
            }
        });
    }    
}