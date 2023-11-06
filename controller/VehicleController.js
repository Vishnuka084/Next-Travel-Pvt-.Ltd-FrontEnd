var vehicleBaseURL = "http://localhost:8765/vehicle-service/app/api/v1/vehicle";

$('.second').css({display: 'none'});
$('.first').css({display: 'block'});

var vehicleBrand = /^[A-Za-z '-]+$/;
var driverName = /^[A-Za-z '-]+$/;
var mobilePattern = /^0[0-9]{2}[1-9][0-9]{6}$/;
var fuelUsage = /^[0-9]+$/;
var seatCapacity = /^[0-9]+$/;
var fee1km = /^[0-9]+$/;
var fee1day = /^[0-9]+$/;

$('#vehicleBrand').keyup(function (e) {
    let brand = $('#vehicleBrand').val();
    if (!vehicleBrand.test(brand)) {
        $('#vehicleBrand').css('border', '2px solid red');
    } else {
        $('#vehicleBrand').css('border', '2px solid green')
    }
});
$('#driverName').keyup(function (e) {
    let dName = $('#driverName').val();
    if (!driverName.test(dName)) {
        $('#driverName').css('border', '2px solid red');
    } else {
        $('#driverName').css('border', '2px solid green')
    }
});
$('#driverContact').keyup(function (e) {
    let contact = $('#driverContact').val();
    if (!mobilePattern.test(contact)) {
        $('#driverContact').css('border', '2px solid red');
    } else {
        $('#driverContact').css('border', '2px solid green')
    }
});
$('#vehicleFee1km').keyup(function (e) {
    let fee1 = $('#vehicleFee1km').val();
    if (!fee1km.test(fee1)) {
        $('#vehicleFee1km').css('border', '2px solid red');
    } else {
        $('#vehicleFee1km').css('border', '2px solid green')
    }
});
$('#vehicleFeeDay').keyup(function (e) {
    let feeDay = $('#vehicleFeeDay').val();
    if (!fee1day.test(feeDay)) {
        $('#vehicleFeeDay').css('border', '2px solid red');
    } else {
        $('#vehicleFeeDay').css('border', '2px solid green')
    }
});

$('#nextVehicle-btn').click(function () {
    checkVehicleDetailsField();
})

function checkVehicleDetailsField() {
    !vehicleBrand.test($('#vehicleBrand').val()) ? swal("Invalid Brand !", "Check Your Brand.", "warning") :
        !fuelUsage.test($('#vehicleFuelUsage').val()) ? swal("Invalid Fuel Usage !", "Check  Fuel Usage.", "warning") :
            !seatCapacity.test($('#vehicleSeatCapacity').val()) ? swal("Invalid Seat Capacity !", "Check  Seat Capacity.", "warning") :
                !fee1km.test($('#vehicleFee1km').val()) ? swal("Invalid Fee for 1km !", "Check  Fee for 1km.", "warning") :
                    !fee1day.test($('#vehicleFeeDay').val()) ? swal("Invalid Fee for 1day !", "Check  Fee for 1day.", "warning") :
                        !driverName.test($('#driverName').val()) ? swal("Invalid Driver Name!", "Check  Driver Name.", "warning") :
                            !mobilePattern.test($('#driverContact').val()) ? swal("Invalid Mobile NUmber !", "Check  Mobile Number.", "warning") : navigateToNextVehicleImg();
}

function navigateToNextVehicleImg() {
    $('.second').css({display: 'block'});
    $('.first').css({display: 'none'});
}

$('.backBtn').click(function () {
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});
});

$('#addVehicle-btn').click(function () {
    $(".bottom-data").css({display: 'none'});
    $(".btnDelete").css({display: 'none'});
    $('#vehicle-title').text("Vehicle Registration");
    windowBlurVehicle();
    $("#registerVehicle-btn").css({display: 'block'});
    $("#updateVehicle-btn").css({display: 'none'});
    $("#edit-vehicleUI").css({display: 'none'});
    $("#reg-vehicleUI").css({display: 'block'});
});

function windowBlurVehicle() {
    $('.content').css({filter: "blur(5px)"});
    $('.sidebar').css({filter: "blur(5px)"});
    $(".vehicle-container").css({display: 'block'});

}

function closePopupWindowVehicle() {
    $(".bottom-data").css({display: 'block'});
    $('.content').css({filter: "blur(0)"});
    $('.sidebar').css({filter: "blur(0)"});
    $(".vehicle-container").css({display: 'none'});
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});
    $('#vehicleBrand').val("");
    $('#driverName').val("");
    $('#driverContact').val("");
    $('#vehicleFuelUsage').val("");
    $('#vehicleSeatCapacity').val("");
    $('#vehicleFee1km').val("");
    $('#vehicleFeeDay').val("");
}

