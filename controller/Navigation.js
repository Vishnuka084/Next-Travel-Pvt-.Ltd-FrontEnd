$(".register-link").click(function () {
    $(".wrapper").css({display: 'none'});
    $(".register-container").css({display: 'block'});


});
$(".login-link").click(function () {
    $(".wrapper").css({display: 'block'});
    $(".register-container").css({display: 'none'});

});
$(".icon-close").click(function () {
    $(".wrapper").css({display: 'none'});
    $(".register-container").css({display: 'none'});
    $(".vehicle-container").css({display: 'none'});

    $('#user-UserName').val("");
    $('#user-Password').val("");
    $('#user-Age').val("");
    $('#user-Contact').val("");
    $('#user-Email').val("");
    $('#user-Address').val("");
    $('#user-Gender').val("");
    $('#user-Nic').val("");
    $('#user-Profile').val("");

    $('#login-Email').val("");
    $('#login-password').val("");

});
$(".header-login").click(function () {
    $(".login").css({display: 'block'});
    $(".wrapper").css({display: 'block'});

});