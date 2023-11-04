export class ImageDTO{

    constructor(fileName,status,file) {
        this.fileName=fileName;
        this.status=status;
        this.file=file;
    }

    // get _fileName() {
    //     return this.fileName;
    // }
}

// $("#frontImage").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[1].status=true
//     }else{
//         fileArray[1].status=true
//     }
//     $("#fileChooser").trigger("click");
// });
//
//
// $("#rearImage").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[2].status=true
//     }else{
//         fileArray[2].status=true
//     }
//     $("#fileChooser").trigger("click");
// });
//
// $("#sideImage").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[3].status=true
//     }else{
//         fileArray[3].status=true
//     }
//     $("#fileChooser").trigger("click");
// });
//
//
// $("#frontInteriorImage").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[4].status=true
//     }else{
//         fileArray[4].status=true
//     }
//     $("#fileChooser").trigger("click");
// });
//
// $("#rearInteriorImage").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[5].status=true
//     }else {
//         fileArray[5].status=true
//     }
//     $("#fileChooser").trigger("click");
// });
//
// $("#vehicleDriverLicense").on("click",function () {
//     if(isUpdate){
//         fileUpdateArray[0].status=true
//     }else {
//         fileArray[0].status=true
//     }
//     $("#fileChooser").trigger("click");
//     console.log("palaweni eka");
// });