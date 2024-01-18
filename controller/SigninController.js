let baseURL = "http://localhost:8765/user-service/app/api/v1/user";
let baseURLAdmin = "http://localhost:8765/user-service/app/api/v1/admin";

var usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{12,}$/;
const agePattern = /^\d{4}-\d{2}-\d{2}$/;
var mobilePattern = /^0[0-9]{2}[1-9][0-9]{6}$/;
var emailPattern = /^[0-9A-Z a-z$&#]{3,30}(@gmail.com)|(@yahoo.com)$/;
var addressPattern = /^[0-9A-Z a-z,/:]{4,50}$/;

var nicPattern = /^\d{9}[VvXx]$/;

$('#user-UserName').keyup(function (e) {
    let userName = $('#user-UserName').val();
    if (!usernamePattern.test(userName)) {
        $('#user-UserName').css('border', '2px solid red');
    } else {
        $('#user-UserName').css('border', '2px solid green')
    }
});

$('#user-Password').keyup(function (e) {
    let password = $('#user-Password').val();
    if (!passwordPattern.test(password)) {
        $('#user-Password').css('border', '2px solid red');
    } else {
        $('#user-Password').css('border', '2px solid green')
    }
});
$('#user-Age').keyup(function (e) {
    let password = $('#user-Age').val();
    if (!agePattern.test(password)) {
        $('#user-Age').css('border', '2px solid red');
    } else {
        $('#user-Age').css('border', '2px solid green')
    }
});
$('#user-Contact').keyup(function (e) {
    let password = $('#user-Contact').val();
    if (!mobilePattern.test(password)) {
        $('#user-Contact').css('border', '2px solid red');
    } else {
        $('#user-Contact').css('border', '2px solid green')
    }
});
$('#user-Email').keyup(function (e) {
    let password = $('#user-Email').val();
    if (!emailPattern.test(password)) {
        $('#user-Email').css('border', '2px solid red');
    } else {
        $('#user-Email').css('border', '2px solid green')
    }
});
$('#user-Address').keyup(function (e) {
    let password = $('#user-Address').val();
    if (!addressPattern.test(password)) {
        $('#user-Address').css('border', '2px solid red');
    } else {
        $('#user-Address').css('border', '2px solid green')
    }
});

$('#user-Nic').keyup(function (e) {
    let password = $('#user-Nic').val();
    if (!nicPattern.test(password)) {
        $('#user-Nic').css('border', '2px solid red');
    } else {
        $('#user-Nic').css('border', '2px solid green')
    }
});
/*events*/
$('#register-btn').click(function (e) {
    checkUserValid();
});

$('#login-btn').click(function (e) {
    login();
    console.log("hiii");
});


/*Save Customer*/
function checkUserValid() {
    !usernamePattern.test($('#user-UserName').val()) ? swal("Invalid UserName !", "Check Your UserName.", "warning") :
        !passwordPattern.test($('#user-Password').val()) ? swal("Invalid Password !", "Check Your Password.", "warning") :
            !agePattern.test($('#user-Age').val()) ? swal("Invalid Age !", "Check Your Age.", "warning") :
                !mobilePattern.test($('#user-Contact').val()) ? swal("Invalid Mobile Number !", "Check Your Mobile Number.", "warning") :
                    !emailPattern.test($('#user-Email').val()) ? swal("Invalid Email !", "Check Your Email.", "warning") :
                        !addressPattern.test($('#user-Address').val()) ? swal("Invalid Address !", "Check Your Address.", "warning") :
                                !nicPattern.test($('#user-Nic').val()) ? swal("Invalid Nic !", "Check Your Nic.", "warning") : saveUser();
}

function clearLogin() {
    $('#login-Email').val("");
    $('#login-password').val("");
    $('#myComboBoxLogIn').val("");
}

function clearForm() {
    $('#user-UserName').val("");
    $('#user-Password').val("");
    $('#user-Age').val("");
    $('#user-Contact').val("");
    $('#user-Gender').val("");
    $('#user-Email').val("");
    $('#user-Address').val("");
    $('#user-Nic').val("");
    $('#user-Profile').val("");
}

function navigateToLogin() {
    $(".login").css({display: 'block'});
    $(".register-container").css({display: 'none'});
}
function login() {
    let loginOption = $('#myComboBoxLogIn').val();

    console.log(loginOption)

    if (loginOption !== null){
        if (loginOption === 'option1'){
            Userlogin();
        }else {
            adminLogin();
        }
    }else {
        swal("Oops","Select Your Login Option!", "error");
    }
}
function adminLogin() {
    var loginEmail = $('#login-Email').val();
    var loginPassword = $('#login-password').val();


    $.ajax({
        url: baseURLAdmin + "/" + loginEmail + "/" + loginPassword,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                swal({
                    title: "Login Success!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "Continue",
                });
                clearLogin();
                window.location.href="../pages/page1/Dashbord.html";

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}


function Userlogin() {

    var loginEmail = $('#login-Email').val();
    var loginPassword = $('#login-password').val();


    $.ajax({
        url: baseURL + "/" + loginEmail + "/" + loginPassword,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                swal({
                    title: "Login Success!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "Continue",
                });
                clearLogin();
                window.location.href="../pages/page2/package.html";

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });

}

function saveUser() {

    var userObj = {
        userId: 0,
        userName: $('#user-UserName').val(),
        password: $('#user-Password').val(),
        age: $('#user-Age').val(),
        contact: $('#user-Contact').val(),
        email: $('#user-Email').val(),
        address: $('#user-Address').val(),
        gender: $('#user-Gender').val(),
        nic: $('#user-Nic').val()

    }

    let user = JSON.stringify(userObj);


    const formData = new FormData();
    const fileInput = $('#user-Profile')[0].files[0];

    formData.append('file', fileInput);
    formData.append('user', user);

    console.log(formData);
    $.ajax({
        url: baseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formData,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                swal("Success", "Registered", "success");
                clearForm();
                navigateToLogin();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}