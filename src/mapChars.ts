const inputChars: string[] = 'a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9'.split(
  ' ',
);
const unicodeChars: string[] = '𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵'.split(
  ' ',
);

const mapped = {};

inputChars.forEach((char, index) => {
  mapped[char] = unicodeChars[index];
});

export function translate(input: string): string {
  const inputChars = input.split('');
  const outputChars = [];

  inputChars.forEach((char) => {
    outputChars.push(mapped[char] ?? char);
  });
  return outputChars.join('');
}
