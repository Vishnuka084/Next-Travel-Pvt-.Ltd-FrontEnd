var packageBaseURL = "http://localhost:8765/package-service/app/api/v1/package";
var hotelBaseURL = "http://localhost:8765/hotel-service/app/api/v1/hotel";
var packageGuideBaseURL = "http://localhost:8765/guide-service/app/api/v1/guide";
var vehicleBaseURL = "http://localhost:8765/vehicle-service/app/api/v1/vehicle";
var userBaseURL = "http://localhost:8765/user-service/app/api/v1/user";

var numbers = /^[0-9]+$/;
var nicPattern = /^\d{9}[VvXx]$/;
const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
var priceHotel1 = /^\$?\d+(?:\.\d{2})?$/;

$('#paidValue').keyup(function (e) {
    let price = $('#paidValue').val();
    if (!priceHotel1.test(price)) {
        $('#paidValue').css('border', '2px solid red');
    } else {
        $('#paidValue').css('border', '2px solid green')
    }
});
$('#noOfAdults').keyup(function (e) {
    let number = $('#noOfAdults').val();
    if (!numbers.test(number)) {
        $('#noOfAdults').css('border', '2px solid red');
    } else {
        $('#noOfAdults').css('border', '2px solid green')
    }
});
$('#noOfChildren').keyup(function (e) {
    let number = $('#noOfChildren').val();
    if (!numbers.test(number)) {
        $('#noOfChildren').css('border', '2px solid red');
    } else {
        $('#noOfChildren').css('border', '2px solid green')
    }
});
$('#headCount').keyup(function (e) {
    let number = $('#headCount').val();
    if (!numbers.test(number)) {
        $('#headCount').css('border', '2px solid red');
    } else {
        $('#headCount').css('border', '2px solid green')
    }
});

$('#hotel-details').css({display: 'none'});
$('#roomType').css({display: 'none'});
$('#vehicle-details').css({display: 'none'});
$('#booking-details').css({display: 'none'});
$('#backRoomTypeBtn').css({display: 'none'});
$('#backpackge1Btn').css({display: 'none'});
$('#guide-details').css({display: 'none'});
$('.backBookingDetailsBtn').css({display: 'none'});
$('#purchase-details').css({display: 'none'});
$('#backBooking-btn').css({display: 'none'});

$('.btnSearch').click(function () {
    $('#backpackge1Btn').css({display: 'block'});
    navigateToHotels();
    $('#backRoomTypeBtn').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'none'});

});
$('#backBooking-btn').click(function () {
    $('#booking-details').css({display: 'block'});
    $('#backBooking-btn').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'block'});
    $('#purchase-details').css({display: 'none'});


});
$('#backDashBtn').click(function () {


});
$('.backBookingDetailsBtn').click(function () {
    $('#booking-details').css({display: 'block'});
    $('#guide-details').css({display: 'none'});
    $('.backBookingDetailsBtn').css({display: 'none'});
    $('#backRoomTypeBtn').css({display: 'none'});
    $('#backpackge1Btn').css({display: 'none'});
    $('#purchase-details').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'block'});

});
$('#backpackge1Btn').click(function () {
    $('#package-header').css({display: 'block'});
    $('#hotel-details').css({display: 'none'});
    $('#backRoomTypeBtn').css({display: 'none'});
    $('#backpackge1Btn').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'none'});

});

$(".icon-close").click(function () {
    $('#hotel-details').css({display: 'block'});
    $('#roomType').css({display: 'none'});
    $('#backpackge1Btn').css({display: 'block'});
    $('#backToVehicleBtn').css({display: 'none'});
    $('#backRoomTypeBtn').css({display: 'none'});
});
$("#backRoomTypeBtn").click(function () {
    $('#vehicle-details').css({display: 'none'});
    $('#roomType').css({display: 'block'});
    $('#backRoomTypeBtn').css({display: 'none'});
    $('#backpackge1Btn').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'none'});
});

