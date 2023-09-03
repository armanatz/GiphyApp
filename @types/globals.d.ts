import { GIFContentRatings } from './giphy';

export type GIFDetailsProps = {
  source?: string;
  title?: string;
  shortUrl?: string;
  rating?: GIFContentRatings;
  onImageLoadingStatusChange?: (imageStatus: ImageLoadingStatus) => void;
};

export type RootStackParams = {
  Home: undefined;
  Search: undefined;
  ViewGIF: Omit<GIFDetailsProps, 'onImageLoadingStatusChange'>;
};

export type ImageLoadingStatus = 'loading' | 'success';

export type SearchBarProps = {
  asButton?: boolean;
  onActivateSearch?: () => void;
  onCancelSearch?: () => void;
  onChangeText?: (value: string) => void;
};
