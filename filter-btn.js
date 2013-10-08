define(['jade-runtime'], function(jade){ return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),name = locals_.name;buf.push("<button>" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "</button>");;return buf.join("");
}})