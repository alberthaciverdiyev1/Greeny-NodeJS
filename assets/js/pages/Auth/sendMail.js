$(function () {

    $(document).on('click', '[data-role="send-mail"]', function () {
        console.log("clicked");
        let data = {
            name: $(`[data-role="name"]`).val(),
            subject: $(`[data-role="subject"]`).val(),
            message: $(`[data-role="message"]`).val(),
            email: $(`[data-role="email"]`).val()
        }
        console.log(data);
        $.ajax({
            url: '/send-mail',
            data: data,
            type: 'POST',
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }

        });
    });
});