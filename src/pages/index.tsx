import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'

import styles from './index.module.scss'

const pathways = [
  {
    title: 'Knowledge base',
    description: 'Guides and customisations written by Docusaurus users.',
    to: '/knowledge/',
    action: 'Browse guides',
  },
  {
    title: 'Plugin directory',
    description: 'Plugins for search, analytics, content, and other parts of your site.',
    to: '/plugindirectory/',
    action: '    Browse plugins',
  },
  {
    title: 'Contribute',
    description: 'Add a plugin, correct a guide, or share a customisation.',
    to: '/contributing/',
    action: 'Read how to contribute',
  },
]

const topics = [
  {
    title: 'Design & styling',
    description: 'Change the look of your site with CSS, icons, and custom styling.',
    to: '/knowledge/design/',
  },
  {
    title: 'Component library',
    description: 'Explore reusable buttons, cards, columns, timelines, and more.',
    to: '/knowledge/component-library/',
  },
  {
    title: 'Deployment guides',
    description: 'Get your site online with Docker, Cloudflare Pages, or nginx.',
    to: '/knowledge/deployment/',
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  )
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Building with Docusaurus?"
      description="Guides, plugins, and reusable components shared by Docusaurus users. Find help with your site or share something you've learned."
    >
      <main className={styles.home}>
        <header className={clsx('container', styles.hero)}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <ThemedImage
                className={styles.heroMark}
                sources={{
                  light: '/img/community-mark.svg',
                  dark: '/img/community-mark-dark.svg',
                }}
                alt=""
              />
              Docusaurus community resources
            </p>
            <h1>
              Guides and tools <br />
              for your Docusaurus site.
            </h1>
            <p className={styles.intro}>
              Browse community-written guides, find plugins, and reuse components in your
              Docusaurus site.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to="/knowledge/">
                Browse the guides <Arrow />
              </Link>
              <Link className={styles.secondaryButton} to="/plugindirectory/">
                Find a plugin <Arrow diagonal />
              </Link>
            </div>
            <p className={styles.heroNote}>
              For Docusaurus features and setup, see the{' '}
              <Link to="https://docusaurus.io/docs">official documentation</Link>.
            </p>
          </div>

          <aside className={styles.fieldNotes} aria-labelledby="field-notes-title">
            <div className={styles.noteMasthead}>
              <span>COMPONENT LIBRARY</span>
            </div>
            <div className={styles.noteFeature}>
              <p className={styles.eyebrow}>Reusable examples</p>
              <h2 id="field-notes-title">Components for your site</h2>
              <p>
                Browse button, card, column, and timeline components with code you can adapt.
              </p>
              <Link to="/knowledge/component-library/" className={styles.textLink}>
                Browse components <Arrow />
              </Link>
            </div>
            <Link to="/knowledge/design/css/variables/" className={styles.noteLink}>
              <span>
                <small>STYLING YOUR SITE</small>
                Customize CSS variables
              </span>
              <Arrow diagonal />
            </Link>
            <Link to="/knowledge/#how-to-contribute" className={styles.noteLink}>
              <span>
                <small>HAVE SOMETHING TO ADD?</small>
                Share a customisation
              </span>
              <Arrow diagonal />
            </Link>
          </aside>
        </header>

        <section className={clsx('container', styles.section)} aria-labelledby="pathways-title">
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="pathways-title">Browse the site</h2>
            </div>
          </div>
          <div className={styles.cardGrid}>
            {pathways.map((pathway) => (
              <Link key={pathway.to} to={pathway.to} className={styles.pathwayCard}>
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
                <span className={styles.cardAction}>
                  {pathway.action} <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.topicsSection} aria-labelledby="topics-title">
          <div className={clsx('container', styles.section)}>
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="topics-title">Browse guides by topic</h2>
              </div>
              <Link to="/knowledge/" className={styles.textLink}>
                All guides <Arrow />
              </Link>
            </div>
            <div className={styles.cardGrid}>
              {topics.map((topic) => (
                <Link key={topic.to} to={topic.to} className={styles.topicCard}>
                  <h3>
                    {topic.title} <Arrow diagonal />
                  </h3>
                  <p>{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx('container', styles.section)} aria-labelledby="community-title">
          <div className={styles.communityCallout}>
            <div>
              <h2 id="community-title">Talk to other Docusaurus users</h2>
              <p>
                Ask questions, get help with a setup, or share what you&apos;re building in the
                Docusaurus Discord.
              </p>
            </div>
            <div className={styles.communityActions}>
              <Link to="https://discord.gg/docusaurus" className={styles.primaryButton}>
                Join the Discord <Arrow diagonal />
              </Link>
              <Link to="/contributing/plugins/" className={styles.textLink}>
                Submit a plugin <Arrow />
              </Link>
            </div>
          </div>
          <div className={styles.transparency}>
            <p>This site is open source, and our analytics are public.</p>
            <Link to="https://github.com/DocusaurusCommunity/website">Find us on GitHub</Link>
            <Link to="https://plausible.io/docusaurus.community/">View our public analytics</Link>
          </div>
        </section>
      </main>
    </Layout>
  )
}
