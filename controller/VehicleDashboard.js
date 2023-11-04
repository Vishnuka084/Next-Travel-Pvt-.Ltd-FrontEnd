import {ImageDTO} from "../dto/ImageDTO.js";
import {VehicleDTO} from "../dto/VehicleDTO.js";
import {UpdateImageDTO} from "../dto/UpdateImageDTO.js";

let vehicleArray=null;

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

let isFuel=false;
let isTransmission=false;
let isPetrol=false;
let isDiesel=false;
let isAuto=true;
let isManual=false;
let direction="asc";

let isUpdate=false;
let vehicleToUpdate=null;

export class VehicleDashboard{

    constructor() {
        $("#addBtn").on("click",() => {
            this.clearFields();
            isUpdate=false;
            $('#submitBtn').css("visibility", "visible");
            this.setUpViewModel();
            // this.setDataToTable();
            // this.getDataFromDb();
        });

        $("#cancelBtn").on("click",() => {
            $("#model-container").css("display","none");
        })


        $("#frontImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[1].status=true
            }else{
                fileArray[1].status=true
            }
            $("#fileChooser").trigger("click");
        });


        $("#rearImage").on("click",() => {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[2].status=true
            }else{
                fileArray[2].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#sideImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[3].status=true
            }else{
                fileArray[3].status=true
            }
            $("#fileChooser").trigger("click");
        });


        $("#frontInteriorImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[4].status=true
            }else{
                fileArray[4].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#rearInteriorImage").on("click",() => {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[5].status=true
            }else {
                fileArray[5].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#vehicleDriverLicense").on("click",() => {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[0].status=true
            }else {
                fileArray[0].status=true
            }
            console.log("palaweni eka");

            $("#fileChooser").trigger("click");

            console.log("image eken passe");
        });

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
            this.changeOptBtnsVisibility('hidden')
            $("#fuelBtn").removeClass("color");
            $("#transmiBtn").removeClass("color");
            $("#petrolBtn").removeClass("color");
            $("#dieselBtn").removeClass("color");
            $("#autoBtn").removeClass("color");
            $("#manualBtn").removeClass("color");
            isFuel=false;
            isTransmission=false;
            isManual=false;
            isAuto=false;
            isDiesel=false;
            isPetrol=false;
            this.getDataFromDb();
        });

        $("#fuelBtn").on("click",() => {
            $('#opt_3').css('visibility','visible');
            $("#allBtn").removeClass("color");
            $("#fuelBtn").addClass("color");
            isFuel=true;

        });

        $("#transmiBtn").on("click",() => {
            $('#opt_2').css('visibility','visible');
            $("#allBtn").removeClass("color");
            $("#transmiBtn").addClass("color");
            isTransmission=true;
        })

        $("#petrolBtn").on("click",() => {
            $("#dieselBtn").removeClass("color");
            $("#petrolBtn").addClass("color");
            isPetrol=true;
            isDiesel=false;
            this.decideURLPattern();
        })

        $("#dieselBtn").on("click",() => {
            $("#petrolBtn").removeClass("color");
            $("#dieselBtn").addClass("color");
            isDiesel=true;
            isPetrol=false;
            this.decideURLPattern();
        })

        $("#autoBtn").on("click",() => {
            $("#manualBtn").removeClass("color");
            $("#autoBtn").addClass("color");
            isAuto=true;
            isManual=false;
            this.decideURLPattern();
        })

        $("#manualBtn").on("click",() => {
            $("#autoBtn").removeClass("color");
            $("#manualBtn").addClass("color");
            isAuto=false;
            isManual=true;
            this.decideURLPattern();
        })

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

        $("#fileChooser").on("change", () =>{
            console.log("filchooser eka athula");
            this.setFile();
            console.log("filchooser eka iwarai");
        });

        $("#searchTxt").on("keydown", (event) =>{
            if(event.key==='Enter'){
                $("#allBtn").removeClass("color");
               this.findVehicleFromDb($("#searchTxt").val());
            }
        });


        this.changeOptBtnsVisibility('hidden');
        this.creatFileArray();
        this.getDataFromDb();
        this.handleViewBtnClickEvent();
        this.handleUpdateBtnClickEvent();
        this.handleDeleteBtnClickEvent();
    }

    // removeFilterBtnClass(element){
    //     element.removeClass("color");
    // }
    //
    // addFilterBtnClass(element){
    //     element.addClass("color");
    // }

    decideURLPattern(){
        let urlPath=
            (isFuel && isTransmission) ? this.creatURL() :
                isPetrol ? "sort/filter/"+direction+"/fuel/Petrol" :
                    isDiesel ? "sort/filter/"+direction+"/fuel/Diesel" :
                        isAuto ? "sort/filter/"+direction+"/Transmission/Auto" :
                            isManual ? "sort/filter/"+direction+"/Transmission/Manual" :
                                "find/all/"+direction;
        console.log(urlPath);
        this.getFilteredDataFromDb(urlPath);
    }

    creatURL(){
        let path=
            (isAuto && isPetrol) ? "sort/filter/searchType/"+direction+"/P-A" :
                (isAuto && isDiesel) ? "sort/filter/searchType/"+direction+"/D-A" :
                    (isManual && isPetrol) ? "sort/filter/searchType/"+direction+"/P-M" :
                        (isManual && isDiesel) ? "sort/filter/searchType/"+direction+"/D-M" :
                            "find/all/"+direction;
        return path;
    }

    changeOptBtnsVisibility(value){
        $('#opt_2').css('visibility',value);
        $('#opt_3').css('visibility',value);
    }

    creatFileArray(){
        fileArray.push(new ImageDTO("vehicleDriverLicense",false,null));
        fileArray.push(new ImageDTO("frontImage",false,null));
        fileArray.push(new ImageDTO("rearImage",false,null));
        fileArray.push(new ImageDTO("sideImage",false,null));
        fileArray.push(new ImageDTO("frontInteriorImage",false,null));
        fileArray.push(new ImageDTO("rearInteriorImage",false,null));

        // this.setFile();
    }

    creatFileUpdateArray(){
        fileUpdateArray.push(new UpdateImageDTO("vehicleDriverLicense",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("frontImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("rearImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("sideImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("frontInteriorImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("rearInteriorImage",false,null,false,null));
    }

    resetStatus(){
        fileArray.map(value => {
            value.status=false;
        })

        fileUpdateArray.map(value => {
            value.status=false;
        })
    }

    setFile() {

        console.log("setFIle eka athula");
        if(isUpdate){
            fileUpdateArray.map(value => {
                if(value.status===true){
                    console.log(value)
                    let imageTag=document.getElementById(value.fileName);
                    value.modifyFile=document.getElementById("fileChooser").files[0];
                    this.setImage(value.modifyFile,imageTag);
                    imageTag.style.borderColor="#5d5d5d";
                    value.status=false;
                    value.isModify=true;
                    console.log(value)
                }
            })
        }else {
            fileArray.map(value => {
                if (value.status===true){
                    let imageTag=document.getElementById(value.fileName);
                    value.file=document.getElementById("fileChooser").files[0];
                    this.setImage(value.file,imageTag);
                    // document.getElementById(value.fileName).style.borderColor="#5d5d5d";
                    imageTag.style.borderColor="#5d5d5d";
                }
            })
        }
        this.resetStatus();
    }

    setImage(file,imageTag){
        if(file){
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file);

            oFReader.onload = function (oFREvent) {
                imageTag.src = oFREvent.target.result;
            };
        }
    }

    handleDeleteBtnClickEvent(){

        $('#vehicleTable tbody').on('click', 'tr td:nth-last-child(1)', (event) => {

            let vehicleNumber=$(event.target).closest('tr').find('td').eq(1).text();

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
                    $("#model-container").css("visibility","visible");
                    this.deleteDataFromDb(vehicleNumber);
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                }
            })
        });
    }

    handleViewBtnClickEvent(){

        $('#vehicleTable tbody').on('click', 'tr td:nth-last-child(3)', (event) => {
            let vehicle=this.getVehicleObject($(event.target).closest('tr').find('td').eq(1).text());
            this.setDataToPopupFields(vehicle);
            this.setUpViewModel();

            $('#submitBtn').css("visibility", "hidden");
            // this.viewSubmitBtn(true,0)

        });
    }

    handleUpdateBtnClickEvent(){
        $('#vehicleTable tbody').on('click', 'tr td:nth-last-child(2)', (event) => {
            isUpdate=true;
            // submitBtn.text("Update");
            this.creatFileUpdateArray();
            let vehicle=this.getVehicleObject($(event.target).closest('tr').find('td').eq(1).text());
            vehicleToUpdate=vehicle;
            this.setDataToPopupFields(vehicle);
            this.setImageDataToFileUpdateArray(vehicle);
            this.setUpViewModel();
            $('#submitBtn').css("visibility", "visible");
        });
    }

    viewSubmitBtn(value_1,value_2){
        submitBtn.prop("disabled", value_1);
        submitBtn.css("opacity", value_2);
    }

    setDataToPopupFields(vehicle){
        $('#vehicleNumber').val(vehicle.vehicleId);
        $('#vehicleBrand').val(vehicle.vehicleBrand);
        $('#vehicleType').val(vehicle.vehicleType);
        $('#vehicleCategory').val(vehicle.vehicleCategory);
        $('#vehicleHybridOrNot').val(vehicle.vehicleHybridOrNot);
        $('#vehicleFuelType').val(vehicle.vehicleFuelType);
        $('#vehicleFuelUsage').val(vehicle.vehicleFuelUsage);
        $('#vehicleTransmissionType').val(vehicle.vehicleTransmissionType);
        $('#vehicleSeatCapacity').val(vehicle.vehicleSeatCapacity);
        $('#vehicleFee_for_1km').val(vehicle.vehicleFee_for_1km);
        $('#vehicleFee_for_Day').val(vehicle.vehicleFee_for_Day);
        if(vehicle.vehicleStatus==="Eligible"){
            $('#vehicleStatus').val("Eligible");
        }else {
            $('#vehicleStatus').val("Not Eligible");
        }
        $('#vehicleDriverName').val(vehicle.vehicleDriverName);
        $('#vehicleDriverContact').val(vehicle.vehicleDriverContact);

        $("#vehicleDriverLicense").attr('src',`data:image/jpg;base64,${vehicle.vehicleDriverLicense}`);
        $("#frontImage").attr('src',`data:image/jpg;base64,${vehicle.frontImage}`);
        $("#rearImage").attr('src',`data:image/jpg;base64,${vehicle.rearImage}`);
        $("#sideImage").attr('src',`data:image/jpg;base64,${vehicle.sideImage}`);
        $("#frontInteriorImage").attr('src',`data:image/jpg;base64,${vehicle.frontInteriorImage}`);
        $("#rearInteriorImage").attr('src',`data:image/jpg;base64,${vehicle.rearInteriorImage}`);
    }

    setImageDataToFileUpdateArray(vehicle){
        fileUpdateArray[0].file=vehicle.vehicleDriverLicense;
        fileUpdateArray[1].file=vehicle.frontImage;
        fileUpdateArray[2].file=vehicle.rearImage;
        fileUpdateArray[3].file=vehicle.sideImage;
        fileUpdateArray[4].file=vehicle.frontInteriorImage;
        fileUpdateArray[5].file=vehicle.rearInteriorImage;
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

    loadDataToTable(vehicleList){
        $("#vehicleTable > tbody >tr >td").remove();

        vehicleList.map(value => {
            let status= value.vehicleStatus==="Eligible" ?  "Eligible": "Not";
            // let category= value.vehicleCategory==="S-Luxury" ?

            let row="<tr>\n" +
                "                            <td>\n" +
                "                                <img class=\"img2\" >\n" +
                "                            </td>\n" +
                "                            <td>"+value.vehicleId+"</td>\n" +
                "                            <td>"+value.vehicleBrand+"</td>\n" +
                "                            <td><span >"+value.vehicleCategory+"</span></td>\n" +
                "                            <td>"+value.vehicleType+"</td>\n" +
                "                            <td>"+value.vehicleHybridOrNot+"</td>\n" +
                "                            <td>"+value.vehicleFuelType+"</td>\n" +
                "                            <td>"+value.vehicleFuelUsage+"Km"+"</td>\n" +
                "                            <td>"+value.vehicleSeatCapacity+"</td>\n" +
                "                            <td><strong>"+value.vehicleFee_for_1km+"</strong> </td>\n" +
                "                            <td><strong>"+value.vehicleFee_for_Day+"</strong> </td>\n" +
                "                            <td><span >"+status+"</span></td>\n" +
                "                            <td>\n" +
                "                                <div><i class=\"uil uil-expand-from-corner\"></i></div>\n" +
                "                            </td>\n" +
                "                            <td>\n" +
                "                                <div><i class=\"uil uil-sync\"></i></div>\n" +
                "                            </td>\n" +
                "                            <td>\n" +
                "                                <div><i class=\"uil uil-trash-alt\"></i></div>\n" +
                "                            </td>\n" +
                "                        </tr>";

            $('#vehicleTable tbody').append(row);

            $("#vehicleTable > tbody >tr:last-child >td:first-child >.img2").
                attr('src',`data:image/jpg;base64,${value.frontImage}`);

            if(status==="Eligible"){
                $("#vehicleTable > tbody >tr:last-child >td:nth-last-child(4) > span").addClass("economy")
            }else {
                $("#vehicleTable > tbody >tr:last-child >td:nth-last-child(4) > span").addClass("luxury")
            }

            if(value.vehicleCategory==="S-Luxury"){
                $("#vehicleTable > tbody >tr:last-child >td:nth-child(4) > span").addClass("super-luxury")
            }else if (value.vehicleCategory==="Luxury"){
                $("#vehicleTable > tbody >tr:last-child >td:nth-child(4) > span").addClass("luxury")
            }else if(value.vehicleCategory==="Economy"){
                $("#vehicleTable > tbody >tr:last-child >td:nth-child(4) > span").addClass("economy")
            }else {
                $("#vehicleTable > tbody >tr:last-child >td:nth-child(4) > span").addClass("mid-range")
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

    validateImages(){
        let isValidate=true;
        fileArray.map(value => {
            if(value.file){
                document.getElementById(value.fileName).style.borderColor="#5d5d5d";
                // $("#").css("border", "3px dashed #5d5d5d");
            }else {
                document.getElementById(value.fileName).style.borderColor="#ff2626";
                isValidate=false;

            }
        })
        return isValidate;
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

    getVehicleSearchType(){
        let fuel=$("#vehicleFuelType").val()==="Petrol" ? "P" : "D";
        let trans=$("#vehicleTransmissionType").val()=== "Auto" ? "A" : "M";
        console.log(fuel+"-"+trans);
        return fuel+"-"+trans;
    }

    createFormData(){
        let formData=new FormData();

        formData.append("vehicle",this.createVehicleObjet());

        if(!isUpdate){
            fileArray.map(value => {
                formData.append("images",value.file);
            })
            this.sentRequest(formData);
        }else {
            fileUpdateArray.map(value => {
                if(value.modifyFile===null){
                    let imageFile=this.createNewImageFile(value.file,value.fileName);
                    formData.append("images",imageFile);
                }else {
                    formData.append("images",value.modifyFile);
                }
            })
            this.sendUpdateRequest(formData);
        }

        // this.sentRequest(formData);
    }

    sendUpdateRequest(formData){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/update",
            method:"PUT",
            processData: false,
            contentType:false,
            data:formData,
            success:(resp) => {
                if (resp.code==="200"){
                    $("#model-container").css("display","none");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Vehicle Updated",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    console.log(resp.message);
                    // alert("user update");
                    vehicleArray=resp.data;
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

    createNewImageFile(base64Array,imageFileName){
        const byteString=atob(base64Array);
        const blob=new Uint8Array(byteString.length);

        for (let i=0;i<byteString.length;i++){
            blob[i]=byteString.charCodeAt(i);
        }

        return new File([blob],imageFileName + ".jpg",{type: "image/jpeg"});
    }

    getFilteredDataFromDb(path){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/"+path,
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data.length>0){
                        vehicleArray=resp.data;
                        this.loadDataToTable(resp.data);
                    }else {
                        $("#vehicleTable > tbody >tr >td").remove();
                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    getDataFromDb(){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/find/all/"+direction,
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data.length>0){
                        vehicleArray=resp.data;
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

    findVehicleFromDb(vehicleNumber){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/find/"+vehicleNumber,
            method:"GET",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    console.log(resp.data);
                    if(resp.data===null){
                        // alert("Customer Not found!!!")
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
                            title: 'Vehicle Not Found'
                        })
                    }else {
                        vehicleArray=[resp.data];
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

    deleteDataFromDb(vehicleNumber){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/delete/"+vehicleNumber,
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
                    // alert("Vehicle Deleted");
                    // vehicleArray=resp.data;
                    this.getDataFromDb();
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    sentRequest(formData){
        $.ajax({
            url:"http://localhost:8080/api/v1/vehicle/save",
            method:"POST",
            processData: false,
            contentType:false,
            data:formData,
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
                    // alert("user get");
                    // vehicleArray=resp.data;
                    this.clearFields();
                    // this.loadDataToTable(resp.data);
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
        $("#vehicleDriverLicense").attr('src',"../assets/image/image-upload-preview.png");
        $("#frontImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#rearImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#sideImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#frontInteriorImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#rearInteriorImage").attr('src',"../assets/image/image-upload-preview.png");
    }

}
new VehicleDashboard();