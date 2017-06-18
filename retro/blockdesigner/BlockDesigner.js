//-------------------
// BlockDesigner.js
//--------------------
var ActivePen = "rgb(0, 0, 0)";
var MousePressed = false;
var Colors = new Array();
var Tool = 1;
var UndoStack = new Array();
var TextEntryMode = 0;

//Events
document.onkeyup = keyUpEvent;
document.onmouseup = function () {
    MousePressed = false;
}

//Colours
Colors[0] = 'rgb(0, 0, 0)';
Colors[1] = 'rgb(0, 255, 0 )';
Colors[2] = 'rgb(255, 255, 0)';
Colors[3] = 'rgb(0, 0, 255)';
Colors[4] = 'rgb(255, 0, 0)';
Colors[5] = 'rgb(255, 255, 255)';
Colors[6] = 'rgb(0, 255, 255)';
Colors[7] = 'rgb(255, 0, 255)';
Colors[8] = 'rgb(255, 165, 0)';

//Functions
function drawPenButtons() {
    document.write("&nbsp;");
    for (i = 0; i < 9; i++)
        document.write('<input type="button" value="" onclick="SetPen(' + i + ')" style="width:53px;background-color:' + Colors[i] + '">');
}

function setTool(id) {
    Tool = id + 1;
}

function keyUpEvent(evt) {

    if (TextEntryMode != 0) return;
    var key = evt.keyCode != 0 ? evt.keyCode : evt.charCode;
    console.log(key);

    switch (key) {
        case 67:
            clearBackground();
            break;

        case 49:
            SetPen(0);
            break;

        case 50:
            SetPen(1);
            break;

        case 51:
            SetPen(2);
            break;

        case 52:
            SetPen(3);
            break;

        case 53:
            SetPen(4);
            break;

        case 54:
            SetPen(5);
            break;

        case 55:
            SetPen(6);
            break;

        case 56:
            SetPen(7);
            break;

        case 57:
            SetPen(8);
            break;

        case 66:
            makeCode2();
            TextEntryMode = 1;
            tgv('Codebox');
            break;

        case 65:
            makeCode3();
            TextEntryMode = 1;
            tgv('Codebox');
            break;

        case 191:
            tgv('GUI_Help');
            break;
    }
}

function enterCell(cx, cy) {
    console.log('enter cell')
    var AT = ((cy * 32) + cx);
    document.getElementById("outWindow").innerHTML = "PRINT@" + AT + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>X</b>" + cx + " <b>Y</b>" + cy + MousePressed + Tool;

    if (MousePressed) {
        saveUndo();
        if (Tool == 1) {
            setCell(AT);
        }
        else if (Tool == 2) {
            var txt = gfv("UserText");
            //console.log(txt)
            for (i = 0; i < txt.length; i++) {
                document.getElementById(AT + i).innerHTML = "<div style='width:15px;height:20px;background-color:" + Colors[1] + ";'>" + txt[i].toUpperCase() + "</div>";
                //console.log(document.getElementById(AT+i).innerHTML)
                //console.log(document.getElementById(AT+i).firstChild.innerHTML)
            }
            MousePressed = false;
        }
    }
}
function setCell(cell) {
    console.log('set cell' + cell)
    TD = document.getElementById(cell);
    TD.innerHTML = "";
    TD.style.backgroundColor = ActivePen;
}
function grid() {
    for (y = 0; y < 16; y++) {
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            TD = document.getElementById(AT);
            if (TD.className.length == 0)
                TD.className = 'greyborder';
            else
                TD.className = '';
        }
    }
}
function saveUndo() {
    save = new Array();
    for (y = 0; y < 16; y++) {
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            TD = document.getElementById(AT);
            if (TD.firstChild != null) {
                save[AT] = TD.firstChild.innerHTML
                console.log('AT' + AT + ',' + save[AT])
            }
            else {
                save[AT] = TD.style.backgroundColor;
                //console.log('bcAT' + AT + ',' + save[AT])                
            }

        }
    }
    UndoStack[UndoStack.length] = save;
    console.log(UndoStack.length + ' UndoStack.length')
    console.log('----------------------------------------')
}
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
function performUndo() {
    if (UndoStack.length < 1) return;
    console.log('Restoring' + (UndoStack.length - 1))
    save = UndoStack[UndoStack.length - 1];
    for (y = 0; y < 16; y++) {
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            console.log(save[AT].length)
            cell = document.getElementById(AT);
            if (save[AT].length == 1) {
                cell.innerHTML = "<div style='width:15px;height:20px;background-color:" + Colors[1] + ";'>" + save[AT] + "</div>";
            }
            else {
                cell.innerHTML = "";
                cell.style.backgroundColor = save[AT];
            }

        }
    }

    UndoStack.remove(-1);

    console.log(UndoStack.length + 'UndoStack.length')
    console.log('----------------------------------------')
}

