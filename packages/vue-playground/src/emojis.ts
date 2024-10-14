import shortcodes from 'emojibase-data/en/shortcodes/emojibase.json'
import { fromHexcodeToCodepoint } from 'emojibase'

/**
 * Find emoji by shortcode or tag
 * @param shortcode emoji shortcode
 * @returns emoji
 */
export function findEmojiByShortcode(shortcode: string): string | undefined {
  const element = Object.entries(shortcodes).find(
    ([, entry]) => entry === shortcode || (Array.isArray(entry) && entry.includes(shortcode)),
  )

  if (element) {
    return String.fromCodePoint(...fromHexcodeToCodepoint(element[0]))
  }
}
