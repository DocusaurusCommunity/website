"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_popper_1 = require("react-popper");
var styles_module_scss_1 = require("./styles.module.scss");
function Tooltip(_a) {
    var children = _a.children, id = _a.id, anchorEl = _a.anchorEl, text = _a.text;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(null), referenceElement = _c[0], setReferenceElement = _c[1];
    var _d = (0, react_1.useState)(null), popperElement = _d[0], setPopperElement = _d[1];
    var _e = (0, react_1.useState)(null), arrowElement = _e[0], setArrowElement = _e[1];
    var _f = (0, react_1.useState)(null), container = _f[0], setContainer = _f[1];
    var _g = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    }), popperStyles = _g.styles, attributes = _g.attributes;
    var timeout = (0, react_1.useRef)(null);
    var tooltipId = "".concat(id, "_tooltip");
    (0, react_1.useEffect)(function () {
        if (anchorEl) {
            if (typeof anchorEl === 'string') {
                setContainer(document.querySelector(anchorEl));
            }
            else {
                setContainer(anchorEl);
            }
        }
        else {
            setContainer(document.body);
        }
    }, [container, anchorEl]);
    (0, react_1.useEffect)(function () {
        var showEvents = ['mouseenter', 'focus'];
        var hideEvents = ['mouseleave', 'blur'];
        var handleOpen = function () {
            // There is no point in displaying an empty tooltip.
            if (text === '') {
                return;
            }
            // Remove the title ahead of time to avoid displaying
            // two tooltips at the same time (native + this one).
            referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.removeAttribute('title');
            timeout.current = window.setTimeout(function () {
                setOpen(true);
            }, 400);
        };
        var handleClose = function () {
            clearInterval(timeout.current);
            setOpen(false);
        };
        if (referenceElement) {
            showEvents.forEach(function (event) {
                referenceElement.addEventListener(event, handleOpen);
            });
            hideEvents.forEach(function (event) {
                referenceElement.addEventListener(event, handleClose);
            });
        }
        return function () {
            if (referenceElement) {
                showEvents.forEach(function (event) {
                    referenceElement.removeEventListener(event, handleOpen);
                });
                hideEvents.forEach(function (event) {
                    referenceElement.removeEventListener(event, handleClose);
                });
            }
        };
    }, [referenceElement, text]);
    return (<>
      {react_1.default.cloneElement(children, {
            ref: setReferenceElement,
            'aria-describedby': open ? tooltipId : undefined,
        })}
      {container
            ? react_dom_1.default.createPortal(open && (<div id={tooltipId} role="tooltip" ref={setPopperElement} className={styles_module_scss_1.default.tooltip} style={popperStyles.popper} {...attributes.popper}>
                {text}
                <span ref={setArrowElement} className={styles_module_scss_1.default.tooltipArrow} style={popperStyles.arrow}/>
              </div>), container)
            : container}
    </>);
}
exports.default = Tooltip;
