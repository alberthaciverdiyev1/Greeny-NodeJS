$(function() {

    $(document).on('click', `[data-role="add-product-btn"]`, function() {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
            url: '/shop/add-product',
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(d) {
                console.log(d);
            },
            error: function(e) {
                console.error(e);
            }
        });
    })
})