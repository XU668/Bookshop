
function ajax(obj) {
    var str = "";
    for (var key in obj.data) {
        str += `${key}=${obj.data[key]}&`;
    }
    str = str.replace(/&$/, "");

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    if (obj.type.toLowerCase() == "get") { //避免调用这个函数时，传的参数出现大小写问题
        if (str == "") {
            xhr.open("get", obj.url);
        } else {
            xhr.open("get", obj.url + "?" + str);
        }

        xhr.send();
    }
    if (obj.type.toLowerCase() == "post") {
        xhr.open("post", obj.url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(str);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
                obj.success(data);
            }
        }
    }
}