'use client';

import styles from './page.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCameraActions } from '@/hooks/useCameraActions';
import { CheckCamera } from './CheckCamera';
import { FindCheck } from './FindCheck';
import CameraControls from './CameraControls';
import { ocrService } from '@/services/ocr/ocr.service';
import { v4 as uuid } from 'uuid';
import { getCheckId } from '@/utils/getCheckId';
import { useRouter } from 'next/navigation';
import { checkService } from '@/services/check/check.service';

export type AppState = 'ready' | 'camera' | 'processing';

export default function Home() {
  const router = useRouter();

  const { initCamera, takePicture } = useCameraActions();

  const cameraRef = useRef<HTMLVideoElement>(null);

  const [appState, setAppState] = useState<AppState>('ready');
  const [photoSrc, setPhotoSrc] = useState('');

  const showVideo = useMemo(() => {
    return appState === 'camera' || appState === 'processing';
  }, [appState]);

  const handleInitCamera = async () => {
    try {
      await initCamera(cameraRef.current);
    } catch (error) {
      setAppState('ready');
    }
  };

  const handleTakePicture = async () => {
    // setAppState('ready');
    const [blob, src] = await takePicture(cameraRef.current);
    setPhotoSrc(src);
    processPicture(blob);
  };

  const processPicture = async (file: Blob | null) => {
    if (!file) return;
    setAppState('processing');

    const checkId = getCheckId();

    // Upload check image
    const image = await checkService.uploadCheckImage(checkId, file);

    const data = await ocrService.analyze(image);

    await checkService.addCheck({
      id: checkId,
      finalized: false,
      image,
      paymentMethod: {
        venmo: null,
        zelle: null,
      },
      items: data.lineItems.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
        id: uuid(),
        owner: null,
        claimedCount: 0,
      })),
      totalAmount: data.totalAmount.value ?? null,
      totalNet: data.totalNet.value ?? null,
      totalTax: data.totalTax.value ?? null,
      tip: data.tip?.value ?? null,
      message: null,
      buyer: null,
      partySize: null,
    });

    router.push(`/${checkId}`);
  };

  useEffect(() => {
    // We need to first show the video el in order to use the video ref.
    if (appState === 'camera') {
      handleInitCamera();
    }
  }, [appState]);

  return (
    <main className={styles.main}>
      {appState === 'ready' && <FindCheck />}

      {showVideo && (
        <CheckCamera
          appState={appState}
          photoSrc={photoSrc}
          cameraRef={cameraRef}
        />
      )}

      {/* CMP - MAIN ACTIONS */}
      <CameraControls
        appState={appState}
        onStart={() => setAppState('camera')}
        onTakePicture={handleTakePicture}
      />
      {/*  */}
    </main>
  );
}
