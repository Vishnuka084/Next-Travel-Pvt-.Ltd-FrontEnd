import {ImageDTO} from "../dto/ImageDTO.js";
import {GuideDTO} from "../dto/GuideDTO.js";
import {UpdateImageDTO} from "../dto/UpdateImageDTO.js";

let guideArray=[];

let isUpdate=false;

let txtArray=[
    $("#guideId"),$("#guideName"),$("#guideDob"),
    $("#guideContact"),$("#guideEmail"),$("#guideAddress"),
    $("#guideManDay_value")
];

let nameList=["id","name","dob","contact","email","address","value"]

let fileArray=[];
let fileUpdateArray=[];

let cmbArray=[$("#guideGender"),$("#guideStatus")];

let fullName=/^[A-Za-z\s]{2,225}$/;
let address=/^[a-zA-Z0-9,\/]{10,255}$/;
let contact=/^[0-9]{10}$/;
let dob=/[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/;
let email=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let id=/[0-9]{10,10}$/;
let value=/[0-9]{2,10}$/;

let pattern=[id,fullName,dob,contact,email,address,value];

export class GuideController{
    constructor() {
        $("#addBtn").on("click",() => {
            isUpdate=false;
            // this.loadDataToTable();
            // this.getAllDataFromDb();
            this.clearFields();
            $("#model-container").css("display","flex");
        });

        $("#searchTxt").on("keydown", (event) =>{
            if(event.key==='Enter'){
                $("#allBtn").removeClass("color");
                this.sendRequestToDb("find/"+$("#searchTxt").val(),"GET");
            }
        });

        $("#allBtn").on("click",() => {
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

        $("#guideImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[0].status=true
            }else{
                fileArray[0].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#guideNICImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[1].status=true
            }else{
                fileArray[1].status=true
            }
            $("#fileChooser").trigger("click");
        });

        $("#guideIDImage").on("click",()=> {
            this.resetStatus();
            if(isUpdate){
                fileUpdateArray[2].status=true
            }else{
                fileArray[2].status=true
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
    }

    handleSubmitBtnAction(){
        if(!isUpdate){
            // this.validateFormTwo()
            if(this.validateTextArea() && this.validateFormTwo()){
                // fileArray.map(value1 => {
                //     console.log(value1)
                // })
                this.createFormData();
            }

        }else {

            if(this.validateTextArea()){
                this.createFormData();
            }
            // this.validateFormForUpdate();
        }
    }

    validateTextArea(){
        if ($("#guideExperience").val().length<2){
            $("#guideExperience").addClass("error")
            alert("Atle's Enter NO")
            return false;
        }else {
            $("#guideExperience").removeClass("error")
        }
        return true;
    }

    creatFileArray(){
        fileArray.push(new ImageDTO("guideImage",false,null));
        fileArray.push(new ImageDTO("guideNICImage",false,null));
        fileArray.push(new ImageDTO("guideIDImage",false,null));
    }

    creatFileUpdateArray(){
        fileUpdateArray.push(new UpdateImageDTO("guideImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("guideNICImage",false,null,false,null));
        fileUpdateArray.push(new UpdateImageDTO("guideIDImage",false,null,false,null));
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
            let guidId=$(event.target).closest('li').find('strong').eq(0).text()
            let guide=this.getGuideObject(guidId);
            this.setDataToPopupFields(guide)
            console.log(guidId);
            $("#model-container").css("display","flex");

        });
    }

    handleUpdateBtnClickEvent(){
        $('#guide-container').on('click', 'li > div:nth-last-child(1) > div:nth-last-child(2)', (event) => {
            isUpdate=true;
            this.creatFileUpdateArray();
            let guidId=$(event.target).closest('li').find('strong').eq(0).text()
            let guide=this.getGuideObject(guidId);
            this.setImageDataToFileUpdateArray(guide)
            this.setDataToPopupFields(guide)
            console.log(guidId);
            $("#model-container").css("display","flex");
        });
    }

    setImageDataToFileUpdateArray(guide){
        fileUpdateArray[0].file=guide.guideImage;
        fileUpdateArray[1].file=guide.guideNICImage;
        fileUpdateArray[2].file=guide.guideIDImage;
    }

    handleDeleteBtnClickEvent(){
        $('#guide-container').on('click', 'li > div:nth-last-child(1) > div:nth-last-child(1)', (event) => {
            let guidId=$(event.target).closest('li').find('strong').eq(0).text()
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

                    this.sendRequestToDb("delete/"+guidId,"DELETE");
                }
            })
        });
    }

    getGuideObject(guideId){
        let guide=null;
        guideArray.map(value => {
            console.log(value.guideId)
            if (value.guideId===guideId){
                guide=value;
            }
        })

        return guide;
    }

    setDataToPopupFields(guide){
        $("#guideId").val(guide.guideId);
        $("#guideName").val(guide.guideName);
        $("#guideDob").val(guide.guideDob);
        $("#guideContact").val(guide.guideContact);
        $("#guideEmail").val(guide.guideEmail);
        $("#guideAddress").val(guide.guideAddress);
        $("#guideManDay_value").val(guide.guideManDay_value);
        $("#guideStatus").val(guide.guideStatus);
        $("#guideGender").val(guide.guideGender);
        $("#guideExperience").val(guide.guideExperience);

        $("#guideImage").attr('src',`data:image/jpg;base64,${guide.guideImage}`);
        $("#guideNICImage").attr('src',`data:image/jpg;base64,${guide.guideNICImage}`);
        $("#guideIDImage").attr('src',`data:image/jpg;base64,${guide.guideIDImage}`);
    }

    testLoadDataToTable(){
        let card="<li>\n" +
            "                        <img src=\"../assets/image/image_2.jpg\">\n" +
            "                        <strong>Onali456</strong>\n" +
            "                        <label>Onali Samarasinha</label>\n" +
            "                        <div class=\"not-eligible\">\n" +
            "                            Not Eligible\n" +
            "                        </div>\n" +
            "                        <div class=\"option-btn\">\n" +
            "                            <div><i class=\"uil uil-expand-from-corner\"></i></div>\n" +
            "                            <div><i class=\"uil uil-sync\"></i></div>\n" +
            "                            <div><i class=\"uil uil-trash-alt\"></i></div>\n" +
            "                        </div>\n" +
            "                    </li>";

        $('#guide-container').append(card);
    }

    loadDataToTable(){
        $('#guide-container > li').remove();

        guideArray.map(value => {
            let status= value.guideStatus==="Eligible" ?  "Eligible": "Not-Eligible";

            let card="<li>\n" +
                "                        <img class=\"img2\">\n" +
                "                        <strong>"+value.guideId+"</strong>\n" +
                "                        <label>"+value.guideName+"</label>\n" +
                "                        <div>"+status+"</div>\n" +
                "                        <div class=\"option-btn\">\n" +
                "                            <div><i class=\"uil uil-expand-from-corner\"></i></div>\n" +
                "                            <div><i class=\"uil uil-sync\"></i></div>\n" +
                "                            <div><i class=\"uil uil-trash-alt\"></i></div>\n" +
                "                        </div>\n" +
                "                    </li>";

            $('#guide-container').append(card);

            $("#guide-container > li:last-child >.img2").attr('src',`data:image/jpg;base64,${value.guideImage}`);

            if(status==="Eligible"){
                $("#guide-container > li:last-child > label+div").addClass("eligible")
            }else {
                $("#guide-container > li:last-child > label+div").addClass("not-eligible")
            }
        })
    }

    validateFormTwo(){
        let isValidate=true;
        fileArray.map(value => {
            if(value.file){
                document.getElementById(value.fileName).style.borderColor="#5d5d5d";
            }else {
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
        for(let i=0;i<txtArray.length;i++){
            if(!pattern[i].test(txtArray[i].val())){
                // txtArray[i].css("border","2px solid #FF0000FF");
                txtArray[i].addClass("error");
                $("#warning-msg").text(this.setMessage(nameList[i]));
                $("#warning-box").css("opacity",1);
                return false;
            }else {
                // txtArray[i].css("border","1px solid #aaaaaa");
                txtArray[i].removeClass("error");
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
        let guide=this.createGuideObjet();
        let formData=new FormData();
        formData.append("guide",new Blob([guide], { type: "application/json"}));

        if(!isUpdate){
            formData.append("nic",fileArray[1].file);
            formData.append("guideId",fileArray[2].file)
            formData.append("pic",fileArray[0].file)

            this.sendDataToDb(formData,"POST","save")
        }else {
            fileUpdateArray.map(value => {

                if(value.modifyFile===null){

                    let imageFile=this.createNewImageFile(value.file,value.fileName);

                    if(value.fileName==="guideImage"){
                        formData.append("pic",imageFile);
                    }else if(value.fileName==="guideNICImage"){
                        formData.append("nic",imageFile);
                    }else {
                        formData.append("guideId",imageFile);
                    }


                }else {

                    if(value.fileName==="guideImage"){
                        formData.append("pic",value.modifyFile);
                    }else if(value.fileName==="guideNICImage"){
                        formData.append("nic",value.modifyFile);
                    }else {
                        formData.append("guideId",value.modifyFile);
                    }

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

    createGuideObjet(){
        return JSON.stringify(
            new GuideDTO(
                $("#guideId").val(),
                $("#guideDob").val(),
                $("#guideAddress").val(),
                $("#guideName").val(),
                $("#guideManDay_value").val(),
                $("#guideExperience").val(),
                $("#guideContact").val(),
                $("#guideEmail").val(),
                $("#guideGender").val(),
                $("#guideStatus").val()
            )
        )
    }

    clearFields(){
        txtArray.map(value => {
            value.val("");
        })

        $("#guideExperience").val("");

        cmbArray.map(value => {
            value.val('1');
        })

        $("#guideNICImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#guideIDImage").attr('src',"../assets/image/image-upload-preview.png");
        $("#guideImage").attr('src',"../assets/image/image-upload-preview.png");

        $("#guide-form").removeClass("secActive");
    }


    sendDataToDb(formData,method,path){
        $.ajax({
            url:"http://localhost:8080/api/v1/guide/"+path,
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
            url:"http://localhost:8080/api/v1/guide/"+path,
            method:method,
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    // alert("user get");
                    if(method==="GET"){
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
            url:"http://localhost:8080/api/v1/guide/find/all",
            method:"GET",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);

                    if(resp.data.length>0){
                        guideArray=resp.data;
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

            this.getAllDataFromDb();
            $("#allBtn").addClass("color");

        }else {
            guideArray=[resp.data];
            this.loadDataToTable([resp.data]);
        }

    }
}
new GuideController();