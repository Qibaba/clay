/*!
*
* quickES - Help quickly use ES.
* https://github.com/yelloxing/quickES
* 
* author 心叶
*
* version 1.0.0
* 
* build 2018/07/29
*
* Copyright yelloxing
* Released under the MIT license
* 
**************************************************************
* 
*【内容】
*
* 1.不同浏览器兼容的常用方法
*
* 2.常用的自定义方法
*
* 【说明】
*
* 兼容不同浏览器的接口，提供常用的辅助方法，只是针对常用的，目标是轻量级。
*
* 【打包文件】
* (0)./src/core.js
* (1)./src/config.js
* (2)./src/animation.js
*
*/
(function (global, factory, undefined) {

    'use strict';

    if (global && global.document) {

        // 如果是浏览器环境
        factory(global);

    } else if (typeof module === "object" && typeof module.exports === "object") {

        // 如果是node.js环境
        module.exports = factory(global, true);

    } else {
        throw new Error("Unexcepted Error!");
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    'use strict';

    // 定义挂载对象
    var quickES = {
        "author": "心叶",
        "email": "yelloxing@gmail.com"
    };

    // 如果全局有重名，可以调用恢复
    var _quickES = window.quickES,
        _$$ = window.$$;
    quickES.noConflict = function (flag) {
        if (window.$$ === quickES) {
            window.$$ = _$$;
        }
        if (flag && window.quickES === quickES) {
            window.quickES = _quickES;
        }
        return quickES;
    };

    // 挂载到全局
    window.quickES = window.$$ = quickES;

    return quickES;

});
(function (window, undefined) {

    'use strict';

    // 标签命名空间
    window.quickES.namespace = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

    var clock = {
        //当前正在运动的动画的tick函数堆栈
        timers: [],
        //唯一定时器的定时间隔
        interval: 13,
        //指定了动画时长duration默认值
        speeds: 400,
        //定时器ID
        timerId: null
    };

    // 提供间隔执行方法
    window.quickES.animation = function (doback, duration, callback) {
        clock.timer(function (deep) {
            //其中deep为0-100，单位%，表示改变的程度
            doback(deep);
        }, duration, callback);
    };

    //把tick函数推入堆栈
    clock.timer = function (tick, duration, callback) {
        if (!tick) {
            throw new Error('tick is required!');
        }
        duration = duration || clock.speeds;
        clock.timers.push({
            "createTime": new Date(),
            "tick": tick,
            "duration": duration,
            "callback": callback
        });
        clock.start();
    };

    //开启唯一的定时器timerId
    clock.start = function () {
        if (!clock.timerId) {
            clock.timerId = setInterval(clock.tick, clock.interval);
        }
    };

    //被定时器调用，遍历timers堆栈
    clock.tick = function () {
        var createTime, flag, tick, callback, timer, duration, passTime, needStop, deep,
            timers = clock.timers;
        clock.timers = [];
        clock.timers.length = 0;
        for (flag = 0; flag < timers.length; flag++) {
            //初始化数据
            timer = timers[flag];
            createTime = timer.createTime;
            tick = timer.tick;
            duration = timer.duration;
            callback = timer.callback;
            needStop = false;

            //执行
            passTime = (+new Date() - createTime) / duration;
            if (passTime >= 1) {
                needStop = true;
            }
            passTime = passTime > 1 ? 1 : passTime;
            deep = 100 * passTime;
            tick(deep);
            if (passTime < 1) {
                //动画没有结束再添加
                clock.timers.push(timer);
            } else if (callback) {
                callback();
            }
        }
        if (clock.timers.length <= 0) {
            clock.stop();
        }
    };

    //停止定时器，重置timerId=null
    clock.stop = function () {
        if (clock.timerId) {
            clearInterval(clock.timerId);
            console.error(clock.timerId);
            clock.timerId = null;
        }
    };

})(typeof window !== "undefined" ? window : this);