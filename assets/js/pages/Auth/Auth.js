$(function () {
    $(document).on('click', `[data-role="register-user"]`, function () {
        let data = {
            name: $(`[data-role="name"]`).val(),
            username: $(`[data-role="username"]`).val(),
            surname: $(`[data-role="surname"]`).val(),
            age: $(`[data-role="age"]`).val(),
            gender: "male",
            email: $(`[data-role="email"]`).val(),
            password: $(`[data-role="password"]`).val(),
            rememberMe: false
        };

        $.ajax({
            url: '/registerUser',
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (d) {
                console.log(d);
                console.log("registered successfully");
            },
            error: function (e) {
                console.error(e);
            }
        });
    });


    $(document).on('click', `[data-role="login"]`, function () {

        let data = {
            email: $(`[data-role="email"]`).val(),
            password: $(`[data-role="password"]`).val(),
            rememberMe: $(`[data-role="rememberMe"]:checked`) ? true : false
        };
        $.ajax({
            url: '/login',
            type: "POST",
            data: data,
            // data: JSON.stringify(data),
            dataType: "json",
            success: function (d) {
                console.log(d);
                if (d.status === 200) {
                    $(`#successModal`).show();
                    document.location.href="/";
                } else {
                    $(`#successModal`).show();
                }
            },
            error: function (e) {
                console.error(e);
            },
        })

    });
});