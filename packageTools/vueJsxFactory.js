const { h } = require("vue");

module.exports = (tag, props = null, children = null) => {
    return h(tag, props, children);
}