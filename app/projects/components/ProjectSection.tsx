// FILE PATH: app/components/pages/projects/ProjectSection.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectIntro from './ProjectIntro';
import { ExternalSiteModal } from '../../components/utilities/modal';
import styles from './ProjectSection.module.css';

export type ProjectData = {
  id: string;
  title: string;
  text: string;
  tags?: string[];
} & (
  | { imageSrc: string; customMedia?: never }
  | { imageSrc?: never; customMedia: React.ReactNode }
) & (
  | { link: string; modal?: never }
  | { link?: never; modal: {
      url: string;
      message?: string;
      openInNewWindow?: boolean;
    }}
);

interface ProjectSectionProps {
  projects: ProjectData[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    url: string;
    message?: string;
    openInNewWindow?: boolean;
  }>({
    isOpen: false,
    url: '',
  });

  const handleModalOpen = (modal: ProjectData['modal']) => {
    if (modal) {
      setModalState({
        isOpen: true,
        url: modal.url,
        message: modal.message,
        openInNewWindow: modal.openInNewWindow,
      });
    }
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      url: '',
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>Project Highlights</h2>
        {projects.map((project, index) => {
          const content = (
            <div className={styles.projectItem}>
              {index === 0 && (
                <div className={`${styles.borderLine} ${styles.topLine}`} />
              )}
              <div className={styles.projectContent}>
                <ProjectIntro
                  title={project.title}
                  text={project.text}
                  {...('customMedia' in project
                    ? { customMedia: project.customMedia }
                    : { imageSrc: project.imageSrc })}
                  tags={project.tags}
                  hasAction={!!project.link || !!project.modal}
                />
              </div>
              <div className={styles.borderLine} />
            </div>
          );

          if (project.link) {
            return (
              <Link key={project.id} href={project.link}>
                {content}
              </Link>
            );
          } else if (project.modal) {
            return (
              <div
                key={project.id}
                onClick={() => handleModalOpen(project.modal)}
                style={{ cursor: 'pointer' }}
              >
                {content}
              </div>
            );
          } else {
            return <div key={project.id}>{content}</div>;
          }
        })}
      </div>
      <ExternalSiteModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        url={modalState.url}
        message={modalState.message}
        openInNewWindow={modalState.openInNewWindow}
      />
    </>
  );
}