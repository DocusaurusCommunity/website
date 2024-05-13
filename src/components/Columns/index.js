"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
function Columns(_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (<div className="container center">
      <div className={(0, clsx_1.default)('row', className)} style={style}>
        {children}
      </div>
    </div>);
}
exports.default = Columns;
