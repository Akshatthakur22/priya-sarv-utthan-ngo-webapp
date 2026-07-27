/**
 * Convert numbers to words in English
 * Used for donation receipt amount display
 */

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const TEENS = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const SCALES = ["", "Thousand", "Lakh", "Crore"];

/**
 * Convert a number up to 999 to words
 */
function convertHundreds(num: number): string {
  let result = "";

  // Hundreds place
  if (num >= 100) {
    result += ONES[Math.floor(num / 100)] + " Hundred";
    num %= 100;
    if (num > 0) result += " ";
  }

  // Tens and ones
  if (num >= 20) {
    result += TENS[Math.floor(num / 10)];
    num %= 10;
    if (num > 0) result += " " + ONES[num];
  } else if (num >= 10) {
    result += TEENS[num - 10];
  } else if (num > 0) {
    result += ONES[num];
  }

  return result.trim();
}

/**
 * Convert a number to words using Indian numbering system
 * Supports up to 99,99,99,999 (nine crore ninety nine lakh ninety nine thousand nine hundred ninety nine)
 *
 * @param num - The number to convert
 * @returns The number in words
 */
export function formatNumberToWords(num: number): string {
  if (num === 0) return "Rupees Zero Only";

  if (num < 0) {
    return "Rupees Minus " + formatNumberToWords(-num).replace("Only", "").trim() + " Only";
  }

  // Split the number into groups of 2 digits (Indian system)
  const groups: number[] = [];

  // First group is last 3 digits
  groups.push(num % 1000);
  num = Math.floor(num / 1000);

  // Rest are groups of 2 digits
  while (num > 0) {
    groups.push(num % 100);
    num = Math.floor(num / 100);
  }

  // Convert groups to words
  const words: string[] = [];

  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;

    let groupWords = "";
    if (i === 0) {
      // Last group (0-999)
      groupWords = convertHundreds(groups[i]);
    } else {
      // Other groups (0-99)
      const tens = Math.floor(groups[i] / 10);
      const ones = groups[i] % 10;

      if (tens >= 2) {
        groupWords = TENS[tens];
        if (ones > 0) groupWords += " " + ONES[ones];
      } else if (tens === 1) {
        groupWords = TEENS[ones];
      } else if (ones > 0) {
        groupWords = ONES[ones];
      }
    }

    if (groupWords) {
      words.push(groupWords);
      if (i > 0) {
        words.push(SCALES[i]);
      }
    }
  }

  return "Rupees " + words.join(" ") + " Only";
}
