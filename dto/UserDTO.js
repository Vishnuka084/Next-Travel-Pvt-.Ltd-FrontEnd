export class UserDTO{



    constructor(userId,userFullName,username,userPassword,
                userIdNum,userIdType,userEmail,userAddress,userDob,userGender,userContactNum) {
        this.userId=userId;
        this.userFullName=userFullName;
        this.username=username;
        this.userPassword=userPassword;
        this.userIdNum=userIdNum;
        this.userIdType=userIdType;
        this.userEmail=userEmail;
        this.userAddress=userAddress;
        this.userDob=userDob;
        this.userGender=userGender;
        // this.userContactNum=userContactNum;
    }

    get _userId() {
        return this.userId;
    }
    get _userFullName(){
        return this.userFullName;
    }
    get _username(){
        return this.username;
    }
    get _userPassword(){
        return this.userPassword;
    }
    get _userIdNum(){
        return this.userIdNum;
    }
    get _userIdType(){
        return this.userIdType;
    }
    get _userEmail(){
        return this.userEmail;
    }
    get _userAddress(){
        return this.userAddress;
    }
    get _userDob(){
        return this.userDob;
    }
    get _userGender(){
        return this.userGender;
    }
    // get _userContactNum(){
    //     return this.userContactNum;
    // }

    set _userId(userId){
        this.userId=userId;
    }
    set _userFullName(userFullName){
        this.userFullName=userFullName;
    }
    set _username(username){
        this.username=username;
    }
    set _userPassword(userPassword){
        this.userPassword=userPassword;
    }
    set _userIdNum(userIdNum){
        this.userIdNum=userIdNum;
    }
    set _userIdType(userIdType){
        this.userIdType=userIdType;
    }
    set _userEmail(userEmail){
        this.userEmail=userEmail;
    }
    set _userAddress(userAddress){
        this.userAddress=userAddress;
    }
    set _userDob(userDob){
        this.userDob=userDob;
    }
    set _userGender(userGender){
        this.userGender=userGender;
    }
    // set _userContactNum(userContactNum){
    //     this.userContactNum=userContactNum;
    // }
}