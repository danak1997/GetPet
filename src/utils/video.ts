/**
 * https://github.com/bertyhell/video-to-frames
 */

export const getFrames = (videoUrl: string, amount: number): Promise<string[]> => {
  return new Promise((resolve: (frames: string[]) => void, reject: (error: string) => void) => {
    let frames: string[] = [];
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let duration: number;

    if (!context) return;

    let video = document.createElement('video');
    video.preload = 'auto';
    video.addEventListener('loadeddata', async function() {
      const { width, height } = calculateAspectRatioFit(video.videoWidth, video.videoHeight, 480, 320)
      canvas.width = width;
      canvas.height = height;

      duration = video.duration;

      let totalFrames: number = amount;
      for (let time = 0; time < duration; time += duration / totalFrames) {
        frames.push(await getVideoFrame(video, context as CanvasRenderingContext2D, time, canvas));
      }
      resolve(frames);
    });
    video.src = videoUrl;
    video.load();
  });
}

export const getVideoFrame = (video: HTMLVideoElement, context: CanvasRenderingContext2D, time: number, canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise((resolve: (frame: string) => void, reject: (error: string) => void) => {
    let eventCallback = () => {
      video.removeEventListener('seeked', eventCallback);
      storeFrame(video, context, resolve, canvas);
    };
    video.addEventListener('seeked', eventCallback);
    video.currentTime = time;
  });
}

export const storeFrame = (video: HTMLVideoElement, context: CanvasRenderingContext2D, resolve: (frame: string) => void, canvas: HTMLCanvasElement) => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  resolve(canvas.toDataURL('image/jpeg'));
}

 /**
  * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
  * images to fit into a certain area.
  *
  * @param {Number} srcWidth width of source image
  * @param {Number} srcHeight height of source image
  * @param {Number} maxWidth maximum available width
  * @param {Number} maxHeight maximum available height
  * @return {Object} { width, height }
  */
  function calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {

    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }
