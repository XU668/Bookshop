var TJbooks = document.querySelector("#TJbooks");
let oPages = document.getElementById("pages");
let aPageList = oPages.children;
let pageNum = document.querySelector(".pageNum");
let curIndex = 0; //当前页
ajax({
    url: "http://localhost:3000/books",
    type: "get",
    success: show
});
function show(res) {
    res = JSON.parse(res);
    let len = res.length;
    let numPerPage = 5; //每页显示多少条
    let pages = Math.ceil(len / numPerPage);
    //展示页码
    let str = "";
    for (let i = 1; i <= pages; i++) {
        str += `<span>${i}</span>`
    }
    pageNum.innerHTML = str;
    //默认展示第一页
    showList(curIndex);

    function showList(index) {
        let str1 = "";
        for (let i = index * numPerPage; i < Math.min((index + 1) * numPerPage, len); i++) {
            str1 += `<li>
            <div class="pic" id="zoomBox">
            <div id="midArea">
                <img src="${res[i].imgpath}">
                <div id="zoom"></div>
            </div>
            <div id="bigArea">
                <img src="${res[i].imgpath}">
            </div>
        </div>
        <div class="infor">
            <h2 class="name">${res[i].Title}</h2>
            <div class="otherInfor">
                <a href="">${res[i].Author}</a>
                <i>&nbsp;&nbsp;/&nbsp;&nbsp;</i>
                <span>${res[i].PubDate}</span>
                <a href="">人民文学出版社</a>
            </div>
            <div class="priceWrap">
                <span class="sellPrice">${res[i].Price}</span>
            </div>
            <p class="recoLagu">
                一个叫做方言的人自杀死亡了，没有人知道他自杀的原因。已值“风烛残年”的老王，时隔三十多年后终于敞开心扉，向逝去多年的挚友方言的女儿咪咪方说出了她父亲生死的谜底。小说随着老王言不由衷、躲躲闪闪、矢口否认、百般诡辩而渐渐进入到隐秘的深处，由此揭开了一个人痛苦的内心生活和全部人生滋味。两人的谈话变得漫长而艰难...
            </p>
            <div class="oparateButton">
                <a href="" class="buyButton" data-id="${res[i].Id}">加入购物车</a>
            </div>
        </div>
        </li>`;
        }

        TJbooks.innerHTML = str1;

    }
    //具体页码
    let aNums = pageNum.children;
    aNums[0].style.background = "red";

    //首页
    aPageList[0].onclick = function () {
        curIndex = 0;
        for (let j = 0; j < aNums.length; j++) {
            if (j != curIndex) {
                aNums[j].style.backgroundColor = "#fff";
            }
        }
        aNums[curIndex].style.background = "red";

        showList(curIndex);
        startMover();
    }
    //上一页
    aPageList[1].onclick = function () {
        curIndex--;
        if (curIndex <= 0) {
            curIndex = 0;
        }
        for (let j = 0; j < aNums.length; j++) {
            if (j != curIndex) {
                aNums[j].style.backgroundColor = "#fff";
            }
        }
        aNums[curIndex].style.background = "red";
        showList(curIndex);
        startMover();
    }
    //下一页
    aPageList[3].onclick = function () {
        curIndex++;
        for (let j = 0; j < aNums.length; j++) {
            if (j != curIndex) {
                aNums[j].style.backgroundColor = "#fff";
            }
        }
        aNums[curIndex].style.background = "red";
        if (curIndex >= pages - 1) {
            curIndex = pages - 1;
        }
        showList(curIndex);
        startMover();
    }
    //尾页
    aPageList[4].onclick = function () {

        curIndex = pages - 1;
        showList(curIndex);
        startMover();
    }

    for (let i = 0; i < aNums.length; i++) {
        aNums[i].onclick = function () {
            for (let j = 0; j < aNums.length; j++) {
                if (j != i) {
                    aNums[j].style.backgroundColor = "#fff";
                }
            }
            aNums[i].style.background = "red";
            curIndex = i;
            showList(curIndex);
            startMover();
        }
    }

};
let timer;
function startMover() {

    clearInterval(timer);
    timer = setInterval(function () {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = st / 8;
        ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
        if (st == 0) {
            clearInterval(timer);
        }
        else {
            document.documentElement.scrollTop = document.body.scrollTop = st - ispeed;

        }
    }, 20);
};
let addCartBtn = document.getElementsByClassName("buyButton");
for (let i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].onclick = function () {
        let id = this.getAttribute("data-id");
    }

    /*  let data = {
    
    "bookId": 2,
    "Title": "南渡记",
    "number": 1,
    "Price": 20.99,
    "imgpath": "../imgs/Books/22.jpg"
    };
    ajax({
    url: "http://localhost:3000/books/Id=",
    type: "get",
    data: data,
    success: function (res) {
        if (res == 1) {
            location.reload();
        } else {
            alert("添加失败，请重试");
        }
    }
    }) */
}