(function ($) {
    var logo = $(".header");
    logo.click(function () {
        window.location.href = "../html/index.html";
    });
    var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号码的正则表达式
    $("#OK").click(function () {
        if (GetDom()) {
            let name = $("#name").val();
            let phone = $("#phone").val();
            let passWord = $("#mima").val();
            let repassWord = $("#YZmima").val();
            if (!regtel.test(phone)) {
                alert("请输入正确的手机号！");
                $("#phone").val("");
                $("#SRYZM").val("");
                createCode();
            }
            else if (passWord == "") {
                alert("请输入密码！")
            } else if (passWord != repassWord) {
                alert("两次输入的密码不一致，请重新输入！");

            } else {
                $.ajax({
                    url: "http://localhost:3000/users",
                    type: "post",
                    data: {
                        "name": name,
                        "password": passWord,
                        "phone": phone,
                        "address": "河南省郑州市",
                        "level": 1
                    },
                    success: function () {
                        alert("注册成功，请登录！");
                        window.location.href = "../html/login.html";
                    },
                    error: function () {
                        alert("注册失败！");
                    },

                });

            }
        } else {
            alert("注册失败！")
        }
    });
})(jQuery);