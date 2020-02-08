function showTime() {
    let date = new Date();
    let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    document.getElementById("time").innerHTML = "Время " + hours + ':' + minutes + ':' + seconds;
}
setInterval(showTime,6000);
