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

}