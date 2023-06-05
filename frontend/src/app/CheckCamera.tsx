import { RefObject } from 'react';
import { AppState } from './page';
import styles from './page.module.css';
import { Overlay } from '@/components/Overlay/Overlay';

interface CheckCameraProps {
  appState: AppState;
  photoSrc: string;
  cameraRef: RefObject<HTMLVideoElement>;
}

export function CheckCamera({
  appState,
  photoSrc,
  cameraRef,
}: CheckCameraProps) {
  return (
    <div className={styles.cameraWrapper}>
      {appState === 'camera' && !photoSrc && (
        <video
          ref={cameraRef}
          autoPlay
          playsInline
          className={styles.videoImage}
        >
          Video stream not available.
        </video>
      )}
      {appState === 'processing' && photoSrc && (
        <img
          className={styles.videoImage}
          src={photoSrc}
          alt="Photo of the check"
        />
      )}

      {appState === 'processing' && <Overlay>Processing ...</Overlay>}
    </div>
  );
}
