$(document).on('click', `[data-role="register-user"]`, function () {
    data = {
        name: $(`[data-role="name"]`).val(),
        surname: $(`[data-role="surname"]`).val(),
        age: $(`[data-role="age"]`).val(),
        gender: "male",
        email: $(`[data-role="email"]`).val(),
        password: $(`[data-role="password"]`).val(),
        rememberMe: false
    };
    console.log(data);
    $.ajax({
        url: `register-user`,
        type: "POST",
        data: data,
        success: function (d) {
            console.log("registered successfully");
        },
        error: function (e) {
            console.error(e);
        },
        complete: function () {
        }
    });
});