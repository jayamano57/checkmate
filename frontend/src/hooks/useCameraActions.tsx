export function useCameraActions() {
  const initCamera = async (cameraRef: HTMLVideoElement | null) => {
    if (!cameraRef) throw new Error('Camera not initialized yet');

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraRef.srcObject = stream;
  };

  const takePicture = (
    cameraRef: HTMLVideoElement | null
  ): Promise<[Blob | null, string]> => {
    if (!cameraRef) throw new Error('Camera not initialized yet');

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const video = cameraRef;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext('2d')!
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve([blob, canvas.toDataURL()]);
      });
    });
  };

  return {
    initCamera,
    takePicture,
  };
}
