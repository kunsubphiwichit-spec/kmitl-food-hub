const THAI_PROFANITY = [
  'ควาย', 'สัตว์', 'ไอ้', 'อีสัตว์', 'เชี่ย', 'สัส', 'หน้าหี', 'หน้าสัส', 'สัตว์เดรัจฉาน', 'ไอ้สัตว์', 'มึง', 'กู', 'แม่ง', 'เย็ด', 'หี', 'เหี้ย', 'อีหน้าหี', 'ไอ้ควาย', 'แรด'
];

const ENGLISH_PROFANITY = [
  'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'bastard', 'motherfucker', 'whore', 'slut', 'faggot', 'nigger', 'cock', 'twat'
];

export function checkProfanity(text: string): { hasProfanity: boolean; flaggedWords: string[] } {
  const flaggedWords: string[] = [];
  const lowerText = text.toLowerCase();

  [...THAI_PROFANITY, ...ENGLISH_PROFANITY].forEach((word) => {
    // Basic check for partial match
    if (lowerText.includes(word.toLowerCase())) {
      flaggedWords.push(word);
    }
  });

  return {
    hasProfanity: flaggedWords.length > 0,
    flaggedWords,
  };
}

export function sanitizeText(text: string): string {
  let sanitized = text;
  const { flaggedWords } = checkProfanity(text);
  
  flaggedWords.forEach((word) => {
    const regex = new RegExp(word, 'gi');
    sanitized = sanitized.replace(regex, '*'.repeat(word.length));
  });

  return sanitized;
}
