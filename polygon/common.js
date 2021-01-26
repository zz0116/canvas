load = function (url) {
    $.ajax({
        url: url,
        type: 'post',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(1)
            return data;
        }
    });
};

// 判断p1p4与p2p3方向是否一致
function sameDirection(p1, p2, p3, p4) {
    return dotProduct(vector(p1, p4), vector(p2, p3)) > 0;
}

// 点乘
function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

// 由两点得到向量
function vector(p1, p2) {
    return {
        x: p2.x - p1.x,
        y: p2.y - p1.y
    }
}

function dis(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}