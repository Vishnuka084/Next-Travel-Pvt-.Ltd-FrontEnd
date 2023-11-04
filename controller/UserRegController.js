import {UserDTO} from "../dto/UserDTO.js";

const form=document.querySelector("form");
const nextBtn=form.querySelector("#nextBtn1");
const nextBtn2=form.querySelector("#nextBtn2");
const backBtn=form.querySelector("#backBtn1");
const backBtn2=form.querySelector("#backBtn2");
let profilePic=null;
let nicPic1=null;
let nicPic2=null;
let isProfile=false;
let isNicOne=false;
let isNicTwo=false;

let fullName=/^[A-Za-z\s]{2,225}$/;
let password=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&?])[A-Za-z\d@#$!%&?]{8,}$/;
let address=/^[a-zA-Z0-9,\/]{10,255}$/;
let contact=/^[0-9]{10}$/;
let dob=/[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/;
let id=/[0-9]{10,20}$/;
let username=/^[a-zA-Z][a-zA-Z0-9_\-@]{2,19}$/;
let email=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

let pattern=[fullName,email,contact,address,id,username,password]
let elementArray=[
    $("#customerFullName"),$("#customerEmail"),
    $("#customerContact"),$("#customerAddress"),
    $("#customerId"),$("#customerUsername"),$("#customerPassword"),
    $("#customerGender"),$("#customerIdType"),$("#customerDob")
];

// let elementArrayTwo=[
//     $("#customerGender"),$("#customerIdType"),$("#customerDob")
// ];
let nameList=["name","email","contact","address","id","username","password","gender","idType","dob"]

export class UserRegController {


    constructor() {

        $("#customerProfilePic").on("click",function () {
            isProfile=true;
            $("#profilePicChooser").trigger("click");
        });

        $("#customerNicPic1").on("click",function () {
            isNicOne=true;
            $("#profilePicChooser").trigger("click");
        });

        $("#customerNicPic2").on("click",function () {
            isNicTwo=true;
            $("#profilePicChooser").trigger("click");
        });

        $("#profilePicChooser").on("change", () =>{
            this.setFile()
        });

        $("#passwordBtn").on("click", () =>{
            this.setPasswordText(("passwordBtn"));
        });

        $("#rePasswordBtn").on("click", () =>{
            this.setPasswordText(("rePasswordBtn"));
        });

        $("#customerPassword").on("keyup", () =>{
            this.validatePassword($("#customerPassword"));
        });


        $("#customerRePassword").keyup(() => {
            console.log("ooooo")
            this.checkPasswordIsEqual($("#customerPassword"),$("#customerRePassword"));
        });

        $("#customerDob").on("change", () =>{
            // this.changeDateFormat();
        });


        ///////////////////////////////////////////////////

        $("#submitBtn").on("click",() => {
            this.handleRequest();
        })

        nextBtn.addEventListener("click", ()=> {
            this.nextBtnAction();
        })

        backBtn.addEventListener("click", () =>{
            this.backBtnAction();
        });

        nextBtn2.addEventListener("click",() =>{
            this.nextBtn2Action()
        })

        backBtn2.addEventListener("click",() => {
            this.backBtn2Action();
        })


    }

    validatePassword(input){
        if (!password.test(input.val())){
            input.css("border","2px solid #FF0000FF");
            $("#warning-msg").text(this.setMessage("password"));
            $("#warning-box").css("opacity",1);
            return false;
        }else {
            input.css("border","1px solid #aaaaaa");
            $("#warning-box").css("opacity",0);
            return true;
        }
    }

    checkPasswordIsEqual(passwordInput,rePasswordInput){

        if (passwordInput.val()===rePasswordInput.val()){
            passwordInput.css("border","1px solid #aaaaaa");
            rePasswordInput.css("border","1px solid #aaaaaa");
            $("#warning-box").css("opacity",0);
            return true;
        }else {
            passwordInput.css("border","2px solid #FF0000FF");
            rePasswordInput.css("border","2px solid #FF0000FF");
            $("#warning-msg").text("Password not matched!!!");
            $("#warning-box").css("opacity",1);
            return  false;
        }
    }

    validateCbm(){
        for(let i=7;i<elementArray.length;i++){
            if(elementArray[i].val()=== null || ""){
                elementArray[i].css("border","2px solid #FF0000FF");
                $("#warning-msg").text(this.setMessage(nameList[i]));
                $("#warning-box").css("opacity",1);
                return false;
            }else{
                elementArray[i].css("border","1px solid #aaaaaa");
                $("#warning-box").css("opacity",0);
            }
        }
        return true;
    }

    setPasswordText(btn){

        if (btn==='passwordBtn'){
            this.handlePasswordBtn($("#customerPassword"),$("#passwordBtn i"))
        }else {
            this.handlePasswordBtn($("#customerRePassword"),$("#rePasswordBtn i"))
            // rePasswordBtn
        }
    }

    handlePasswordBtn(field,btnIcon){
        if(field.prop("type")==='password'){
            field.prop("type", "text");
            btnIcon.removeClass("uil-eye")
            btnIcon.addClass("uil-eye-slash")

        }else {
            field.prop("type", "password");
            btnIcon.removeClass("uil-eye-slash")
            btnIcon.addClass( "uil-eye")
        }
    }

    changeDateFormat() {
        // Get the date picker element by its ID
        var datePicker = document.getElementById("customerDob");

        // Get the selected date from the date picker
        var selectedDate = new Date(datePicker.value);

        // Define the desired date format
        // var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        // Format the date
        // var formattedDate = selectedDate.toLocaleDateString(options);
        var formattedDate = selectedDate.toLocaleDateString(options);
        // Display the formatted date
        // alert("Formatted Date: " + formattedDate);
        datePicker.val(formattedDate);
    }


    nextBtnAction(){

        console.log($("#customerGender").val());
        console.log($("#customerIdType").val());
        console.log($("#customerDob").val());

        // this.changeDateFormat();

        // $("#customerDob").val($( "#customerDob" ).datepicker({ dateFormat: 'yy-mm-dd' }))

        if(this.validateFields() && this.validatePassword($("#customerPassword")) &&
            this.checkPasswordIsEqual($("#customerPassword"),$("#customerRePassword")) &&
            this.validateCbm()){

            console.log("sdfwefefe")
            document.querySelector(".second").style.opacity=(1);
            $(".second").css("z-index","200000")
            $(".second").css("transform","translateX(0)")
            $(".first").css("transform","translateX(-100%)")
            document.querySelector(".first").style.opacity=(0);
        }else {
            alert("wrong")
        }

    }

    validateFields(){
        let isValied=true;
        for (let i=0;i<6;i++){
            if(!pattern[i].test(elementArray[i].val())){
                isValied=false;
                elementArray[i].css("border","2px solid #FF0000FF");
                $("#warning-msg").text(this.setMessage(nameList[i]));
                $("#warning-box").css("opacity",1);
                break;
            }else {
                elementArray[i].css("border","1px solid #aaaaaa");
                $("#warning-box").css("opacity",0);
            }
        }

        return isValied;

    }

    setMessage(type){
        let message = (type === "name") ? "Allows only zero or more characters matching" +
            " any uppercase letter (A-Z), any lowercase letter (a-z), or a space character" :
            (type === "email") ? "Allows only @,_,- , any uppercase letter (A-Z) and  any lowercase letter (a-z) \n " +
                "Eg :- Dhanushka@gmail.com / dhanu_45@yahoo.lk" :
                (type === "contact") ? "Allow only 10 numbers" :
                    (type === "address") ?"allows for 10 or 255 characters matching any uppercase letter (A-Z)," +
                        " any lowercase letter (a-z), or a / and , " :
                        (type === "address") ? "At least 8 characters long.\n" +
                            "Contains a combination of uppercase letters, lowercase letters, numbers," +
                            " and special characters (such as !, @, #, $, %, etc.)." :
                            (type === "id") ?"Allow only for 10 or 255 numbers, \n DON'T INPUT (V) ENTER (0) FOR IT " :
                                (type === "username") ? "Username must start with a letter (uppercase or lowercase).\n" +
                                    "Username can contain letters (uppercase or lowercase), numbers, underscores, and hyphens and @.\n" +
                                    "Username must be between 3 and 20 characters in length." :
                                    (type === "password") ? "At least 8 characters long.\n" +
                                        "Contains a combination of uppercase letters, lowercase letters, " +
                                        "numbers, and special characters (such as !, @, #, $, %, etc.)." :
                                        (type === "idType") ? "Please select your Id type" :
                                            (type === "gender") ? "Please select your gender" :
                                                (type === "dob") ? "Please select your birthday" : "" ;

        return message;
    }

    backBtnAction(){
        console.log("bbbbbbbb")
        document.querySelector(".second").style.opacity=("0");
        $(".second").css("z-index","200")
        $(".second").css("transform","translateX(100%)")
        document.querySelector(".first").style.opacity=("1");
        $(".first").css("transform","translateX(0)")
        form.classList.remove('secActive')
    }

    nextBtn2Action(){
        if(this.validateImages(profilePic,$("#customerProfilePic"))){
            document.querySelector(".third").style.opacity=(1);
            $(".third").css("z-index","200000")
            $(".third").css("transform","translateX(0)")
            $(".second").css("transform","translateX(-100%)")
            document.querySelector(".second").style.opacity=(0);
        }
    }

    backBtn2Action(){
        document.querySelector(".third").style.opacity=("0");
        $(".third").css("z-index","200")
        $(".third").css("transform","translateX(100%)")
        document.querySelector(".second").style.opacity=("1");
        $(".second").css("transform","translateX(0)")
    }

    validateImages(picFile,selectedElement){
        if(picFile){
            selectedElement.css("border", "3px dashed #5d5d5d");
            return true;
        }else {
            selectedElement.css("border", "3px dashed #ff2626");
            return false
        }
    }

    handleRequest(){

        if(this.validateImages(nicPic1,$("#customerNicPic1"))){
            if(this.validateImages(nicPic2,$("#customerNicPic2"))){
                this.prepareReqObject();
            }
        }

        console.log("pro : "+profilePic);
        console.log("nic1 : "+nicPic1);
        console.log("nic2 : "+nicPic2);

    }

    prepareReqObject(){
        let user=this.getUserObject();
        console.log("User String : "+user);

        let formData=new FormData();
        formData.append("pic",profilePic);
        formData.append("nic1",nicPic1);
        formData.append("nic2",nicPic2);
        formData.append("user",user);

        console.log(formData,user);
        // this.sendRequest(formData,user);
        this.sendRequest(formData);
    }

    sendRequest(formData){
        $.ajax({
            url:"http://localhost:8080/api/v1/user/save",
            method:"POST",
            processData: false,
            contentType:false,
            data:formData,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);
                    alert("user saved");
                    this.clear();
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    clear(){
        $("#customerId").val("");
        $("#customerFullName").val("");
        $("#customerUsername").val("");
        $("#customerPassword").val("");
        $("#customerIdType").val("");
        $("#customerEmail").val("");
        $("#customerAddress").val("");
        $("#customerDob").val("");
        $("#customerGender").val("");
        profilePic=null;
        nicPic1=null;
        nicPic2=null;
    }

    getUserObject(){
        let user=new UserDTO(
            $("#customerId").val(),
            $("#customerFullName").val(),
            $("#customerUsername").val(),
            $("#customerPassword").val(),
            $("#customerId").val(),
            $("#customerIdType").val(),
            $("#customerEmail").val(),
            $("#customerAddress").val(),
            $("#customerDob").val(),
            $("#customerGender").val()
        );

        console.log(user);
        // return $("#customerId").val();
        return JSON.stringify(user);
    }

    setFile() {
        console.log("555555")
        let imageTag;
        if (isProfile){
            imageTag=document.getElementById("customerProfilePic");
            profilePic=document.getElementById("profilePicChooser").files[0];
            this.setImage(profilePic,imageTag);
        }else if (isNicOne){
            imageTag=document.getElementById("customerNicPic1");
            nicPic1=document.getElementById("profilePicChooser").files[0];
            this.setImage(nicPic1,imageTag);
        }else {
            imageTag=document.getElementById("customerNicPic2")
            nicPic2=document.getElementById("profilePicChooser").files[0];
            this.setImage(nicPic2,imageTag);
        }
        this.reset();
    }


    reset(){
        console.log("reset")
        isProfile=false;
        isNicOne=false;
        isNicTwo=false;
    }

    setImage(file,element){
        console.log("print")
        // storeTo=document.getElementById("profilePicChooser").files[0];
        console.log(file)
        console.log(element)

        if(storeTo){
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file);

            oFReader.onload = function (oFREvent) {
                element.src = oFREvent.target.result;
            };
        }
    }

}
new UserRegController();




// nextBtn.addEventListener("click", ()=> {
//     console.log("sdfwefefe")
//     document.querySelector(".second").style.opacity=(1);
//     $(".second").css("z-index","200000")
//     $(".second").css("transform","translateX(0)")
//     $(".first").css("transform","translateX(-100%)")
//     document.querySelector(".first").style.opacity=(0);
// })

// backBtn.addEventListener("click", () =>{
//     console.log("bbbbbbbb")
//     document.querySelector(".second").style.opacity=("0");
//     $(".second").css("z-index","200")
//     $(".second").css("transform","translateX(100%)")
//     document.querySelector(".first").style.opacity=("1");
//     $(".first").css("transform","translateX(0)")
//     form.classList.remove('secActive')
// });

// nextBtn2.addEventListener("click",() =>{
//     document.querySelector(".third").style.opacity=(1);
//     $(".third").css("z-index","200000")
//     $(".third").css("transform","translateX(0)")
//     $(".second").css("transform","translateX(-100%)")
//     document.querySelector(".second").style.opacity=(0);
// })

// backBtn2.addEventListener("click",() => {
//     document.querySelector(".third").style.opacity=("0");
//     $(".third").css("z-index","200")
//     $(".third").css("transform","translateX(100%)")
//     document.querySelector(".second").style.opacity=("1");
//     $(".second").css("transform","translateX(0)")
// })

// $(document).ready(function () {
//     $("#customerProfilePic").on("click",function () {
//         isProfile=true;
//         $("#profilePicChooser").trigger("click");
//     });
//
//     $("#customerNicPic1").on("click",function () {
//         isNicOne=true;
//         $("#profilePicChooser").trigger("click");
//     });
//
//     $("#customerNicPic2").on("click",function () {
//         isNicTwo=true;
//         $("#profilePicChooser").trigger("click");
//     });
//
//     $("#profilePicChooser").on("change",function () {
//         console.log("555555")
//         let imageTag;
//         if (isProfile){
//             imageTag=document.getElementById("customerProfilePic");
//             setImage(profilePic,imageTag);
//         }else if (isNicOne){
//             imageTag=document.getElementById("customerNicPic1");
//             setImage(nicPic1,imageTag);
//         }else {
//             imageTag=document.getElementById("customerNicPic2")
//             setImage(nicPic2,imageTag);
//         }
//         reset();
//     });
// })

// $("#submitBtn").on("click",function () {
//     let user=getUserObject();
//     console.log("User String : "+user);
//     let formData=new FormData();
// })

// function getUserObject(){
//     let user=new UserDTO(
//         $("#customerId").val(),
//         $("#customerFullName").val(),
//         $("#customerUsername").val(),
//         $("#customerPassword").val(),
//         $("#customerId").val(),
//         $("#customerIdType").val(),
//         $("#customerEmail").val(),
//         $("#customerAddress").val(),
//         $("#customerDob").val(),
//         $("#customerGender").val()
//     );
//
//     console.log(user);
//
//     return JSON.stringify(user);
// }


// $("profilePicChooser").on("change",function () {
//     const selectedFile=$("#profilePicChooser").file[0];
//     console.log("dddddddddddddd")
//
//     // // if (selectedFile){
//     // //     console.log("selected file : "+selectedFile.name);
//     // // }
//     // console.log("selected file : "+selectedFile.name);
//     console.log("selected file : "+selectedFile.name);
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(selectedFile);
//     fileReader.addEventListener("load", function () {
//         // imgPreview.style.display = "block";
//         $("#customerProfilePic").src=this.result;
//         // imgPreview.innerHTML = '<img src="' + this.result + '" />';
//     });
// })