"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Link_1 = __importDefault(require("@docusaurus/Link"));
const Translate_1 = __importDefault(require("@docusaurus/Translate"));
const IdealImage_1 = __importDefault(require("@theme/IdealImage"));
const plugins_1 = require("@site/src/data/plugins");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const Docusaurus_svg_1 = __importDefault(require("@site/src/assets/Docusaurus.svg"));
const jsUtils_1 = require("@site/src/utils/jsUtils");
const index_1 = __importDefault(require("../PluginDirectoryTooltip/index"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const TagComp = react_1.default.forwardRef(({ label, color, description }, ref) => (<li ref={ref} className={styles_module_scss_1.default.tag} title={description}>
      <span className={styles_module_scss_1.default.textLabel}>{label.toLowerCase()}</span>
      <span className={styles_module_scss_1.default.colorLabel} style={{ backgroundColor: color }}/>
    </li>));
function PluginDirectoryCardTag({ tags }) {
    const tagObjects = tags.map((tag) => ({ tag, ...plugins_1.Tags[tag] }));
    // Keep same order for all tags
    const tagObjectsSorted = (0, jsUtils_1.sortBy)(tagObjects, (tagObject) => plugins_1.TagList.indexOf(tagObject.tag));
    return (<>
      {tagObjectsSorted.map((tagObject, index) => {
            const id = `plugin_card_tag_${tagObject.tag}`;
            return (<index_1.default key={index} text={tagObject.description} anchorEl="#__docusaurus" id={id}>
            <TagComp key={index} {...tagObject}/>
          </index_1.default>);
        })}
    </>);
}
function getCardImage(plugin) {
    return (plugin.preview ??
        `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(plugin.website)}/showcase`);
}
const MaintenanceStatusComp = react_1.default.forwardRef(({ label, icon, description }, ref) => (<p className={styles_module_scss_1.default.pluginDirectoryCardMaintenanceStatus}>
      <span className={styles_module_scss_1.default.maintenanceLabel}>Status:</span>
      <span ref={ref} className={styles_module_scss_1.default.maintenanceStatus} title={description}>
        <span className={styles_module_scss_1.default.textLabel}>{label.toLowerCase()}</span>
        <span className={styles_module_scss_1.default.maintenanceStatusIcon}>{icon}</span>
      </span>
    </p>));
function PluginDirectoryCardMaintenanceStatus({ maintenanceStatus }) {
    const maintenanceStatusObject = plugins_1.MaintenanceStatuses[maintenanceStatus];
    return (<MaintenanceStatusComp {...maintenanceStatusObject}/>);
}
;
function PluginDirectoryCard({ plugin }) {
    const image = getCardImage(plugin);
    return (<li key={plugin.name} className="card shadow--md">
      <div className={(0, clsx_1.default)('card__image', styles_module_scss_1.default.pluginDirectoryCardImage)}>
        <IdealImage_1.default img={image} alt={plugin.name}/>
      </div>
      <div className="card__body">
        <div className={(0, clsx_1.default)(styles_module_scss_1.default.pluginDirectoryCardHeader)}>
          <h4 className={styles_module_scss_1.default.pluginDirectoryCardTitle}>
            <Link_1.default href={plugin.website} className={styles_module_scss_1.default.pluginDirectoryCardLink}>
              {plugin.name}
            </Link_1.default>
          </h4>
          {plugin.tags.includes('favourite') && (<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faHeart} className={styles_module_scss_1.default.svgIconFavourite} size="sm"/>)}
          {plugin.tags.includes('docusaurus') && (<Docusaurus_svg_1.default className={styles_module_scss_1.default.svgIconDocusaurus}/>)}
          {plugin.source && (<Link_1.default href={plugin.source} className={(0, clsx_1.default)('button button--secondary button--sm', styles_module_scss_1.default.pluginDirectoryCardSrcBtn)}>
              <Translate_1.default id="plugindirectory.card.sourceLink">source</Translate_1.default>
            </Link_1.default>)}
        </div>
        <p className={styles_module_scss_1.default.pluginDirectoryCardBody}>{plugin.description}</p>
        <p className={styles_module_scss_1.default.pluginDirectoryCardAuthor}><span className={styles_module_scss_1.default.authorLabel}>Author:</span><span className={styles_module_scss_1.default.authorName}>{plugin.author}</span></p>
        <PluginDirectoryCardMaintenanceStatus maintenanceStatus={plugin.maintenanceStatus}/>
      </div>
      <ul className={(0, clsx_1.default)('card__footer', styles_module_scss_1.default.cardFooter)}>
        <PluginDirectoryCardTag tags={plugin.tags}/>
      </ul>
    </li>);
}
exports.default = react_1.default.memo(PluginDirectoryCard);
