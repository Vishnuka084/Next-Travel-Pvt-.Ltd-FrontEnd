var guideBaseURL = "http://localhost:8765/guide-service/app/api/v1/guide";

$('.second').css({display: 'none'});
$('.first').css({display: 'block'});

var addressPattern = /^[0-9A-Z a-z,/:]{4,50}$/;
var guideNamePattern = /^[A-Za-z '-]+$/;
var mobilePattern = /^0[0-9]{2}[1-9][0-9]{6}$/;
var GuideDayPrice = /^\d+(?:\.\d{2})?$/;
var dobPattern1 = /^\d{4}-\d{2}-\d{2}$/;
var emailPattern = /^[0-9A-Z a-z$&#]{3,30}(@gmail.com)|(@yahoo.com)$/;

$('#guideName').keyup(function (e) {
    let name = $('#guideName').val();
    if (!guideNamePattern.test(name)) {
        $('#guideName').css('border', '2px solid red');
    } else {
        $('#guideName').css('border', '2px solid green')
    }
});
$('#guideAddress').keyup(function (e) {
    let address = $('#guideAddress').val();
    if (!addressPattern.test(address)) {
        $('#guideAddress').css('border', '2px solid red');
    } else {
        $('#guideAddress').css('border', '2px solid green')
    }
});
$('#guideContact').keyup(function (e) {
    let contact = $('#guideContact').val();
    if (!mobilePattern.test(contact)) {
        $('#guideContact').css('border', '2px solid red');
    } else {
        $('#guideContact').css('border', '2px solid green')
    }
});
$('#guideDayValue').keyup(function (e) {
    let price = $('#guideDayValue').val();
    if (!GuideDayPrice.test(price)) {
        $('#guideDayValue').css('border', '2px solid red');
    } else {
        $('#guideDayValue').css('border', '2px solid green')
    }
});
$('#guideEmail').keyup(function (e) {
    let email = $('#guideEmail').val();
    if (!emailPattern.test(email)) {
        $('#guideEmail').css('border', '2px solid red');
    } else {
        $('#guideEmail').css('border', '2px solid green')
    }
});

$('#nextGuide-btn').click(function () {
    checkGuideDetailsField();
});

function checkGuideDetailsField() {
    !guideNamePattern.test($('#guideName').val()) ? swal("Invalid Guide Name !", "Check Your Guide Name.", "warning") :
        !addressPattern.test($('#guideAddress').val()) ? swal("Invalid Address !", "Check  Address.", "warning") :
            !mobilePattern.test($('#guideContact').val()) ? swal("Invalid Contact!", "Check Contact.", "warning") :
                !dobPattern1.test($('#guideDob').val()) ? swal("Invalid Dob!", "Check Dob.", "warning") :
                    !emailPattern.test($('#guideEmail').val()) ? swal("Invalid Email!", "Check Email.", "warning") : navigateToNextGuideImg();
}

$('#addGuide-btn').click(function () {
    $(".bottom-data").css({display: 'none'});
    $(".btnDelete").css({display: 'none'});
    $('#guide-title').text("Guide Registration");
    windowBlurGuide();
    $("#registerGuide-btn").css({display: 'block'});
    $("#updateGuide-btn").css({display: 'none'});
    $("#edit-guideUI").css({display: 'none'});
    $("#reg-guideUI").css({display: 'block'});
});

function windowBlurGuide() {
    $('.content').css({filter: "blur(5px)"});
    $('.sidebar').css({filter: "blur(5px)"});
    $(".guide-container").css({display: 'block'});

}

function closePopupWindowGuide() {
    $(".bottom-data").css({display: 'block'});
    $('.content').css({filter: "blur(0)"});
    $('.sidebar').css({filter: "blur(0)"});
    $(".guide-container").css({display: 'none'});
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});

}

$('.backBtn').click(function () {
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});
});
$(".icon-close").click(function () {
    closePopupWindowGuide();
    clearFormGuide()
});

function navigateToNextGuideImg() {
    $('.second').css({display: 'block'});
    $('.first').css({display: 'none'});
}

function clearFormGuide() {
    $('#guideName').val("");
    $('#guideAddress').val("");
    $('#guideDob').val("");
    $('#guideContact').val("");
    $('#guideDayValue').val("");
    $('#guideEmail').val("");
    $('#guideNicFront').val("");
    $('#guideNicRear').val("");
    $('#guideIdFront').val("");
    $('#guideIdRear').val("");
    $('#guideImage').val("");
}

$("#registerGuide-btn").click(function () {
    console.log("sve")
    saveGuide();
});
$("#updateGuide-btn").click(function () {
    updateGuide();
});
$("#deleteGuide-btn").click(function () {
    deleteGuide();
});

