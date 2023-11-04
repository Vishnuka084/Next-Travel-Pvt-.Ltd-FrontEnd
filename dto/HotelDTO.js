export class HotelDTO{
    constructor(hotelId,hotelName,hotelCategory,
                hotelLocation,hotelGmapLocation,hotelEmail,hotelContact,
                hotelPetAllow,hotelCancellationCriteria,hotelRoomOpt) {
        this.hotelId=hotelId;
        this.hotelName=hotelName;
        this.hotelCategory=hotelCategory;
        this.hotelLocation=hotelLocation;
        this.hotelGmapLocation=hotelGmapLocation;
        this.hotelEmail=hotelEmail;
        this.hotelContact=hotelContact;
        this.hotelPetAllow=hotelPetAllow;
        this.hotelCancellationCriteria=hotelCancellationCriteria;
        this.hotelRoomOpt=hotelRoomOpt;
    }
}