let xhr = new XMLHttpRequest()
xhr.open('GET', '/api/video', true)
xhr.responseType = 'blob'
xhr.onload = function (e) {
    if (this.status === 200) {
        // 获取blob对象
        let blob = this.response
        console.log(blob)
        // 获取blob对象地址，并把值赋给容器
        document.getElementById("video").setAttribute("src",URL.createObjectURL(blob));
    }
}
xhr.send()