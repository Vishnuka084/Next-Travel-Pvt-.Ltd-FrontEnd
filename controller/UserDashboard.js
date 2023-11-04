const addBtn=$("#addBtn");
const userTable=$("#userTable");

let userList=null;

export class UserDashboard{

    constructor() {
        $("#addBtn").on("click",() => {
            console.log("xxxxxxxxxxxxxxxxx")
            // this.setDataToTable();
            // this.getDataFromDb();
            this.setUpViewModel();
        })

        $("#doneBtn").on("click",() => {
            $("#model-container").css("display","none");
        })

        this.handleViewBtnClickEvent();
        // this.handleUpdateBtnClickEvent()

        // this.getDataFromDb();

    }


    handleViewBtnClickEvent(){

        $('#userTable tbody').on('click', 'tr td:nth-last-child(3)', (event) => {
            $('#customerUsername').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#customerId').val($(event.target).closest('tr').find('td').eq(1).find('strong').text())
            $('#customerIdType').val($(event.target).closest('tr').find('td').eq(1).find('label').text())
            $('#customerFullName').val($(event.target).closest('tr').find('td').eq(2).find('strong').text())
            $('#customerEmail').val($(event.target).closest('tr').find('td').eq(2).find('label').text())
            $('#customerGender').val($(event.target).closest('tr').find('td').eq(3).text())
            $('#customerDob').val($(event.target).closest('tr').find('td').eq(4).text())
            $('#customerAddress').val($(event.target).closest('tr').find('td').eq(5).text())

            let user=this.findContactNumber($(event.target).closest('tr').find('td').eq(1).find('strong').text());

            // $("#customerContact").val(user.userContactNum);
            $("#customerProfilePic").attr('src',`data:image/jpg;base64,${user.profileImage}`);
            $("#customerNicPic1").attr('src',`data:image/jpg;base64,${user.nicImage1}`);
            $("#customerNicPic2").attr('src',`data:image/jpg;base64,${user.nicImage2}`);
            this.setUpViewModel();

        });
    }

    findContactNumber(userId){
        let user=null;
        console.log("table id : "+userId);
        userList.map((value) =>{
            console.log("objed : "+value.userId);
            console.log(value.userId===userId);
            if (value.userId===userId){
                // console.log("value : "+value)
                user=value;
            }
        });
        return user;
    }

    setUpViewModel(){
        $("#model-container").css("display","flex");
    }

    setDataToTable(){
        // $("#userTable > tbody >tr >td").remove();
        let row="<tr>\n" +
            "                        <td><img src=\"../assets/image/image_2.jpg\"> Onaali_101</td>\n" +
            "                        <td>\n" +
            "                            <strong>990771162</strong>\n" +
            "                            <label>NIC</label>\n" +
            "                        </td>\n" +
            "<!--                        <td>NIC</td>-->\n" +
            "                        <td>\n" +
            "                            <strong>Onali Samarasinha</strong>\n" +
            "                            <label>onali99@gmail.com</label>\n" +
            "                        </td>\n" +
            "<!--                        <td>onali99@gmail.com</td>-->\n" +
            "                        <td>Female</td>\n" +
            "                        <td>1999/05/15</td>\n" +
            "                        <td>207/02,Nupe,Mathara</td>\n" +
            "                        <td>\n" +
            "                            <div  class=\"options viewBtn\"><i class=\"uil uil-file-check-alt\"></i></div>\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            <div class=\"options\"><i class=\"uil uil-cloud-redo\"></i></div>\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            <div class=\"options\"><i class=\"uil uil-user-times\"></i></div>\n" +
            "                        </td>\n" +
            "                        <!--                            <i class=\"uil uil-cloud-times\"></i>-->\n" +
            "                    </tr>";


        // for (let i=0;i<10;i++){
        //     userTable.append(row)
        // }

        $("#userTable > tbody >tr").on("click",() => {
            console.log("dddddddddd")
            this.setUpViewModel();
        })

        userTable.append(row);


    }

    getDataFromDb(){
        $.ajax({
            url:"http://localhost:8080/api/v1/user/find/all",
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);
                    alert("user get");
                    userList=resp.data;
                    this.setData(resp.data);

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    setData(dataArray){
        $("#userTable > tbody >tr >td").remove();
        dataArray.map((value) =>{
            console.log(value)

            let row="<tr>\n" +
                "                        <td><img class=\"img2\"> "+value.username+"</td>\n" +
                "                        <td>\n" +
                "                            <strong>"+value.userIdNum+"</strong>\n" +
                "                            <label>"+value.userIdType+"</label>\n" +
                "                        </td>\n" +
                "<!--                        <td>NIC</td>-->\n" +
                "                        <td>\n" +
                "                            <strong>"+value.userFullName+"</strong>\n" +
                "                            <label>"+value.userEmail+"</label>\n" +
                "                        </td>\n" +
                "<!--                        <td>onali99@gmail.com</td>-->\n" +
                "                        <td>"+value.userGender+"</td>\n" +
                "                        <td>"+value.userDob+"</td>\n" +
                "                        <td>207/02,Nupe,Mathara</td>\n" +
                "                        <td>\n" +
                "                            <div><i class=\"uil uil-file-check-alt\"></i></div>\n" +
                "                        </td>\n" +
                "                        <td>\n" +
                "                            <div><i class=\"uil uil-cloud-redo\"></i></div>\n" +
                "                        </td>\n" +
                "                        <td>\n" +
                "                            <div><i class=\"uil uil-user-times\"></i></div>\n" +
                "                        </td>\n" +
                "                        <!--                            <i class=\"uil uil-cloud-times\"></i>-->\n" +
                "                    </tr>";



            userTable.append(row);
            console.log($(".img2").length-1)
            $(".img2").attr('src',`data:image/jpg;base64,${value.profileImage}`);
        })

    }
}
new UserDashboard();