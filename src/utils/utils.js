export const toUnixTimestamp = (_time) => {
    return Math.round(_time / 1000);
}

export const mustBeLongTime = (_time) => {
    return Math.round(new Date().getTime() / 1000) < _time;
}

export const mustBeShortTime = (_time) => {
    return Math.round(new Date().getTime() / 1000) > _time;
}

export const isEmpry = (_element) => {
    return _element == null || _element == 0 || _element == undefined || _element == '' || _element == [] || _element == {};
}

export const object2string = (_str) => {
    return JSON.stringify(_str);
}

export const string2object = (_obj) => {
    return JSON.parse(_obj);
}

export const toLowerCase = (_str) => {
    return _str.toLowerCase();
}

export const toUpperCase = (_str) => {
    return _str.toUpperCase();
}

export const timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

export const timestamp2days = (UNIX_timestamp) => {
    var res = UNIX_timestamp / 60 /60 / 24;
    return res + 0.5 > Math.round(res) ? Math.round(res) : Math.floor(res);
}

export const eth2number = (eth) => {
    return eth / 10 ** 18;
}