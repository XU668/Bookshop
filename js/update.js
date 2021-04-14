(function ($) {
    $("#OK").click(function () {
        if (GetDom()) {
            let oldPassWord = $("#oldMima").val();
            let newPassWord = $("#newMima").val();
            let renewpassWord = $("#YZnewMima").val();

            if (oldPassWord == "" || newPassWord == "" || renewpassWord == "") {
                alert("请输入正确密码！")
            } else if (newPassWord != renewpassWord) {
                alert("两次输入的密码不一致，请重新输入！");
                $("#newMima").val("");
                $("#YZnewMima").val("");

            } else {
                $.ajax({
                    url: "http://localhost:3000/users/2",
                    type: "get",
                    success: function (res) {
                        res = JSON.parse(res);
                        if (res.password == oldPassWord) {
                            $.ajax({
                                url: "http://localhost:3000/users/2",
                                type: "post",
                                data: {
                                    "password": newPassWord
                                },
                                success: function () {
                                    alert("修改成功，请重新登录！");
                                    window.location.href = "../html/login.html";
                                },
                                error: function () {
                                    alert("修改失败！");
                                }

                            });
                            // axios.post('http://localhost:3000/users/2', {

                            //     password: newPassWord
                            // })
                            //     .then(function () {
                            //         alert("修改成功，请重新登录！");
                            //         window.location.href = "../html/login.html";
                            //     })
                            //     .catch(function () {
                            //         alert("修改失败！");
                            //  });

                        }

                    },
                    error: function () {
                        alert("修改失败！");
                    },

                });

            }
        } else {
            alert("提交失败！")
        }
    });
})(jQuery);