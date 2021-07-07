(function(){
    var video = document.getElementById("videoPlayer");
    var player = dashjs.MediaPlayer().create();
    player.initialize(video, video.getAttribute('src'), true);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var url = window.URL || window.webkitURL;
            video.src = url.createObjectURL(this.response);
        }
    }
    xhr.open('GET', video.getAttribute('data-src'));
    xhr.responseType = 'blob';
    xhr.send();
})();