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
exports.readMaintenanceStatus = void 0;
const react_1 = __importStar(require("react"));
const router_1 = require("@docusaurus/router");
const jsUtils_1 = require("@site/src/utils/jsUtils");
const index_1 = require("../../index");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const MaintainedQueryStringKey = 'maintained';
function readMaintenanceStatus(search) {
    return new URLSearchParams(search).getAll(MaintainedQueryStringKey);
}
exports.readMaintenanceStatus = readMaintenanceStatus;
function replaceMaintenanceStatus(search, maintenanceStatus) {
    const searchParams = new URLSearchParams(search);
    searchParams.delete(MaintainedQueryStringKey);
    maintenanceStatus.forEach((status) => searchParams.append(MaintainedQueryStringKey, status));
    return searchParams.toString();
}
function PluginDirectoryMaintenanceStatusSelect({ id, icon, label, maintenanceStatus, ...rest }, ref) {
    const location = (0, router_1.useLocation)();
    const history = (0, router_1.useHistory)();
    const [selected, setSelected] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const statuses = readMaintenanceStatus(location.search);
        setSelected(statuses.includes(maintenanceStatus));
    }, [maintenanceStatus, location]);
    const toggleTag = (0, react_1.useCallback)(() => {
        const statuses = readMaintenanceStatus(location.search);
        const maintained = (0, jsUtils_1.toggleListItem)(statuses, maintenanceStatus);
        const newSearch = replaceMaintenanceStatus(location.search, maintained);
        history.push({
            ...location,
            search: newSearch,
            state: (0, index_1.prepareUserState)(),
        });
    }, [maintenanceStatus, location, history]);
    return (<>
      <input type="checkbox" id={id} className="screen-reader-only" onKeyDown={(e) => {
            if (e.key === 'Enter') {
                toggleTag();
            }
        }} onFocus={(e) => {
            if (e.relatedTarget) {
                e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent('focus'));
            }
        }} onBlur={(e) => {
            e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent('blur'));
        }} onChange={toggleTag} checked={selected} {...rest}/>
      <label ref={ref} htmlFor={id} className={styles_module_scss_1.default.checkboxLabel}>
        {label}
        {icon}
      </label>
    </>);
}
exports.default = react_1.default.forwardRef(PluginDirectoryMaintenanceStatusSelect);
