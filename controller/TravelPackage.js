let packageCategory=null;
let vehicleCategory=null
let hotelCategory=null
let travelArea=null;

export class TravelPackage{
    constructor() {
        $("#s_LuxuryCrd").on("click",() => {
            this.resetCard()
            $("#s_LuxuryCrd > .check").css("display","flex");
            $("#s_LuxuryCrd > .check > div").css("transform","rotate(360deg)");
            this.setPackageCategory("S-Luxury","S-Luxury","5 Star")
            this.printC()
        })

        $("#luxuryCrd").on("click",() => {
            this.resetCard()
            $("#luxuryCrd > .check").css("display","flex");
            this.setPackageCategory("Luxury","Luxury","4 Star")
            this.printC()
        })

        $("#midLevelCrd").on("click",() => {
            this.resetCard()
            $("#midLevelCrd > .check").css("display","flex");
            this.setPackageCategory("Mid-Level","Mid-Range","3 Star")
            this.printC()
        })

        $("#regularCrd").on("click",() => {
            this.resetCard()
            $("#regularCrd > .check").css("display","flex");
            this.setPackageCategory("Regular","Economy","2 Star")
            this.printC()
        })

        $("#card1").on("click",() => {
            travelArea="Kandy";
            console.log(travelArea)
        })

        $("#card2").on("click",() => {
            travelArea="Colombo";
            console.log(travelArea)
        })

        $("#card3").on("click",() => {
            travelArea="Down South";
        })

        $("#card4").on("click",() => {
            travelArea="Ella";
            console.log(travelArea)
        })

        $("#card5").on("click",() => {
            travelArea="Sigiriya";
            console.log(travelArea)
        })

        $("#card6").on("click",() => {
            travelArea="Anuradhapura";
            console.log(travelArea)
        })

        $("#card7").on("click",() => {
            travelArea="Polonnaruwa";
            console.log(travelArea)
        })

        $("#card8").on("click",() => {
            travelArea="Matale";
            console.log(travelArea)
        })

        $("#travelBtn").on("click",() => {

            if(packageCategory===null){
                alert("Please Select Package Category")
            }else {
                $('#travelArea').css("display","flex")
                $('#selectPackage').css("display","none")
            }

        })

        $("#hotelBtn").on("click",() => {
            if(travelArea===null){
                alert("Please Select Travel Area")
            }else {
                $('#travelArea').css("display","none")
                $('#selectHotel').css("display","flex")
            }

        })

        $("#backTpckgBtn").on("click",() => {
            $('#travelArea').css("display","none")
            $('#selectPackage').css("display","flex")

        })

    }

    printC(){
        console.log(packageCategory+" "+vehicleCategory+" "+hotelCategory)
    }

    setPackageCategory(tPackage,vehicle,hotel){
        packageCategory=tPackage;
        vehicleCategory=vehicle;
        hotelCategory=hotel;
    }

    resetCard(){
        $(".check").css("display","none");
    }
}
new TravelPackage();