window.onload = function () {
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
    var arr = [{
        img: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1560222640.90428593.jpg?thumb=1&w=80&h=80",
        titles: "小米「小爱老师」 4G网络尊享版 白色",
        price: "999元",
        count: "999元"
    },
    {
        img: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1543561468.82116708.jpg?thumb=1&w=80&h=80",
        titles: "小黑鲨游戏 Type-C 耳机 黑色",
        price: "99元",
        count: "99元"
    },
    {
        img: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1464615180.86261317.jpg?thumb=1&w=80&h=80",
        titles: "米兔智能故事机 白色",
        price: "199元",
        count: "199元"
    },
    ]
    var strs = "";
    for (var i = 0; i < arr.length; i++) {
        var imgsrc = arr[i].img;
        var titles = arr[i].titles;
        var itemprice = arr[i].price;
        var count = arr[i].count;
        strs +=
            `<tr class="tlist">
        <td class="c"><span class="iconfont icon-succ item"></span></td>
        <td class="simg">
            <img src="${imgsrc}" alt="" />
        </td>
        <td class="titles">${titles}</td>
        <td class="price">${itemprice}</td>
        <td class="number numbers">
            <div class="nu">
                <span class="iconfont icon-jianhao"></span><input type="text" value="1" class="shopNumber"/><span class="iconfont icon-hao"></span>
                <div class="msg"></div>
            </div>
        </td>
        <td class="count ic">${count}</td>
        <td class="op"><span class="iconfont icon-X-"></span></td>
    </tr>`
    }
    tbody.innerHTML += strs;
    // 全选按钮
    var all = document.querySelector(".all");
    //给tobdy添加点击事件，委托
    tbody.onclick = function (event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
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
            target.onblur = function () {
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
            var flag = confirm("是否确定删除商品？");
            if (flag) {
                target.parentNode.parentNode.remove();
                // 判断移除之后的总价，和已选数量
                money();
                number();
                var itemBtns = tbody.querySelectorAll(".item");
                console.log(itemBtns);
                for (var i = 0; i < itemBtns.length; i++) {
                    if (itemBtns[i].className == "iconfont icon-succ item") {
                        all.className = "iconfont icon-succ all";
                        break;
                    }
                    all.className = "iconfont icon-succ all btn";
                }
            }
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
            var itemBtns = tbody.querySelectorAll(".item");
            // 单选
            if (target.className == "iconfont icon-succ item") {
                target.className += " btn";
                close.className += " btn-close";
                // 单选判断全选
                for (var i = 0; i < itemBtns.length; i++) {
                    if (itemBtns[i].className == "iconfont icon-succ item") {
                        all.className = "iconfont icon-succ all";
                        break;
                    }
                    all.className = "iconfont icon-succ all btn";
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
        var itemBtns = document.querySelectorAll(".c span");
        for (var i = 0; i < itemBtns.length; i++) {
            c = parseInt(
                itemBtns[i].parentNode.parentNode.querySelector(".shopNumber")
                    .value
            );
            cnumber += c;
        }
        cNumber.innerHTML = cnumber;
        cnumber = 0;
    }

    var shopList = document.querySelector(".shopList")
    var arrshop = [{
        imgSrc: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-miapp-a1/b474f7bb-10e1-ee92-f78f-d87231b0726a.jpg?thumb=1&w=180&h=180",
        shopName: "小米AI音箱",
        shopPrice: "199元",
        shopTips: "117.8万人好评",
    },
    {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/413f38dda38c199d422a6ff453234ad4.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "米家声波电动牙刷T100",
        shopPrice: "39.9元",
        shopTips: "177万人好评",
    }, {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d71b2748efea2b150b00bb1f30d8cf99.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "MIJOY 小魔爪按摩器",
        shopPrice: "9.9元",
        shopTips: "18.6万人好评",
    }, {
        imgSrc: "https://i8.mifile.cn/b2c-mimall-media/64de04b0cb774f0b33ed4a00df0f9c3c!180x180.jpg",
        shopName: "手机USB micro 数据线",
        shopPrice: "19.9元",
        shopTips: "57.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/32febc8b4df89cda9019aab1643b7eb8.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "米家插电夜灯",
        shopPrice: "39.9元",
        shopTips: "7.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4b762a0c59fd01f5c4068c61a9da56e7.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "小米中性笔",
        shopPrice: "24.9元",
        shopTips: "13.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cccefe4c39329ec01b587d114f64eab5.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "米家智能压力IH电饭煲1S 3L",
        shopPrice: "849元",
        shopTips: "1.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-miapp-a1/b474f7bb-10e1-ee92-f78f-d87231b0726a.jpg?thumb=1&w=180&h=180",
        shopName: "米家自动洗手机套装",
        shopPrice: "69元",
        shopTips: "41.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-miapp-a1/T1bXKjBQAT1RXrhCrK.jpg?thumb=1&w=180&h=180",
        shopName: "7号彩虹电池（10粒）",
        shopPrice: "199元",
        shopTips: "203.8万人好评",
    }, {
        imgSrc: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f9f3e968c9390f44a589afa48e92c6eb.jpg?thumb=1&w=180&h=180&f=webp&q=90",
        shopName: "贝医生防蛀健齿牙膏",
        shopPrice: "12.9元",
        shopTips: "56.8万人好评好评",
    },
    ]
    var str = "";
    for (var i = 0; i < arrshop.length; i++) {
        var imgSrc = arrshop[i].imgSrc;
        var shopName = arrshop[i].shopName;
        var shopPrice = arrshop[i].shopPrice;
        var shopTips = arrshop[i].shopTips;
        str += ` <li class="shopitem">
    <a href="javascript:">
        <img src="${imgSrc}" alt="">
        <p class="shop-name">${shopName}</p>
        <p class="shop-price">${shopPrice}</p>
        <p class="shop-tips">${shopTips}</p>
    </a>
    <div class="action">加入购物车</div>
    </li>`
    }
    // 添加事件
    // 事件委托
    shopList.innerHTML = str;
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