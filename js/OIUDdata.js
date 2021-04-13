(function ($) {
    $(".buyButton").each(function () {
        console.log($(".buyButton"));
        $(this).click(function () {
            console.log(this);
            console.log($(this).parents("li"));
            let picImg = $(this).parents("li").find("#midArea img").src;//图片路径
            let bookTitle = $(this).parents("li").find(".name").val();//商品名称
            let bookPrice = $(this).parents("li").find(".sellPrice").val();//商品单价
            let bookId = $(this).attr("data-id");  //商品ID

            let data = {

                "bookId": bookId,
                "Title": bookTitle,
                "number": 1,
                "Price": bookPrice,
                "imgpath": picImg
            };
            console.log(data);
            // ajax({
            //     url: "http://localhost:3000/carts",
            //     type: "post",
            //     data: data,
            //     success: function (res) {
            //         if (res == 1) {
            //             alert("添加购物车成功");
            //         } else {
            //             alert("添加失败，请重试");
            //         }
            //     }
            // })

        })
    });


})(jQuery);