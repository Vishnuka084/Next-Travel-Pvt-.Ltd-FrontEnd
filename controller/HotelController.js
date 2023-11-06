var hotelBaseURL = "http://localhost:8765/hotel-service/app/api/v1/hotel";

$('.second').css({display: 'none'});
$('.first').css({display: 'block'});

var hotelName = /^[A-Za-z\s'&.,-]+$/;
var hotelLocation = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
var emailPattern = /^[0-9A-Z a-z$&#]{3,30}(@gmail.com)|(@yahoo.com)$/;
var mobilePattern = /^0[0-9]{2}[1-9][0-9]{6}$/;
var priceHotel1 = /^\$?\d+(?:\.\d{2})?$/;
var addressPattern = /^[0-9A-Z a-z,/:]{4,50}$/;

$('#hotelName').keyup(function (e) {
    let Name = $('#hotelName').val();
    if (!hotelName.test(Name)) {
        $('#hotelName').css('border', '2px solid red');
    } else {
        $('#hotelName').css('border', '2px solid green')
    }
});
$('#hotelLocation').keyup(function (e) {
    let location = $('#hotelLocation').val();
    if (!addressPattern.test(location)) {
        $('#hotelLocation').css('border', '2px solid red');
    } else {
        $('#hotelLocation').css('border', '2px solid green')
    }
});
$('#hotelGoogleLocation').keyup(function (e) {
    let location = $('#hotelGoogleLocation').val();
    if (!hotelLocation.test(location)) {
        $('#hotelGoogleLocation').css('border', '2px solid red');
    } else {
        $('#hotelGoogleLocation').css('border', '2px solid green')
    }
});
$('#hotelEmail').keyup(function (e) {
    let email = $('#hotelEmail').val();
    if (!emailPattern.test(email)) {
        $('#hotelEmail').css('border', '2px solid red');
    } else {
        $('#hotelEmail').css('border', '2px solid green')
    }
});
$('#hotelContact1').keyup(function (e) {
    let mobile = $('#hotelContact1').val();
    if (!mobilePattern.test(mobile)) {
        $('#hotelContact1').css('border', '2px solid red');
    } else {
        $('#hotelContact1').css('border', '2px solid green')
    }
});
$('#hotelContact2').keyup(function (e) {
    let mobile = $('#hotelContact2').val();
    if (!mobilePattern.test(mobile)) {
        $('#hotelContact2').css('border', '2px solid red');
    } else {
        $('#hotelContact2').css('border', '2px solid green')
    }
});
$('#room-opt1').keyup(function (e) {
    let price = $('#room-opt1').val();
    if (!priceHotel1.test(price)) {
        $('#room-opt1').css('border', '2px solid red');
    } else {
        $('#room-opt1').css('border', '2px solid green')
    }
});
$('#room-opt2').keyup(function (e) {
    let price = $('#room-opt2').val();
    if (!priceHotel1.test(price)) {
        $('#room-opt2').css('border', '2px solid red');
    } else {
        $('#room-opt2').css('border', '2px solid green')
    }
});$('#room-opt3').keyup(function (e) {
    let price = $('#room-opt3').val();
    if (!priceHotel1.test(price)) {
        $('#room-opt3').css('border', '2px solid red');
    } else {
        $('#room-opt3').css('border', '2px solid green')
    }
});$('#room-opt4').keyup(function (e) {
    let price = $('#room-opt4').val();
    if (!priceHotel1.test(price)) {
        $('#room-opt4').css('border', '2px solid red');
    } else {
        $('#room-opt4').css('border', '2px solid green')
    }
});

$('#nextHotel-btn').click(function () {
    checkHotelDetailsField();
});
function checkHotelDetailsField() {
    !hotelName.test($('#hotelName').val()) ? swal("Invalid Hotel !", "Check Your Hotel.", "warning") :
        !addressPattern.test($('#hotelLocation').val()) ? swal("Invalid Location !", "Check  Location.", "warning") :
            !hotelLocation.test($('#hotelGoogleLocation').val()) ? swal("Invalid Google Location!", "Check  SGoogle Location.", "warning") :
                !emailPattern.test($('#hotelEmail').val()) ? swal("Invalid Email Address!", "Check Email Address.", "warning") :
                    !mobilePattern.test($('#hotelContact1').val()) ? swal("Invalid Phone Number!", "Check  Phone 1 Number.", "warning") :
                        !mobilePattern.test($('#hotelContact2').val()) ? swal("Invalid  Phone Number!", "Check   Phone 2 Number.", "warning") :
                            !priceHotel1.test($('#room-opt1').val()) ? swal("Invalid Price !", "Check  Price opt-1.", "warning") :
                                !priceHotel1.test($('#room-opt2').val()) ? swal("Invalid Price !", "Check  Price opt-2.", "warning") :
                                    !priceHotel1.test($('#room-opt3').val()) ? swal("Invalid Price !", "Check  Price opt-3.", "warning") :
                                        !priceHotel1.test($('#room-opt4').val()) ? swal("Invalid Price !", "Check  Price opt-4.", "warning") :navigateToNextHotelImg();
}
$('#addHotel-btn').click(function () {
    $(".bottom-data").css({display: 'none'});
    $(".btnDelete").css({display: 'none'});
    $('#hotel-title').text("Hotel Registration");
    windowBlurHotel();
    $("#registerHotel-btn").css({display: 'block'});
    $("#updateHotel-btn").css({display: 'none'});
    $("#edit-hotelUI").css({display: 'none'});
    $("#reg-hotelUI").css({display: 'block'});
});

function windowBlurHotel() {
    $('.content').css({filter: "blur(5px)"});
    $('.sidebar').css({filter: "blur(5px)"});
    $(".hotel-container").css({display: 'block'});

}
$('.backBtn').click(function () {
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});
});
function navigateToNextHotelImg() {
    $('.second').css({display: 'block'});
    $('.first').css({display: 'none'});
}
function closePopupWindowHotel() {
    $(".bottom-data").css({display: 'block'});
    $('.content').css({filter: "blur(0)"});
    $('.sidebar').css({filter: "blur(0)"});
    $(".hotel-container").css({display: 'none'});
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});

}