$(".icon-close").click(function () {
    closePopupWindowVehicle();
    clearFormVehicle()
});
$("#registerVehicle-btn").click(function () {
    saveVehicle();
});
$("#updateVehicle-btn").click(function () {
    updateVehicle();
});
$("#deleteVehicle-btn").click(function () {
    deleteVehicle();
});


function clearFormVehicle() {
    $('#vehicleBrand').val("");
    $('#vehicleFuelUsage').val("");
    $('#vehicleSeatCapacity').val("");
    $('#vehicleFee1km').val("");
    $('#vehicleFeeDay').val("");
    $('#user-Address').val("");
    $('#driverName').val("");
    $('#driverContact').val("");
    $('#driverLicense').val("");
    $('#vehicleFrontImage').val("");
    $('#vehicleRearImage').val("");
    $('#vehicleSideImage').val("");
    $('#vehicleFrontInteriorImage').val("");
    $('#vehicleRearInteriorImage').val("");
}

function saveVehicle() {
    var vehicleObj = {
        vehicleId: 0,
        vehicleBrand: $('#vehicleBrand').val(),
        vehicleCategory: $('#vehicleCategory').val(),
        vehicleType: $('#vehicleType').val(),
        vehicleHybridOrNot: $('#vehicleHybridOrNot').val(),
        vehicleFuelType: $('#vehicleFuelType').val(),
        vehicleFuelUsage: $('#vehicleFuelUsage').val(),
        vehicleSeatCapacity: $('#vehicleSeatCapacity').val(),
        vehicleFee_for_1km: $('#vehicleFee1km').val(),
        vehicleFee_for_Day: $('#vehicleFeeDay').val(),
        vehicleStatus: $('#vehicleStatus').val(),
        vehicleTransmissionType: $('#transmissionType').val(),
        vehicleDriverName: $('#driverName').val(),
        vehicleDriverContact: $('#driverContact').val()

    }
    console.log(vehicleObj);
    let vehicle = JSON.stringify(vehicleObj);


    const formDataVehicle = new FormData();
    const fileInput1 = $('#driverLicense')[0].files[0];
    const fileInput2 = $('#vehicleFrontImage')[0].files[0];
    const fileInput3 = $('#vehicleRearImage')[0].files[0];
    const fileInput4 = $('#vehicleSideImage')[0].files[0];
    const fileInput5 = $('#vehicleFrontInteriorImage')[0].files[0];
    const fileInput6 = $('#vehicleRearInteriorImage')[0].files[0];

    formDataVehicle.append('file', fileInput1);
    formDataVehicle.append('file', fileInput2);
    formDataVehicle.append('file', fileInput3);
    formDataVehicle.append('file', fileInput4);
    formDataVehicle.append('file', fileInput5);
    formDataVehicle.append('file', fileInput6);
    formDataVehicle.append('vehicle', new Blob([vehicle], {type: "application/json"}));

    console.log(formDataVehicle);
    $.ajax({
        url: vehicleBaseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataVehicle,// if we send data with the request
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Registered", "success");
                clearFormVehicle();
                closePopupWindowVehicle();
                loadAllVehicles();
                /*loadAllUsers();*/
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}

loadAllVehicles();

function loadAllVehicles() {
    $("#tblVehicle").empty();
    $.ajax({
        url: vehicleBaseURL,
        method: "GET",
        // dataType: "json", // please convert the response into JSON
        success: function (resp) {
            for (const vehicle of resp.data) {
                let row = `<tr>
                            <td>${vehicle.vehicleId}</td>
                            <td><img src="data:image/png;base64,${vehicle.vehicleDriverLicense}" alt="Driver License"></td>
                            <td><img src="data:image/png;base64,${vehicle.frontImage}" alt="Front Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.rearImage}" alt="Rear Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.sideImage}" alt="Side Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.frontInteriorImage}" alt="Front Interior Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.rearInteriorImage}" alt="Rear Interior Image"></td>
                            <td>${vehicle.vehicleBrand}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.vehicleType}</td>
                            <td>${vehicle.vehicleTransmissionType}</td>
                            <td>${vehicle.vehicleHybridOrNot}</td>
                            <td>${vehicle.vehicleFuelType}</td>
                            <td>${vehicle.vehicleFuelUsage}</td>
                            <td>${vehicle.vehicleSeatCapacity}</td>
                            <td>${vehicle.vehicleFee_for_1km}</td>
                            <td>${vehicle.vehicleFee_for_Day}</td>
                            <td>${vehicle.vehicleDriverName}</td>
                            <td>${vehicle.vehicleDriverContact}</td>
                            <td>${vehicle.vehicleStatus}</td>
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editVehicleNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblVehicle").append(row);
            }
            bindVehicleRowBindEvent();
            clearFormVehicle();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function bindVehicleRowBindEvent() {
    $(".btnDelete").css({display: 'block'});
    $("#tblVehicle>tr").click(function () {
        //Get values from the selected row
        var vehicleId = $(this).children().eq(0).text();
        var driverLicense = $(this).children().eq(1).find('img');
        var vehicleFrontImage = $(this).children().eq(2).find('img');
        var vehicleRearImage = $(this).children().eq(3).find('img');
        var vehicleSideImage = $(this).children().eq(4).find('img');
        var vehicleFrontInteriorImage = $(this).children().eq(5).find('img');
        var vehicleRearInteriorImage = $(this).children().eq(6).find('img');
        var vehicleBrand = $(this).children().eq(7).text();
        var vehicleCategory = $(this).children().eq(8).text();
        var vehicleType = $(this).children().eq(9).text();
        var vehicleTransmissionType = $(this).children().eq(10).text();
        var vehicleHybridOrNot = $(this).children().eq(11).text();
        var vehicleFuelType = $(this).children().eq(12).text();
        var vehicleFuelUsage = $(this).children().eq(13).text();
        var vehicleSeatCapacity = $(this).children().eq(14).text();
        var vehicleFee_for_1km = $(this).children().eq(15).text();
        var vehicleFee_for_Day = $(this).children().eq(16).text();
        var vehicleDriverName = $(this).children().eq(17).text();
        var vehicleDriverContact = $(this).children().eq(18).text();
        var vehicleStatus = $(this).children().eq(19).text();

        console.log(vehicleId);

        var imageSrc1 = $(driverLicense).attr("src");
        var imageSrc2 = $(vehicleFrontImage).attr("src");
        var imageSrc3 = $(vehicleRearImage).attr("src");
        var imageSrc4 = $(vehicleSideImage).attr("src");
        var imageSrc5 = $(vehicleFrontInteriorImage).attr("src");
        var imageSrc6 = $(vehicleRearInteriorImage).attr("src");

        fetch(imageSrc1)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#driverLicense")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc2)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#vehicleFrontImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc3)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#vehicleRearImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc4)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#vehicleSideImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc5)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#vehicleFrontInteriorImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        fetch(imageSrc6)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#vehicleRearInteriorImage")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));


        $('#vehicleBrand').val(vehicleBrand);
        $('#vehicleCategory').val(vehicleCategory);
        $('#vehicleType').val(vehicleType);
        $('#vehicleHybridOrNot').val(vehicleHybridOrNot);
        $('#vehicleFuelType').val(vehicleFuelType);
        $('#vehicleFuelUsage').val(vehicleFuelUsage);
        $('#vehicleSeatCapacity').val(vehicleSeatCapacity);
        $('#vehicleFee1km').val(vehicleFee_for_1km);
        $('#vehicleFeeDay').val(vehicleFee_for_Day);
        $('#vehicleStatus').val(vehicleStatus);
        $('#transmissionType').val(vehicleTransmissionType);
        $('#driverName').val(vehicleDriverName);
        $('#driverContact').val(vehicleDriverContact);
        $('#vehicleIDLbl').text(vehicleId);

        editVehicleNavigation();
    });
}

function editVehicleNavigation() {
    $(".bottom-data").css({display: 'none'});
    windowBlurVehicle();
    $('#vehicle-title').text("Update Vehicle");
    $("#registerVehicle-btn").css({display: 'none'});
    $("#updateVehicle-btn").css({display: 'block'});
    $("#edit-vehicleUI").css({display: 'block'});
    $("#reg-vehicleUI").css({display: 'none'});
    bindVehicleRowBindEvent();
}

function updateVehicle() {
    var vehicleUpdateObj = {
        vehicleId:$('#vehicleIDLbl').text() ,
        vehicleBrand: $('#vehicleBrand').val(),
        vehicleCategory: $('#vehicleCategory').val(),
        vehicleType: $('#vehicleType').val(),
        vehicleHybridOrNot: $('#vehicleHybridOrNot').val(),
        vehicleFuelType: $('#vehicleFuelType').val(),
        vehicleFuelUsage: $('#vehicleFuelUsage').val(),
        vehicleSeatCapacity: $('#vehicleSeatCapacity').val(),
        vehicleFee_for_1km: $('#vehicleFee1km').val(),
        vehicleFee_for_Day: $('#vehicleFeeDay').val(),
        vehicleStatus: $('#vehicleStatus').val(),
        vehicleTransmissionType: $('#transmissionType').val(),
        vehicleDriverName: $('#driverName').val(),
        vehicleDriverContact: $('#driverContact').val()

    }

    let updateVehicle = JSON.stringify(vehicleUpdateObj);


    const formDataVehicle = new FormData();
    const fileInput1 = $('#driverLicense')[0].files[0];
    const fileInput2 = $('#vehicleFrontImage')[0].files[0];
    const fileInput3 = $('#vehicleRearImage')[0].files[0];
    const fileInput4 = $('#vehicleSideImage')[0].files[0];
    const fileInput5 = $('#vehicleFrontInteriorImage')[0].files[0];
    const fileInput6 = $('#vehicleRearInteriorImage')[0].files[0];

    formDataVehicle.append('file', fileInput1);
    formDataVehicle.append('file', fileInput2);
    formDataVehicle.append('file', fileInput3);
    formDataVehicle.append('file', fileInput4);
    formDataVehicle.append('file', fileInput5);
    formDataVehicle.append('file', fileInput6);
    formDataVehicle.append('vehicle', new Blob([updateVehicle], {type: "application/json"}));

    console.log(formDataVehicle);
    $.ajax({
        url: vehicleBaseURL,
        method: "PUT",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataVehicle,// if we send data with the request
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Updated!", "success");
                clearFormVehicle();
                closePopupWindowVehicle();
                loadAllVehicles();

            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}
function deleteVehicle() {
    var vehicleId=$('#vehicleIDLbl').text();
    swal({
        title: "Delete Vehicle",
        text: "Are you sure you want to delete this Vehicle?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: vehicleBaseURL + "?vehicleId=" + vehicleId,
                    method: "DELETE",
                    success: function (res) {
                        if (res.code == 200) {
                            swal("Deleted", "Success", "success");
                            clearFormVehicle();
                            closePopupWindowVehicle();
                            loadAllVehicles();
                        }
                    },
                    error: function (ob) {
                        swal("Oops", ob.responseJSON.message, "error");
                    }
                });
            }
        });
}
$("#search-vehicle").on("keypress", function (e) {
    if (e.key == "Enter") {
        searchVehicle();
    }
});

$(document).ready(function() {
    $('#search-vehicle').on('input', function() {
        // Check if the input field is empty
        if ($(this).val() === '') {
            loadAllVehicles();
        }
    });
});

$('#searchVehicle-btn').click(function () {
    searchVehicle();
});

//Search Customer
function searchVehicle() {
    var vehicleId = $("#search-vehicle").val();

    $.ajax({
        url: vehicleBaseURL + "/search?vehicleId=" + vehicleId,
        method: "GET",
        success: function (res) {
            if (res.code = 200) {
                var vehicle = res.data;
                $("#tblVehicle").empty();

                let row = `<tr>
                            <td>${vehicle.vehicleId}</td>
                            <td><img src="data:image/png;base64,${vehicle.vehicleDriverLicense}" alt="Driver License"></td>
                            <td><img src="data:image/png;base64,${vehicle.frontImage}" alt="Front Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.rearImage}" alt="Rear Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.sideImage}" alt="Side Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.frontInteriorImage}" alt="Front Interior Image"></td>
                            <td><img src="data:image/png;base64,${vehicle.rearInteriorImage}" alt="Rear Interior Image"></td>
                            <td>${vehicle.vehicleBrand}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.vehicleType}</td>
                            <td>${vehicle.vehicleTransmissionType}</td>
                            <td>${vehicle.vehicleHybridOrNot}</td>
                            <td>${vehicle.vehicleFuelType}</td>
                            <td>${vehicle.vehicleFuelUsage}</td>
                            <td>${vehicle.vehicleSeatCapacity}</td>
                            <td>${vehicle.vehicleFee_for_1km}</td>
                            <td>${vehicle.vehicleFee_for_Day}</td>
                            <td>${vehicle.vehicleDriverName}</td>
                            <td>${vehicle.vehicleDriverContact}</td>
                            <td>${vehicle.vehicleStatus}</td>
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editVehicleNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblVehicle").append(row);
                bindVehicleRowBindEvent();
                clearFormVehicle();
            } else {
                bindVehicleRowBindEvent();
                clearFormVehicle();
            }
        },
        error:function (ob){
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}
