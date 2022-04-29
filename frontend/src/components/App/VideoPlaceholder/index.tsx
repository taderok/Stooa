

import NoCam from '@/ui/svg/no-cam.svg';
import Placeholder from '@/components/App/VideoPlaceholder/styles';

const VideoPlaceholder = ({ ...props }) => (
  <Placeholder {...props}>
    <NoCam />
  </Placeholder>
);

export default VideoPlaceholder;
