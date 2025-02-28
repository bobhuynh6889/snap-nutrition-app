/**
 * Parses nutrition facts from a string and returns an array of objects.
 * @param text - The input string containing the nutrition facts.
 * @returns Array of objects with { Nutrient: string, Value: string }
 */
export const parseNutritionFacts = (
  text: string,
): {Nutrient: string; Value: string}[] => {
  const nutritionFacts: {Nutrient: string; Value: string}[] = [];

  // Regular Expression to match each nutrient and its value
  const regex = /-\sNutrient:\s(.*?),\sValue:\s(.*?)$/gm;
  let match;

  while ((match = regex.exec(text)) !== null) {
    nutritionFacts.push({Nutrient: match[1].trim(), Value: match[2].trim()});
  }

  return nutritionFacts;
};
