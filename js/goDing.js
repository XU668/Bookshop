var btn = document.getElementsByClassName("last")[0];
let timer;
btn.onclick = function () {
    startMover();
}
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