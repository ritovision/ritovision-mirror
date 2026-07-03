'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Dropdown from '@/components/utilities/dropdown/Dropdown';
import StaticOrbs from '@/components/utilities/particles/StaticOrbs';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import { menuItems } from '@/components/navigation/mainMenu/config';
import {
  QrCodeConfig,
  QrColorThemeKey,
  QrDestinationOption,
  QrImageKey,
  QrLayoutKey,
  defaultQrSlug,
  isQrColorThemeKey,
  isQrImageKey,
  isQrLayoutKey,
  qrColorThemes,
  qrImageOptions,
  qrLayoutOptions,
} from '@/lib/qrCodes';
import QRControlsToggle from './QRControlsToggle';
import QRProfileSelector from './QRProfileSelector';
import QRCodeVisual from './QRCodeVisual';
import styles from './QRExperience.module.css';

const STORAGE_KEY = 'ritovision:qr-customizer:v1';

type QrOverrides = {
  layout?: QrLayoutKey;
  colorTheme?: QrColorThemeKey;
  imageKey?: QrImageKey;
  siteLinkPath?: string;
  destinationOptionKey?: string;
};

type QrOverrideStore = Record<string, QrOverrides | undefined>;

type QRExperienceProps = {
  profiles: readonly QrCodeConfig[];
  activeSlug?: string;
};

type ResolvedQrSettings = {
  layout: QrLayoutKey;
  colorTheme: QrColorThemeKey;
  imageKey: QrImageKey;
};

type QrRenderProfile = QrCodeConfig & {
  qrTitle?: string;
  optionLabel?: string;
};

const projectSiteLinks = [
  { label: 'projects/cod', path: '/projects/cod' },
  { label: 'projects/entriken', path: '/projects/entriken' },
  { label: 'projects/fansite', path: '/projects/fansite' },
  { label: 'projects/jumptag', path: '/projects/jumptag' },
  { label: 'projects/oss', path: '/projects/oss' },
  { label: 'oss/eip', path: '/projects/oss/eip' },
  { label: 'oss/git', path: '/projects/oss/git' },
  { label: 'oss/lkml', path: '/projects/oss/lkml' },
  { label: 'oss/owasp', path: '/projects/oss/owasp' },
  { label: 'projects/susquares', path: '/projects/susquares' },
  { label: 'projects/uas', path: '/projects/uas' },
] as const;

const mainSiteLinks = [
  ...Object.entries(menuItems)
    .filter(([, path]) => path !== '/projects')
    .map(([label, path]) => ({ label, path })),
  { label: 'Projects', path: '/projects' },
  ...projectSiteLinks,
];

const siteLinkOptions = mainSiteLinks.map(({ label, path }) => ({
  label,
  path,
  destination:
    path === '/'
      ? 'https://ritovision.com'
      : `https://ritovision.com${path}`,
}));
const defaultSiteLinkOption = siteLinkOptions[0]!;

function hasDestinationOption(
  profiles: readonly QrCodeConfig[],
  slug: string,
  optionKey: string
) {
  const profile = profiles.find((item) => item.slug === slug);
  return Boolean(
    profile?.destinationOptions?.some((option) => option.key === optionKey)
  );
}

function parseStoredOverrides(
  value: string | null,
  profiles: readonly QrCodeConfig[]
): QrOverrideStore {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return Object.entries(parsed).reduce<QrOverrideStore>(
      (store, [slug, override]) => {
        if (!override || typeof override !== 'object' || Array.isArray(override)) {
          return store;
        }

        const raw = override as Record<string, unknown>;
        const safeOverride: QrOverrides = {};

        if (typeof raw.layout === 'string' && isQrLayoutKey(raw.layout)) {
          safeOverride.layout = raw.layout;
        }

        if (
          typeof raw.colorTheme === 'string' &&
          isQrColorThemeKey(raw.colorTheme)
        ) {
          safeOverride.colorTheme = raw.colorTheme;
        }

        if (typeof raw.imageKey === 'string' && isQrImageKey(raw.imageKey)) {
          safeOverride.imageKey = raw.imageKey;
        }

        if (
          typeof raw.siteLinkPath === 'string' &&
          siteLinkOptions.some((option) => option.path === raw.siteLinkPath)
        ) {
          safeOverride.siteLinkPath = raw.siteLinkPath;
        }

        if (
          typeof raw.destinationOptionKey === 'string' &&
          hasDestinationOption(profiles, slug, raw.destinationOptionKey)
        ) {
          safeOverride.destinationOptionKey = raw.destinationOptionKey;
        }

        store[slug] = safeOverride;
        return store;
      },
      {}
    );
  } catch {
    return {};
  }
}

