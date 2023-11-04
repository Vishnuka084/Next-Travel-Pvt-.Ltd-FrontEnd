import {ImageDTO} from "../dto/ImageDTO.js";
import {VehicleDTO} from "../dto/VehicleDTO.js";
import {UpdateImageDTO} from "../dto/UpdateImageDTO.js";

let packageArray=null;

let inputArray=[
    $("#vehicleNumber"),$("#vehicleBrand"),$("#vehicleSeatCapacity"),
    $("#vehicleFuelUsage"), $("#vehicleFee_for_1km"),$("#vehicleFee_for_Day"),
    $("#vehicleDriverName"),$("#vehicleDriverContact")];

let cmbArray=[
    $("#vehicleType"),$("#vehicleCategory"),$("#vehicleHybridOrNot"),
    $("#vehicleTransmissionType"),$("#vehicleFuelType"),$("#vehicleStatus")];

let fileArray=[];
let fileUpdateArray=[];

let submitBtn=$('#submitBtn');

let direction="Asc";

let isUpdate=false;
let vehicleToUpdate=null;

export class VehicleDashboard{

    constructor() {
        $("#addBtn").on("click",() => {
            // this.clearFields();
            // isUpdate=false;
            // $('#submitBtn').css("visibility", "visible");
            // this.setUpViewModel();

            // this.setData();

            // this.setDataToTable();
            this.getDataFromDb();
        });

        $("#cancelBtn").on("click",() => {
            $("#model-container").css("display","none");
        })


        // $("#frontImage").on("click",()=> {
        //     this.resetStatus();
        //     if(isUpdate){
        //         fileUpdateArray[1].status=true
        //     }else{
        //         fileArray[1].status=true
        //     }
        //     $("#fileChooser").trigger("click");
        // });

        $("#submitBtn").on("click",() => {
            if(!isUpdate){
                this.validateForm();
            }else {
                this.validateFormForUpdate();
            }

        })

        $("#allBtn").on("click",() => {
            $("#searchTxt").val("");
            $("#allBtn").addClass("color")
            this.getDataFromDb();
        });


        $("#ascBtn").on("click",() => {
            $("#descBtn").removeClass("color");
            $("#ascBtn").addClass("color");
            direction="asc";
            this.decideURLPattern();
        })

        $("#descBtn").on("click",() => {
            $("#ascBtn").removeClass("color");
            $("#descBtn").addClass("color");
            direction="desc";
            this.decideURLPattern();
        })


        $("#searchTxt").on("keydown", (event) =>{
            if(event.key==='Enter'){
                $("#allBtn").removeClass("color");
               this.findPackageFromDb($("#searchTxt").val());
            }
        });


        // this.getDataFromDb();
        this.handleViewBtnClickEvent();
        this.handleUpdateBtnClickEvent();
        this.handleDeleteBtnClickEvent();
    }


    resetStatus(){
        fileArray.map(value => {
            value.status=false;
        })

        fileUpdateArray.map(value => {
            value.status=false;
        })
    }

    handleDeleteBtnClickEvent(){

        $('#packageTable tbody').on('click', 'tr td:nth-last-child(1)', (event) => {

            let packageId=$(event.target).closest('tr').find('td').eq(0).text();
            alert(packageId)

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteDataFromDb(packageId);
                }
            })
        });
    }

    handleViewBtnClickEvent(){

        $('#packageTable tbody').on('click', 'tr td:nth-last-child(3)', (event) => {
            // this.setDataToPopupFields(vehicle);
            // this.setUpViewModel();

            let packageId=$(event.target).closest('tr').find('td').eq(0).text();
            // let packageId=this.getVehicleObject($(event.target).closest('tr').find('td').eq(0).text());
            alert(packageId)

            // $('#submitBtn').css("visibility", "hidden");
            // this.viewSubmitBtn(true,0)

        });
    }

    handleUpdateBtnClickEvent(){
        $('#packageTable tbody').on('click', 'tr td:nth-last-child(2)', (event) => {
            isUpdate=true;
            // submitBtn.text("Update");
            // this.creatFileUpdateArray();
            // let package=this.getVehicleObject($(event.target).closest('tr').find('td').eq(0).text());
            let packageId=$(event.target).closest('tr').find('td').eq(0).text();
            alert(packageId)

            // vehicleToUpdate=vehicle;
            // this.setDataToPopupFields(vehicle);
            // this.setImageDataToFileUpdateArray(vehicle);
            // this.setUpViewModel();
            // $('#submitBtn').css("visibility", "visible");
        });
    }

    viewSubmitBtn(value_1,value_2){
        submitBtn.prop("disabled", value_1);
        submitBtn.css("opacity", value_2);
    }

    setDataToPopupFields(vehicle){
        $('#vehicleNumber').val(vehicle.vehicleId);
        $('#vehicleBrand').val(vehicle.vehicleBrand);

        $("#vehicleDriverLicense").attr('src',`data:image/jpg;base64,${vehicle.vehicleDriverLicense}`);
        $("#frontImage").attr('src',`data:image/jpg;base64,${vehicle.frontImage}`);
    }

    setImageDataToFileUpdateArray(vehicle){
        fileUpdateArray[0].file=vehicle.vehicleDriverLicense;
        fileUpdateArray[1].file=vehicle.frontImage;

    }

    getVehicleObject(vehicleNumber){
        let vehicle=null;
        vehicleArray.map(value => {
            console.log(value.vehicleId)
            if (value.vehicleId===vehicleNumber){
                vehicle=value;
            }
        })

        return vehicle;
    }


    setUpViewModel(){
        $("#model-container").css("display","flex");
    }

    loadDataToTable(packageList){
        $("#packageTable > tbody > tr").remove();

        packageList.map(value => {
            // let status= value.vehicleStatus==="Eligible" ?  "Eligible": "Not";


            let row="<tr>\n" +
                "                            <td>"+value.travelPackage_Id+"</td>\n" +
                "                            <td>\n" +
                "                                <span class=\"star\">\n" +
                "                                </span>\n" +
                "                            </td>\n" +
                "                            <td>"+value.customer_id+"</td>\n" +
                "                            <td>"+value.vehicle_id+"</td>\n" +
                "                            <td>"+value.guide_id+"</td>\n" +
                "                            <td>"+value.hotel_id+"</td>\n" +
                "                            <td>"+value.travelPackage_StartDate+"</td>\n" +
                "                            <td>"+value.travelPackage_EndDate+"</td>\n" +
                "                            <td>"+value.travelPackage_PacedDate+"8</td>\n" +
                "                            <td><strong>"+value.travelPackage_Value+"</strong></td>\n" +
                "                            <td><strong>"+value.travelPackage_PaidValue+"</strong></td>\n" +
                "                            <td><i class=\"fa-solid fa-square-arrow-up-right\"></i></td>\n" +
                "                            <td><i class=\"fa-solid fa-arrows-rotate\"></i></td>\n" +
                "                            <td><i class=\"fa-solid fa-trash-can\"></i></td>\n" +
                "                        </tr>"

            $('#packageTable tbody').append(row);

            // $("#vehicleTable > tbody >tr:last-child >td:first-child >.img2").
            //     attr('src',`data:image/jpg;base64,${value.frontImage}`);

            let star=(value.travelPackage_Category==="5 Star") ? 5 :
                (value.travelPackage_Category==="4 Star") ? 4 :
                    (value.travelPackage_Category==="3 Star") ? 3 : 2;

            for (let i=0;i<star;i++){
                $("#packageTable > tbody > tr:last-child> td:nth-child(2)>span").
                append("<i class=\"fa-solid fa-star \"></i>");
            }


        })
    }

    validateForm(){
        if(this.validateImages() && this.validateFields() && this.validateCmb()){

            $("#model-container").css("z-index","1");
            $("#model-container").css("visibility","hidden");
            Swal.fire({
                title: 'Do you want to save?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    $("#model-container").css("z-index","10000");
                    $("#model-container").css("visibility","visible");

                    this.createFormData();

                } else if (result.isDenied) {
                    $("#model-container").css("z-index","10000");
                    $("#model-container").css("visibility","visible");

                }
            })

        }
    }

    validateFormForUpdate(){
        if(this.validateFields() && this.validateCmb()){
            $("#model-container").css("z-index","1");
            $("#model-container").css("visibility","hidden");
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.createFormData();
                    Swal.fire('Saved!', '', 'success')

                    $("#model-container").css("z-index","10000");
                    $("#model-container").css("visibility","visible");
                } else if (result.isDenied) {

                    Swal.fire('Changes are not saved', '', 'info')
                    $("#model-container").css("z-index","10000");
                    $("#model-container").css("visibility","visible");
                }
            })

        }
    }

    validateCmb(){
        for (let i;i<cmbArray.length;i++){
            if(cmbArray[i].val()===null){
                cmbArray[i].css("border","2px solid #FF0000FF");
                return false;
            }else {
                cmbArray[i].css("border","1px solid #aaaaaa");
            }
        }
        return true;
    }

    validateFields(){
        for (let i=0;i<inputArray.length;i++){
            console.log(inputArray[i].val());
            if(inputArray[i].val().length===0){
                inputArray[i].css("border","2px solid #FF0000FF");
                return false;
            }else {
                inputArray[i].css("border","1px solid #aaaaaa");
            }
        }
        return true;
    }

    createVehicleObjet(){
        return JSON.stringify(new VehicleDTO(
            $("#vehicleNumber").val(),
            $("#vehicleBrand").val(),
            $("#vehicleCategory").val(),
            $("#vehicleType").val(),
            this.getVehicleSearchType(),
            $("#vehicleHybridOrNot").val(),
            $("#vehicleFuelType").val(),
            $("#vehicleFuelUsage").val(),
            $("#vehicleSeatCapacity").val(),
            $("#vehicleFee_for_1km").val(),
            $("#vehicleFee_for_Day").val(),
            $("#vehicleStatus").val(),
            $("#vehicleTransmissionType").val(),
            $("#vehicleDriverName").val(),
            $("#vehicleDriverContact").val()
        ));

    }


    sendUpdateRequest(packageData){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/update",
            method:"PUT",
            processData: false,
            contentType:false,
            data:packageData,
            success:(resp) => {
                if (resp.code==="200"){
                    $("#model-container").css("display","none");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Package Updated",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    console.log(resp.message);
                    // alert("user update");
                    packageArray=resp.data;
                    this.clearFields();
                    // Swal.fire('Saved!', '', 'success')
                    this.getDataFromDb();
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert("user not update");
                // alert(ob.responseJSON.message);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ob.responseJSON.message
                })
            }
        })
    }


    getDataFromDb(){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/find/all",
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data.length>0){
                        packageArray=resp.data;
                        this.loadDataToTable(resp.data);
                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    findPackageFromDb(packageId){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/find?packageId="+packageId,
            method:"GET",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    console.log(resp.data);
                    if(resp.data===null){
                        $("#allBtn").addClass("color")
                        // alert("Package Not found!!!")
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'warning',
                            title: 'Package Not found!!!'
                        })
                    }else {

                        packageArray=[resp.data];
                        this.loadDataToTable([resp.data]);
                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    deleteDataFromDb(packageId){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/delete?packageId="+packageId,
            method:"DELETE",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your file has been deleted.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(resp.message);
                    this.getDataFromDb();
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    sentRequest(packageData){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/save",
            method:"POST",
            processData: false,
            contentType:false,
            data:packageData,
            success:(resp) => {
                if (resp.code==="200"){
                    $("#model-container").css("display","none");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: resp.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(resp.message);

                    this.clearFields();

                    this.getDataFromDb();
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    clearFields(){

        // $('#vehicleStatus').val('1');
        inputArray.map(value => {
            value.val("");
        })
        cmbArray.map(value => {
            value.val('1');
        })
    }

}
new VehicleDashboard();