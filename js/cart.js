window.onload = function () {

    //判断是否登录
    if (!localStorage.getItem("users")) {
        alert("请先登录！");
        window.location.href = "../html/login.html";
        // return;
    }
    // 获取tbody节点
    var tbody = document.querySelector(".tb");
    // 总价
    var em = document.querySelector(".total-price em");
    var gnumber = document.querySelector(".g-number");
    // 总数量
    var cNumber = document.querySelector(".c-number");
    // 获取结算按钮
    var close = document.querySelector(".close");
    // 件数
    var ja;
    // 勾选
    var noTip = document.querySelector(".noTip");
    // 自动生成商品
    //数据展示
    //logo点击
    var logo = document.querySelector(".header");
    logo.onclick = function () {
        window.location.href = "../html/index.html";
    }
    ajax({
        url: "http://localhost:3000/carts",
        type: "get",
        success: function (res) {
            res = JSON.parse(res);
            let strs = "";
            for (let i = 0; i < res.length; i++) {
                if (res[i].userId == 2) {
                    strs +=
                        `<tr class="tlist">
                    <td class="c"><span class="iconfont icon-succ item"></span></td>
                    <td class="simg">
                        <img src="${res[i].imgpath}" alt="" />
                    </td>
                    <td class="titles">${res[i].Title}</td>
                    <td class="price">${res[i].Price}</td>
                <td class="number numbers">
                    <div class="nu">
                        <span class="iconfont icon-jianhao"></span><input type="text" value="1" class="shopNumber"/><span class="iconfont icon-hao"></span>
                        <div class="msg"></div>
                    </div>
                </td>
                <td class="count ic">${res[i].Price}</td>
                <td class="op"><span class="iconfont icon-X-" data-id ="${res[i].id}"></span></td>
                </tr>`;

                }
            }
            tbody.innerHTML += strs;




        }




    });
    number();
    // 全选按钮
    var all = document.querySelector(".all");
    // var itemBtns = tbody.querySelectorAll(".item");
    //给tobdy添加点击事件，委托
    tbody.onclick = function (event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        var itemBtns = tbody.querySelectorAll(".item");

        for (let i = 0; i < itemBtns.length; i++) {
            if (itemBtns[i].className == "iconfont icon-succ item") {
                all.className = "iconfont icon-succ all";
                break;
            }
            all.className = "iconfont icon-succ all btn";
            console.log(all.className);

        }
        // 小计价格

        if (
            target.className == "iconfont icon-jianhao" ||
            target.className == "iconfont icon-hao"
        ) {
            var numa = target.parentNode;
            // 还可以购买
            var msg = numa.querySelector(".msg");
            ja = parseInt(numa.children[1].value);
            if (target.className == "iconfont icon-jianhao") {
                ja = ja - 1;
            } else if (target.className == "iconfont icon-hao") {
                ja = ja + 1;
            }
            if (ja == 0) {
                alert("修改数量不能小于1")
                ja = 1;
            } else if (ja == 1) {
                msg.style.display = "none";
            } else if (ja > 1 && ja < 10) {
                msg.style.display = "block";
                msg.innerHTML = "还可以购买10件以上";
            } else if (ja >= 10 && ja < 20) {
                msg.style.display = "block";
                msg.innerHTML = "还可以购买" + (20 - ja) +
                    "件";
            } else if (ja == 20) {
                msg.style.display = "none";
            } else if (ja > 20) {
                alert("商品加入购物车数量超过限制")
                ja = 20;
            }
            numa.children[1].value = ja;
            p(numa, ja);
            money();
            number();
        }
        //输入件数
        if (target.className == "shopNumber") {
            target.onclick = function () {
                var numa = target.parentNode;
                // 还可以购买
                var msg = numa.querySelector(".msg");
                var ja = target.value;
                if (ja == 0) {
                    alert("修改数量不能小于1")
                    ja = 1;
                } else if (ja == 1) {
                    msg.style.display = "none";
                } else if (ja > 1 && ja < 10) {
                    msg.style.display = "block";
                    msg.innerHTML = "还可以购买10件以上";
                } else if (ja >= 10 && ja < 20) {
                    msg.style.display = "block";
                    msg.innerHTML = "还可以购买" + (20 - ja) +
                        "件";
                } else if (ja == 20) {
                    msg.style.display = "none";
                } else if (ja > 20) {
                    alert("商品加入购物车数量超过限制")
                    ja = 20;
                    msg.style.display = "none";
                } else {
                    alert("请输入数字")
                    ja = 1;
                }
                p(numa, ja)
                money();
            }
        }
        // 删除商品
        if (target.className == "iconfont icon-X-") {
            // var flag = confirm("是否确定删除商品？");

            // if (flag) {


            //删除json数据

            ajax({
                url: "http://localhost:3000/carts",
                type: "get",
                success: function (res) {
                    res = JSON.parse(res);
                    let CartID = target.dataset.id;
                    console.log(CartID);

                    axios.delete(`http://localhost:3000/carts/${CartID}`, {
                    })
                        .then(function () {
                            // alert("删除成功！");
                            // location.reload();
                            // return 1;
                        })
                        .catch(function (error) {
                            alert("删除失败！")
                        });

                }
            });
            target.parentNode.parentNode.remove();
            // 判断移除之后的总价，和已选数量
            money();
            number();
            var itemBtns = tbody.querySelectorAll(".item");
            // console.log(itemBtns);
            for (var i = 0; i < itemBtns.length; i++) {
                if (itemBtns[i].className == "iconfont icon-succ item") {
                    all.className = "iconfont icon-succ all";
                    break;
                }
                all.className = "iconfont icon-succ all btn";
            }


            // }
        }
        // 全选判断
        if (
            target.className == "iconfont icon-succ all" ||
            target.className == "iconfont icon-succ all btn"
        ) {
            var itemBtns = tbody.querySelectorAll(".item");
            // 全选
            if (target.className == "iconfont icon-succ all") {
                target.className += " btn";
                // 结算
                close.className += " btn-close";
                for (var i = 0; i < itemBtns.length; i++) {
                    itemBtns[i].className = "iconfont icon-succ item btn";
                } // 已选数量，总价
                money();
            }
            //取消全选
            else if (target.className == "iconfont icon-succ all btn") {
                target.className = "iconfont icon-succ all";
                // 结算
                close.className = "close  btn-disabled";
                // 已选数量
                gnumber.innerHTML = 0;
                // 总价
                em.innerHTML = 0;
                // 勾选提示
                noTip.style.display = "block";
                for (var i = 0; i < itemBtns.length; i++) {
                    itemBtns[i].className = "iconfont icon-succ item";
                }
            }
        }
        // 单选判断
        if (
            target.className == "iconfont icon-succ item" ||
            target.className == "iconfont icon-succ item btn"
        ) {
            // var itemBtns = tbody.getElementsByClassName(".item");
            // 单选
            if (target.className == "iconfont icon-succ item") {
                target.className += " btn";
                close.className += " btn-close";
                // 单选判断全选
                var itemBtns = tbody.getElementsByClassName(".item");
                for (let i = 0; i < itemBtns.length; i++) {
                    if (itemBtns[i].className == "iconfont icon-succ item") {
                        all.className = "iconfont icon-succ all";
                        break;
                    }
                    all.className = "iconfont icon-succ all btn";
                }
                let count = 0;
                for (let i = 0; i < itemBtns.length; i++) {
                    if (itemBtns[i].className == "iconfont icon-succ item btn") {
                        count++;

                    }
                    if (itemBtns[i].length == count) {
                        all.className = "iconfont icon-succ all btn";
                    } else {
                        all.className = "iconfont icon-succ all";
                    }

                }

            } else if (target.className == "iconfont icon-succ item btn") {
                target.className = "iconfont icon-succ item";
                // 取消全选
                all.className = "iconfont icon-succ all";
                if (snumber == 0) {
                    // 结算按钮背景
                    close.className = "close btn-disabled";
                }
            }
            // 总价和已选商品
            money();
        }
    };
    // 小计
    function p(num, n) {
        // 数量
        num.querySelector(".shopNumber").value = n;
        // 获取单价
        price = parseInt(
            parseFloat(num.parentNode.parentNode.querySelector(".price").innerHTML) * 10
        );
        // 小计价格
        var ic = num.parentNode.parentNode.querySelector(".ic");
        ic.innerHTML = n * price / 10 + "元";
    }
    // 总价
    var moneys = 0;
    // 已选数量
    var j = 0;
    var snumber = 0;

    function money() {
        var itemBtns = document.querySelectorAll(".c span");
        for (var i = 0; i < itemBtns.length; i++) {
            if (itemBtns[i].className == "iconfont icon-succ item btn") {
                // 获取小计价格
                countVlue = parseInt(
                    parseFloat(itemBtns[i].parentNode.parentNode.querySelector(".count")
                        .innerHTML) * 10
                );
                moneys += countVlue;
                j = parseInt(
                    itemBtns[i].parentNode.parentNode.querySelector(".shopNumber")
                        .value
                );
                snumber = snumber + j;
            }
        }
        // 总价
        em.innerHTML = moneys / 10;
        // 已选择数量
        gnumber.innerHTML = snumber;
        if (snumber > 0) {
            noTip.style.display = "none";
        } else {
            noTip.style.display = "block";
        }
        moneys = 0;
        snumber = 0;
    }
    // 总量
    var cnumber = 0;
    var c = 0;

    function number() {
        ajax({
            url: "http://localhost:3000/carts",
            type: "get",
            success: function (res) {
                res = JSON.parse(res);
                let len = res.length;
                cNumber.innerHTML = len;


            }
        });

        // var itemBtns = document.querySelectorAll(".c span");
        // for (var i = 0; i < itemBtns.length; i++) {
        //     c = parseInt(
        //         itemBtns[i].parentNode.parentNode.querySelector(".shopNumber").value
        //     );
        //     cnumber += c;
        // }
        // cNumber.innerHTML = cnumber;
        // cnumber = 0;
    }

    var shopList = document.querySelector(".shopList")
    ajax({
        url: "http://localhost:3000/books",
        type: "get",
        success: function (res) {
            res = JSON.parse(res);
            var str = "";
            for (var i = 0; i < 10; i++) {
                str += ` <li class="shopitem">
            <a href="javascript:;">
                <img src="${res[i].imgpath}" alt="">
                <p class="shop-name">${res[i].Title}</p>
                <p class="shop-price">${res[i].Price}</p>
                <p class="shop-tips">${res[i].Author}</p>
            </a>
            <div class="action" data-id="${res[i].id}">加入购物车</div>
            </li>`
            }
            shopList.innerHTML = str;
            //加入购物车数据
            (function ($) {
                $(".action").each(function () {
                    // console.log($(".action"));
                    $(this).click(function () {
                        console.log(this);
                        let bookId = $(this).attr("data-id");  //商品ID
                        console.log(bookId);
                        for (let i = 0; i < res.length; i++) {
                            if (res[i].id == bookId) {
                                $.ajax({
                                    url: "http://localhost:3000/carts",
                                    type: "post",
                                    data: {
                                        "bookId": Number(res[i].id),
                                        "Title": res[i].Title,
                                        "number": Number(1),
                                        "Price": Number(res[i].Price),
                                        "imgpath": res[i].imgpath,
                                        "userId": Number(2)
                                    },
                                    success: function () {
                                        alert("添加购物车成功");
                                        return;
                                    },
                                    error: function () {
                                        alert("请求失败");
                                        return;
                                    },

                                });
                            }
                        }
                    })
                });
            })(jQuery);

        }
    });
    shopList.onclick = function (event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.className == "action") {
            // 获取li
            var shopitem = target.parentNode;
            // 获取商品名
            var shopName = shopitem.querySelector(".shop-name").innerHTML;
            // 价格
            var shopPric = shopitem.querySelector(".shop-price").innerHTML;
            // 获取图片
            var img = shopitem.querySelector("img").src;
            var tr = document.createElement("tr");
            tr.className = "tlist";
            tr.innerHTML =
                '<td class="c"><span class="iconfont icon-succ item btn"></span></td> <td class="simg"><img src="' + img + '" alt="" width=80px/></td> <td class="titles">' + shopName + '</td> <td class="price">' + shopPric + '</td><td class="number numbers"><div class="nu"><span class="iconfont icon-jianhao"></span><input type="text" value="1" class="shopNumber" /><span  class="iconfont icon-hao"></span><div class="msg">还可买 10 件以上 < /div></div></td><td class="count ic">' + shopPric + ' </td><td class="op"><span class="iconfont icon-X-"></span></td>';
            tbody.insertBefore(tr, tbody.children[1]);

            ajax({
                url: "http://localhost:3000/books",
                type: "get",
                success: function (res) {
                    res = JSON.parse(res);
                    console.log(res);
                    res.forEach(item => {
                        strs +=
                            `<tr class="tlist">
                        <td class="c"><span class="iconfont icon-succ item"></span></td>
                        <td class="simg">
                            <img src="${item.imgpath}" alt="" />
                        </td>
                        <td class="titles">${item.Title}</td>
                        <td class="price">${item.Price}</td>
                        <td class="number numbers">
                            <div class="nu">
                                <span class="iconfont icon-jianhao"></span><input type="text" value="1" class="shopNumber"/><span class="iconfont icon-hao"></span>
                                <div class="msg"></div>
                            </div>
                        </td>
                        <td class="count ic">${item.Price}</td>
                        <td class="op"><span class="iconfont icon-X-"></span></td>
                    </tr>`;
                    });

                }
            });


        }
        number();
    }
    // 结算点击
    close.onmousedown = function () {
        if (close.className == "close btn-disabled") {
            close.style.boxShadow = "2px -2px 4px rgba(0, 0, 0, .3)";
        } else {
            var fl = confirm("是否确定购买？");
        }
    }
    close.onmouseup = function () {
        if (close.className == "close btn-disabled") {
            close.style.boxShadow = "";
        }
    }
}