function saveStoredOverrides(store: QrOverrideStore) {
  const cleaned = Object.fromEntries(
    Object.entries(store).filter(([, value]) => value && Object.keys(value).length)
  );

  if (Object.keys(cleaned).length === 0) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
}

function optionLabel<T extends string>(
  key: T,
  options: readonly { key: T; label: string }[]
) {
  return options.find((option) => option.key === key)?.label ?? key;
}

function LayoutPreview({
  profile,
  settings,
}: {
  profile: QrRenderProfile;
  settings: ResolvedQrSettings;
}) {
  const colorTheme = qrColorThemes[settings.colorTheme];
  const selectedImage = qrImageOptions[settings.imageKey];
  const imageForLayout = selectedImage.src ? selectedImage : qrImageOptions['rito-picture'];
  const profileLogo = qrImageOptions[profile.imageKey];
  const logoForLayout = profileLogo.src
    ? profileLogo
    : qrImageOptions['ritovision-wordmark'];
  const commonQr = (
    <QRCodeVisual
      value={profile.destination}
      title={profile.qrTitle ?? `${profile.title} QR`}
      colorTheme={colorTheme}
    />
  );

  if (settings.layout === 'poster') {
    return (
      <section
        className={`${styles.layoutShell} ${styles.posterLayout}`}
        data-testid="qr-layout-poster"
        aria-labelledby="qr-title"
      >
        <div className={styles.posterImageWrap}>
          <OrbImage
            src={imageForLayout.src ?? ''}
            alt={imageForLayout.alt}
            fill
            sizes="(max-width: 780px) 86vw, 420px"
            radius="8px"
            className={styles.posterImage}
          />
        </div>

        <div className={styles.posterContent}>
          <p className={styles.kicker}>RitoVision</p>
          <h1 className={styles.posterTitle} id="qr-title">
            {profile.title}
          </h1>
          {commonQr}
          <p className={styles.cta}>{profile.cta}</p>
        </div>
      </section>
    );
  }

  if (settings.layout === 'neon') {
    return (
      <section
        className={`${styles.layoutShell} ${styles.neonLayout}`}
        data-testid="qr-layout-neon"
        aria-labelledby="qr-title"
      >
        <h1 className={styles.title} id="qr-title">
          {profile.title}
        </h1>
        {commonQr}
        <p className={styles.cta}>{profile.cta}</p>
      </section>
    );
  }

  if (settings.layout === 'logo-stack') {
    return (
      <section
        className={`${styles.layoutShell} ${styles.logoStackLayout}`}
        data-testid="qr-layout-logo-stack"
        aria-labelledby="qr-title"
      >
        <h1 className={styles.title} id="qr-title">
          {profile.optionLabel ?? profile.title}
        </h1>
        {commonQr}
        <div className={styles.logoStackMark}>
          <OrbImage
            src={logoForLayout.src ?? ''}
            alt={logoForLayout.alt}
            fill
            sizes="260px"
            className={styles.logoStackImage}
          />
        </div>
        <p className={styles.cta}>{profile.cta}</p>
        <p className={styles.destination}>{profile.destination}</p>
      </section>
    );
  }

  return (
    <section
      className={`${styles.layoutShell} ${styles.defaultLayout}`}
      data-testid="qr-layout-default"
      aria-labelledby="qr-title"
    >
      <p className={styles.kicker}>RitoVision</p>
      <h1 className={styles.title} id="qr-title">
        {profile.title}
      </h1>
      {commonQr}
      <p className={styles.cta}>{profile.cta}</p>
      <p className={styles.destination}>{profile.destination}</p>
    </section>
  );
}

