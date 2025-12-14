// app\projects\cod\sections\process\Process.tsx
import React from 'react';
import styles from './Process.module.css';
import OverviewGraph from './OverviewGraph';
import QAGraph from './QAGraph';
import ContentGraph from './ContentGraph';
import OutreachGraph from './OutreachGraph';

export default function Process() {
  return (
    <>
      <h2 id="the-process" className={`defaulttopspace ${styles.sectionHeading} ${styles.red}`}>
        The Process
      </h2>

      <div className={styles.container}>
        <p className={styles.introParagraph}>
          Rito's strategy was a multi-stage process designed to identify, document,
          and publicize critical game bugs when internal channels were ineffective.
          It combined the technical discipline of quality assurance, the creative
          execution of compelling content creation, and the strategic deployment of
          public relations tactics to generate external pressure and drive developer action.
        </p>

        <OverviewGraph />

        <h3 id="quality-assurance-testing" className={`defaulttopspace ${styles.sectionHeading}`}>
          Quality Assurance Testing
        </h3>

        <p className={styles.sectionText}>
          Rito approached the project with the discipline of an internal Quality
          Assurance team. Drawing from his previous experience performing quality
          assurance for a game studio, and years of structured testing in web and
          application development, he created a Jira-based system to track and
          categorize gameplay bugs he encounters. Each issue was evaluated across
          two dimensions: its technical severity, and its potential editorial
          relevance to gaming media.
        </p>

        <div className={styles.qaWrapper}>
          <QAGraph />
        </div>

        <p className={styles.sectionText}>
          For the most promising bugs, Rito conducted methodical, repeatable testing
          to isolate triggers, verify consistency, and define the scope of
          impact—without any access to the game’s internal systems. Each bug was
          thoroughly documented and organized to meet the standards of a production
          QA pipeline, including reproducibility, severity labeling, and contextual commentary.
        </p>

        <p className={styles.sectionText}>
          But Rito wasn’t part of the development team. He couldn’t patch code,
          submit directly to official systems, or escalate through internal channels.
          And in a community where thousands of bugs are reported every week, even
          severe issues often vanish into the noise.
        </p>

        <p className={styles.sectionText}>
          What he could do was prove the bugs existed—with structure, clarity, and
          precision. The next step was to make sure they couldn’t be ignored. That
          meant turning these findings into compelling, high-signal video content
          that would cut through the chaos—and get the right people watching.
        </p>

        <h3 id="infotaining-content-creation" className={`defaulttopspace ${styles.sectionHeading}`}>
          Infotaining Content Creation
        </h3>

        <p className={styles.sectionText}>
          With the bug testing complete, Rito moved into production—transforming raw
          QA data into compelling video assets designed for both technical credibility
          and public engagement. Using OBS Studio to capture in-game footage, he
          documented each bug in real-time, ensuring clear, repeatable visual
          evidence of how the issues manifested during gameplay.<br /><br />
          He then edited the content in Adobe Premiere, applying a high-production
          polish that made the footage digestible and engaging for broader audiences.
          But the creative direction didn’t stop at clean cuts and bug overlays—Rito
          brought his multimedia alter ego, Rito Rhymes, into the mix. For one of the
          videos, he wrote and recorded an original rap, using music and lyricism to
          explain the bug’s mechanics while keeping the tone playful, sharp, and
          entertaining.
        </p>

        <div className={styles.contentGraphWrapper}>
          <ContentGraph />
        </div>

        <p className={styles.sectionText}>
          Behind the creativity was a tactical understanding: to get media outlets to
          share the story, the content couldn’t just be informative—it had to attract
          viewership. Rito balanced the dry technical precision required to prove
          the existence of the bug with curiosity-driven framing and punchy delivery
          that made each video shareable. The result was a series of assets that not
          only showcased the problem but gave gaming journalists a reason to amplify
          it.
        </p>

        <h3 id="strategic-pr-outreach" className={`defaulttopspace ${styles.sectionHeading}`}>
          Strategic PR Outreach
        </h3>

        <p className={styles.sectionText}>
          With the content assets finalized, Rito deployed the video to a public
          platform with deliberate framing—optimizing the title, description, and
          presentation to align with journalistic angles and audience expectations.
          From there, he initiated direct outreach to key media contacts through a
          highly targeted cold-email campaign.
        </p>

        <div className={styles.outreachWrapper}>
          <OutreachGraph />
        </div>

        <p className={styles.sectionText}>
          Rito independently conducted all outreach strategy and execution. This
          included researching relevant gaming outlets, identifying individual
          journalists based on prior coverage patterns, and sourcing contact
          information even when not readily available. Each pitch was customized to
          reflect the journalist’s editorial tone and interests, positioning the
          video as a compelling story with broader relevance.
        </p><br></br>

        <p className={styles.sectionText}>
          Responses varied. Some journalists replied directly, others published
          without notice, and syndication quickly followed as initial coverage
          triggered a ripple effect across the gaming media ecosystem. The result
          was an organically expanding press cycle driven entirely by strategic
          content positioning and proactive media engagement.
        </p>
      </div>
    </>
  );
}
