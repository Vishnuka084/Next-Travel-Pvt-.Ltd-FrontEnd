var userBaseURL = "http://localhost:8080/app/api/v1/user";

var usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{12,}$/;
var mobilePattern = /^0[0-9]{2}[1-9][0-9]{6}$/;
var emailPattern = /^[0-9A-Z a-z$&#]{3,30}(@gmail.com)|(@yahoo.com)$/;
var addressPattern = /^[0-9A-Z a-z,/:]{4,50}$/;
var nicPattern = /^\d{9}[VvXx]$/;
const dobPattern = /^\d{4}-\d{2}-\d{2}$/;

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
$('#registerUser-btn').click(function (e) {
    checkUserValidForSave();
});
$('#deleteUser-btn').click(function () {
    deleteUser();
});

function checkUserValidForSave() {
    !usernamePattern.test($('#user-UserName').val()) ? swal("Invalid UserName !", "Check Your UserName.", "warning") :
        !passwordPattern.test($('#user-Password').val()) ? swal("Invalid Password !", "Check Your Password.", "warning") :
            !mobilePattern.test($('#user-Contact').val()) ? swal("Invalid Mobile Number !", "Check Your Mobile Number.", "warning") :
                !emailPattern.test($('#user-Email').val()) ? swal("Invalid Email !", "Check Your Email.", "warning") :
                    !dobPattern.test($('#user-Age').val()) ? swal("DOB not Selected !", "Check Your Dob.", "warning") :
                        !addressPattern.test($('#user-Address').val()) ? swal("Invalid Address !", "Check Your Address.", "warning") :
                            !nicPattern.test($('#user-Nic').val()) ? swal("Invalid Nic !", "Check Your Nic.", "warning") : saveUser();
}

$('#update-btn').click(function (e) {
    checkUserValidForUpdate();
});

function checkUserValidForUpdate() {
    !usernamePattern.test($('#user-UserName').val()) ? swal("Invalid UserName !", "Check Your UserName.", "warning") :
        !passwordPattern.test($('#user-Password').val()) ? swal("Invalid Password !", "Check Your Password.", "warning") :
            !mobilePattern.test($('#user-Contact').val()) ? swal("Invalid Mobile Number !", "Check Your Mobile Number.", "warning") :
                !dobPattern.test($('#user-Age').val()) ? swal("DOB not Selected !", "Check Your Dob.", "warning") :
                    !emailPattern.test($('#user-Email').val()) ? swal("Invalid Email !", "Check Your Email.", "warning") :
                        !addressPattern.test($('#user-Address').val()) ? swal("Invalid Address !", "Check Your Address.", "warning") :
                            !nicPattern.test($('#user-Nic').val()) ? swal("Invalid Nic !", "Check Your Nic.", "warning") : updateUser();
}

function clearForm() {
    $('#user-UserName').val("");
    $('#user-Password').val("");
    $('#user-Contact').val("");
    $('#user-Email').val("");
    $('#user-Address').val("");
    $('#user-Nic').val("");
    $('#user-Profile').val("");
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
        url: userBaseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formData,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                swal("Success", "Registered", "success");
                clearForm();
                loadAllUsers();
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}

function closePopupWindow() {
    $(".bottom-data").css({display: 'block'});
    $('.content').css({filter: "blur(0)"});
    $('.sidebar').css({filter: "blur(0)"});
    $(".register-container").css({display: 'none'});
    $(".vehicle-container").css({display: 'none'});
    $('#user-UserName').val("");
    $('#user-Password').val("");
    $('#user-Age').val("");
    $('#user-Contact').val("");
    $('#user-Email').val("");
    $('#user-Address').val("");
    $('#user-Nic').val("");
    $('#user-Profile').val("");
}

$(".icon-close").click(function () {
    closePopupWindow();
});

$('#addUser-btn').click(function () {
    $("#deleteUser-btn").css({display: 'none'});
    $(".bottom-data").css({display: 'none'});
    $('#user-title').text("User Registration");
    windowBlue();
    $("#registerUser-btn").css({display: 'block'});
    $("#update-btn").css({display: 'none'});
    $("#edit-UI").css({display: 'none'});
    $("#reg-UI").css({display: 'block'});
});

function editNavigation() {
    $(".bottom-data").css({display: 'none'});
    windowBlue();
    $('#user-title').text("Update User");
    $("#registerUser-btn").css({display: 'none'});
    $("#update-btn").css({display: 'block'});
    $("#deleteUser-btn").css({display: 'block'});
    $("#edit-UI").css({display: 'block'});
    $("#reg-UI").css({display: 'none'});
    bindClickEvents();

}

function windowBlue() {
    $('.content').css({filter: "blur(5px)"});
    $('.sidebar').css({filter: "blur(5px)"});
    $(".register-container").css({display: 'block'});
}

function bindClickEvents() {
    $("#tbluser>tr").click(function () {
        //Get values from the selected row
        var userID = $(this).children().eq(0).text();
        var name = $(this).children().eq(2).text();
        var nic = $(this).children().eq(3).text();
        var age = $(this).children().eq(4).text();
        var gender = $(this).children().eq(6).text();
        var email = $(this).children().eq(5).text();
        var contact = $(this).children().eq(7).text();
        var address = $(this).children().eq(8).text();
        var password = $(this).children().eq(9).text();
        var profile = $(this).children().eq(1).find('img');

        var imageSrc = $(profile).attr("src");
        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#user-Profile")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));


        $('#user-UserName').val(name);
        $('#user-Password').val(password);
        $('#user-Age').val(age);
        $('#user-Contact').val(contact);
        $('#user-Email').val(email);
        $('#user-Address').val(address);
        $('#user-Gender').val(gender);
        $('#user-Nic').val(nic);
        $('#userId').text(userID);
        // $('#user-Profile').val(imageUrl);
        editNavigation();

    });
}

$("#search-user").on("keypress", function (e) {
    if (e.key == "Enter") {
        searchCustomer();
    }
});

$(document).ready(function () {
    $('#search-user').on('input', function () {
        // Check if the input field is empty
        if ($(this).val() === '') {
            loadAllUsers();
        }
    });
});

$('#searchUser-btn').click(function () {
    searchCustomer();
});

//Search Customer
function searchCustomer() {
    var userNic = $("#search-user").val();

    $.ajax({
        url: userBaseURL + "/search?nic=" + userNic,
        method: "GET",
        success: function (res) {
            if (res.code = 200) {
                var user = res.data;
                $("#tbluser").empty();

                let row = `<tr>
                            <td>${user.userId}</td><td><img src="" alt="Image" id="img-profile"></td><td>${user.userName}</td><td>${user.nic}</td><td>${user.age}</td>
                            <td>${user.email}</td><td>${user.gender}</td><td>${user.contact}</td><td>${user.address}</td><td>${user.password}</td>
                             <td>
                             <div>
                             <button class="edit-Btn" onclick="editNavigation()"><i class='bx bx-edit'></i> edit</button>
                            
                        </div>
                            
                        </td>
                            </tr>`;

                $("#tbluser").append(row);
                $("#tbluser tr:last-child img").attr('src', `data:image/png;base64,${user.profilePic}`);
            } else {
                clearForm();
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}

function updateUser() {

    var userObj = {
        userId: $('#userId').text(),
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
        url: userBaseURL,
        method: "PUT",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formData,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                swal("Success", "Update", "success");
                clearForm();
                loadAllUsers();
                closePopupWindow();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}

loadAllUsers();

function loadAllUsers() {
    $("#tbluser").empty();
    $.ajax({
        url: userBaseURL,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {

            for (const user of resp.data) {
                let row = `<tr>
                            <td>${user.userId}</td><td><img src="" alt="Image" id="img-profile"></td><td>${user.userName}</td><td>${user.nic}</td><td>${user.age}</td>
                            <td>${user.email}</td><td>${user.gender}</td><td>${user.contact}</td><td>${user.address}</td><td>${user.password}</td>
                             <td>
                            <button class="edit-Btn" onclick="editNavigation()"><i class='bx bx-edit'></i> edit</button>
                        </td>
                            </tr>`;

                $("#tbluser").append(row);
                $("#tbluser tr:last-child img").attr('src', `data:image/png;base64,${user.profilePic}`);
            }
            clearForm();
            bindClickEvents();

        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

function deleteUser() {
    let userId = $('#userId').text();

    swal({
        title: "Delete User",
        text: "Are you sure you want to delete this user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: userBaseURL + "?userId=" + userId,
                    method: "DELETE",
                    success: function (res) {
                        if (res.code == 200) {
                            swal("Deleted", "Success", "success");
                            loadAllUsers();
                            clearForm();
                            closePopupWindow();
                        }
                    },
                    error: function (ob) {
                        swal("Oops", ob.responseJSON.message, "error");
                    }
                });
            }
        });
}
