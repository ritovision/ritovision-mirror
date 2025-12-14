'use client';

import React, { useEffect, useRef } from 'react';
import { AccordionTOC, AccordionItem } from '@/components/utilities/accordion/AccordionTOC';
import styles from './Dogey.module.css';
// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

export default function Dogey() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video loads and plays correctly
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  const items: AccordionItem[] = [
    {
      value: 'web3-predecessor-project',
      title: 'Web3 Predecessor Project',
      content: (
        <>
          <h4 className={styles.subheading}>DogeyDoge: A Wearable Wallet</h4>
          
          {/* Video added underneath the heading */}
          <div className={styles.videoContainer}>
            <video 
              ref={videoRef}
              className={styles.video}
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="\video\Dogetag-scan.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <p className={styles.text}>
            Rito, a recognized creative force in the Dogecoin community, had already carved out a unique space at the intersection of blockchain, music, and culture. With viral projects like his musical Doge Meme Anthem, the first rap NFT on Dogecoin, and his spoken word roadmap explainer acknowledged by the Dogecoin Foundation, he brought both vision and credibility to the table.
          </p>
          
          <img
            src="/images/pages/projects/jumptag/dogey/dogeydoge-logo.png"
            alt="DogeyDoge Logo"
            className={styles.image}
          />
          <p className={styles.caption}>DogeyDoge Logo</p>

          <p className={styles.text}>
            Building on that momentum, he launched DogeyDoge—an experimental venture aimed at bringing Web3 utility into the physical world. The product was a wearable wallet: zinc-plated dog tags engraved with QR codes linked to Dogecoin wallet addresses, enhanced with stylized 3D Doge-themed artwork. Merging crypto function with streetwear aesthetics, DogeyDoge was positioned to serve both as a statement piece and as a decentralized access point for sending or receiving Dogecoin in real life.
          </p>
          
          {/* Swiper slider replacing the second image */}
          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              className={styles.swiper}
            >
              <SwiperSlide>
                <img 
                  src="/images/pages/projects/jumptag/dogey/dogeydoge-sample1.jpg" 
                  alt="DogeyDoge Sample 1" 
                  className={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img 
                  src="/images/pages/projects/jumptag/dogey/dogeydoge-sample2.jpg" 
                  alt="DogeyDoge Sample 2" 
                  className={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img 
                  src="/images/pages/projects/jumptag/dogey/dogeydoge-sample3.jpg" 
                  alt="DogeyDoge Sample 3" 
                  className={styles.swiperImage}
                />
              </SwiperSlide>
            </Swiper>
            <p className={styles.caption}>Dogetags from the collection</p>
          </div>

          <h4 className={styles.subheading}>A Smooth False Start</h4>
          <p className={styles.text}>
            As development progressed, a clear plan was established for manufacturing. A production agreement was reached that aligned with the project's needs, allowing for an initial run of customized tags at a manageable scale and margin. However, as preparations moved forward, key conditions around production began to shift—unexpectedly and significantly. The original agreement that would have made small-batch customization viable was no longer feasible under the new terms.
          </p>

          <h4 className={styles.subheading}>A Mission Critical Issue</h4>
          <p className={styles.text}>
            This sudden change introduced a critical obstacle: the economics of inventory collapsed. The updated requirements demanded a higher production volume to achieve viable unit costs, but the nature of the product—custom-engraved QR codes tied to individual wallet addresses—meant that each unit needed to be personalized before production. In short, there was no practical way to produce inventory in advance without already having substantial demand, which the project could not yet generate at scale.
          </p>

          <h4 className={styles.subheading}>The Decision to Pivot</h4>
          <p className={styles.text}>
            Rather than abandon the concept, Rito reframed the problem. The breakthrough came in reimagining the QR system itself. By transitioning to a dynamic redirect architecture, he effectively separated the manufacturing process from the personalization layer. Tags could now be mass-produced with a generic, reusable QR code that users could later configure to point to any destination—Dogecoin wallet or otherwise. This shift transformed DogeyDoge from a constrained custom item into a scalable, modular platform, unlocking the flexibility required to move forward.
          </p>
          <p className={styles.text}>
            The shift to a dynamic QR system didn't just solve the inventory bottleneck—it unlocked entirely new possibilities. By decoupling the QR code from a fixed wallet address, the platform could now support multiple destinations and use cases beyond crypto wallets, from digital portfolios to social links and event check-ins. This expanded the potential audience dramatically. Coupled with a growing sense of distrust in Web3 influencer marketing and the financial strain of an ongoing bear market affecting Dogecoin spenders, Rito made the strategic decision to broaden the concept's appeal. While the dog-tag format was retained for continuity, the product direction evolved—opening the door to experimentation with new markets, new user needs, and ultimately a more inclusive ecosystem.
          </p>

          <p className={styles.text}>
            Though the DogeyDoge project was ultimately shelved, it served as a vital incubator for the infrastructure and strategy behind Jumptag—a next-generation wearable platform with broader appeal, stronger economics, and the technical foundation to scale.
          </p>
        </>
      )
    }
  ];

  return (
    <div id="web3-predecessor-project">
      <AccordionTOC items={items} />
    </div>
  );
}