$("#backToVehicleBtn").click(function () {
    $('#vehicle-details').css({display: 'block'});
    $('#booking-details').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'none'});
    $('#backRoomTypeBtn').css({display: 'block'});
    $('#backpackge1Btn').css({display: 'none'});
});
function navigateToHotels() {
    !dobPattern.test($('#checkInDate').val()) ? swal("Select Check In Date !", "Check Date", "warning") :
        !dobPattern.test($('#checkOutDate').val()) ? swal("Select Check Out Date !", "Check  Date.", "warning")  : searchHotelByCategory();

    let checkInDate = $('#checkInDate').val();
    let checkOutDate = $('#checkOutDate').val();

    var date1 = new Date(checkInDate);
    var date2 = new Date(checkOutDate);

    var timeDiff = Math.abs(date2 - date1);
    var daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    $('#purchase-checkIn').text(checkInDate);
    $('#purchase-checkOut').text(checkOutDate);
    $('.purchase-totalDate').text(daysDifference);

}

function searchHotelByCategory() {
    var selectedValue = $("#packageCategory").val();
    var parts = selectedValue.split("/");
    var firstPart = parts[0];
    var secondPart = parts[1];

    var travelLocation = $("#travelLocation").val();

    $('#hotel-Category').text(firstPart);
    $('#vehicle-Category').text(secondPart);
    $('#package-Category').text(secondPart);
    $('#purchase-travelLoc').text(travelLocation);

    $.ajax({
        url: hotelBaseURL + "/get?category=" + firstPart,
        method: "GET",
        success: function (res) {
            const parentDiv = $('#hotel-details');
            parentDiv.empty(); // Clear any previous content
            for (let hotel of res.data) {
                const section = $(`<section class="row"><div class="col-3">
                                <img src="data:image/png;base64,${hotel.hotelImage}" alt="...">
                            </div><div class="col-9">
            <div style="display: flex">
                <h3>${hotel.hotelName}</h3>
                <h3> - </h3>
                <h3>${hotel.hotelLocation}</h3>
                <label>${hotel.hotelCategory}</label>
                <!--<h3><i class='bx bxs-star' style='color:#f99900'  ></i></h3>-->

            </div>
            <div style="display: flex">
                <a href="${hotel.hotelGmapLocation}"><span class="material-symbols-outlined">location_on</span>Location</a>
            </div>
            <div style="display:flex">
                <label>Email :</label>
                <label>${hotel.hotelEmail}</label>
            </div>
            <div style="display:flex">
                <label>Contact :</label>
                <label>${hotel.hotelContact.hotelContact_1}</label>
                <label>/</label>
                <label>${hotel.hotelContact.hotelContact_2}</label>
            </div>
            <div style="display:flex">
                <label>Pet Allow or not :</label>
                <label>${hotel.hotelPetAllow}</label>
            </div>
            <div style="display:flex">
                <label>Cancellation :</label>
                <label>${hotel.hotelCancellationCriteria}</label>
                <button type="button" >Show Prices</button>
            </div>
      
        </div></section>`);

                parentDiv.append(section);


                section.find('button').click(function () {
                    $('#backpackge1Btn').css({display: 'none'});
                    $('#hotel-details').css({display: 'none'});
                    $('#roomType').css({display: 'block'});
                    $("#tblRoomType").empty();
                    var roomRow = `<tr>
                            <td>${hotel.hotelId}</td>
                            <td>Full Board with A/C Luxury Room – Double</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_1}.0LKR</td>
                            <td><button type="button" onclick="navigatetoSelectVehicle()">Select</button></td>
                        </tr>
                        <tr>
                            <td>${hotel.hotelId}</td>
                            <td>Half Board with A/C Luxury Room - Double</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_2}.0LKR</td>
                            <td><button type="button" onclick="navigatetoSelectVehicle()">Select</button></td>
                        </tr>
                        <tr>
                            <td>${hotel.hotelId}</td>
                            <td>Full Board with A/C Luxury Room – Triple</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_3}.0LKR</td>
                            <td><button type="button" onclick="navigatetoSelectVehicle()">Select</button></td>
                        </tr>
                        <tr>
                            <td>${hotel.hotelId}</td>
                            <td>Half Board with A/C Luxury Room - Triple</td>
                            <td>${hotel.hotelRoomOpt.hotelRoom_Opt_4}.0LKR</td>
                            <td><button type="button" onclick="navigatetoSelectVehicle()">Select</button></td>
                        </tr>`;
                    $("#tblRoomType").append(roomRow);
                });
           }
            $('#package-header').css({display: 'none'});
            $('#hotel-details').css({display: 'block'});
            $('#backpackge1Btn').css({display: 'block'});
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");

        }
    });
}
function navigatetoSelectVehicle() {
    swal("Success", "Selected Hotel! Now Select Vehicle", "success");
    $('#roomType').css({display: 'none'});
    $('#backRoomTypeBtn').css({display: 'block'});
    $('#backpackge1Btn').css({display: 'none'});
    $("#tblRoomType>tr").click(function () {
        //Get values from the selected row
        var hotelID = $(this).children().eq(0).text();
        var roomOption = $(this).children().eq(1).text();
        var price = $(this).children().eq(2).text();

        $('#purchase-hotelID').text(hotelID);
        $('#package-HotelValue').text(price);
        $('#package-roomType').text(roomOption);

        console.log(hotelID);
        console.log(roomOption);
        console.log(price);
        searchVehicleByCategory()
    });
}
function searchVehicleByCategory() {

    // Get the selected value from the dropdown
    var selectedValue = $("#packageCategory").val();
    var parts = selectedValue.split("/");
    var secondPart = parts[1];
        console.log(secondPart)
    $.ajax({
        url: vehicleBaseURL + "/get?category=" + secondPart,
        method: "GET",
        success: function (res) {
            const parentDiv = $('#vehicle-details');
            parentDiv.empty(); // Clear any previous content
            for (let vehicle of res.data) {

                const section = $(`<section class="row"><div class="col-3">
                                <img src="data:image/png;base64,${vehicle.frontImage}" alt="...">
                            </div>
                            <div class="col-4 vehicle-Details">
            <div style="display: flex">
                <h3>${vehicle.vehicleBrand}</h3>
                <h3> - </h3>
                <h3>${vehicle.vehicleType}</h3>
                <label>${vehicle.vehicleCategory}</label>
                <!--<h3><i class='bx bxs-star' style='color:#f99900'  ></i></h3>-->

            </div>
            <div style="display: flex">
                <label>Fuel Type :</label>
                <label>${vehicle.vehicleFuelType}</label>
            </div>
            <div style="display:flex">
                <label>Hybrid Or Not :</label>
                <label>${vehicle.vehicleHybridOrNot}</label>
            </div>
            <div style="display:flex">
                <label>Driver Name :</label>
                <label>${vehicle.vehicleDriverName}</label>                       
            </div>
            <div style="display:flex">            
                <label>Contact :</label>
                <label>${vehicle.vehicleDriverContact}</label>
             
            </div>
            <div style="display:flex">
                <label>Transmission Type :</label>
                <label>${vehicle.vehicleTransmissionType}</label>
            </div>
            <div style="display:flex">
                <label>Status :</label>
                <label>${vehicle.vehicleStatus}</label>
  
            </div>
      
        </div>
        <div class="col-3 vehicle-Details">
            <div style="display: flex">
                <label>Fuel Usage(1L) :</label>
                <label>${vehicle.vehicleFuelUsage}</label>
                <label>km</label>
            </div>
            <div style="display:flex">
                <label>Seat Capacity :</label>
                <label>${vehicle.vehicleSeatCapacity}</label>
            </div>
            <div style="display:flex">
                <label>Fee 1Km(LKR) :</label>
                <label>${vehicle.vehicleFee_for_1km}</label>                       
                <label>.0 LKR</label>                       
            </div>
            <div style="display:flex">            
                <label>Fee Day(LKR) :</label>
                <label>${vehicle.vehicleFee_for_Day}</label>
                <label>.0 LKR</label> 
             <button type="button" >Book Now</button>
            </div>
         </div>
        </section>`);

                parentDiv.append(section);
                section.find('button').click(function () {
                        loadCustomersForCombobox();
                    var vehicleId=`${vehicle.vehicleId}`;
                    console.log(vehicleId)
                    $('#purchase-vehicleID').text(vehicleId);

                    var vehicleValueDay=`${vehicle.vehicleFee_for_Day}`;
                    $('#package-vehicleValue').text(vehicleValueDay);

                    var vehicleBrand=`${vehicle.vehicleBrand}`;
                    $('#package-vehicleBrand').text(vehicleBrand);

                    var vehicleType=`${vehicle.vehicleType}`;
                    $('#package-vehicleName').text(vehicleType);




                    swal("Success", "Selected Vehicle! Now Enter Booking Details", "success");
                    $('#vehicle-details').css({display: 'none'});
                    $('#backRoomTypeBtn').css({display: 'none'});
                    $('#booking-details').css({display: 'block'});
                    $('#backToVehicleBtn').css({display: 'block'});

                });

            }
            $('#vehicle-details').css({display: 'block'});
            $('#backRoomTypeBtn').css({display: 'block'});
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
            $('#package-header').css({display: 'block'});
        }
    });
}
function loadCustomersForCombobox() {
    $("#customerId").empty();
    let row1 = `<option value="">Select NIC</option>`;
    $("#customerId").append(row1);
    $.ajax({
        url: userBaseURL,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {

            for (const user of resp.data) {
                let row = `<option value="${user.nic}">${user.nic}</option>`;


                $("#customerId").append(row);

            }


        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

$('#nextBooking-btn').click(function () {
    checkBookingDetailsField();
});

function navigateToNextBookingDetails() {
    $('#booking-details').css({display: 'none'});
    $('#backToVehicleBtn').css({display: 'none'});
    $('.backBookingDetailsBtn').css({display: 'block'});
    let guideStatus = $('#guideStatus').val();
    let customerId = $('#customerId').val();
    $('#purchase-customerID').text(customerId);

    let noOfAdults = $('#noOfAdults').val();
    $('#package-adultsCount').text(noOfAdults);

    let noOfChildren = $('#noOfChildren').val();
    $('#package-childrenCount').text(noOfChildren);

    let headCount = $('#headCount').val();
    $('#purchase-headCount').text(headCount);

    let petStatus = $('#petStatus').val();
    $('#purchase-petStatus').text(petStatus);



    if (guideStatus === 'Yes'){
        loadGuide();
    }else {
        $('#purchase-guideID').text("No");
        $('#purchase-details').css({display: 'block'});
        purchasePackage();
    }
}

function checkBookingDetailsField() {
    !numbers.test($('#noOfAdults').val()) ? swal("Invalid Number !", "Check Your Adults No.", "warning") :
        !numbers.test($('#noOfChildren').val()) ? swal("Invalid Number !", "Check Children No.", "warning") :
            !nicPattern.test($('#customerId').val()) ? swal("Select Valid Customer Id !", "Check Customer NID", "warning") :
                !numbers.test($('#headCount').val()) ? swal("Invalid Number!", "Check  HeadCount.", "warning")  : navigateToNextBookingDetails();
}

function loadGuide() {
    $.ajax({
        url: packageGuideBaseURL+"/available",
        method: "GET",
        success: function (res) {
            const parentDiv = $('#guide-details');
            parentDiv.empty(); // Clear any previous content
            for (let guide of res.data) {

                const section = $(`<section class="row"><div class="col-3">
                                <img src="data:image/png;base64,${guide.guideImage}" alt="...">
                            </div>
                            <div class="col-9 vehicle-Details">
            <div style="display: flex">
                <h3>${guide.guideName}</h3>
                <h3> - </h3>
                <h3>${guide.guideAddress}</h3>
                
            </div>
            <div style="display: flex">
                <label>Experience :</label>
                <label>${guide.guideExperience}</label>
            </div>
            <div style="display:flex">
                <label>Gender :</label>
                <label>${guide.guideGender}</label>
            </div>
            <div style="display:flex">
                <label>Email :</label>
                <label>${guide.guideEmail}</label>                       
            </div>
            <div style="display:flex">            
                <label>Contact :</label>
                <label>${guide.guideContact}</label>
             
            </div>
            <div style="display:flex">
                <label>Status :</label>
                <label>${guide.guideStatus}</label>
            </div>
            <div style="display:flex">
                <label>Man Day Value :</label>
                <label>${guide.guideManDay_value}.0LKR</label>
                   <button type="button" >Select Guide</button>
            </div>
      
        </div>
        </section>`);

                parentDiv.append(section);
                section.find('button').click(function () {
                    var guideId=`${guide.guideId}`;
                    var guideName=`${guide.guideName}`;
                    var guideValue=`${guide.guideManDay_value}`;
                    $('#purchase-guideID').text(guideId);

                    $('#purchase-guideName').text(guideName);
                    $('#package-GuideValue').text(guideValue);
                    $('#purchase-GuideDate').text("0");
                    $('#package-totalGuideCost').text("0");

                    swal("Success", "Selected Guide! Now Enter Purches Details", "success");
                    $('#guide-details').css({display: 'none'});
                    /*$('.backBookingDetailsBtn').css({display: 'none'});*/
                    $('#purchase-details').css({display: 'block'});

                    purchasePackage();
                });

            }
            $('#guide-details').css({display: 'block'});
            $('.backBookingDetailsBtn').css({display: 'block'});
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
            /*$('#package-header').css({display: 'block'});*/
        }
    });
}
function purchasePackage() {
    hotelPrice();

    function hotelPrice() {
        var hotelValue = $("#package-HotelValue").text();
        console.log(hotelValue)
        var price=hotelValue.split(".");
        var firstValue=price[0];
        console.log(firstValue+"afdsadfsdf")
        var days=$(".purchase-totalDate").text();
        $("#purchase-totalDate").text(days);

        var total=firstValue * days;
        $("#package-totalHotelCost").text(total);
    }
    vehiclePrice();
    function vehiclePrice() {
        var days=$(".purchase-totalDate").text();
        $("#purchase-vehicleDate").text(days);

        let price = $("#package-vehicleValue").text();
        var total=price * days;

        $("#package-totalVehicleCost").text(total);


    }
    guidePrice();
    function guidePrice() {
        let guideId = $('#purchase-guideID').text();
        if (guideId === 'No'){
            $('#purchase-guideName').text("Not Selected");
            $('#package-GuideValue').text("0");
            $('#purchase-GuideDate').text("0");
            $('#package-totalGuideCost').text("0");
        }else {
            var days=$(".purchase-totalDate").text();
            $("#purchase-GuideDate").text(days);

            let price = $("#package-GuideValue").text();
            var total=price * days;

            $("#package-totalGuideCost").text(total);
        }

    }
    genarateTotal();
    function genarateTotal() {
        let hotelCost = parseFloat($("#package-totalHotelCost").text());
        let vehicleCost = parseFloat($("#package-totalVehicleCost").text());
        let guideCost = parseFloat($("#package-totalGuideCost").text());

        var packageTotal = hotelCost + vehicleCost + guideCost;

        $("#purchase-totalCost").text(packageTotal);
        $("#paidValue").val(packageTotal);


    }
}
$('#purchaseBtn').click(function () {
    validPrice();
});

function validPrice() {
    !priceHotel1.test($('#paidValue').val()) ? swal("Invalid Price !", "Check  Price.", "warning"):savePurchaesPackage();
}

function savePurchaesPackage() {

    var packageObj = {
        travelPackage_Id: 0,
        travelPackage_Category: $('#package-Category').text(),
        travelPackage_Areas: $('#purchase-travelLoc').text(),
        guide_id: $('#purchase-guideID').text(),
        vehicle_id: $('#purchase-vehicleID').text(),
        hotel_id: $('#purchase-hotelID').text(),
        customer_id: $('#purchase-customerID').text(),
        travelPackage_Value: $('#purchase-totalCost').text(),
        travelPackage_PaidValue: $('#paidValue').val(),
        travelPackage_NeedGuide: $('#guideStatus').val(),
        travelPackage_WithPet: $('#purchase-petStatus').text(),
        travelPackage_HeadCount: $('#purchase-headCount').text(),
        travelPackage_No_Child: $('#package-childrenCount').text(),
        travelPackage_No_Adult: $('#package-adultsCount').text(),
        travelPackage_StartDate: $('#purchase-checkIn').text(),
        travelPackage_EndDate: $('#purchase-checkOut').text(),
        travelPackage_DateDuration: $('.purchase-totalDate').text(),

    };

    console.log(packageObj);

    // Convert the JavaScript object to a JSON string
    var packageJson = JSON.stringify(packageObj);

    const formDataPackage = new FormData();
    const fileInput = $('#bankSlipImage')[0].files[0];

    formDataPackage.append('file', fileInput);

    // Append the JSON data as a blob with the content type "application/json"
    formDataPackage.append('TravelPackage', new Blob([packageJson], { type: "application/json" }));


    $.ajax({
        url: packageBaseURL,
        method: "POST",
        processData: false, // Prevent jQuery from processing the data
        contentType: false,
        async: true,
        data: formDataPackage,
        success: function (res) {
            if (res.code === 200) {
                swal("Success", "Purchase Travel Package", "success");
                clearPackageFieldsDetails();
                $('#purchase-details').css({display: 'none'});
                $('#package-header').css({display: 'block'});
                loadAllPackages();

               //
            }
        },
        error: function (ob) {
            swal("Oops", ob.responseJSON.message, "error");
        }
    });
}
function clearPackageFieldsDetails() {
    $('#paidValue').val("");
    $('#checkInDate').val("");
    $('#checkOutDate').val("");
    $('#noOfAdults').val("");
    $('#noOfChildren').val("");
    $('#headCount').val("");
    $('#bankSlipImage').val("");
}

