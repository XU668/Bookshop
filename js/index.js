
if (!localStorage.getItem("users")) {
    alert("请先登录！");
    window.location.href = "../html/login.html";
    // return;
} else {

    // let yiDL = document.getElementsByClassName(".yiDL")[0];
    // let weiDL = document.getElementsByClassName(".weiDL")[0];
    // let mingzi = $(".yiDL .mingzi")
    // yiDL.css("display", "block");
    // weiDL.css("display", "none");
    // mingzi.text();
    // console.log($(".yiDL"));
    // console.log($(".weiDL"));

}
$(function () {
    $(".RXbang").find(".bookCur").first().css("display", "block");
    $(".RXbang").find("li").mouseover(function () {
        $(this).find(".bookCur").css("display", "block").end().siblings().find(".bookCur").css("display", "none");
        $(this).find("p").css("display", "none").end().siblings().find("p").css("display", "block");
        $(this).find("em").css("display", "none").end().siblings().find("em").css("display", "block");

    })

});


$(function () {

    $("#shoutui li").click(function () {
        var index = $(this).index();
        console.log(index);
        $(".tab-con1 .xinshu").eq(index).show().siblings().hide();

    })
});
$(function () {

    $("#wenxue li").click(function () {
        var index = $(this).index();
        console.log(index);
        $(".tab-con2 .xinshu").eq(index).fadeIn("fast").siblings().fadeOut("fast");
    })
});
$(function () {

    $(".HotNav li").click(function () {
        var index = $(this).index();
        console.log(index);
        $(".HotUL .RXbang").eq(index).show().siblings().hide();
    })
});
class Slider {
    constructor(id) {
        //轮播区域
        this.sliderBox = document.getElementById(id);
        //轮播区块
        this.sliderUl = this.sliderBox.children[0];
        this.sliderLi = this.sliderUl.children;
        //区块的个数以及单位宽
        this.len = this.sliderLi.length;
        this.perWidth = this.sliderLi[0].offsetWidth;
        //设置sliderUl的宽度
        this.sliderUl.style.width = this.len * this.perWidth + "px";

        //计数器
        this.count = 0;
        //定时器
        this.timer = null;

        //任何一个轮播实例都能自动播放
        this.autoPlay();

        this.clear();

    }
    //自动轮播的方法
    autoPlay() {
        this.timer = setInterval(() => {
            this.move();
        }, 3000);
    }
    //轮播
    move() {
        this.count++;

        if (this.count == this.len) {
            this.sliderUl.style.left = 0;
            this.count = 1;
        }

        if (this.count == -1) {
            this.sliderUl.style.left = -this.perWidth * (this.len - 1) + "px";
            this.count = this.len - 2;
        }

        if (this.nums) {
            for (let i = 0; i < this.nums.length; i++) {
                this.nums[i].className = "";
            }
            if (this.count == this.len - 1) {
                this.nums[0].className = "hover";
            } else {
                this.nums[this.count].className = "hover";
            }
        }


        startMove(this.sliderUl, {
            "left": -this.count * this.perWidth
        });
    }
    //添加箭头
    addArr() {
        let oDiv = document.createElement("div");
        oDiv.className = "arr";
        oDiv.innerHTML = "<span>&lt;</span><span>&gt</span>";
        this.sliderBox.appendChild(oDiv);
        let prev = oDiv.children[0]; //左箭头
        prev.onclick = () => {
            this.count -= 2;
            this.move();
        }

        let next = oDiv.children[1]; //右箭头
        next.onclick = () => {
            this.move();
        }
    }
    //添加小圆点
    addPoint() {
        let oUl = document.createElement("ul");
        oUl.className = "num";
        let str = "";
        for (let i = 0; i < this.len - 1; i++) {
            str += `<li>${i + 1}</li>`;
        }
        oUl.innerHTML = str;

        this.sliderBox.appendChild(oUl);
        this.nums = oUl.children;
        this.nums[0].className = "hover";

        for (let j = 0; j < this.nums.length; j++) {
            this.nums[j].onmouseover = () => {
                this.count = j - 1;
                this.move();
            }
        }

    }
    clear() {
        this.sliderBox.onmouseover = () => {
            clearInterval(this.timer);
        }
        this.sliderBox.onmouseout = () => {
            this.timer = setInterval(() => {
                this.move();
            }, 3000)
        }
    }

};

//domobj 要发生变化的那个DOM对象 targetData 要发生哪些变化 {"width":500,"height":500}
function startMove(domobj, targetData, fn) {
    clearInterval(domobj.timer);
    domobj.timer = setInterval(() => {
        let flag = true; //假设都达到了目标值
        for (let styleName in targetData) {
            if (styleName == "opacity") {
                var iCur = parseInt(getStyle(domobj, "opacity") * 100); //让透明度的值由0-1变成0-100
            } else {
                var iCur = parseInt(getStyle(domobj, styleName));
            }

            let iTar = targetData[styleName];
            let iSpeed = (iTar - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (styleName == "opacity") {
                domobj.style.opacity = (iCur + iSpeed) / 100;
                domobj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
            } else {
                domobj.style[styleName] = iCur + iSpeed + "px";
            }


            if (iCur != iTar) {
                flag = false; //只要有一个没有达到目标值
            }
        }
        if (flag) {
            clearInterval(domobj.timer);
            if (fn) {
                fn();
            }
        }

    }, 20)
};

function getStyle(domobj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(domobj, null)[attr];
    }
    return domobj.currentStyle[attr];
};
