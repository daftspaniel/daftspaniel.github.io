// HTML Helper
function gfv(id) {
    return document.getElementById(id).value;
}
function gbi(id) {
    return document.getElementById(id);
}
function sfv(id, value) {
    document.getElementById(id).value = value;
}
function sfvi(id) {
    document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
}
function sfvd(id) {
    document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1;
}
function ihu(id, content) {
    document.getElementById(id).innerHTML = content;
}
function tgv(id) {
    var e = document.getElementById(id);
    if (e.style.visibility == 'visible')
        e.style.visibility = 'hidden';
    else
        e.style.visibility = 'visible';
}
function show(id) {
    var e = document.getElementById(id);
    e.style.visibility = 'visible';
}
function hide(id) {
    var e = document.getElementById(id);
    e.style.visibility = 'hidden';
}
