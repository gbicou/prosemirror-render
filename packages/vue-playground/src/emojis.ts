import emojis from "emojibase-data/en/compact.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import { type CompactEmoji, joinShortcodes } from "emojibase";

export const emojisCodes = joinShortcodes(emojis, [shortcodes]);

/**
 * Find emoji by shortcode or tag
 * @param shortcode emoji shortcode
 * @returns emoji
 */
export function findEmojiByShortcode(shortcode: string): CompactEmoji | undefined {
  return (
    emojisCodes.find((emoji) => emoji.shortcodes?.includes(shortcode)) ||
    emojisCodes.find((emoji) => emoji.tags?.includes(shortcode))
  );
}
