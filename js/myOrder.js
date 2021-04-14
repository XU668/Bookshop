window.onload = function () {
    ajax({
        url: "http://localhost:3000/orders",
        type: "get",
        success: showList
    });
    function showList(res) {
        res = JSON.parse(res);
        let len = res.length;
        let TJorders = document.getElementsByClassName("tab-panel-item")[0];
        let str1 = "";
        for (let i = 0; i < len; i++) {
            let priceTOtal = res[i].Price * res[i].number;
            str1 += `<div class="tab-item">
            <a href="javascript:void(0);" class="aui-well-item aui-well-item-clear b-line">
                <div class="aui-well-item-bd">
                    <h3>${res[i].payTime}</h3>
                </div>

                <span class="aui-well-item-fr aui-well-item-fr-clear">${res[i].isPay}</span>
            </a>
            <div class="aui-mail-product">
                <a href="javascript:;" class="aui-mail-product-item">
                    <div class="aui-mail-product-item-hd">
                        <img src="${res[i].imgpath}" alt="">
                    </div>
                    <div class="aui-mail-product-item-bd">
                        <p>${res[i].Title}</p>
                    </div>
                    <div class="aui-mail-product-right">
                        <h4>￥${priceTOtal}</h4>
                    </div>
                </a>
            </div>
            <div class="aui-mail-button">
            <a href="javascript:;" class="aui-df-color" data-id="${res[i].id}">删除订单</a>
            <a href="javascript:;" class="aui-mail-payment">
            <p>
                共<em>${res[i].number}</em>件商品
            </p>
        </a>   
        
        </div>
        </div>`;
        }
        TJorders.innerHTML = str1;
        $(".aui-df-color").each(function () {
            $(this).click(function () {
                let orderID = $(this).attr("data-id");  //商品ID
                ajax({
                    url: "http://localhost:3000/orders",
                    type: "get",
                    success: function (res) {
                        res = JSON.parse(res);;
                        axios.delete(`http://localhost:3000/orders/${orderID}`, {
                        })
                            .then(function () {
                                alert("删除成功！");
                                location.reload();
                            })
                            .catch(function (error) {
                                alert("删除失败！")
                            });
                    }
                });


            })
        });

    }




}
