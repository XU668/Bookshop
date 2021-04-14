createCode();
var code;
function createCode() {  //函数体
    code = "";
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");

    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * codeChars.length);//设置随机产生
        code += codeChars[charNum];

    }
    if (checkCode) {
        checkCode.innerText = code;
    }
}
function GetDom() {
    let str = document.getElementById("SRYZM").value;
    if (str == "") {
        alert("验证码不能为空！");
        createCode();//输错一次或提交一次都将会刷新一次验证码
        return false; //结束本次会话
    } else if (str.toLowerCase() != code.toLowerCase()) { //toUpperCase不区分大小写,不知道为啥不能用touppercase()方法
        alert("您输入的验证码有误，请重新输入！！");
        createCode();//读取文件
        document.getElementById("SRYZM").value = "";
    }
    else {
        return 1;
    }


}