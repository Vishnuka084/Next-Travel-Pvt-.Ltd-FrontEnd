import {ImageDTO} from "../dto/ImageDTO.js";
import {UpdateImageDTO} from "../dto/UpdateImageDTO.js";
import {HotelContactDTO} from "../dto/HotelContactDTO.js";
import {HotelRoomDTO} from "../dto/HotelRoomDTO.js";
import {HotelDTO} from "../dto/HotelDTO.js";

let hotelArray=[];

let isUpdate=false;

let txtArray=[
    $("#hotelId"),$("#hotelName"),$("#hotelLocation"),
    $("#hotelGmapLocation"),$("#hotelEmail"),$("#hotelContact_1"),
    $("#hotelContact_2"),$("#hotelRoom_Opt_1"),$("#hotelRoom_Opt_2"),
    $("#hotelRoom_Opt_3"),$("#hotelRoom_Opt_4")
];

let nameList=["name","name","contact","contact","email"]

let fileArray=[];
let fileUpdateArray=[];

let cmbArray=[$("#hotelCategory"),$("#hotelPetAllow"),$("#hotelCancellationCriteria")];

let fullName=/^[A-Za-z\s]{2,225}$/;
let address=/^[a-zA-Z0-9,\/]{10,255}$/;
let contact=/^[0-9]{10}$/;
let dob=/[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/;
let email=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let id=/[0-9]{10,10}$/;
let value=/[0-9]{2,10}$/;

let testArray=[
    $("#hotelName"),$("#hotelLocation"),$("#hotelContact_1"),
    $("#hotelContact_2"),$("#hotelEmail")
];

let pattern=[fullName,fullName,contact,contact,email];

export class GuideController{
    constructor() {
        $("#addBtn").on("click",() => {
            isUpdate=false;
            this.clearFields();
            this.sendRequestToDb("get/id","GET")

            $("#model-container").css("display","flex");
        });

        $("#searchTxt").on("keydown", (event) =>{

            if(event.key==='Enter'){

                console.log("enter")
                $("#allBtn").removeClass("color");
                this.sendRequestToDb("find?hotelId="+$("#searchTxt").val(),"GET");
            }
        });

        $("#allBtn").on("click",() => {
            $("#searchTxt").val("");
            $("#allBtn").addClass("color");
            this.getAllDataFromDb();
        });

        $("#nextBtn").on("click",() => {
            // if(this.validateForm()){
            //     $("#guide-form").addClass("secActive")
            // }
            this.handleNextBtnAction();
        });

        $("#backBtn").on("click",() => {
            $("#guide-form").removeClass("secActive")
        });

        $("#cancelBtn").on("click",() => {
            $("#model-container").css("display","none");
            this.clearFields();
        });

        $("#submitBtn").on("click",() => {
            this.handleSubmitBtnAction();
        });


        // ----------------------------------------

        $("#hotelImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[0].status=true
            }else{
                fileArray[0].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#fileChooser").on("change", () =>{
            this.setFile();
        });

        this.getAllDataFromDb();
        this.handleViewBtnClickEvent();
        this.handleUpdateBtnClickEvent();
        this.handleDeleteBtnClickEvent();
        this.creatFileArray();
    }

    setFile() {

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


    handleNextBtnAction(){
        if(this.validateForm() && this.validateCbm()){
            $("#guide-form").addClass("secActive")
        }
        // $("#guide-form").addClass("secActive")
    }

    handleSubmitBtnAction(){
        if(!isUpdate){

            if(this.validateContactFields() && this.validateFormTwo()){

                this.createFormData();
            }

        }else {

            if(this.validateContactFields()){
                this.createFormData();
            }
            // this.validateFormForUpdate();
        }
    }

    validateContactFields(){

        for(let i=7;i<txtArray.length;i++){

            if(!value.test(txtArray[i].val())){
                txtArray[i].addClass("error")
                return false
            }else {
                txtArray[i].removeClass("error")
            }
        }
        return true

    }

    creatFileArray(){
        fileArray.push(new ImageDTO("hotelImage",false,null));
    }

    creatFileUpdateArray(){
        fileUpdateArray.push(new UpdateImageDTO("hotelImage",false,null,false,null));
    }

    resetStatus(){
        fileArray.map(value => {
            value.status=false;
        })

        fileUpdateArray.map(value => {
            value.status=false;
        })
    }

    handleViewBtnClickEvent(){
        $('#guide-container').on('click', 'li > div:nth-last-child(1) > div:nth-last-child(3)', (event) => {
            $("#guide-form").removeClass("secActive")
            let hotelId=$(event.target).closest('li').find('strong+label').eq(0).text()
            alert(hotelId)

            let hotel=this.getHotelObject(hotelId);
            this.setDataToPopupFields(hotel)
            $("#model-container").css("display","flex");

        });
    }

    handleUpdateBtnClickEvent(){
        $('#guide-container').on('click', 'li > div:nth-last-child(1) > div:nth-last-child(2)', (event) => {
            isUpdate=true;
            $("#guide-form").removeClass("secActive")
            this.creatFileUpdateArray();
            let hotelId=$(event.target).closest('li').find('strong+label').eq(0).text()

            let hotel=this.getHotelObject(hotelId);
            this.setImageDataToFileUpdateArray(hotel)
            this.setDataToPopupFields(hotel)
            $("#model-container").css("display","flex");
        });
    }

    setImageDataToFileUpdateArray(hotel){
        fileUpdateArray[0].file=hotel.hotelImage;
    }

    handleDeleteBtnClickEvent(){
        $('#guide-container').on('click', 'li > div:nth-last-child(1) > div:nth-last-child(1)', (event) => {
            let hotelId=$(event.target).closest('li').find('strong+label').eq(0).text()

            alert(hotelId)

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

                    this.sendRequestToDb("delete?hotelId="+hotelId,"DELETE");
                }
            })
        });
    }

    getHotelObject(hotelId){
        let hotel=null;
        hotelArray.map(value => {
            console.log(value.hotelId)
            if (value.hotelId===hotelId){
                hotel=value;
            }
        })

        return hotel;
    }

    setDataToPopupFields(hotel){
        $("#hotelId").val(hotel.hotelId);
        $("#hotelName").val(hotel.hotelName);
        $("#hotelCategory").val(hotel.hotelCategory);
        $("#hotelLocation").val(hotel.hotelLocation);
        $("#hotelGmapLocation").val(hotel.hotelGmapLocation);
        $("#hotelEmail").val(hotel.hotelEmail);
        $("#hotelContact_1").val(hotel.hotelContact.hotelContact_1);
        $("#hotelContact_2").val(hotel.hotelContact.hotelContact_2);
        $("#hotelPetAllow").val(hotel.hotelPetAllow);
        $("#hotelCancellationCriteria").val(hotel.hotelCancellationCriteria);
        $("#hotelRoom_Opt_1").val(hotel.hotelRoomOpt.hotelRoom_Opt_1);
        $("#hotelRoom_Opt_2").val(hotel.hotelRoomOpt.hotelRoom_Opt_2);
        $("#hotelRoom_Opt_3").val(hotel.hotelRoomOpt.hotelRoom_Opt_3);
        $("#hotelRoom_Opt_4").val(hotel.hotelRoomOpt.hotelRoom_Opt_4);

        $("#hotelImage").attr('src',`data:image/jpg;base64,${hotel.hotelImage}`);
    }

    testLoadDataToTable(){
        let o=0;
        let s;
        if(o===0) {
            s = "allow"
        }else {
            s = "not-allow"
        }

        let card="<li>\n" +
            "                        <img src=\"../assets/image/image_2.jpg\">\n" +
            "                        <strong>Onali456</strong>\n" +
            "                        <label>Onali Samarasinha</label>\n" +
            "                        <span class=\"star\">\n" +
            "                            \n" +
            "                        </span>\n" +
            "                        <div>\n" +
            "                            <i class=\"fa-solid fa-shield-dog allow\"></i>\n" +
            "                            <label>Galle</label>\n" +
            "                        </div>\n" +
            "                        <div class=\"option-btn\">\n" +
            "                            <div><i class=\"fa-solid fa-square-arrow-up-right\"></i></div>\n" +
            "                            <div><i class=\"fa-solid fa-arrows-rotate\"></i></i></div>\n" +
            "                            <div><i class=\"fa-solid fa-trash-can\"></i></div>\n" +
            "                        </div>\n" +
            "                    </li>";

        $('#guide-container').append(card);

        for (let i=0;i<4;i++){
            $("#guide-container > li:last-child > span").append("<i class=\"fa-solid fa-star \"></i>");
        }
        let clz="not-allow";
        if (s==="allow"){
            clz="allow";
        }else {
            clz="not-allow"
        }
        $("#guide-container > li:last-child > span+div > i").addClass(clz);

        o++;
    }

    loadDataToTable(){
        $('#guide-container > li').remove();

        hotelArray.map(value => {
            let clz= value.hotelPetAllow==="Yes" ?  "allow": "not-allow";

            let card="<li>\n" +
                "                        <img class=\".img2\">\n" +
                "                        <strong>"+value.hotelName+"</strong>\n" +
                "                        <label>"+value.hotelId+"</label>\n" +
                "                        <span class=\"star\">\n" +
                "                            \n" +
                "                        </span>\n" +
                "                        <div>\n" +
                "                            <i class=\"fa-solid fa-shield-dog\"></i>\n" +
                "                            <label>"+value.hotelLocation+"</label>\n" +
                "                        </div>\n" +
                "                        <div class=\"option-btn\">\n" +
                "                            <div><i class=\"fa-solid fa-square-arrow-up-right\"></i></div>\n" +
                "                            <div><i class=\"fa-solid fa-arrows-rotate\"></i></i></div>\n" +
                "                            <div><i class=\"fa-solid fa-trash-can\"></i></div>\n" +
                "                        </div>\n" +
                "                    </li>";

            $('#guide-container').append(card);

            let star=(value.hotelCategory==="5 Star") ? 5 :
                (value.hotelCategory==="4 Star") ? 4 :
                    (value.hotelCategory==="3 Star") ? 3 : 2;

            for (let i=0;i<star;i++){
                $("#guide-container > li:last-child > span").append("<i class=\"fa-solid fa-star \"></i>");
            }

            $("#guide-container > li:last-child > img").attr('src',`data:image/jpg;base64,${value.hotelImage}`);

            $("#guide-container > li:last-child > span+div > i").addClass(clz);
        })
    }

    validateFormTwo(){
        let isValidate=true;
        fileArray.map(value => {
            if(value.file){
                console.log("Null na")
                document.getElementById(value.fileName).style.borderColor="#5d5d5d";
            }else {
                console.log("Null")
                document.getElementById(value.fileName).style.borderColor="#ff2626";
                isValidate=false;

            }
        })
        return isValidate;
    }

    validateCbm(){
        for(let i=0;i<cmbArray.length;i++){

            if(cmbArray[i].val()===null){
                cmbArray[i].addClass("error");
                return false;
            }else {
                cmbArray[i].removeClass("error");
            }
        }
        return true;
    }

    validateForm(){
        for(let i=0;i<testArray.length;i++){

            if(!pattern[i].test(testArray[i].val())){

                testArray[i].addClass("error");
                $("#warning-msg").text(this.setMessage(nameList[i]));
                $("#warning-box").css("opacity",1);
                return false;
            }else {
                // txtArray[i].css("border","1px solid #aaaaaa");
                testArray[i].removeClass("error");
                $("#warning-box").css("opacity",0);
            }
        }
        return true;
    }

    setMessage(type){
        let message = (type === "name") ? "Allows only zero or more characters matching" +
            " any uppercase letter (A-Z), any lowercase letter (a-z), or a space character" :
            (type === "email") ? "Allows only @,_,- , any uppercase letter (A-Z) and  any lowercase letter (a-z) \n " +
                "Eg :- Dhanushka@gmail.com / dhanu_45@yahoo.lk" :
                (type === "contact") ? "Allow only 10 numbers" :
                    (type === "address") ?"allows for 10 or 255 characters matching any uppercase letter (A-Z)," +
                        " any lowercase letter (a-z), or a / and , " :
                        (type === "id") ? "Allow only for 10  numbers, \n DON'T INPUT (V) ENTER (0) FOR IT " :
                            "Please complete details" ;

        return message;
    }

    createFormData(){
        let hotel=this.createHotelObjet();
        let formData=new FormData();
        formData.append("hotel",new Blob([hotel], { type: "application/json"}));

        if(!isUpdate){
            formData.append("pic",fileArray[0].file)

            this.sendDataToDb(formData,"POST","save")
        }else {
            fileUpdateArray.map(value => {

                if(value.modifyFile===null){

                    let imageFile=this.createNewImageFile(value.file,value.fileName);

                    formData.append("pic",imageFile);


                }else {

                    formData.append("pic",value.modifyFile);

                    // formData.append("images",value.modifyFile);
                }
            })
            this.sendDataToDb(formData,"PUT","update")
        }
    }

    createNewImageFile(base64Array,imageFileName){
        const byteString=atob(base64Array);
        const blob=new Uint8Array(byteString.length);

        for (let i=0;i<byteString.length;i++){
            blob[i]=byteString.charCodeAt(i);
        }

        return new File([blob],imageFileName + ".jpg",{type: "image/jpeg"});
    }

    createHotelObjet(){
        return JSON.stringify(
            new HotelDTO(
                $("#hotelId").val(),
                $("#hotelName").val(),
                $("#hotelCategory").val(),
                $("#hotelLocation").val(),
                $("#hotelGmapLocation").val(),
                $("#hotelEmail").val(),
                this.getContactObject(),
                $("#hotelPetAllow").val(),
                $("#hotelCancellationCriteria").val(),
                this.getRoomObject()
            )
        )
    }

    getContactObject(){
        return new HotelContactDTO(
            $("#hotelContact_1").val(),
            $("#hotelContact_2").val()
        )
    }

    getRoomObject(){
        return new HotelRoomDTO(
            $("#hotelRoom_Opt_1").val(),
            $("#hotelRoom_Opt_2").val(),
            $("#hotelRoom_Opt_3").val(),
            $("#hotelRoom_Opt_4").val()
        )
    }

    clearFields(){
        txtArray.map(value => {
            value.val("");
            value.removeClass("error")
        })

        cmbArray.map(value => {
            value.val('1');
            value.removeClass("error")
        })

        $("#hotelImage").attr('src',"../assets/image/image-upload-preview.png");

        $("#warning-box").css("opacity",0);
        $("#guide-form").removeClass("secActive");
    }


    sendDataToDb(formData,method,path){
        $.ajax({
            url:"http://localhost:8080/api/v1/hotel/"+path,
            method:method,
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

                    this.getAllDataFromDb();

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    sendRequestToDb(path,method){
        $.ajax({
            url:"http://localhost:8080/api/v1/hotel/"+path,
            method:method,
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);

                    if(path==="get/id"){

                        $("#hotelId").val(resp.data);

                    }else if(method==="GET"){

                        this.handleGetMethodResp(resp);

                    }else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your file has been deleted.',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        this.getAllDataFromDb();
                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    getAllDataFromDb(){
        $.ajax({
            url:"http://localhost:8080/api/v1/hotel/find/all",
            method:"GET",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);

                    if(resp.data.length>0){
                        hotelArray=resp.data;
                        this.loadDataToTable(resp.data);
                    }
                    // alert("user get");
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    handleGetMethodResp(resp){

        if(resp.data===null){

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
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

            alert("not found")

            this.getAllDataFromDb();
            $("#allBtn").addClass("color");

        }else {
            hotelArray=[resp.data];
            this.loadDataToTable([resp.data]);
        }

    }
}
new GuideController();