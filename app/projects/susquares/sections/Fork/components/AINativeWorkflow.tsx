import styles from './AINativeWorkflow.module.css';

const workflowPoints = [
  'Tour mode gave newcomers a single coherent entry point across the whole stack, guiding them through a staged local setup and walkthrough of the full system.',
  'Builder mode added guardrails and preflight expectations so contributors could start making edits and validating assumptions without needing full-stack fluency upfront.',
  'README, AGENTS.md, and supporting mode files turned the repo itself into an onboarding surface, making the architecture approachable from whichever corner a developer arrived from.',
];

export default function AINativeWorkflow() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>AI-Native Developer Workflow</h3>
      <p className={styles.copy}>
        The purpose of the AI-guided workflow was to make a complex
        ecosystem-as-a-playground system accessible to developers. Su Squares was no
        longer just a website repo. It had become a broad, interconnected environment
        where legacy Jekyll pages, modern frontend workspaces, smart-contract tooling,
        local chain infrastructure, testing suites, UI staging, vendored web3
        dependencies, and runtime-configured deployment constraints all served
        different but related purposes. That kind of architecture was valuable
        precisely because it exposed developers to multiple parts of a complete dApp
        stack, but it also created a real accessibility tradeoff: a smart-contract-
        oriented contributor might not know frontend tooling like Storybook, while a
        frontend-oriented contributor might have little familiarity with local chain
        infrastructure or contract workflows. Rito introduced explicit Tour and
        Builder workflows, backed by AGENTS.md guidance, to give developers a sensible
        path through that complexity instead of forcing them to piece the system
        together from scratch.
      </p>

      <ul className={styles.list}>
        {workflowPoints.map((point) => (
          <li key={point} className={styles.item}>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
