var packageBaseURL = "http://localhost:8765/package-service/app/api/v1/package";
var userBaseURL = "http://localhost:8765/user-service/app/api/v1/user";
var packageGuideBaseURL = "http://localhost:8765/guide-service/app/api/v1/guide";
var vehicleBaseURL = "http://localhost:8765/vehicle-service/app/api/v1/vehicle";
var hotelBaseURL = "http://localhost:8765/hotel-service/app/api/v1/hotel";


$('.second').css({display: 'none'});
$('.first').css({display: 'block'});

var numbers = /^[0-9]+$/;
var nicPattern = /^\d{9}[VvXx]$/;
const dobPattern10 = /^\d{4}-\d{2}-\d{2}$/;
var priceHotel1 = /^\$?\d+(?:\.\d{2})?$/;

$('#PackagePaidValue').keyup(function (e) {
    let price = $('#PackagePaidValue').val();
    if (!priceHotel1.test(price)) {
        $('#PackagePaidValue').css('border', '2px solid red');
    } else {
        $('#PackagePaidValue').css('border', '2px solid green')
    }
});
$('#packageNumberOfAdult').keyup(function (e) {
    let number = $('#packageNumberOfAdult').val();
    if (!numbers.test(number)) {
        $('#packageNumberOfAdult').css('border', '2px solid red');
    } else {
        $('#packageNumberOfAdult').css('border', '2px solid green')
    }
});
$('#packageNumberOfChild').keyup(function (e) {
    let number = $('#packageNumberOfChild').val();
    if (!numbers.test(number)) {
        $('#packageNumberOfChild').css('border', '2px solid red');
    } else {
        $('#packageNumberOfChild').css('border', '2px solid green')
    }
});
$('#packageNumberOfTotalCount').keyup(function (e) {
    let number = $('#packageNumberOfTotalCount').val();
    if (!numbers.test(number)) {
        $('#packageNumberOfTotalCount').css('border', '2px solid red');
    } else {
        $('#packageNumberOfTotalCount').css('border', '2px solid green')
    }
});

function checkPackageDetailsField() {
    !numbers.test($('#packageNumberOfAdult').val()) ? swal("Invalid Number !", "Check Your Adults No.", "warning") :
        !numbers.test($('#packageNumberOfChild').val()) ? swal("Invalid Number !", "Check Children No.", "warning") :
            !nicPattern.test($('#packageCustomerID').val()) ? swal("Select Valid Customer Id !", "Check Customer NID", "warning") :
                !numbers.test($('#packageNumberOfTotalCount').val()) ? swal("Invalid Number!", "Check  HeadCount.", "warning") : navigateToNext();
}

function navigateToNext() {
    $('.second').css({display: 'block'});
    $('.first').css({display: 'none'});
}

$('#addPackage-btn').click(function () {
    window.location.href = "../page2/package.html";
});

function windowBlurPackage() {
    $('.content').css({filter: "blur(5px)"});
    $('.sidebar').css({filter: "blur(5px)"});
    $(".package-container").css({display: 'block'});

}

$('.backBtn').click(function () {
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});
});

function navigateToBankSlipImg() {
    $('.second').css({display: 'block'});
    $('.first').css({display: 'none'});
}

