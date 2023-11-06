$('#vehicle').css({display: 'none'});
$('#guide').css({display: 'none'});
$('#user').css({display: 'none'});
$('#hotel').css({display: 'none'});
$('#package').css({display: 'none'});
$(".register-container").css({display: 'none'});
$(".vehicle-container").css({display: 'none'});
$(".hotel-container").css({display: 'none'});
$(".guide-container").css({display: 'none'});
$(".package-container").css({display: 'none'});

$("#package-btn").click(function () {
    $('#dashboard').css({display: 'none'});
    $('#vehicle').css({display: 'none'});
    $('#guide').css({display: 'none'});
    $('#user').css({display: 'none'});
    $('#hotel').css({display: 'none'});
    $('#package').css({display: 'block'});
});

$("#dashboard-btn").click(function () {
    $('#dashboard').css({display: 'block'});
    $('#vehicle').css({display: 'none'});
    $('#guide').css({display: 'none'});
    $('#user').css({display: 'none'});
    $('#hotel').css({display: 'none'});
    $('#package').css({display: 'none'});
});

$("#vehicle-btn").click(function () {
    $('#vehicle').css({display: 'block'});
    $('#guide').css({display: 'none'});
    $('#user').css({display: 'none'});
    $('#hotel').css({display: 'none'});
    $('#package').css({display: 'none'});
    $('#dashboard').css({display: 'none'});
});

$("#guide-btn").click(function () {
    $('#guide').css({display: 'block'});
    $('#user').css({display: 'none'});
    $('#hotel').css({display: 'none'});
    $('#package').css({display: 'none'});
    $('#dashboard').css({display: 'none'});
    $('#vehicle').css({display: 'none'});
});

$("#users-btn").click(function () {
    $('#user').css({display: 'block'});
    $('#hotel').css({display: 'none'});
    $('#package').css({display: 'none'});
    $('#dashboard').css({display: 'none'});
    $('#vehicle').css({display: 'none'});
    $('#guide').css({display: 'none'});
});

$("#hotel-btn").click(function () {
    $('#hotel').css({display: 'block'});
    $('#package').css({display: 'none'});
    $('#dashboard').css({display: 'none'});
    $('#vehicle').css({display: 'none'});
    $('#guide').css({display: 'none'});
    $('#user').css({display: 'none'});
});


$("#logOut-btn").click(function () {
    confirmLogout();
});




function confirmLogout() {
    swal({
        title: "Login Out",
        text: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",

                });
                window.location.href = "../index.html";
            } else {
                swal(" Safe Your Login!");
            }
        });
}

