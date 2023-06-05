import { IconCameraFilled } from '@tabler/icons-react';
import { AppState } from './page';
import styles from './page.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { ElementSize, getElementSize } from '@/utils/getElementSize';

interface CameraControlsProps {
  appState: AppState;
  onStart: () => void;
  onTakePicture: () => void;
}

export default function CameraControls({
  appState,
  onStart,
  onTakePicture,
}: CameraControlsProps) {
  return (
    <div
      className={styles.cameraControlsOuterWrapper}
      style={{
        position: appState === 'ready' ? 'relative' : 'absolute',
        backgroundColor:
          appState === 'ready'
            ? 'var(--main-light)'
            : 'var(--main-light-opacity-4)',
      }}
    >
      <div className={styles.cameraControlsInnerWrapper}>
        {appState === 'ready' && (
          <div className={styles.helperText}>Take a picture of the check</div>
        )}

        <Button
          color="black"
          circle
          styles={{
            height: '56px',
            maxHeight: '56px',
            width: '56px',
            marginTop: 'auto',
            padding: '0',
          }}
          onClick={appState === 'ready' ? onStart : onTakePicture}
        >
          <IconCameraFilled />
        </Button>
      </div>
    </div>
  );
}
