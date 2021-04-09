
function tab(id) {//id 选项卡外框ID ，aEve按钮发生的事件
    var oBox = document.getElementById(id);
    //获取各个元素
    var aBtn = oBox.getElementsByTagName('li');
    var aCont = oBox.getElementsByClassName('xinshu');


    for (var i = 0; i < aBtn.length; i++) {
        //aBtn[i].index = i; //为每个按钮自定义属性，该属性存放每个按钮的下标
        aBtn[i].onclick = function () {
            for (var j = 0; j < aBtn.length; j++) {
                //aBtn[i].className = '';//清空所有按钮选中样式
                //aCont[j].className = '';//清空所有内容样式
                //aCont[j].style.display = "none";
                if (j != i) {
                    aCont[j].classList.remove('on');
                }

            }
            //this.className = 'active';//为当前按钮添加选中样式
            //aCont[this.index].classList.add('on');//this.index对应当前按钮的下标  为当前所对应的内容添加显示样式
            //aCont[i].classList.add('on');
            //aCont[i].style.display = "block";
        }
    }
}
window.onload = function () {//网页加载结束后执行
    tab('xxk1');//调用函数
    //tab('xxk1', 'onmousemove');
}