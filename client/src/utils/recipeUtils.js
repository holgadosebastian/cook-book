export const parseCookingTime = (timeInMinutes) => {
  return `${timeInMinutes} minutes`;
};

export const parseInstructionsToHtml = (instructions) => {
  return instructions.replace(/\n/g, '<br />');
};

export const parseInstructionsFromHtml = (instructions) => {
  return instructions.replace(/<br \/>/g, '\n');
};
