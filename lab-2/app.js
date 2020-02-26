(function() {
    var inps = document.getElementsByClassName("inp-time");
    var countup = document.getElementById("countup");
    var countdown = document.getElementById("countdown");
    var resume = document.getElementById("resume");
    var pause = document.getElementById("pause");
    var clear = document.getElementById("clear");
    var restart = document.getElementById("restart");
    var hint = document.getElementById("hint");
    var time = document.getElementById("time");

    // 同步当前状态
    var state;
    const BEFORESTART = 0;
    const PAUSING = 1;
    const TIMING = 2;
    const ENDTIMING = 3;

    // 同步记时方向
    const UP = 0;
    const DOWN = 1;
    var dir;

    // 同步初始记时时间
    var initTime = "00:00:00";

    // 同步当前记时时间
    var curTime = "00:00:00";

    // 计时器相关
    var mSecond = 0;
    var timer;
    var interval = 5;

    // onclick 事件绑定函数
    countup.onclick = function() {
        dir = UP;
        if (checkParameterAndSetVar()) {
            timer = window.setInterval(timeHandler, interval);
            timing();
        }
    }
    countdown.onclick = function() {
        dir = DOWN;
        if (checkParameterAndSetVar()) {
            timer = window.setInterval(timeHandler, interval);
            timing();
        }
    }
    resume.onclick = function() {
        timer = window.setInterval(timeHandler, interval);
        timing();
    }
    pause.onclick = function() {
        window.clearInterval(timer);
        pausing();
    }
    clear.onclick = function() {
        mSecond = 0;
        window.clearInterval(timer);
        curTime = "00:00:00";
        initTime = "00:00:00";
        beforeStart();
    }
    restart.onclick = function() {
        mSecond = 0;
        curTime = (dir == UP) ? "00:00:00" : initTime;
        window.clearInterval(timer);
        timer = window.setInterval(timeHandler, interval);
        timing();
    }

    // 键盘控制
    document.onkeydown = function(event) {
        event = event || window.event;
        var code = event.keyCode;
        if (state == BEFORESTART && code == 13) {
            countup.click();
        }
        else if (state == TIMING && code == 32) {
            pause.click();
        }
        else if (state == PAUSING && code == 32) {
            resume.click();
        }
    }

    // 默认进入开始模式
    beforeStart();

    // 4个状态定义

    // finished
    function beforeStart() {
        state = BEFORESTART;
        // 设置显示项
        for (var i = 0; i<inps.length; ++i) {
            inps[i].style.display = "inline-block";
        }
        countup.style.display = "inline";
        countdown.style.display = "inline";
        resume.style.display = "none";
        pause.style.display = "none";
        clear.style.display = "none";
        restart.style.display = "none";
        hint.style.display = "none";
        
        time.innerText = curTime;
    }

    // finished
    function pausing() {
        state = PAUSING;
        // 设置显示项
        for (var i = 0; i<inps.length; ++i) {
            inps[i].style.display = "none";
        }
        countup.style.display = "none";
        countdown.style.display = "none";
        resume.style.display = "inline-block";
        pause.style.display = "none";
        clear.style.display = "inline-block";
        restart.style.display = "inline-block";
        hint.style.display = "inline-block";

        // 设置文本
        time.innerText = curTime;
        if (dir == UP) {
            hint.innerText = "暂停正计时 " + initTime;
        }
        else {
            hint.innerText = "暂停倒计时 " + initTime;
        }

    }

    // fininsed
    function timing() {
        state = TIMING;
        // 设置显示项
        for (var i = 0; i<inps.length; ++i) {
            inps[i].style.display = "none";
        }
        countup.style.display = "none";
        countdown.style.display = "none";
        resume.style.display = "none";
        pause.style.display = "inline-block";
        clear.style.display = "inline-block";
        restart.style.display = "inline-block";
        hint.style.display = "inline-block";

        // 设置文本
        time.innerText = curTime;
        if (dir == UP) {
            hint.innerText = "正在正计时 " + initTime;
            clear.innerText = "清空正计时";
        }
        else {
            hint.innerText = "正在倒计时 " + initTime;
            clear.innerText = "清空倒计时";
        }
    }

    // finished
    function endTiming() {
        state = ENDTIMING;
        // 设置显示项
        for (var i = 0; i<inps.length; ++i) {
            inps[i].style.display = "none";
        }
        countup.style.display = "none";
        countdown.style.display = "none";
        resume.style.display = "none";
        pause.style.display = "none";
        clear.style.display = "inline-block";
        restart.style.display = "inline-block";
        hint.style.display = "inline-block";

        // 设置显示项，同步全局变量
        time.innerText = curTime;
        if (dir == UP) {
            hint.innerText = "正计时 " + initTime + " 已结束";
        }
        else {
            hint.innerText = "倒计时 " + initTime + " 已结束";
        }
    }

    // finished
    function checkParameterAndSetVar() {
        var hour = document.getElementById("hour").value;
        var minute = document.getElementById("minute").value;
        var second = document.getElementById("second").value;
        if (hour == "" || minute == "" || second == "" || 
        parseInt(hour)<0 || parseInt(minute)<0 || parseInt(second)<0 ||
        (parseInt(hour)==0 && parseInt(minute)==0 && parseInt(second)==0) || 
        hour.indexOf('.')!=-1 || minute.indexOf('.')!=-1 || second.indexOf('.')!=-1 || 
        hour.indexOf('e')!=-1 || minute.indexOf('e')!=-1 || second.indexOf('e')!=-1 ||
        hour.indexOf('E')!=-1 || minute.indexOf('E')!=-1 || second.indexOf('E')!=-1) {
            document.getElementById("hour").value = "0";
            document.getElementById("minute").value = "0";
            document.getElementById("second").value = "0";
            alert("参数不合法");
            return false;
        }
        else if (parseInt(hour)>99 || parseInt(minute)>59 || parseInt(second)>59) {
            hour = (parseInt(hour)>99) ? "99" : hour;
            minute = (parseInt(minute)>99) ? "59" : minute;
            second = (parseInt(second)>99) ? "59" : second;
            hour = (hour.length == 1) ? "0"+hour : hour;
            minute = (minute.length == 1) ? "0"+minute : minute;
            second = (second.length == 1) ? "0"+second : second;
            initTime = hour + ":" + minute + ":" + second;
            curTime = (dir == UP) ? "00:00:00" : initTime;
            return true;
        }
        else {
            hour = (hour.length == 1) ? "0"+hour : hour;
            minute = (minute.length == 1) ? "0"+minute : minute;
            second = (second.length == 1) ? "0"+second : second;
            initTime = hour + ":" + minute + ":" + second;
            curTime = (dir == UP) ? "00:00:00" : initTime;
            mSecond = 0;
            return true;
        }
    }
    
    // finished
    function timeHandler() {
        if (mSecond > 999) {
            mSecond = 0;
            var hour = parseInt(curTime.split(":")[0]);
            var minute = parseInt(curTime.split(":")[1]);
            var second = parseInt(curTime.split(":")[2]);
            if (dir == UP) {
                var scarry = (second == 59);
                second = scarry ? ("00") : (second < 9 ? "0" + (second+1).toString() : (second+1).toString());
                var mcarry = (scarry && (minute == 59));
                minute = scarry ? (mcarry ? ("00") : (minute < 9 ? "0" + (minute+1).toString() : (minute+1).toString())) : 
                    (minute < 10 ? "0"+minute.toString() : minute.toString());
                hour = mcarry ? (hour+1) : hour;
                hour = hour < 10 ? ("0"+hour.toString()) : (hour.toString());
            }
            else {
                var scarry = (second == 0);
                second = scarry ? ("59") : (second < 11 ? "0" + (second-1).toString() : (second-1).toString());
                var mcarry = (scarry && (minute == 0));
                minute = scarry ? (mcarry ? ("59") : (minute < 11 ? "0"+(minute-1).toString() : (minute-1).toString())) : 
                    (minute < 10 ? "0"+minute.toString() : minute.toString());
                hour = mcarry ? hour-1 : hour;
                hour = hour < 10 ? ("0"+hour.toString()) : (hour.toString());
            }
            curTime = hour + ":" + minute + ":" + second;

            if (dir == UP) {
                if (curTime == initTime) {
                    endTiming();
                    window.clearInterval(timer);
                }
                else {
                    timing();
                }
            }
            else {
                if (curTime == "00:00:00") {
                    endTiming();
                    window.clearInterval(timer);
                }
                else {
                    timing();
                }
            }
        }
        else {
            mSecond += interval;
        }

    }

})();
