export function formatDate(value: number) {
    return `${new Date(value).toLocaleDateString('default', {
      month: 'short',
    })} ${new Date(value).getDate()}, ${new Date(value).getUTCFullYear()}`;
}
  
export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat(`en-NG`, {
    style: 'currency',

    currency: 'NGN',
  });

  const formattedAmount = formatter.format(amount);

  return formattedAmount;
}
  
  export function calculateStringSimilarity(str1: string, str2: string) {
    const len1 = str1.length;
    const len2 = str2.length;
  
    // Create a 2D array to store the Levenshtein distances
    const matrix = Array.from({ length: len1 + 1 }, () =>
      Array(len2 + 1).fill(0)
    );
  
    // Initialize the matrix with values corresponding to each character in the strings
    for (let i = 0; i <= len1; i++) {
      for (let j = 0; j <= len2; j++) {
        if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] =
            1 +
            Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        }
      }
    }
  
    // Calculate the percentage match
    const totalEdits = matrix[len1][len2];
    const maxLength = Math.max(len1, len2);
    const percentageMatch = ((maxLength - totalEdits) / maxLength) * 100;
  
    return +percentageMatch.toFixed(2);
  }
  