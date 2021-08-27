import React from 'react';

import ContentLoader from 'react-content-loader';

import Image from '../../../components/Image';
import { getDefaultProfileIcon } from './profileIconHelper';

const ProfileIcon = (props: Props) => {
  const {
    isLoading,
    userImg,
    userName,
    className,
    ...restProps
  } = props;

  if (isLoading) {
    return (
      <div className={`valign-wrapper ${className}`}>
        {getLoadingUI(props)}
      </div>
    );

  } else {
    const handleBrokenImg = getDefaultProfileIcon(userName);

    return (
      <Image
        src={handleBrokenImg}
        handleBrokenImage={handleBrokenImg}
        alt="profileImg"
        addClass={className}
        {...restProps}
      />
    );
  }
};


const getLoadingUI = ({ width, height }: Props) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      backgroundColor="var(--tertiaryBg)"
      foregroundColor="var(--preloaderBg)"
    >
      <circle
        cx={width / 2}
        cy={height / 2}
        r={height / 2}
      />
    </ContentLoader>
  );
};


type Props = {
  isLoading: boolean;
  userImg?: string;
  userName?: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}

const defaultProps: Props = {
  isLoading: false,
  userImg: '',
  userName: '',
  width: 32,
  height: 32
};

ProfileIcon.defaultProps = defaultProps;


export default React.memo(ProfileIcon);
