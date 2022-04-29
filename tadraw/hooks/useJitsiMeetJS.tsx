import {useCallback} from 'react';
import {JitsiMediaDevices} from '../types/JitsiMeetJS';

type Props = {
  onPresmissionChanged?: () => void;
  onPresmissionIsShow?: () => void;
  onUserMediaSlowPromiseTimout?: () => void;
  onDeviceListChanged?: (devices: JitsiMediaDevices[]) => void;
};
export default (initOptions: any) => {
  const init = useCallback((events?: Props) => {
    const {
      events: {
        mediaDevices: {
          PERMISSION_PROMPT_IS_SHOWN,
          USER_MEDIA_SLOW_PROMISE_TIMEOUT,
          PERMISSIONS_CHANGED,
        },
      },
    } = JitsiMeetJS;
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    JitsiMeetJS.init(initOptions);
    events?.onPresmissionIsShow &&
      JitsiMeetJS.mediaDevices.addEventListener(
        PERMISSION_PROMPT_IS_SHOWN,
        events.onPresmissionIsShow,
      );

    events?.onUserMediaSlowPromiseTimout &&
      JitsiMeetJS.mediaDevices.addEventListener(
        USER_MEDIA_SLOW_PROMISE_TIMEOUT,
        events.onUserMediaSlowPromiseTimout,
      );
    events?.onPresmissionChanged &&
      JitsiMeetJS.mediaDevices.addEventListener(
        PERMISSIONS_CHANGED,
        events.onPresmissionChanged,
      );

    events?.onDeviceListChanged &&
      JitsiMeetJS.mediaDevices.addEventListener(
        JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
        events.onDeviceListChanged,
      );
  }, []);

  return {init};
};
