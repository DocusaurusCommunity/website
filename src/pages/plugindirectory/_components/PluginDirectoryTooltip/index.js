"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_popper_1 = require("react-popper");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
function Tooltip({ children, id, anchorEl, text, }) {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [referenceElement, setReferenceElement] = (0, react_1.useState)(null);
    const [popperElement, setPopperElement] = (0, react_1.useState)(null);
    const [arrowElement, setArrowElement] = (0, react_1.useState)(null);
    const [container, setContainer] = (0, react_1.useState)(null);
    const { styles: popperStyles, attributes } = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
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
    });
    const timeout = (0, react_1.useRef)(null);
    const tooltipId = `${id}_tooltip`;
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];
        const handleOpen = () => {
            // There is no point in displaying an empty tooltip.
            if (text === '') {
                return;
            }
            // Remove the title ahead of time to avoid displaying
            // two tooltips at the same time (native + this one).
            referenceElement?.removeAttribute('title');
            timeout.current = window.setTimeout(() => {
                setOpen(true);
            }, 400);
        };
        const handleClose = () => {
            clearInterval(timeout.current);
            setOpen(false);
        };
        if (referenceElement) {
            showEvents.forEach((event) => {
                referenceElement.addEventListener(event, handleOpen);
            });
            hideEvents.forEach((event) => {
                referenceElement.addEventListener(event, handleClose);
            });
        }
        return () => {
            if (referenceElement) {
                showEvents.forEach((event) => {
                    referenceElement.removeEventListener(event, handleOpen);
                });
                hideEvents.forEach((event) => {
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
