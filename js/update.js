(function ($) {
    $("#OK").click(function () {
        if (GetDom()) {
            let oldPassWord = $("#oldMima").val();
            let newPassWord = $("#newMima").val();
            let renewpassWord = $("#YZnewMima").val();
            let ID = 1;

            if (oldPassWord == "" || newPassWord == "" || renewpassWord == "") {
                alert("请正确输入密码！");
            } else if (newPassWord != renewpassWord) {
                alert("两次输入的密码不一致，请重新输入！");
                $("#newMima").val("");
                $("#YZnewMima").val("");

            } else {
                $.ajax({
                    url: "http://localhost:3000/users",
                    type: "get",
                    success: function (res) {
                        // res = JSON.parse(res);
                        let len = res.length;
                        for (let i = 0; i < len; i++) {

                            if (res[i].id == ID) {
                                let curMima = res[i].password;
                                let curPhone = res[i].phone;
                                let curLevel = res[i].level;
                                let curAddress = res[i].address;
                                let curName = res[i].uname;
                                if (curMima != oldPassWord) {
                                    console.log(curMima, oldPassWord);
                                    alert("当前密码输入错误！");
                                    return;
                                } else {
                                    axios.put("http://localhost:3000/users/1", {
                                        uname: curName,
                                        phone: curPhone,
                                        address: curAddress,
                                        level: curLevel,
                                        password: newPassWord
                                    })
                                        .then(function () {
                                            alert("修改成功，请重新登录！");
                                            window.location.href = "../html/login.html";
                                        })
                                        .catch(function () {
                                            alert("修改失败！");
                                        });

                                }


                            }
                        }
                        // if (res.password == oldPassWord) {
                        //     $.ajax({
                        //         url: "http://localhost:3000/users/2",
                        //         type: "post",
                        //         data: {
                        //             "password": newPassWord
                        //         },
                        //         success: function () {
                        //             alert("修改成功，请重新登录！");
                        //             window.location.href = "../html/login.html";
                        //         },
                        //         error: function () {
                        //             alert("修改失败！");
                        //         }

                        //     });
                        // }
                    }
                });

                // axios.get("http://localhost:3000/users", {
                //     params: {
                //         id: 1
                //     }
                // }).then(res => {
                //     console.log(res);
                //     console.log(res.password);

                //     let curMima = res.password;
                //     let curPhone = res.phone;
                //     let curLevel = res.level;
                //     let curAddress = res.address;
                //     let curName = res.uname;
                //     if (curMima != oldPassWord) {
                //         console.log(curMima, oldPassWord);
                //         alert("当前密码输入错误！");
                //         return;
                //     } else {
                //         axios.put("http://localhost:3000/users/1", {
                //             uname: curName,
                //             phone: curPhone,
                //             address: curAddress,
                //             level: curLevel,
                //             password: newPassWord
                //         })
                //             .then(function () {
                //                 alert("修改成功，请重新登录！");
                //                 window.location.href = "../html/login.html";
                //             })
                //             .catch(function () {
                //                 alert("修改失败！");
                //             });

                //     }

                // });

            }

        } else {
            alert("提交失败！");
        }


    });

})(jQuery);