import truncateText from './truncateText';

type RenderTitleOrUrlArgs = {
  type: 'title' | 'url';
  text: string | undefined;
  charLimit?: number;
};

export default function renderTitleOrUrl({
  type,
  text,
  charLimit = 30,
}: RenderTitleOrUrlArgs) {
  if (!text) {
    return type === 'title' ? 'GIF has no title' : 'GIF has no URL';
  }

  return text.length >= charLimit ? truncateText(text, charLimit) : text;
}
