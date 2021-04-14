
$.ajax({
    url: "http://localhost:3000/books",
    type: "get",
    data: {
        bookId
    },
    success: function (res) {
        res = JSON.parse(res);
        let len = res.length;
        for (let i = 0; i < len; i++) {
            if (res[i].id == bookId) {
                let str2 = "";
                str1 += `<div class="img">
                                    <a href="javascript:;"><img src="${res[i].imgpath}" alt=""></a>
                                </div>
                                <div class="shuoming">
                                    <h2><a href="javascript:;">${res[i].Title}</a></h2>
                                    <div class="price">
                                        <span class="sellPrice">¥${res[i].Price}</span>
                                    </div>
                                    <div class="mainFont">
                                        <p>一个叫做方言的人自杀死亡了，没有人知道他自杀的原因。若干年后，方言的女儿咪咪方在国外长大成人，结婚生子，但对父亲的自杀始终不能释怀。于是她回国，找到方言生前的挚友老王。已值“风烛残年”的老王，时隔三十多年后终于敞开心扉，向逝去多年的挚友方言的女儿咪咪方说出了她父亲生死的谜底。小说随着老王言不由衷、躲躲闪闪、矢口否认、百般诡辩而渐渐进入到隐秘的深处，由此揭开了一个人痛苦的内心生活和全部人生滋味。两人的谈话变得漫长而艰难...
                                        </p>
                                    </div>
                                    <a href="../html/cart.html"  target="_blank" class="buyButton" data-id="${res[i].id}">加入购物车</a>
                                </div>`;

                detail.innerHTML = str2;
            }

        }
        // window.location.href = "../html/detail.html";
    },
    error: function () {
        alert("请求失败");
    },

});
