var _ = require('lodash');

module.exports = {
    IsEmpty: IsEmpty,
    hasNull: hasNull
};

/*
* @description Check against "null", undefined, empty string
*/
function IsEmpty(value) {
    return _.isUndefined(value) || _.isNull(value) || value === "" || value === "null" || value === "undefined";
}

/*
*
*/
function hasNull(obj) {
    debugger;
    if (IsEmpty(obj)) {
        return true;
    }
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        Object.keys(val).forEach(function (key) {
            if (IsEmpty(val[key]) === true){
                return true;
            }
        });
    });
}

/*
*
*/
Array.prototype.Any = function (fieldName, value) {
    return _.some(this, function (object) {
        return object[fieldName] === true;
    });
}