$(".icon-close").click(function () {
    closePopupWindowPackage();
    clearFormPackage()
});
$("#updatePackage-btn").click(function () {
    updatePackageForm();
    //updateHotel();
});
$("#deletePackage-btn").click(function () {
    deletepackage();
});
$("#nextPackage-btn").click(function () {
    console.log("next")
    checkPackageDetailsField();

    function calculateTotal() {
        let checkInDate = $('#startDate').val();
        let checkOutDate = $('#endDate').val();

        let date1 = new Date(checkInDate);
        let date2 = new Date(checkOutDate);

        let timeDiff = Math.abs(date2 - date1);
        let daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let hotelPrice = parseFloat($('#packageHotelCategoryID').val());
        $('#hotelPrice').text((hotelPrice * daysDifference).toFixed(2));

        let vehicleId = $('#packageHotelID').val();

        $.ajax({
            url: vehicleBaseURL + "/search?vehicleId=" + vehicleId,
            method: "GET",
            success: function (res) {
                if (res.code === 200) {
                    let vehicle = res.data;
                    $('#vehiclePrice').text((vehicle.vehicleFee_for_Day * daysDifference).toFixed(2));
                    calculatePackageTotal();
                }
            },
            error: function (ob) {
                swal("Oops", ob.responseJSON.message, "error");
            }
        });

        let guideId = $("#packageGuideID").val();

        if (guideId === 'NO') {
            $('#guidePrice').text("0");
            calculatePackageTotal();
        } else {
            $.ajax({
                url: guideBaseURL + "/search?guideId=" + guideId,
                method: "GET",
                success: function (res) {
                    if (res.code === 200) {
                        let guide = res.data;
                        $('#guidePrice').text((guide.guideManDay_value * daysDifference).toFixed(2));
                        calculatePackageTotal();
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    }

    function calculatePackageTotal() {
        let hotelCostOr = parseFloat($('#hotelPrice').text());
        let vehicleCost = parseFloat($('#vehiclePrice').text());
        let guideCost = parseFloat($('#guidePrice').text());

        let packageTotal = hotelCostOr + vehicleCost + guideCost;
        console.log(packageTotal);

        $("#PackagePackageValue").val(packageTotal.toFixed(2));
        $("#PackagePaidValue").val(packageTotal.toFixed(2));
    }

// Initial calculation when the page loads
    calculateTotal();
});

function closePopupWindowPackage() {
    $(".package-container").css({display: 'none'});
    $(".bottom-data").css({display: 'block'});
    $('.content').css({filter: "blur(0)"});
    $('.sidebar').css({filter: "blur(0)"});
    $(".hotel-container").css({display: 'none'});
    $('.second').css({display: 'none'});
    $('.first').css({display: 'block'});

}

function clearFormPackage() {
    $('#packageCategorySelected').val("");
}

loadAllPackages();

function loadAllPackages() {
    $("#tblPackage").empty();
    $.ajax({
        url: packageBaseURL,
        method: "GET",
        // dataType: "json", // please convert the response into JSON
        success: function (resp) {
            for (const package1 of resp.data) {
                let row = `<tr>
                            <td>${package1.travelPackage_Id}</td>
                            <td>${package1.travelPackage_Category}</td>
                            <td>${package1.travelPackage_Areas}</td>
                            <td><img src="data:image/png;base64,${package1.paidBankSlip}" alt="Package Image"></td>
                            <td>${package1.guide_id}</td>
                            <td>${package1.vehicle_id}</td>
                            <td>${package1.hotel_id}</td>
                            <td>${package1.customer_id}</td>
                            <td>${package1.travelPackage_Value}</td>
                            <td>${package1.travelPackage_PaidValue}</td>
                            <td>${package1.travelPackage_NeedGuide}</td>
                            <td>${package1.travelPackage_WithPet}</td>
                            <td>${package1.travelPackage_HeadCount}</td>
                            <td>${package1.travelPackage_No_Child}</td>
                            <td>${package1.travelPackage_No_Adult}</td>
                            <td>${package1.travelPackage_StartDate}</td>
                            <td>${package1.travelPackage_EndDate}</td>
                            <td>${package1.travelPackage_DateDuration}</td>
                                                        
                             <td>
                             <div>
                             <button type="button" class="edit-Btn" onclick="editPackageNavigation()"><i class='bx bx-edit'></i> edit</button>
                            <!--<button class="delete-Btn" onclick=""><i class='bx bxs-trash-alt'></i> delete</button>-->
                             </div>
                        </td>
                            </tr>`;

                $("#tblPackage").append(row);
            }
            bindPackageRowBindEvent();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function editPackageNavigation() {

    $(".bottom-data").css({display: 'none'});

    windowBlurPackage();
    //bindPackageRowBindEvent();
}

function bindPackageRowBindEvent() {
    loadGuideForCombobox();
    loadCustomersForCombobox();

// Show a delete button (assuming it's initially hidden)
    $(".btnDelete").css({ display: 'block' });

// Handle row click event
    $("#tblPackage>tr").click(function () {
        // Get values from the selected row
        var travelPackage_Id = $(this).children().eq(0).text();
        var travelPackage_Category = $(this).children().eq(1).text();
        var travelPackage_Areas = $(this).children().eq(2).text();
        var packageBankSlip = $(this).children().eq(3).find('img');
        var guide_id = $(this).children().eq(4).text();
        var vehicle_id = $(this).children().eq(5).text();
        var hotel_id = $(this).children().eq(6).text();
        var customer_id = $(this).children().eq(7).text();
        var travelPackage_Value = $(this).children().eq(8).text();
        var travelPackage_PaidValue = $(this).children().eq(9).text();
        var travelPackage_NeedGuide = $(this).children().eq(10).text();
        var travelPackage_WithPet = $(this).children().eq(11).text();
        var travelPackage_HeadCount = $(this).children().eq(12).text();
        var travelPackage_No_Child = $(this).children().eq(13).text();
        var travelPackage_No_Adult = $(this).children().eq(14).text();
        var travelPackage_StartDate = $(this).children().eq(15).text();
        var travelPackage_EndDate = $(this).children().eq(16).text();
        var travelPackage_DateDuration = $(this).children().eq(17).text();

        // Extract the image source URL
        var imageBankSlip1 = $(packageBankSlip).attr("src");

        fetch(imageBankSlip1)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "image.png");
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $("#packaheBanlSlip")[0].files = fileList.files;
            })
            .catch(error => console.error("Error setting input file:", error));

        // Populate form fields with data from the selected row
        $('#packageArea').val(travelPackage_Areas);
        $('#packageGuideID').val(guide_id);
       /* $('#packageCategorySelected').val(travelPackage_Category);*/
        $('#packageVehicleID').val(vehicle_id);
        $('#packageHotelID').val(hotel_id);
        $('#packageCustomerID').val(customer_id);
        $('#startDate').val(travelPackage_StartDate);
        $('#endDate').val(travelPackage_EndDate);
        $('#packageGuideStatus').val(travelPackage_NeedGuide);
        $('#packagePetStatus').val(travelPackage_WithPet);
        $('#packageNumberOfChild').val(travelPackage_No_Child);
        $('#packageNumberOfAdult').val(travelPackage_No_Adult);
        $('#packageNumberOfTotalCount').val(travelPackage_HeadCount);
        $('#packageTotalDaysCount').val(travelPackage_DateDuration);
        $('#PackagePackageValue').val(travelPackage_Value);
        $('#PackagePaidValue').val(travelPackage_PaidValue);
        $('#packageIDLbl').text(travelPackage_Id);

        // Load additional data for comboboxes or perform other tasks as needed
        loadRoomForCombobox();
        editPackageNavigation();
    });
}

function updatePackage() {

}

/*function loadCustomersForCombobox() {
    $("#packageCustomerID").empty();

    $.ajax({
        url: userBaseURL,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {

            for (const user of resp.data) {
                let row = `<option value="${user.nic}">${user.nic}</option>`;


                $("#packageCustomerID").append(row);

            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}*/
function loadCustomersForCombobox() {
    $("#packageCustomerID").empty();

    $.ajax({
        url: userBaseURL,
        method: "GET",
        dataType: "json", // Convert the response into JSON
        success: function (resp) {
            for (const user of resp.data) {
                let row = `<option value="${user.nic}">${user.nic}</option>`;
                $("#packageCustomerID").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

/*
function loadGuideForCombobox() {
    $("#packageGuideID").empty();
    let row2 = `<option value="No">NO</option>`;
    $("#packageGuideID").append(row2);
    $.ajax({
        url: packageGuideBaseURL,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {

            for (const guide of resp.data) {
                console.log(guide.guideId);
                let row = `<option value="${guide.guideId}">${guide.guideId}</option>`;


                $("#packageGuideID").append(row);

            }


        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}
*/
function loadGuideForCombobox() {
    $("#packageGuideID").empty();
    let row2 = `<option value="No">NO</option>`;
    $("#packageGuideID").append(row2);
    $.ajax({
        url: packageGuideBaseURL,
        method: "GET",
        dataType: "json", // Convert the response into JSON
        success: function (resp) {
            for (const guide of resp.data) {
                let row = `<option value="${guide.guideId}">${guide.guideId}</option>`;
                $("#packageGuideID").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}


/*$(document).ready(function () {
    const selectPackage = $("#packageCategorySelected");
    const vehicleSelect = $("#packageVehicleID");


    selectPackage.on("change", function () {
        // Get the selected category value
        const selectedCategory = selectPackage.val();

        var parts = selectedCategory.split("/");
        var secondPart = parts[1];
        console.log(secondPart)
        // Clear existing options in the itemSelect
        vehicleSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (secondPart !== "") {
            // Make an AJAX request to the server-side API to retrieve items based on the selected category
            $.ajax({
                url: vehicleBaseURL + "/get?category=" + secondPart,
                method: "GET",
                success: function (res) {
                    $("#packageVehicleID").empty();
                    for (const vehicle of res.data) {
                        let row = `<option value="${vehicle.vehicleId}">${vehicle.vehicleId}</option>`;
                        $("#packageVehicleID").append(row);
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});*/
$(document).ready(function () {
    const selectPackage = $("#packageCategorySelected");
    const vehicleSelect = $("#packageVehicleID");

    selectPackage.on("change", function () {
        // Get the selected category value
        const selectedCategory = selectPackage.val();

        var parts = selectedCategory.split("/");
        var secondPart = parts[1];

        // Clear existing options in the vehicleSelect
        vehicleSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (secondPart !== "") {
            // Make an AJAX request to the server-side API to retrieve items based on the selected category
            $.ajax({
                url: vehicleBaseURL + "/get?category=" + secondPart,
                method: "GET",
                success: function (res) {
                    if (res.data) {
                        $("#packageVehicleID").empty();
                        for (const vehicle of res.data) {
                            let row = `<option value="${vehicle.vehicleId}">${vehicle.vehicleId}</option>`;
                            $("#packageVehicleID").append(row);
                        }
                    } else {
                        swal("No Vehicles Found", "No vehicles match the selected category.", "warning");
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});

/*$(document).ready(function () {
    const selectPackage = $("#packageCategorySelected");
    const hotelSelect = $("#packageHotelID");


    selectPackage.on("change", function () {
        // Get the selected category value
        const selectedCategory = selectPackage.val();

        var parts = selectedCategory.split("/");
        var firstPart = parts[0];

        // Clear existing options in the itemSelect
        hotelSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (firstPart !== "") {
            // Make an AJAX request to the server-side API to retrieve items based on the selected category
            $.ajax({
                url: hotelBaseURL + "/get?category=" + firstPart,
                method: "GET",
                // dataType:"json", // please convert the response into JSON
                success: function (resp) {
                    $("#packageHotelID").empty();
                    for (const hotel of resp.data) {
                        let row = `<option value="${hotel.hotelId}">${hotel.hotelId}</option>`;
                        $("#packageHotelID").append(row);
                    }

                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});*/
$(document).ready(function () {
    const selectPackage = $("#packageCategorySelected");
    const hotelSelect = $("#packageHotelID");

    selectPackage.on("change", function () {
        // Get the selected category value
        const selectedCategory = selectPackage.val();

        var parts = selectedCategory.split("/");
        var firstPart = parts[0];

        // Clear existing options in the hotelSelect
        hotelSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (firstPart !== "") {
            // Make an AJAX request to the server-side API to retrieve items based on the selected category
            $.ajax({
                url: hotelBaseURL + "/get?category=" + firstPart,
                method: "GET",
                success: function (resp) {
                    if (resp.data) {
                        $("#packageHotelID").empty();
                        for (const hotel of resp.data) {
                            let row = `<option value="${hotel.hotelId}">${hotel.hotelId}</option>`;
                            $("#packageHotelID").append(row);
                        }
                    } else {
                        swal("No Hotels Found", "No hotels match the selected category.", "warning");
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});


/*
$(document).ready(function () {
    const selectHotelID = $("#packageHotelID");
    const roomSelect = $("#packageHotelCategoryID");

    selectHotelID.on("change", function () {
        // Get the selected category value
        const selectedCategory = selectHotelID.val();

        // Clear existing options in the itemSelect
        roomSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (selectedCategory !== "") {
            // Make an AJAX request to the server-side API to retrieve items based on the selected category
            $.ajax({
                url: hotelBaseURL + "/search?hotelId=" + selectedCategory,
                method: "GET",
                success: function (res) {
                    if (res.code = 200) {
                        var hotel = res.data;
                        $("#packageHotelCategoryID").empty();

                        let row = `<option value="${hotel.hotelRoomOpt.hotelRoom_Opt_1}">Full Board with A/C Luxury Room – Double</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_2}">Half Board with A/C Luxury Room - Double</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_3}">Full Board with A/C Luxury Room – Triple</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_4}">Half Board with A/C Luxury Room - Triple</option>
                    `;

                        $("#packageHotelCategoryID").append(row);
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});
*/
$(document).ready(function () {
    const selectHotelID = $("#packageHotelID");
    const roomSelect = $("#packageHotelCategoryID");

    selectHotelID.on("change", function () {
        // Get the selected hotel value
        const selectedHotel = selectHotelID.val();

        // Clear existing options in the roomSelect
        roomSelect.empty().append('<option value="" disabled selected>Select an Item</option>');

        if (selectedHotel !== "") {
            // Make an AJAX request to the server-side API to retrieve room options based on the selected hotel
            $.ajax({
                url: hotelBaseURL + "/search?hotelId=" + selectedHotel,
                method: "GET",
                success: function (res) {
                    if (res.code === 200 && res.data) {  // Ensure response data exists
                        var hotel = res.data;
                        $("#packageHotelCategoryID").empty();

                        // Add room options to the roomSelect
                        let roomOptions = `
                            <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_1}">Full Board with A/C Luxury Room – Double</option>
                            <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_2}">Half Board with A/C Luxury Room - Double</option>
                            <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_3}">Full Board with A/C Luxury Room – Triple</option>
                            <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_4}">Half Board with A/C Luxury Room - Triple</option>
                        `;

                        $("#packageHotelCategoryID").append(roomOptions);
                    } else {
                        swal("No Room Options Found", "No room options match the selected hotel.", "warning");
                    }
                },
                error: function (ob) {
                    swal("Oops", ob.responseJSON.message, "error");
                }
            });
        }
    });
});

/*
function loadRoomForCombobox() {

    let hotelId = $("#packageHotelID").val();
    $.ajax({
        url: hotelBaseURL + "/search?hotelId=" + hotelId,
        method: "GET",
        success: function (res) {
            if (res.code = 200) {
                var hotel = res.data;
                $("#packageHotelCategoryID").empty();

                let row = `<option value="${hotel.hotelRoomOpt.hotelRoom_Opt_1}">Full Board with A/C Luxury Room – Double</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_2}">Half Board with A/C Luxury Room - Double</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_3}">Full Board with A/C Luxury Room – Triple</option>
                                <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_4}">Half Board with A/C Luxury Room - Triple</option>
                    `;

                $("#packageHotelCategoryID").append(row);
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });


}
*/
function loadRoomForCombobox() {
    let hotelId = $("#packageHotelID").val();

    if (hotelId) {
        $.ajax({
            url: hotelBaseURL + "/search?hotelId=" + hotelId,
            method: "GET",
            success: function (res) {
                if (res.code === 200 && res.data) {
                    var hotel = res.data;
                    $("#packageHotelCategoryID").empty();

                    // Add room options to the roomSelect
                    let roomOptions = `
                        <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_1}">Full Board with A/C Luxury Room – Double</option>
                        <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_2}">Half Board with A/C Luxury Room - Double</option>
                        <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_3}">Full Board with A/C Luxury Room – Triple</option>
                        <option value="${hotel.hotelRoomOpt.hotelRoom_Opt_4}">Half Board with A/C Luxury Room - Triple</option>
                    `;

                    $("#packageHotelCategoryID").append(roomOptions);
                } else {
                    swal("No Room Options Found", "No room options match the selected hotel.", "warning");
                }
            },
            error: function (ob) {
                swal("Oops", ob.responseJSON.message, "error");
            }
        });
    }
}
function updatePackageForm() {
    const selectPackage = $("#packageCategorySelected");
    console.log(selectPackage)
    const selectedCategory = selectPackage.val();

    var parts = selectedCategory.split("/");
    var secondPart = parts[1];
    console.log(secondPart)

    var packageObj = {
        travelPackage_Id: $('#packageIDLbl').text(),
        travelPackage_Category:secondPart,
        travelPackage_Areas: $('#packageArea').val(),
        guide_id: $('#packageGuideID').val(),
        vehicle_id: $('#packageVehicleID').val(),
        hotel_id: $('#packageHotelID').val(),
        customer_id: $('#packageCustomerID').val(),
        travelPackage_Value: $('#PackagePackageValue').val(),
        travelPackage_PaidValue: $('#PackagePaidValue').val(),
        travelPackage_NeedGuide: $('#packageGuideStatus').val(),
        travelPackage_WithPet: $('#packagePetStatus').val(),
        travelPackage_HeadCount: $('#packageNumberOfTotalCount').val(),
        travelPackage_No_Child: $('#packageNumberOfChild').val(),
        travelPackage_No_Adult: $('#packageNumberOfAdult').val(),
        travelPackage_StartDate: $('#startDate').val(),
        travelPackage_EndDate: $('#endDate').val(),
        travelPackage_DateDuration: $('#packageTotalDaysCount').val()

    };

    console.log(packageObj);

    // Convert the JavaScript object to a JSON string
    var packageJson = JSON.stringify(packageObj);

    const formDataPackage = new FormData();
    const fileInput = $('#packaheBanlSlip')[0].files[0];

    formDataPackage.append('file', fileInput);

    // Append the JSON data as a blob with the content type "application/json"
    formDataPackage.append('TravelPackage', new Blob([packageJson], { type: "application/json" }));


    $.ajax({
        url: packageBaseURL,
        method: "PUT",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataPackage,
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Update Travel Package", "success");
                loadAllPackages();
                closePopupWindowPackage();
                clearFormPackage();
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}
function deletepackage() {
    var packageId=$('#packageIDLbl').text();
    swal({
        title: "Delete Package",
        text: "Are you sure you want to delete this Package?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: packageBaseURL + "?packageId=" + packageId,
                    method: "DELETE",
                    success: function (res) {
                        if (res.code == 200) {
                            swal("Deleted", "Success", "success");
                            loadAllPackages();
                            closePopupWindowPackage();
                            clearFormPackage();
                        }
                    },
                    error: function (ob) {
                        swal("Oops", ob.responseJSON.message, "error");
                    }
                });
            }
        });
}