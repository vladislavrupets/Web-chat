function addLeadingZero(element) {
    return (element < 10) ? '0' + element : element;
}

module.exports = function getUserDate(unixDate) {
    let Y = unixDate.getFullYear();
    let M = addLeadingZero(unixDate.getMonth() + 1);
    let D = addLeadingZero(unixDate.getDate());
    let h = addLeadingZero(unixDate.getHours());
    let m = addLeadingZero(unixDate.getMinutes());
    return `${Y}.${M}.${D} ${h}:${m}`
}