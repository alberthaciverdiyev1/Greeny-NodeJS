$(function () {
    // $(document).on('click', `[data-role="add-product-btn"]`, function () {
    //     let data = {
    //         category_id: $('[data-role="category_id"] option:selected').val(),
    //         title: $('[data-role="title"]').val(),
    //         name: $('[data-role="name"]').val(),
    //         city_id: $('[data-role="city_id"] option:selected').val(),
    //         price: $('[data-role="price"]').val(),
    //         description: $('[data-role="description"]').val(),
    //         phone: $('[data-role="phone"]').val(),
    //         contact_type: $('[data-role="contact_type"] option:selected').val(),
    //         email: $('[data-role="email"]').val(),
    //         image: $(`[data-role="image"]`)[0].files[0],
    //     };

    //     $.ajax({
    //         url: '/shop/add-product',
    //         type: "POST",
    //         data: JSON.stringify(data),
    //         contentType: "application/json",
    //         success: function (d) {
    //             console.log(d);
    //         },
    //         error: function (e) {
    //             console.error(e);
    //         },
    //         complete: function (e) {
    //             console.log(data);
    //         }
    //     });
    // });

    $(function(){
        $(document).on('click', `[data-role="add-product-btn"]`, function () {
            // Formdaki verileri toplar
            let formData = new FormData();
            formData.append('category_id', $(`[data-role="category_id"]`).val());
            formData.append('city_id', $(`[data-role="city_id"]`).val());
            formData.append('price', $(`[data-role="price"]`).val());
            formData.append('title', $(`[data-role="title"]`).val());
            formData.append('description', $(`[data-role="description"]`).val());
            formData.append('contact_type', $(`[data-role="contact_type"]`).val());
            formData.append('phone', $(`[data-role="phone"]`).val());
            formData.append('email', $(`[data-role="email"]`).val());
            formData.append('name', $(`[data-role="name"]`).val());
    
            // Dosyayı ekler
            formData.append('image', $(`[data-role="image"]`)[0].files[0]);
    console.log(formData);
            // AJAX isteğini gönderir
            $.ajax({
                url: '/shop/add-product',
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (d) {
                    console.log(d);
                    console.log("Product added successfully");
                },
                error: function (e) {
                    console.error(e);
                }
            });
        });
    });
    
});

