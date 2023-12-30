$(document).on('click', `[data-role="register-user"]`, function () {
    let data = {
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
        url: '/registerUser', // API rotası doğru ise bu rotayı belirtmelisiniz
        type: "POST",
        data: JSON.stringify(data), // Verileri JSON formatına dönüştürdük
        contentType: "application/json", // İçerik tipini belirttik
        success: function (d) {
            console.log(d);
            console.log("registered successfully");
        },
        error: function (e) {
            console.error(e);
        }
    });
});
