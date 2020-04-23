export const parseCookingTime = (timeInMinutes) => {
  if (typeof timeInMinutes !== 'number') {
    return null;
  } else if (timeInMinutes < 45) {
    return `${timeInMinutes} minutes`;
  } else {
    let hours = parseInt(timeInMinutes / 60);
    let minutes = timeInMinutes % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}hs`;
  }
};

export const parseInstructionsToHtml = (instructions) => {
  return instructions.replace(/\n/g, '<br />');
};

export const parseInstructionsFromHtml = (instructions) => {
  return instructions.replace(/<br \/>/g, '\n');
};
