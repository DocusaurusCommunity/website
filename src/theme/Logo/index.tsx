import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useThemeConfig } from '@docusaurus/theme-common'
import ThemedImage from '@theme/ThemedImage'
import type { Props } from '@theme/Logo'

type LogoProps = Pick<Props, 'imageClassName' | 'titleClassName'> &
  React.ComponentProps<typeof Link>

export default function Logo({ imageClassName, titleClassName, ...props }: LogoProps): ReactNode {
  const {
    navbar: { logo, title },
  } = useThemeConfig()
  const href = useBaseUrl(logo?.href || '/')
  const sources = {
    light: useBaseUrl(logo?.src || 'img/community-mark.svg'),
    dark: useBaseUrl(logo?.srcDark || logo?.src || 'img/community-mark-dark.svg'),
  }

  return (
    <Link to={href} {...props} {...(logo?.target && { target: logo.target })}>
      {logo && (
        <div className={imageClassName}>
          <ThemedImage
            sources={sources}
            className={logo.className}
            alt={logo.alt ?? ''}
            width={logo.width}
            height={logo.height}
            style={logo.style}
          />
        </div>
      )}
      {title != null && (
        <span className={clsx(titleClassName, 'community-wordmark')}>
          <span>docusaurus</span>
          <span className="community-wordmark__suffix">.community</span>
        </span>
      )}
    </Link>
  )
}
