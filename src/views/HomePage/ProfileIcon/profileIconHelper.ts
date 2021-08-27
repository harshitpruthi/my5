export const getDefaultProfileIcon = (userName?: string) => {
  let handleBrokenImg = null;

  if (userName) {
    handleBrokenImg = getProfileAlternateImg(userName);
  }

  // if ((handleBrokenImg)) {
  //   const defaultImgSrc = 'user_dark';

  //   handleBrokenImg = require(`./images/${defaultImgSrc}.svg`).default;
  // }

  return handleBrokenImg;
};


const getProfileAlternateImg = (userName: string) => {
  let alternateImg = require(`./images/letter_image/${userName.charAt(0).toLowerCase()}.svg`).default;

  const firstLetter = userName.charAt(0).toLowerCase();

  if (/^[a-z]/.test(firstLetter)) {
    alternateImg = require(`./images/letter_image/${firstLetter}.svg`).default;

  } else {
    alternateImg = require('./images/user_dark.svg').default;

  }

  return alternateImg;
};