function makeCode() {
    var program = "";
    var lineno = 500;
    for (y = 0; y < 16; y++) {
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            TD = document.getElementById(AT);
            if (TD.style.backgroundColor == "rgb(0, 0, 0)") {
                program = program + "\r\n" + lineno + " POKE " + (1024 + AT) + "," + "128 : ";
                lineno = lineno + 10;
            }
        }
    }
    progstart = '10 CLEAR2000:CLS\r\n20 FOR T=1024 TO 1535\r\n30 READ A:POKE T,A\r\n"'
    progstart = progstart + '90 NEXT T\r\n100 A$=INKEY$:IFA$="" AND A$<>"-" THEN100\r\n999 END";'
    progend = "\r\n";
    document.getElementById('Output').value = progstart + program + progend;
}
function clearBackground() {
    if (confirmCLS()) {
        saveUndo();
        for (y = 0; y < 16; y++) {
            for (i = 0; i < 32; i++) {
                AT = ((y * 32) + i);
                TD = document.getElementById(AT);
                TD.style.backgroundColor = ActivePen;
                TD.innerHTML = "";
            }
        }
    }

}
function makeCode2() {
    var program = "";
    var asm = "";
    var lineno = 500;

    for (y = 0; y < 16; y++) {
        program = program + "\r\n" + lineno + " DATA "
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            TD = document.getElementById(AT);
            col = TD.style.backgroundColor;

            if (TD.firstChild != null) {
                console.log(TD.firstChild.innerHTML);
                console.log(TD.firstChild.innerHTML.charCodeAt(0));
                if (TD.firstChild.innerHTML.charCodeAt(0) == 32) {
                    program = program + "143"
                } else
                    program = program + TD.firstChild.innerHTML.charCodeAt(0);
            }
            else if (col == "rgb(0, 0, 0)") {
                program = program + "128"
            }
            else if (col == "rgb(0, 255, 0)") {
                program = program + "143"
            }
            else if (col == "rgb(255, 255, 0)") {
                program = program + "159"
            }
            else if (col == "rgb(0, 0, 255)") {
                program = program + "175"
            }
            else if (col == "rgb(255, 0, 0)") {
                program = program + "191"
            }
            else if (col == "rgb(255, 255, 255)") {
                program = program + "207"
            }
            else if (col == "rgb(0, 255, 255)") {
                program = program + "223"
            }
            else if (col == "rgb(255, 0, 255)") {
                program = program + "239"
            }
            else if (col == "rgb(255, 165, 0)") {
                program = program + "255"
            }
            if (i != 31) program = program + ","
        }

        lineno = lineno + 10;
        program = program

    }
    progstart = '10 CLEAR2000:CLS\r\n20 FOR T=1024 TO 1535\r\n30 READ A:POKE T,A\r\n';
    progstart = progstart + '90 NEXT T\r\n100 A$=INKEY$:IFA$="" OR A$="-" THEN100\r\n999 END';
    progend = "\r\n";
    document.getElementById('Output').value = progstart + program + progend;
}
function makeCode3() {
    var program = "";
    var lineno = 500;

    for (y = 0; y < 16; y++) {
        //program = program + "\r\n" + lineno + " DATA "
        for (i = 0; i < 32; i++) {
            AT = ((y * 32) + i);
            TD = document.getElementById(AT);
            col = TD.style.backgroundColor;

            if (TD.firstChild != null) {
                console.log(TD.firstChild.innerHTML);
                console.log(TD.firstChild.innerHTML.charCodeAt(0));
                if (TD.firstChild.innerHTML.charCodeAt(0) == 32) {
                    program = program + "      FCB $8F"
                } else
                    program = program + "      FCB " + TD.firstChild.innerHTML.charCodeAt(0);
            }
            else if (col == "rgb(0, 0, 0)") {
                program = program + "      FCB $80"
            }
            else if (col == "rgb(0, 255, 0)") {
                program = program + "      FCB $8F"
            }
            else if (col == "rgb(255, 255, 0)") {
                program = program + "      FCB $9F"
            }
            else if (col == "rgb(0, 0, 255)") {
                program = program + "      FCB $AF"
            }
            else if (col == "rgb(255, 0, 0)") {
                program = program + "      FCB $BF"
            }
            else if (col == "rgb(255, 255, 255)") {
                program = program + "      FCB $CF"
            }
            else if (col == "rgb(0, 255, 255)") {
                program = program + "      FCB $DF"
            }
            else if (col == "rgb(255, 0, 255)") {
                program = program + "      FCB $EF"
            }
            else if (col == "rgb(255, 165, 0)") {
                program = program + "      FCB $FF"
            }
            //if (i!=31) program = program + ","
            program = program + "\r\n"
        }

        //lineno = lineno + 10;
        program = "INTRO " + program.substring(6)

    }
    //progstart = '10 CLEAR2000:CLS\r\n20 FOR T=1024 TO 1535\r\n30 READ A:POKE T,A\r\n';
    //progstart = progstart + '90 NEXT T\r\n100 A$=INKEY$:IFA$="" OR A$="-" THEN100\r\n999 END';
    progstart = "* DRAGON32.COM\r\n      ORG $4E21\r\n      LDY #$0400\r\n      LEAX INTRO,PCR\r\n"
    progstart += "      LBSR OUTSTR\r\n      RTS\r\nOUTSTR  LDA ,X+\r\n		BEQ ENDSTR\r\n		STA ,Y+\r\n		BRA OUTSTR\r\n"
    progstart += "ENDSTR RTS\r\nOUTCH EQU $800C\r\n"
    progend = "      FCB 0\r\n";
    document.getElementById('Output').value = progstart + program + progend;
}
function SetPen(newcol) {
    MousePressed = false;
    ActivePen = Colors[newcol];
    gbi("curcolor").style.backgroundColor = Colors[newcol];
}
function Template() {
    var outputTemplate = "";
    outputTemplate += "<div id=\"GUI_Help\" class=\"Suite_Help Dropshadow\">";
    outputTemplate += "<\/div>";
    return outputTemplate;
}
function RenderHelpDiv() {
    var helpCard = "";
    helpCard += "<b>Dragon Text Screen Designer<\/b>";
    helpCard += "<p>";
    helpCard += "<table>";
    helpCard += "<tr><td>1-9<\/td><td>Select Colour<\/td><\/tr>";
    helpCard += "<tr><td>a<\/td><td>Generate Assembly Code<\/td><\/tr>";
    helpCard += "<tr><td>b<\/td><td>Generate Basic Code<\/td><\/tr>";
    helpCard += "<tr><td>c<\/td><td>CLS<\/td><\/tr>";
    helpCard += "<tr><td>?<\/td><td>Show Help Screen<\/td><\/tr>";
    helpCard += "<\/table>";
    helpCard += "<\/p>";
    return helpCard;
}
function confirmCLS() {
    return confirm("Do you really want to clear the screen?")
}
