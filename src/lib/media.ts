import type { MediaItem } from './media-types';
import { allMedia as allMediaData } from './all-media';

export type { MediaItem };

export const allMedia: MediaItem[] = allMediaData;

export const fairs = [...new Set(allMedia.map((item) => item.fair).filter(f => f !== 'todas_feiras'))].sort((a, b) => a.localeCompare(b));
export const styles = [...new Set(allMedia.map((item) => item.style))].sort((a, b) => a.localeCompare(b));
