import PlainContainer from '@/projects/components/PlainContainer';
import ProductSurface from './components/ProductSurface';
import BillboardSystem from './components/BillboardSystem';
import PersonalizationFlow from './components/PersonalizationFlow';
import WalletUx from './components/WalletUx';
import DeveloperPlatform from './components/DeveloperPlatform';
import AINativeWorkflow from './components/AINativeWorkflow';
import styles from './Fork.module.css';

export default function Fork() {
  return (
    <PlainContainer
      id="what-rito-built-in-the-fork"
      title="What Rito Built in the Fork"
      className="blueglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <p className={styles.intro}>
          Rito spent a full month creating an expansive fork that tried to reframe Su
          Squares as a more credible modern dApp and as a serious developer
          playground; the full fork can be experienced at{' '}
          <a
            href="https://su.ritovision.com"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            su.ritovision.com
          </a>
          . Rather than rely on one flashy improvement, he expanded the product
          surface, redesigned core flows, and introduced a modern architecture around
          the legacy Jekyll deployment model without breaking GitHub Pages deployment.
        </p>

        <ProductSurface />
        <BillboardSystem />
        <PersonalizationFlow />
        <WalletUx />
        <DeveloperPlatform />
        <AINativeWorkflow />
      </div>
    </PlainContainer>
  );
}