function saveGuide() {
    var guideObj = {
        guideId: 0,
        guideName: $('#guideName').val(),
        guideAddress: $('#guideAddress').val(),
        guideDob: $('#guideDob').val(),
        guideGender: $('#guideGender').val(),
        guideContact: $('#guideContact').val(),
        guideExperience: $('#guideExperience').val(),
        guideManDay_value: $('#guideDayValue').val(),
        guideEmail: $('#guideEmail').val(),
        guideStatus: $('#guideStatus').val()
    }
    console.log(guideObj);
    let guide = JSON.stringify(guideObj);


    const formDataGuide = new FormData();
    const fileInput1 = $('#guideNicFront')[0].files[0];
    const fileInput2 = $('#guideNicRear')[0].files[0];
    const fileInput3 = $('#guideIdFront')[0].files[0];
    const fileInput4 = $('#guideIdRear')[0].files[0];
    const fileInput5 = $('#guideImage')[0].files[0];


    formDataGuide.append('file', fileInput1);
    formDataGuide.append('file', fileInput2);
    formDataGuide.append('file', fileInput3);
    formDataGuide.append('file', fileInput4);
    formDataGuide.append('file', fileInput5);

    formDataGuide.append('guide', new Blob([guide], {type: "application/json"}));

    console.log(formDataGuide);
    $.ajax({
        url: guideBaseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataGuide,// if we send data with the request
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Registered", "success");
                clearFormGuide();
                closePopupWindowGuide();
                loadAllGuides();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}

loadAllGuides();

function loadAllGuides() {
    $("#tblGuide").empty();
    $.ajax({
        url: guideBaseURL,
        method: "GET",
        // dataType: "json", // please convert the response into JSON
        success: function (resp) {
            for (const guide of resp.data) {
                let row = `<tr>
                            <td>${guide.guideId}</td>
                            <td><img src="data:image/png;base64,${guide.guideImage}" alt="Driver License"></td>
                            <td><img src="data:image/png;base64,${guide.guideNICImageFront}" alt="Front Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideNICImageRear}" alt="Rear Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideIDImageFront}" alt="Side Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideIDImageRear}" alt="Front Interior Image"></td>
                            
                            <td>${guide.guideName}</td>
                            <td>${guide.guideAddress}</td>
                            <td>${guide.guideDob}</td>
                            <td>${guide.guideGender}</td>
                            <td>${guide.guideContact}</td>
                            <td>${guide.guideExperience}</td>
                            <td>${guide.guideManDay_value}</td>
                            <td>${guide.guideEmail}</td>
                            <td>${guide.guideStatus}</td>
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editGuideNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblGuide").append(row);
            }
            bindGuideRowBindEvent();
            clearFormGuide();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function bindGuideRowBindEvent() {
    $(".btnDelete").css({display: 'block'});
    $("#tblGuide>tr").click(function () {
        //Get values from the selected row
        var guideId = $(this).children().eq(0).text();
        var guideImage = $(this).children().eq(1).find('img');
        var guideNICImageFront = $(this).children().eq(2).find('img');
        var guideNICImageRear = $(this).children().eq(3).find('img');
        var guideIDImageFront = $(this).children().eq(4).find('img');
        var guideIDImageRear = $(this).children().eq(5).find('img');
        var guideName = $(this).children().eq(6).text();
        var guideAddress = $(this).children().eq(7).text();
        var guideDob = $(this).children().eq(8).text();
        var guideGender = $(this).children().eq(9).text();
        var guideContact = $(this).children().eq(10).text();
        var guideExperience = $(this).children().eq(11).text();
        var guideManDay_value = $(this).children().eq(12).text();
        var guideEmail = $(this).children().eq(13).text();
        var guideStatus = $(this).children().eq(14).text();

        console.log(guideId);

        var imageSrc1 = $(guideNICImageFront).attr("src");
        var imageSrc2 = $(guideNICImageRear).attr("src");
        var imageSrc3 = $(guideIDImageFront).attr("src");
        var imageSrc4 = $(guideIDImageRear).attr("src");
        var imageSrc5 = $(guideImage).attr("src");


        fetch(imageSrc1)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#guideNicFront")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc2)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#guideNicRear")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc3)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#guideIdFront")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc4)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#guideIdRear")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc5)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#guideImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));


        $('#guideName').val(guideName);
        $('#guideAddress').val(guideAddress);
        $('#guideDob').val(guideDob);
        $('#guideGender').val(guideGender);
        $('#guideContact').val(guideContact);
        $('#guideExperience').val(guideExperience);
        $('#guideDayValue').val(guideManDay_value);
        $('#guideEmail').val(guideEmail);
        $('#guideStatus').val(guideStatus);
        $('#guideIDLbl').text(guideId);

        editGuideNavigation();
    });
}

function editGuideNavigation() {
    $(".bottom-data").css({display: 'none'});
    windowBlurGuide();
    $('#guide-title').text("Update Guide");
    $("#registerGuide-btn").css({display: 'none'});
    $("#updateGuide-btn").css({display: 'block'});
    $("#edit-guideUI").css({display: 'block'});
    $("#reg-guideUI").css({display: 'none'});
    bindGuideRowBindEvent();
}

function updateGuide() {
    var guideUpdateObj = {
        guideId: $('#guideIDLbl').text(),
        guideName: $('#guideName').val(),
        guideAddress: $('#guideAddress').val(),
        guideDob: $('#guideDob').val(),
        guideGender: $('#guideGender').val(),
        guideContact: $('#guideContact').val(),
        guideExperience: $('#guideExperience').val(),
        guideManDay_value: $('#guideDayValue').val(),
        guideEmail: $('#guideEmail').val(),
        guideStatus: $('#guideStatus').val()

    }

    let updateGuide = JSON.stringify(guideUpdateObj);


    const formDataGuide = new FormData();
    const fileInput1 = $('#guideNicFront')[0].files[0];
    const fileInput2 = $('#guideNicRear')[0].files[0];
    const fileInput3 = $('#guideIdFront')[0].files[0];
    const fileInput4 = $('#guideIdRear')[0].files[0];
    const fileInput5 = $('#guideImage')[0].files[0];

    formDataGuide.append('file', fileInput1);
    formDataGuide.append('file', fileInput2);
    formDataGuide.append('file', fileInput3);
    formDataGuide.append('file', fileInput4);
    formDataGuide.append('file', fileInput5);
    formDataGuide.append('guide', new Blob([updateGuide], {type: "application/json"}));

    console.log(formDataGuide);
    $.ajax({
        url: guideBaseURL,
        method: "PUT",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataGuide,// if we send data with the request
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Updated!", "success");
                clearFormGuide();
                closePopupWindowGuide();
                loadAllGuides();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}

function deleteGuide() {
    var guideId = $('#guideIDLbl').text();
    swal({
        title: "Delete Guide",
        text: "Are you sure you want to delete this Guide?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: guideBaseURL + "?guideId=" + guideId,
                    method: "DELETE",
                    success: function (res) {
                        if (res.code == 200) {
                            swal("Deleted", "Success", "success");
                            clearFormGuide();
                            closePopupWindowGuide();
                            loadAllGuides();
                        }
                    },
                    error: function (ob) {
                        swal("Oops", ob.responseJSON.message, "error");
                    }
                });
            }
        });
}

$("#search-guide").on("keypress", function (e) {
    if (e.key == "Enter") {
        searchGuide();
    }
});

$(document).ready(function () {
    $('#search-guide').on('input', function () {
        // Check if the input field is empty
        if ($(this).val() === '') {
            loadAllGuides();
        }
    });
});

$('#searchVehicle-btn').click(function () {
    searchGuide();
});

//Search Customer
function searchGuide() {
    var guideId = $("#search-guide").val();

    $.ajax({
        url: guideBaseURL + "/search?guideId=" + guideId,
        method: "GET",
        success: function (res) {
            if (res.code = 200) {
                var guide = res.data;
                $("#tblGuide").empty();

                let row = `<tr>
                            <td>${guide.guideId}</td>
                            <td><img src="data:image/png;base64,${guide.guideImage}" alt="Driver License"></td>
                            <td><img src="data:image/png;base64,${guide.guideNICImageFront}" alt="Front Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideNICImageRear}" alt="Rear Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideIDImageFront}" alt="Side Image"></td>
                            <td><img src="data:image/png;base64,${guide.guideIDImageRear}" alt="Front Interior Image"></td>
                            
                            <td>${guide.guideName}</td>
                            <td>${guide.guideAddress}</td>
                            <td>${guide.guideDob}</td>
                            <td>${guide.guideGender}</td>
                            <td>${guide.guideContact}</td>
                            <td>${guide.guideExperience}</td>
                            <td>${guide.guideManDay_value}</td>
                            <td>${guide.guideEmail}</td>
                            <td>${guide.guideStatus}</td>
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editGuideNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblGuide").append(row);
                bindGuideRowBindEvent();
                clearFormGuide();
            } else {
                bindGuideRowBindEvent();
                clearFormGuide();
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}
