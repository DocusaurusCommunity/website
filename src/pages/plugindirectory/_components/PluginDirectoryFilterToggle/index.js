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
exports.readOperator = exports.OperatorQueryKey = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const router_1 = require("@docusaurus/router");
const index_1 = require("../../index");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
exports.OperatorQueryKey = 'operator';
function readOperator(search) {
    return (new URLSearchParams(search).get(exports.OperatorQueryKey) ??
        'OR');
}
exports.readOperator = readOperator;
function PluginDirectoryFilterToggle() {
    const id = 'plugindirectory_filter_toggle';
    const location = (0, router_1.useLocation)();
    const history = (0, router_1.useHistory)();
    const [operator, setOperator] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setOperator(readOperator(location.search) === 'AND');
    }, [location]);
    const toggleOperator = (0, react_1.useCallback)(() => {
        setOperator((o) => !o);
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete(exports.OperatorQueryKey);
        if (!operator) {
            searchParams.append(exports.OperatorQueryKey, 'AND');
        }
        history.push({
            ...location,
            search: searchParams.toString(),
            state: (0, index_1.prepareUserState)(),
        });
    }, [operator, location, history]);
    return (<div>
      <input type="checkbox" id={id} className="screen-reader-only" aria-label="Toggle between or and and for the tags you selected" onChange={toggleOperator} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                toggleOperator();
            }
        }} checked={operator}/>
      <label htmlFor={id} className={(0, clsx_1.default)(styles_module_scss_1.default.checkboxLabel, 'shadow--md')}>
        {/* eslint-disable @docusaurus/no-untranslated-text */}
        <span className={styles_module_scss_1.default.checkboxLabelOr}>OR</span>
        <span className={styles_module_scss_1.default.checkboxLabelAnd}>AND</span>
        {/* eslint-enable @docusaurus/no-untranslated-text */}
      </label>
    </div>);
}
exports.default = PluginDirectoryFilterToggle;
