/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import {
  Tags,
  TagList,
  type TagType,
  type Plugin,
  type Tag,
  MaintenanceStatuses,
  type MaintainedType,
  type MaintenanceStatus,
} from '@site/src/data/plugins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DocusaurusSvg from '@site/src/assets/Docusaurus.svg';
import {sortBy} from '@site/src/utils/jsUtils';
import Tooltip from '../PluginDirectoryTooltip/index';
import styles from './styles.module.scss';

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({label, color, description}, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
    </li>
  ),
);

function PluginDirectoryCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `plugin_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}>
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function getCardImage(plugin: Plugin): string {
  return (
    plugin.preview ??
    `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
      plugin.website,
    )}/showcase`
  );
}

const MaintenanceStatusComp = React.forwardRef<HTMLLIElement, MaintenanceStatus>(
  ({label, icon, description}, ref) => (
    <p className={styles.pluginDirectoryCardMaintenanceStatus}>
      <span className={styles.maintenanceLabel}>Status:</span>
      <span ref={ref} className={styles.maintenanceStatus} title={description}>
        <span className={styles.textLabel}>{label.toLowerCase()}</span>
        <span className={styles.maintenanceStatusIcon}>{icon}</span>
      </span>
    </p>
  ),
);

function PluginDirectoryCardMaintenanceStatus({maintenanceStatus}: {maintenanceStatus: MaintainedType}): JSX.Element {
  const maintenanceStatusObject = MaintenanceStatuses[maintenanceStatus];
  return (
    <MaintenanceStatusComp {...maintenanceStatusObject} />
  );
};

function PluginDirectoryCard({plugin}: {plugin: Plugin}) {
  const image = getCardImage(plugin);
  return (
    <li key={plugin.name} className="card shadow--md">
      <div className={clsx('card__image', styles.pluginDirectoryCardImage)}>
        <Image img={image} alt={plugin.name} />
      </div>
      <div className="card__body">
        <div className={clsx(styles.pluginDirectoryCardHeader)}>
          <h4 className={styles.pluginDirectoryCardTitle}>
            <Link href={plugin.website} className={styles.pluginDirectoryCardLink}>
              {plugin.name}
            </Link>
          </h4>
          {plugin.tags.includes('favourite') && (
            <FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="sm" />
          )}
          {plugin.tags.includes('docusaurus') && (
            <DocusaurusSvg className={styles.svgIconDocusaurus} />
          )}
          {plugin.source && (
            <Link
              href={plugin.source}
              className={clsx(
                'button button--secondary button--sm',
                styles.pluginDirectoryCardSrcBtn,
              )}>
              <Translate id="plugindirectory.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>
        <p className={styles.pluginDirectoryCardBody}>{plugin.description}</p>
        <p className={styles.pluginDirectoryCardAuthor}><span className={styles.authorLabel}>Author:</span><span className={styles.authorName}>{plugin.author}</span></p>
        <PluginDirectoryCardMaintenanceStatus maintenanceStatus={plugin.maintenanceStatus} />
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <PluginDirectoryCardTag tags={plugin.tags} />
      </ul>
    </li>
  );
}

export default React.memo(PluginDirectoryCard);
