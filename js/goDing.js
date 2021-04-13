var btn = document.getElementsByClassName("last")[0];
let timer1;
btn.onclick = function () {
    startMover();
}
function startMover() {

    clearInterval(timer1);
    timer1 = setInterval(function () {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = st / 8;
        ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
        if (st == 0) {
            clearInterval(timer1);
        }
        else {
            document.documentElement.scrollTop = document.body.scrollTop = st - ispeed;

        }
    }, 20);
};