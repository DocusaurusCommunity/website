import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'

import styles from './index.module.scss'

const pathways = [
  {
    number: '01',
    label: 'Knowledge base',
    title: 'See how others did it.',
    description:
      'Guides and customisations written by people using Docusaurus. Find an answer, try something new, or save yourself a bit of trial and error.',
    to: '/knowledge/',
    action: 'Explore the knowledge base',
  },
  {
    number: '02',
    label: 'Plugin directory',
    title: 'Find a plugin for the job.',
    description:
      'Looking for search, analytics, or something more specific? Browse plugins from across the ecosystem and see what fits your site.',
    to: '/plugindirectory/',
    action: 'Browse the plugin directory',
  },
  {
    number: '03',
    label: 'Contributing',
    title: 'Share what worked for you.',
    description:
      "Got a useful snippet or a fix for a confusing guide? Send it our way. You can also add a plugin or fill in details we're missing.",
    to: '/contributing/',
    action: 'How to contribute',
  },
]

const topics = [
  {
    label: 'Colours, fonts & details',
    title: 'Design & styling',
    description: 'Change the look of your site with CSS, icons, and custom styling.',
    to: '/knowledge/design/',
  },
  {
    label: 'Things you can reuse',
    title: 'Component library',
    description: 'Explore reusable buttons, cards, columns, timelines, and more.',
    to: '/knowledge/component-library/',
  },
  {
    label: 'Ready to publish?',
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
              <span className={styles.statusDot} aria-hidden="true" />
              By Docusaurus users, for Docusaurus users
            </p>
            <h1>
              Building with <br />
              <span>Docusaurus?</span>
            </h1>
            <p className={styles.intro}>
              Find a plugin, borrow a component, or see how someone else solved that thing
              you&apos;re stuck on. This is a place for Docusaurus users to share what works.
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
              An unofficial community site. Everyone&apos;s welcome.
            </p>
          </div>

          <aside className={styles.fieldNotes} aria-labelledby="field-notes-title">
            <div className={styles.noteMasthead}>
              <span>FROM THE KNOWLEDGE BASE</span>
              <Arrow diagonal />
            </div>
            <div className={styles.noteFeature}>
              <p className={styles.eyebrow}>Need a component?</p>
              <h2 id="field-notes-title">You don&apos;t have to start from scratch.</h2>
              <p>
                We&apos;ve collected buttons, cards, columns, and timelines you can use in your own
                site. Have a look and adapt one to suit.
              </p>
              <Link to="/knowledge/component-library/" className={styles.textLink}>
                Open the component library <Arrow />
              </Link>
            </div>
            <Link to="/knowledge/design/css/variables/" className={styles.noteLink}>
              <span>
                <small>STYLING YOUR SITE</small>
                Get to know your CSS variables
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
            <div className={styles.noteFooter}>
              <span className={styles.statusDot} aria-hidden="true" />
              Still growing. Corrections and additions welcome.
            </div>
          </aside>
        </header>

        <div className={styles.communityStrip}>
          <div className={clsx('container', styles.stripInner)}>
            <p>You don&apos;t need to figure it all out yourself.</p>
            <span>Guides & tutorials</span>
            <span>Plugins</span>
            <span>Reusable components</span>
          </div>
        </div>

        <section className={clsx('container', styles.section)} aria-labelledby="pathways-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Have a look around</p>
              <h2 id="pathways-title">What brings you here?</h2>
            </div>
            <p>
              Whether it&apos;s your first site or your fifth, we hope you find something useful.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {pathways.map((pathway) => (
              <Link key={pathway.number} to={pathway.to} className={styles.pathwayCard}>
                <div className={styles.cardTop}>
                  <span>{pathway.label}</span>
                  <span className={styles.cardNumber}>{pathway.number}</span>
                </div>
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
                <p className={styles.eyebrow}>In the knowledge base</p>
                <h2 id="topics-title">What are you working on?</h2>
              </div>
              <Link to="/knowledge/" className={styles.textLink}>
                Browse all knowledge <Arrow />
              </Link>
            </div>
            <div className={styles.cardGrid}>
              {topics.map((topic) => (
                <Link key={topic.to} to={topic.to} className={styles.topicCard}>
                  <p className={styles.eyebrow}>{topic.label}</p>
                  <h3>
                    {topic.title} <Arrow diagonal />
                  </h3>
                  <p>{topic.description}</p>
                </Link>
              ))}
            </div>
            <p className={styles.docsNote}>
              New to Docusaurus? Start with the{' '}
              <Link to="https://docusaurus.io/docs">official Docusaurus documentation</Link>. The
              guides here pick up where you might want a few more examples.
            </p>
          </div>
        </section>

        <section className={clsx('container', styles.section)} aria-labelledby="community-title">
          <div className={styles.communityCallout}>
            <div>
              <p className={styles.eyebrow}>Come say hello</p>
              <h2 id="community-title">Stuck on something? Ask around.</h2>
              <p>
                The Docusaurus Discord is a good place to ask questions and talk through ideas. You
                can share what you&apos;re building there, too. We&apos;d love to see it.
              </p>
            </div>
            <div className={styles.communityActions}>
              <Link to="https://discord.gg/docusaurus" className={styles.primaryButton}>
                Join the Discord <Arrow diagonal />
              </Link>
              <Link to="/contributing/plugins/" className={styles.textLink}>
                Built a plugin? Add it here <Arrow />
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
