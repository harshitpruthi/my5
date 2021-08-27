import React, { useState } from 'react';

import LazyLoad from 'react-lazyload';

const Image = (props: ImageProps) => {
  const { src, offset, height, addClass,
    width, alt, useLazyLoad, onClick } = props;

  let activeSrc = src;
  let activeClass = addClass;

  const [isErrorHandled, setErrorHandled] = useState(false);


  const handleBrokenImage = (e: any) => {
    if (props.handleBrokenImage && (!isErrorHandled)) {
      setErrorHandled(true);

      e.target.src = props.handleBrokenImage;
    }
  };


  if (useLazyLoad) {
    return (
      <LazyLoad height={height}
        once
        offset={offset}
      >
        <img
          onError={handleBrokenImage}
          className={activeClass}
          src={activeSrc || props.handleBrokenImage}
          width={width}
          height={height}
          alt={alt}
          onClick={onClick}
        />
      </LazyLoad>
    );

  } else {
    return (
      <img
        onError={handleBrokenImage}
        className={activeClass || props.handleBrokenImage}
        src={activeSrc}
        width={width}
        height={height}
        alt={alt}
        onClick={onClick}
      />
    );
  }
};


type RequiredProps = {
  height: string | number;
  width: string | number;
  alt: string;
  src: string;
}


type DefaultProps = {
  addClass: string;
  offset: number;
  handleBrokenImage: string;
  onClick: (e: any) => void;
  /** prop to determine if we want to use lazyload on image or not, by default it is true*/
  useLazyLoad: boolean;
}


type ImageProps = RequiredProps & DefaultProps;


Image.defaultProps = {
  offset: 800,
  addClass: '',
  srcDark: '',
  handleBrokenImage: '',
  useLazyLoad: true,
  onClick: () => { }
} as DefaultProps;


export default Image;
