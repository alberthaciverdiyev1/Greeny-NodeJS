$(function(){
    $(document).on('click', `[data-role="add-blog"]`, function () {
        let data = {
            title: $(`[data-role="title"]`).val(),
            context: $(`[data-role="context"]`).val(),
            image: $(`[data-role="image"]`)[0].files[0],

        };
        console.log(data);
    
        $.ajax({
            url: '/Blogs/add', 
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
    
})