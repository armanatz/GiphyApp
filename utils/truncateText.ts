export default function truncateText(text: string, length: number = 25) {
  return `${text.slice(0, length - 1)}...`;
}
