import { RESUME_PATH, RESUME_FILENAME } from '@/constants';
import { trackEvent } from './analytics';

/**
 * Verifies the resume is reachable then triggers a browser download.
 * To swap the file, update RESUME_PATH in src/constants/index.ts — no component changes required.
 */
export async function downloadResume(): Promise<void> {
  const response = await fetch(RESUME_PATH, { method: 'HEAD' });
  if (!response.ok) {
    throw new Error(`Resume not available (HTTP ${response.status})`);
  }

  const anchor = document.createElement('a');
  anchor.href = RESUME_PATH;
  anchor.download = RESUME_FILENAME;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  trackEvent('resume_download', { filename: RESUME_FILENAME });
}