function QrCustomizer({
  profile,
  settings,
  updateOverride,
  resetOverride,
}: {
  profile: QrCodeConfig;
  settings: ResolvedQrSettings;
  updateOverride: (override: QrOverrides) => void;
  resetOverride: () => void;
}) {
  const selectedLayout = qrLayoutOptions.find(
    (option) => option.key === settings.layout
  );
  const imageSelectorEnabled = Boolean(selectedLayout?.supportsImage);
  const imageOptions = Object.values(qrImageOptions);

  return (
    <section className={styles.customizer} aria-label="QR customizer">
      <div className={styles.customizerGrid}>
        <Dropdown
          headerText="Layout"
          label="Choose layout"
          items={qrLayoutOptions.map((option) => option.label)}
          selectedValue={optionLabel(settings.layout, qrLayoutOptions)}
          onChange={(selectedLabel) => {
            const layout = qrLayoutOptions.find(
              (option) => option.label === selectedLabel
            )?.key;

            if (layout) updateOverride({ layout });
          }}
        />

        <Dropdown
          headerText="QR Color"
          label="Choose color"
          items={Object.values(qrColorThemes).map((theme) => theme.label)}
          selectedValue={qrColorThemes[settings.colorTheme].label}
          onChange={(selectedLabel) => {
            const colorTheme = Object.values(qrColorThemes).find(
              (theme) => theme.label === selectedLabel
            )?.key;

            if (colorTheme) updateOverride({ colorTheme });
          }}
        />

        {imageSelectorEnabled && (
          <Dropdown
            headerText="Image"
            label="Choose image"
            items={imageOptions.map((image) => image.label)}
            selectedValue={qrImageOptions[settings.imageKey].label}
            onChange={(selectedLabel) => {
              const imageKey = imageOptions.find(
                (image) => image.label === selectedLabel
              )?.key;

              if (imageKey) updateOverride({ imageKey });
            }}
          />
        )}

      </div>

      <button className={styles.resetButton} type="button" onClick={resetOverride}>
        Reset {profile.title}
      </button>
    </section>
  );
}

function SiteLinkSelector({
  selectedPath,
  onChange,
}: {
  selectedPath: string;
  onChange: (siteLinkPath: string) => void;
}) {
  const selectedOption =
    siteLinkOptions.find((option) => option.path === selectedPath) ??
    defaultSiteLinkOption;

  return (
    <Dropdown
      headerText="Site Link"
      label="Choose page"
      items={siteLinkOptions.map((option) => option.label)}
      selectedValue={selectedOption.label}
      onChange={(selectedLabel) => {
        const selected = siteLinkOptions.find(
          (option) => option.label === selectedLabel
        );

        if (selected) {
          onChange(selected.path);
        }
      }}
    />
  );
}

function DestinationOptionSelector({
  headerText,
  options,
  selectedOption,
  onChange,
}: {
  headerText: string;
  options: readonly QrDestinationOption[];
  selectedOption: QrDestinationOption;
  onChange: (optionKey: string) => void;
}) {
  return (
    <Dropdown
      headerText={headerText}
      label="Choose destination"
      items={options.map((option) => option.label)}
      selectedValue={selectedOption.label}
      onChange={(selectedLabel) => {
        const selected = options.find((option) => option.label === selectedLabel);

        if (selected) {
          onChange(selected.key);
        }
      }}
    />
  );
}

export default function QRExperience({
  profiles,
  activeSlug = defaultQrSlug,
}: QRExperienceProps) {
  const pathname = usePathname();
  const activeProfile =
    profiles.find((profile) => profile.slug === activeSlug) ?? profiles[0];
  const [overrides, setOverrides] = React.useState<QrOverrideStore>({});
  const [controlsOpen, setControlsOpen] = React.useState(false);
  const controlsId = 'qr-controls-panel';

  React.useEffect(() => {
    setOverrides(
      parseStoredOverrides(window.localStorage.getItem(STORAGE_KEY), profiles)
    );
  }, [profiles]);

  React.useEffect(() => {
    if (!pathname) return;

    setOverrides(
      parseStoredOverrides(window.localStorage.getItem(STORAGE_KEY), profiles)
    );
  }, [pathname, profiles]);

  const profileOverride = overrides[activeProfile.slug] ?? {};
  const selectedSiteLink =
    activeProfile.slug === 'site-links'
      ? siteLinkOptions.find(
          (option) => option.path === profileOverride.siteLinkPath
        ) ?? defaultSiteLinkOption
      : undefined;
  const destinationOptions = activeProfile.destinationOptions;
  const selectedDestinationOption =
    destinationOptions?.find(
      (option) => option.key === profileOverride.destinationOptionKey
    ) ?? destinationOptions?.[0];
  const renderProfile: QrRenderProfile = selectedSiteLink
    ? {
        ...activeProfile,
        title: selectedSiteLink.label,
        destination: selectedSiteLink.destination,
        cta: `Scan for ${selectedSiteLink.label}`,
        description: `${selectedSiteLink.label} page QR for RitoVision.`,
        qrTitle: `${selectedSiteLink.label} QR`,
      }
    : selectedDestinationOption
      ? {
          ...activeProfile,
          destination: selectedDestinationOption.destination,
          cta: selectedDestinationOption.cta ?? activeProfile.cta,
          description:
            selectedDestinationOption.description ?? activeProfile.description,
          qrTitle: `${activeProfile.title} ${selectedDestinationOption.label} QR`,
          optionLabel: selectedDestinationOption.label,
        }
    : activeProfile;
  const settings: ResolvedQrSettings = {
    layout: profileOverride.layout ?? activeProfile.layout,
    colorTheme: profileOverride.colorTheme ?? activeProfile.colorTheme,
    imageKey: profileOverride.imageKey ?? activeProfile.imageKey,
  };

  const updateOverride = (nextOverride: QrOverrides) => {
    setOverrides((current) => {
      const nextStore = {
        ...current,
        [activeProfile.slug]: {
          ...(current[activeProfile.slug] ?? {}),
          ...nextOverride,
        },
      };
      saveStoredOverrides(nextStore);
      return nextStore;
    });
  };

  const resetOverride = () => {
    setOverrides((current) => {
      const nextStore = { ...current };
      delete nextStore[activeProfile.slug];
      saveStoredOverrides(nextStore);
      return nextStore;
    });
  };

  return (
    <main className={styles.page}>
      <StaticOrbs />

      <div className={styles.content}>
        <div className={styles.profileControls}>
          <div className={styles.profileSelector}>
            <QRProfileSelector profiles={profiles} activeProfile={activeProfile} />
          </div>
          <QRControlsToggle
            expanded={controlsOpen}
            controlsId={controlsId}
            onToggle={() => setControlsOpen((current) => !current)}
          />
        </div>

        <LayoutPreview profile={renderProfile} settings={settings} />

        {controlsOpen && (
          <div className={styles.controlsPanel} id={controlsId}>
            {selectedSiteLink && (
              <div className={styles.siteLinkSelector}>
                <SiteLinkSelector
                  selectedPath={selectedSiteLink.path}
                  onChange={(siteLinkPath) => updateOverride({ siteLinkPath })}
                />
              </div>
            )}

            {destinationOptions && selectedDestinationOption && (
              <div className={styles.siteLinkSelector}>
                <DestinationOptionSelector
                  headerText={`${activeProfile.title} Link`}
                  options={destinationOptions}
                  selectedOption={selectedDestinationOption}
                  onChange={(destinationOptionKey) =>
                    updateOverride({ destinationOptionKey })
                  }
                />
              </div>
            )}

            <QrCustomizer
              profile={activeProfile}
              settings={settings}
              updateOverride={updateOverride}
              resetOverride={resetOverride}
            />
          </div>
        )}
      </div>
    </main>
  );
}
