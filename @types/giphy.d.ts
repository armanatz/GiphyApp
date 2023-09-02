export type GIFContentRatings = 'g' | 'pg' | 'pg-13' | 'r';

export type CommonImageObjectProps = {
  url: string;
  width: string;
  height: string;
};

export interface OriginalImageObjectProps extends CommonImageObjectProps {
  webp?: string;
}

export type ImagesObject = {
  downsampled: CommonImageObjectProps;
  fixed_height_small_still: CommonImageObjectProps;
  original: OriginalImageObjectProps;
};

export type GIFObject = {
  id: string;
  url: string;
  bitly_url: string;
  rating: GIFContentRatings;
  images: ImagesObject;
  title: string;
};

export type MetaObject = {
  msg: string;
  status: number;
  response_id: string;
};

export type PaginationObject = {
  offset: number;
  total_count: number;
  count: number;
};

interface BaseAPIResponse {
  meta: MetaObject;
}

export interface SingleGIFAPIResponse extends BaseAPIResponse {
  data: GIFObject;
}

export interface MultiGIFAPIResponse extends BaseAPIResponse {
  data: GIFObject[];
  pagination: PaginationObject;
}
