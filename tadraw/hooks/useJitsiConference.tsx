import {useCallback} from 'react';
import {JitsiConnection, JitsiTrack} from '../types/JitsiMeetJS';
import useJitsiOptions from './useJitsiOptions';

export interface IConferenceEvents {
  onTrackAdded: (track: any) => void;
  onConferenceJoined: () => void;
  onUserJoined: (id: string) => void;
  onUserLeft: (id: string) => void;
  onTrackRemoved: (track: JitsiTrack) => void;
  onDisplayNameChanged: (userID: string, displayName: string) => void;
  onPhoneNumberChanged: () => void;
  onTrackAudioLevelChanged: (userID: string, audioLevel: string) => void;
  onTrackMuteChnaged: (track: JitsiTrack) => void;
}
export default () => {
  const {roomOptions} = useJitsiOptions();
  const initConfernce = useCallback(
    (connection: JitsiConnection) =>
      (roomName: string, events: IConferenceEvents) => {
        const conference = connection.initJitsiConference(
          roomName,
          roomOptions,
        );
        conference.on(
          JitsiMeetJS.events.conference.TRACK_ADDED,
          events.onTrackAdded,
        );
        conference.on(
          JitsiMeetJS.events.conference.CONFERENCE_JOINED,
          events.onConferenceJoined,
        );
        conference.on(
          JitsiMeetJS.events.conference.USER_JOINED,
          events.onUserJoined,
        );
        conference.on(
          JitsiMeetJS.events.conference.USER_LEFT,
          events.onUserLeft,
        );
        conference.on(
          JitsiMeetJS.events.conference.TRACK_REMOVED,
          events.onTrackRemoved,
        );

        conference.on(
          JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
          events.onTrackMuteChnaged,
        );
        conference.on(
          JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
          events.onDisplayNameChanged,
        );
        conference.on(
          JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
          events.onTrackAudioLevelChanged,
        );
        conference.on(
          JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
          events.onPhoneNumberChanged,
        );

        conference.join();

        conference.setReceiverVideoConstraint(720);
        return Promise.resolve(conference);
      },
    [],
  );

  return {initConfernce};
};
