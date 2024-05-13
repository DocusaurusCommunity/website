"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var MDXContent_1 = require("@theme/MDXContent");
function Column(_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (<MDXContent_1.default>
      <div className={(0, clsx_1.default)('col', className)} style={style}>
          {children}
      </div>
    </MDXContent_1.default>);
}
exports.default = Column;
