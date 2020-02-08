var lines = new Path2D();
lines.moveTo(175, 348);
lines.lineTo(175, 2);
lines.moveTo(2, 175);
lines.lineTo(348, 175);

var yTriangle = new Path2D();
yTriangle.moveTo(175, 11);
yTriangle.lineTo(168, 11);
yTriangle.lineTo(175, 1);
yTriangle.lineTo(182, 11);
yTriangle.lineTo(175, 11);

var xTriangle = new Path2D();
xTriangle.moveTo(339, 175);
xTriangle.lineTo(339, 168);
xTriangle.lineTo(349, 175);
xTriangle.lineTo(339, 182);
xTriangle.lineTo(339, 175);

var xLines = new Path2D();
xLines.moveTo(144, 172);
xLines.lineTo(144, 178);
xLines.moveTo(113, 172);
xLines.lineTo(113, 178);
xLines.moveTo(82, 172);
xLines.lineTo(82, 178);
xLines.moveTo(51, 172);
xLines.lineTo(51, 178);
xLines.moveTo(20, 172);
xLines.lineTo(20, 178);
xLines.moveTo(206, 172);
xLines.lineTo(206, 178);
xLines.moveTo(237, 172);
xLines.lineTo(237, 178);
xLines.moveTo(268, 172);
xLines.lineTo(268, 178);
xLines.moveTo(299, 172);
xLines.lineTo(299, 178);
xLines.moveTo(330, 172);
xLines.lineTo(330, 178);

var yLines = new Path2D();
yLines.moveTo(172, 206);
yLines.lineTo(178, 206);
yLines.moveTo(172, 237);
yLines.lineTo(178, 237);
yLines.moveTo(172, 268);
yLines.lineTo(178, 268);
yLines.moveTo(172, 299);
yLines.lineTo(178, 299);
yLines.moveTo(172, 330);
yLines.lineTo(178, 330);
yLines.moveTo(172, 144);
yLines.lineTo(178, 144);
yLines.moveTo(172, 113);
yLines.lineTo(178, 113);
yLines.moveTo(172, 82);
yLines.lineTo(178, 82);
yLines.moveTo(172, 51);
yLines.lineTo(178, 51);
yLines.moveTo(172, 20);
yLines.lineTo(178, 20);

function drawCoord() {
    let canvas = document.getElementById("canvas");
    let drawing = canvas.getContext("2d");

    drawing.strokeStyle = "white";
    drawing.fillStyle = "white";
    drawing.font = "12px cursive";
    //lines
    drawing.stroke(lines);

    //Y triangle
    drawing.fill(yTriangle);
    drawing.fillText("Y", 184, 14);

    //X triangle
    drawing.fill(xTriangle);
    drawing.fillText("X", 339, 165);

    //X lines
    drawing.stroke(xLines);
    drawing.fillText("1", 203, 169);

    //Y lines
    drawing.stroke(yLines);
    drawing.fillText("1", 180, 148);
}

function drawFigure() {
    let canvas = document.getElementById("canvas");
    let drawing = canvas.getContext("2d");
    let R = ice.ace.instance('R').getValue() / 100;
    drawing.strokeStyle = "#EC1947";
    drawing.fillStyle = "#EC1947";

    drawing.clearRect(0, 0, canvas.width, canvas.height);

    drawing.beginPath();
    drawing.fillRect(175, 175 - R * 31, 31 * R, 31 * R);
    drawing.fill();
    drawing.moveTo(175, 175);
    drawing.lineTo(175 - R * 31 / 2, 175);
    drawing.lineTo(175, 175 - R * 31 / 2);
    drawing.lineTo(175, 175);
    drawing.fill();
    drawing.arc(175, 175, R * 31, 0, Math.PI / 2);
    drawing.fill();

    drawCoord();


}

function sendRequest(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let R = ice.ace.instance('R').getValue();
    let realX = ((x - 175) / 31).toFixed(2);
    let realY = (-(y - 175) / 31).toFixed(2);
    document.getElementById("hiddenX").value = realX;
    document.getElementById("hiddenY").value = realY;
    document.getElementById("hiddenR").value = R;
    submit();
}

function clearPoints() {
    let canvas = document.getElementById("canvas");
    let drawing = canvas.getContext("2d");
    drawing.clearRect(0, 0, canvas.width, canvas.height);
    drawCoord();
    drawFigure();
}

function drawPoint(x, y, color) {
    let canvas;
    if (window === window.top) {
        canvas = document.getElementById("canvas");
    } else canvas = window.top.document.getElementById("canvas");
    let drawing = canvas.getContext("2d");
    drawing.fillStyle = color;
    drawing.beginPath();
    drawing.moveTo(x, y);
    drawing.arc(x, y, 2, -Math.PI, Math.PI);
    drawing.fill();
}

function handler(data) {
    switch (data.status) {
        case "begin": // До отправления запроса
            break;

        case "complete": // Поле получения ответа на запрос
            break;

        case "success": // После применения обновлений запроса
        {
            let x = document.querySelectorAll(".answerTable :last-child :last-child :nth-last-child(4)")[0].innerText.trim();
            x = x * 31 + 175;
            let y = document.querySelectorAll(".answerTable :last-child :last-child :nth-last-child(3)")[0].innerText.trim();
            y = -y * 31 + 175;
            let result = document.querySelectorAll(".answerTable :last-child :last-child :last-child :last-child")[0].innerText;
            // console.log(x);
            // console.log(y);
            // console.log(r);
            // console.log(result);
            if (result === "Входит") {
                drawPoint(x, y, "#32CD32");
            } else if (result.trim() === "Не входит") {
                drawPoint(x, y, "#1e51a4");
            }

        }
            break;
    }
}

function redrawPoints() {
    drawFigure();
    let R = ice.ace.instance('R').getValue() / 100;
    let table = document.querySelectorAll(".answerTable td");
    for (let i = 0; i < table.length; i = i + 4) {
        let x = table.item(i).innerText;
        let y = table.item(i + 1).innerText;
        let result = checkArea(x, y, R);
        let draw;
        draw = x.toString().trim() !== "";
        x = x * 31 + 175;
        y = -y * 31 + 175;
        if (draw)
            if (result)
                drawPoint(x, y, "#32CD32");
            else
                drawPoint(x, y, "#1e51a4");


    }
}

function checkArea(x, y, r) {
    let result;
    if (x <= 0 && y >= 0 && y <= Number(x) + Number(r / 2)) result = true;
    else if (x >= 0 && y >= 0 && x <= r && y <= r) result = true;
    else result = x >= 0 && y <= 0 && y >= -Math.sqrt(r * r - x * x);
    return result;
}

function afterDownload(data) {
    switch (data.status) {
        case "begin": // До отправления запроса
            break;

        case "complete": // Поле получения ответа на запрос
            break;

        case "success": // После применения обновлений запроса
        {
            redrawPoints();

        }
            break;
    }
}
