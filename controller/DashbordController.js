var packageBaseURL = "http://localhost:8765/package-service/app/api/v1/package";

loadAllPackages();
function loadAllPackages() {
    $("#tblDashboard").empty();
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
                            
                             </div>
                        </td>
                            </tr>`;

                $("#tblDashboard").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}



