//재정의 ?
Date.prototype.toString = function () {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = this.getDate();
    date = date < 10 ? '0' + date : date;
    return year + '-' + month + '-' + date;
};

Date.prototype.toDateTime = function () {
    var hour = this.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = this.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = this.getSeconds();
    second = second < 10 ? '0' + second : second;
    return this.toString() + ' ' + hour + ':' + minute + ':' + second;
};

function parseTime(regDate) {
    var now = new Date();
    
    var dateDiff = now.getDate() - regDate.getDate();
    var hourDiff = now.getHours() - regDate.getHours();
    var minuteDiff = now.getMinutes() - regDate.getMinutes();

    var year = regDate.getFullYear() < now.getFullYear();
    var month  = regDate.getMonth() + 1 < now.getMonth() + 1;
    var date = regDate.getDate() > 28;
    var hour = now.getMinutes() >= regDate.getMinutes() ? hourDiff : hourDiff - 1;
    var minute = now.getMinutes() >= regDate.getMinutes() ? minuteDiff : minuteDiff - 1;
    var second = now.getSeconds() - regDate.getSeconds();

    if(year || month || date) {
        return regDate.toString();
    } else if(dateDiff > 0) {
        return dateDiff + "일 전";
    } else if(hourDiff > 0) {
        return hour + "시간 전";
    } else if(minuteDiff > 0){
        return minute + "분 전";
    } else {
        return second + "초 전";
    }

}
