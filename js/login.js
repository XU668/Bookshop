(function ($) {
    $("#OK").click(function () {
        if (GetDom()) {
            let phone = $("#phone").val();
            let pWord = $("#mima").val();
            if (phone == "" || pWord == "") {
                alert("请输入完整的信息！");
            } else {
                ajax({
                    url: "http://localhost:3000/users",
                    type: "get",
                    success: function (res) {
                        res = JSON.parse(res);
                        let len = res.length;
                        console.log(len);
                        for (let i = 0; i < len; i++) {

                            if (phone == res[i].phone) {
                                if (res[i].password == pWord) {
                                    window.location.href = "../html/index.html";
                                } else {
                                    alert("密码错误！");
                                    return;
                                }

                            }
                        }
                        return;
                    }
                });
            }

        } else {
            alert("登录失败！");
            return;
        }
    });
})(jQuery);