/**
 * 包含布局
 *
 */
clay.packLayout = function () {

    var scope = {
        // 包含图中心
        c: [100, 100],
        // 包含图尺寸
        r: 100
    },
        // 记录边界圆，用于计算新加圆的位置
        borderCircle = [],
        /**
         * 用于计算新圆的位置
         */
        calcNewPosition = function (r) {

        },
        // 由于初始化计算的时候没办法考虑最佳尺寸
        // 此处再计算，根据最优尺寸，计算出最终位置
        resetPosition = function () {

        };

    /**
     *
     * @param {any} initPack 可以被配置方法解析的数据
     */
    var pack = function (initPack) {

        return pack;
    };

    pack.setRoot = function () {

    };

    pack.setChild = function () {

    };

    pack.setId = function () {

    };

    // 设置具体的绘图方法
    pack.drawer = function (drawerback) {
        scope.p = drawerback;
        return pack;
    };

    // 设置包含图的圆心
    pack.setcenter = function (cx, cy) {
        scope.c = [cx, cy];
        return pack;
    };

    // 设置包含图的圆半径
    pack.setRadius = function (r) {
        scope.r = r;
        return pack;
    };

    return pack;
};
