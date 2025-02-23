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

  export function calculatePetAge(dateOfBirth: string) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
  
    // Adjust for negative months or days
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
  
    // Calculate weeks
    const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
  
    // Format the result
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  }
  