$(".icon-close").click(function () {
    closePopupWindowHotel();
    clearFormHotel()
});

function clearFormHotel() {
    $('#hotelName').val("");
    $('#hotelLocation').val("");
    $('#hotelGoogleLocation').val("");
    $('#hotelEmail').val("");
    $('#hotelContact1').val("");
    $('#hotelContact2').val("");
    $('#room-opt1').val("");
    $('#room-opt2').val("");
    $('#room-opt3').val("");
    $('#room-opt4').val("");
    $('#hotelImage').val("");
}
$("#registerHotel-btn").click(function () {
    saveHotel();
});

$("#updateHotel-btn").click(function () {
    updateHotel();
});
$("#deleteHotel-btn").click(function () {
    deleteHotel();
});
function saveHotel() {
    var hotelObj = {
        hotelId: 0,
        hotelName: $('#hotelName').val(),
        hotelCategory: $('#hotelCategory').val(),
        hotelLocation: $('#hotelLocation').val(),
        hotelGmapLocation: $('#hotelGoogleLocation').val(),
        hotelEmail: $('#hotelEmail').val(),
        hotelContact: {
            hotelContact_1:$('#hotelContact1').val(),
            hotelContact_2:$('#hotelContact2').val()
        },
        hotelPetAllow: $('#petStatus').val(),
        hotelCancellationCriteria: $('#Cancellation').val(),
        hotelRoomOpt: {
            hotelRoom_Opt_1:$('#room-opt1').val(),
            hotelRoom_Opt_2:$('#room-opt2').val(),
            hotelRoom_Opt_3:$('#room-opt3').val(),
            hotelRoom_Opt_4:$('#room-opt4').val()
        }
    };

    console.log(hotelObj);

    // Convert the JavaScript object to a JSON string
    var hotelJson = JSON.stringify(hotelObj);

    const formDataHotel = new FormData();
    const fileInput = $('#hotelImage')[0].files[0];

    formDataHotel.append('file', fileInput);

    // Append the JSON data as a blob with the content type "application/json"
    formDataHotel.append('hotel', new Blob([hotelJson], { type: "application/json" }));

    console.log(formDataHotel);

    $.ajax({
        url: hotelBaseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataHotel,
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Registered", "success");
                clearFormHotel();
                closePopupWindowHotel();
                loadAllHotels();
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}
loadAllHotels();

function loadAllHotels() {
    $("#tblHotel").empty();
    $.ajax({
        url: hotelBaseURL,
        method: "GET",
        // dataType: "json", // please convert the response into JSON
        success: function (resp) {
            for (const hotel of resp.data) {
                let row = `<tr>
                            <td>${hotel.hotelId}</td>
                            <td><img src="data:image/png;base64,${hotel.hotelImage}" alt="Hotel Image"></td>
                            <td>${hotel.hotelName}</td>
                            <td>${hotel.hotelCategory}</td>
                            <td>${hotel.hotelLocation}</td>
                            <td><a href="${hotel.hotelGmapLocation}"><span class="material-symbols-outlined">location_on</span>Location</a></td>
                            <td>${hotel.hotelEmail}</td>
                            <td>${hotel.hotelContact.hotelContact_1}</td>
                            <td>${hotel.hotelContact.hotelContact_2}</td>
                            <td>${hotel.hotelPetAllow}</td>
                            <td>${hotel.hotelCancellationCriteria}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_1}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_2}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_3}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_4}</td>
                            
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editHotelNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblHotel").append(row);
            }
            bindHotelRowBindEvent();
            clearFormHotel();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}
function bindHotelRowBindEvent() {
    $(".btnDelete").css({display: 'block'});
    $("#tblHotel>tr").click(function () {
        //Get values from the selected row
        var hotelId = $(this).children().eq(0).text();
        var hotelImage = $(this).children().eq(1).find('img');
        var hotelName = $(this).children().eq(2).text();
        var hotelCategory = $(this).children().eq(3).text();
        var hotelLocation = $(this).children().eq(4).text();
        var hotelGmapLocation = $(this).children().find('a').attr('href');
        var hotelEmail = $(this).children().eq(6).text();
        var hotelContact1 = $(this).children().eq(7).text();
        var hotelContact2 = $(this).children().eq(8).text();
        var hotelPetAllow = $(this).children().eq(9).text();
        var hotelCancellationCriteria = $(this).children().eq(10).text();
        var hotelRoomOpt1 = $(this).children().eq(11).text();
        var hotelRoomOpt2 = $(this).children().eq(12).text();
        var hotelRoomOpt3 = $(this).children().eq(13).text();
        var hotelRoomOpt4 = $(this).children().eq(14).text();

        console.log(hotelId);

        var imageSrc = $(hotelImage).attr("src");

        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#hotelImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));


        $('#hotelName').val(hotelName);
        $('#hotelCategory').val(hotelCategory);
        $('#hotelLocation').val(hotelLocation);
        $('#hotelGoogleLocation').val(hotelGmapLocation);
        $('#hotelEmail').val(hotelEmail);
        $('#hotelContact1').val(hotelContact1);
        $('#hotelContact2').val(hotelContact2);
        $('#petStatus').val(hotelPetAllow);
        $('#Cancellation').val(hotelCancellationCriteria);
        $('#room-opt1').val(hotelRoomOpt1);
        $('#room-opt2').val(hotelRoomOpt2);
        $('#room-opt3').val(hotelRoomOpt3);
        $('#room-opt4').val(hotelRoomOpt4);
        $('#hotelIDLbl').text(hotelId);

        editHotelNavigation();
    });
}
function editHotelNavigation() {
    $(".bottom-data").css({display: 'none'});
    windowBlurHotel();
    $('#hotel-title').text("Update Hotel");
    $("#registerHotel-btn").css({display: 'none'});
    $("#updateHotel-btn").css({display: 'block'});
    $("#edit-hotelUI").css({display: 'block'});
    $("#reg-hotelUI").css({display: 'none'});
    bindVehicleRowBindEvent();
}
function updateHotel() {
    var hotelUpdateObj = {
        hotelId: $('#hotelIDLbl').text(),
        hotelName: $('#hotelName').val(),
        hotelCategory: $('#hotelCategory').val(),
        hotelLocation: $('#hotelLocation').val(),
        hotelGmapLocation: $('#hotelGoogleLocation').val(),
        hotelEmail: $('#hotelEmail').val(),
        hotelContact: {
            hotelContact_1:$('#hotelContact1').val(),
            hotelContact_2:$('#hotelContact2').val()
        },
        hotelPetAllow: $('#petStatus').val(),
        hotelCancellationCriteria: $('#Cancellation').val(),
        hotelRoomOpt: {
            hotelRoom_Opt_1:$('#room-opt1').val(),
            hotelRoom_Opt_2:$('#room-opt2').val(),
            hotelRoom_Opt_3:$('#room-opt3').val(),
            hotelRoom_Opt_4:$('#room-opt4').val()
        }

    }

    let updateHotel = JSON.stringify(hotelUpdateObj);


    const formDataHotel = new FormData();
    const fileInput = $('#hotelImage')[0].files[0];

    formDataHotel.append('file', fileInput);

    formDataHotel.append('hotel', new Blob([updateHotel], {type: "application/json"}));

    console.log(formDataHotel);
    $.ajax({
        url: hotelBaseURL,
        method: "PUT",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataHotel,// if we send data with the request
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Updated!", "success");
                clearFormHotel();
                closePopupWindowHotel();
                loadAllHotels();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}
function deleteHotel() {
    var hotelId=$('#hotelIDLbl').text();
    swal({
        title: "Delete Hotel",
        text: "Are you sure you want to delete this Hotel?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: hotelBaseURL + "?hotelId=" + hotelId,
                    method: "DELETE",
                    success: function (res) {
                        if (res.code == 200) {
                            swal("Deleted", "Success", "success");
                            clearFormHotel();
                            closePopupWindowHotel();
                            loadAllHotels();
                        }
                    },
                    error: function (ob) {
                        swal("Oops", ob.responseJSON.message, "error");
                    }
                });
            }
        });
}
$("#search-hotel").on("keypress", function (e) {
    if (e.key == "Enter") {
        searchHotel();
    }
});

$(document).ready(function() {
    $('#search-hotel').on('input', function() {
        // Check if the input field is empty
        if ($(this).val() === '') {
            loadAllHotels();
        }
    });
});

$('#searchHotel-btn').click(function () {
    searchHotel();
});

//Search Customer
function searchHotel() {
    var hotelId = $("#search-hotel").val();

    $.ajax({
        url: hotelBaseURL + "/search?hotelId=" + hotelId,
        method: "GET",
        success: function (res) {
            if (res.code = 200) {
                var hotel = res.data;
                $("#tblHotel").empty();

                let row = `<tr>
                            <td>${hotel.hotelId}</td>
                            <td><img src="data:image/png;base64,${hotel.hotelImage}" alt="Hotel Image"></td>
                            <td>${hotel.hotelName}</td>
                            <td>${hotel.hotelCategory}</td>
                            <td>${hotel.hotelLocation}</td>
                            <td><a href="${hotel.hotelGmapLocation}"><span class="material-symbols-outlined">location_on</span>Location</a></td>
                            <td>${hotel.hotelEmail}</td>
                            <td>${hotel.hotelContact.hotelContact_1}</td>
                            <td>${hotel.hotelContact.hotelContact_2}</td>
                            <td>${hotel.hotelPetAllow}</td>
                            <td>${hotel.hotelCancellationCriteria}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_1}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_2}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_3}</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_4}</td>
                            
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editHotelNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblHotel").append(row);
                bindHotelRowBindEvent();
                clearFormHotel();
            } else {
                bindHotelRowBindEvent();
                clearFormHotel();
            }
        },
        error:function (ob){
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}