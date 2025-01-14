

import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { pushEventDataLayer } from '@/lib/analytics';
import userRepository from '@/jitsi/User';
import VideoIcon from '@/ui/svg/video.svg';
import VideoMutedIcon from '@/ui/svg/video-muted.svg';
import Button from '@/components/App/ButtonVideo/styles';

interface Props {
  joined: boolean;
  disabled: boolean;
  unlabeled?: boolean;
  handleVideo?: (value?: boolean) => void;
}

const ButtonVideo: React.FC<Props> = ({ handleVideo, joined, disabled, unlabeled }) => {
  const [active, setActive] = useState(true);
  const [muted, setMuted] = useState(userRepository.getUserVideoMuted());
  const { t } = useTranslation('fishbowl');

  const handleOnClick = async () => {
    const currentMutedState = muted;
    setActive(false);

    pushEventDataLayer({
      action: muted ? 'Video Unmute' : 'Video Mute',
      category: 'Buttons',
      label: window.location.href
    });

    userRepository.setUserVideoMuted(!currentMutedState);
    setMuted(!currentMutedState);
    typeof handleVideo === 'function' && handleVideo(!currentMutedState);
    setActive(true);
  };

  return (
    <Button
      className={`body-sm ${muted ? 'muted' : ''}`}
      onClick={handleOnClick}
      disabled={disabled}
      active={active}
    >
      <div className="button">{muted || disabled ? <VideoMutedIcon /> : <VideoIcon />}</div>
      {!unlabeled && (
        <span className="text medium">{!joined || muted ? t('videoUnmute') : t('videoMute')}</span>
      )}
    </Button>
  );
};

export default ButtonVideo;
