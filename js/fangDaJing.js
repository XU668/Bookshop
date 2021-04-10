
function Zoom() {
    this.zoomBox = document.getElementById("zoomBox");
    this.midArea = document.getElementById("midArea");
    this.midImg = this.midArea.children[0];
    this.zoom = document.getElementById("zoom");
    this.bigArea = document.getElementById("bigArea");
    this.bigImg = this.bigArea.children[0];

    this.midArea.onmouseover = () => {
        this.zoom.style.display = "block";
        this.bigArea.style.display = "block";
    }
    this.midArea.onmouseout = () => {
        this.zoom.style.display = "none";
        this.bigArea.style.display = "none";
    }
    this.midArea.onmousemove = (e) => {
        let evt = e || event;
        let mw = this.midArea.offsetWidth - this.zoom.offsetWidth;
        let mh = this.midArea.offsetHeight - this.zoom.offsetHeight;
        //let l = evt.offsetX - this.zoom.offsetWidth / 2;
        //let t = evt.offsetY - this.zoom.offsetHeight / 2;
        let l = evt.pageX - this.zoomBox.offsetLeft - this.zoom.offsetWidth / 2;
        let t = evt.pageY - this.zoomBox.offsetTop - this.zoom.offsetHeight / 2;

        l = l <= 0 ? 0 : l >= mw ? mw : l;
        t = t <= 0 ? 0 : t >= mh ? mh : t;

        console.log(mw, mh);

        this.zoom.style.left = l + "px";
        this.zoom.style.top = t + "px";


        this.bigImg.style.left = -this.zoom.offsetLeft / this.midArea.offsetWidth * this.bigImg
            .offsetWidth + "px";
        this.bigImg.style.top = -this.zoom.offsetTop / this.midArea.offsetHeight * this.bigImg
            .offsetHeight + "px";

    }
}
new Zoom();
/* function Zoom() {
    this.zoomBox = document.getElementById("zoomBox");
    this.midArea = document.getElementById("midArea");
    this.midImg = this.midArea.children[0];
    this.zoom = document.getElementById("zoom");
    this.bigArea = document.getElementById("bigArea");
    this.bigImg = this.bigArea.children[0];

    this.midArea.onmouseover = () => {
        this.zoom.style.display = "block";
        this.bigArea.style.display = "block";
    }
    this.midArea.onmouseout = () => {
        this.zoom.style.display = "none";
        this.bigArea.style.display = "none";
    }
    this.midArea.onmousemove = (e) => {
        let evt = e || event;
        let mw = this.midArea.offsetWidth - this.zoom.offsetWidth;
        let mh = this.midArea.offsetHeight - this.zoom.offsetHeight;
        //let l = evt.offsetX - this.zoom.offsetWidth / 2;
        //let t = evt.offsetY - this.zoom.offsetHeight / 2;
        let l = evt.pageX - this.zoomBox.offsetLeft - this.zoom.offsetWidth / 2;
        let t = evt.pageY - this.zoomBox.offsetTop - this.zoom.offsetHeight / 2;

        l = l <= 0 ? 0 : l >= mw ? mw : l;
        t = t <= 0 ? 0 : t >= mh ? mh : t;

        console.log(mw, mh);

        this.zoom.style.left = l + "px";
        this.zoom.style.top = t + "px";


        this.bigImg.style.left = -this.zoom.offsetLeft / this.midArea.offsetWidth * this.bigImg
            .offsetWidth + "px";
        this.bigImg.style.top = -this.zoom.offsetTop / this.midArea.offsetHeight * this.bigImg
            .offsetHeight + "px";

    }
}
new Zoom(); */