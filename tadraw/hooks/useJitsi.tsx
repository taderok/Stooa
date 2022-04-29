import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  JitsiConference,
  JitsiConnection,
  JitsiLocalTrack,
  JitsiMediaDeviceInfo,
  JitsiMediaDevices,
  JitsiRemoteTrack,
} from '../types/JitsiMeetJS';
import useJitsiConference, {IConferenceEvents} from './useJitsiConference';
import useJitsiConnection from './useJitsiConnection';
import useJitsiMeetJS from './useJitsiMeetJS';
import useJitsiOptions from './useJitsiOptions';

export default (roomName: string) => {
  const localTracks = useRef<JitsiLocalTrack[]>([]);
  const remoteTracks = useRef<{[key: string]: JitsiRemoteTrack[]}>({});
  const [isJoined, setIsJoined] = useState(false);
  const {initOptions} = useJitsiOptions();
  const {init} = useJitsiMeetJS(initOptions);

  const connectionEvents = useMemo(
    () => ({
      onConnectionDisconnected: () => {
        console.log('[Tadraw] onConnectionDisconnected');
        connection.current?.removeEventListener(
          JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
          connectionEvents.onConnectionEstablished,
        );
        connection.current?.removeEventListener(
          JitsiMeetJS.events.connection.CONNECTION_FAILED,
          connectionEvents.onConnectionFailed,
        );
        connection.current?.removeEventListener(
          JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
          connectionEvents.onConnectionFailed,
        );
      },
      onConnectionEstablished: (conn: JitsiConnection) => {
        connection.current = conn;
        initConfernce(connection.current)(roomName, conferenceEvents).then(
          c => {
            conference.current = c;
          },
        );
      },
      onConnectionFailed: () => {
        console.log('[Tadraw] onConnectionFailed');
      },
    }),
    [],
  );

  const remoteTrackEvents = useMemo(
    () => ({
      onAudioLevelChanged: (audioLevel: any) => {
        console.log(`[Tadraw] Audio Level remote: ${audioLevel}`);
      },
      onMuteChanged: () => {
        console.log('[Tadraw] remote track muted');
      },
      onAudioOutputChanged: (deviceId: string) => {
        console.log(
          `[Tadraw] track audio output device was changed to ${deviceId}`,
        );
      },
      onLocalTrackStopped: () => {
        console.log('[Tadraw] remote track stoped');
      },
    }),
    [],
  );

  const conferenceEvents: IConferenceEvents = useMemo(
    () => ({
      onConferenceJoined: () => {
        //DONE
        console.log('[Tadraw] onConferenceJoined');
        setIsJoined(true);
        localTracks.current.forEach((track, i) => {
          conference.current?.addTrack(track);
        });
      },
      onTrackAdded: (track: JitsiRemoteTrack) => {
        console.log('[Tadraw] onTrackAdded');

        //DONE
        if (track.isLocal()) {
          return;
        }
        const participant = track.getParticipantId();
        if (!remoteTracks.current[participant]) {
          remoteTracks.current[participant] = [];
        }

        const idx = remoteTracks.current[participant].push(track);

        track.addEventListener(
          JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
          remoteTrackEvents.onAudioLevelChanged,
        );
        track.addEventListener(
          JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
          remoteTrackEvents.onMuteChanged,
        );
        track.addEventListener(
          JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
          remoteTrackEvents.onLocalTrackStopped,
        );
        track.addEventListener(
          JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
          remoteTrackEvents.onAudioOutputChanged,
        );
        const id = participant + track.getType() + idx;

        if (track.getType() === 'video') {
          $('body').append(
            `<video autoplay='1' id='${participant}video${idx}' />`,
          );
        } else {
          $('body').append(
            `<audio autoplay='1' id='${participant}audio${idx}' />`,
          );
        }
        track.attach($(`#${id}`)[0]);
      },
      onUserJoined: (id: string) => {
        //DONE
        remoteTracks.current[id] = [];
        console.log('[Tadraw] onUserJoined');
      },
      onUserLeft: (id: string) => {
        console.log('[Tadraw] onUserLeft');
        //DONE
        if (!remoteTracks.current[id]) {
          return;
        }
        const tracks = remoteTracks.current[id];
        tracks.forEach((track, i) => {
          track.detach($(`#${id}${track.getType()}`));
        });
      },
      onDisplayNameChanged: (userID, displayName) => {
        console.log(`[Tadraw] onDisplayNameChanged ${userID} - ${displayName}`);
      },
      onPhoneNumberChanged: () => {
        () =>
          console.log(
            '[Tadraw] ' +
              `${conference.current?.getPhoneNumber()} - ${conference.current?.getPhonePin()}`,
          );
      },
      onTrackAudioLevelChanged: (userID, audioLevel) => {
        console.log(`[Tadraw] ${userID} - ${audioLevel}`);
      },
      onTrackMuteChnaged: track => {
        console.log(`[Tadraw] ${track.getType()} - ${track.isMuted()}`);
      },
      onTrackRemoved: track => {
        console.log(`[Tadraw] track removed!!!${track}`);
      },
    }),
    [],
  );

  const jitsiEvents = useMemo(
    () => ({
      onDeviceListChanged: (devices: JitsiMediaDevices[]) => {
        console.info('current devices', devices);
      },
    }),
    [],
  );

  const {initConnection} = useJitsiConnection();
  const {initConfernce} = useJitsiConference();
  const connection = useRef<JitsiConnection>();
  const conference = useRef<JitsiConference>();
  const onLocalTracks = useCallback(
    (tracks: JitsiLocalTrack[]) => {
      localTracks.current = tracks;
      localTracks.current.forEach((localTrack, i) => {
        if (localTrack.getType() === 'video') {
          $('body').append(`<video autoplay='1' id='localVideo${i}' />`);
          localTrack.attach($(`#localVideo${i}`)[0]);
        } else {
          $('body').append(
            `<audio autoplay='1' muted='true' id='localAudio${i}' />`,
          );
          localTrack.attach($(`#localAudio${i}`)[0]);
        }
        if (isJoined) {
          conference.current?.addTrack(localTrack);
        }
      });
    },
    [isJoined],
  );
  const createLocalTracks = () => {
    return JitsiMeetJS.createLocalTracks({devices: ['audio']})
      .then(onLocalTracks)
      .catch(error => {
        console.error(error);
      });
  };
  const [mediaDevices, setMediaDevices] = useState<JitsiMediaDeviceInfo[]>([]);
  const setupAudioDevices = useCallback(() => {
    if (!JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
      return;
    }
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
      setMediaDevices(devices);
      const audioOutputDevices = devices.filter(d => d.kind === 'audiooutput');
      if (audioOutputDevices.length > 1) {
        $('#audioOutputSelect').html(
          audioOutputDevices
            .map(d => `<option value="${d.deviceId}">${d.label}</option>`)
            .join('\n'),
        );

        $('#audioOutputSelectWrapper').show();
      }
    });
  }, []);

  const unload = () => {
    console.log('[Tadraw] unload');

    localTracks.current.forEach(track => {
      track.dispose();
    });
    conference.current?.leave();
    connection.current?.disconnect();
  };

  const changeAudioOutput = ({value}: {value: string}) => {
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(
      'VkmYi2Yb3fhxBCMe0cVeJBLh3LE5yW1Szua',
    );
  };

  const [isVideo, toggle] = useReducer(f => !f, true);

  const switchVideo = () => {
    toggle();
    if (localTracks.current[1]) {
      localTracks.current[1].dispose();
      localTracks.current.pop();
    }
    JitsiMeetJS.createLocalTracks({
      devices: [isVideo ? 'video' : 'desktop'],
    })
      .then(tracks => {
        localTracks.current.push(tracks[0]);
        localTracks.current[1].addEventListener(
          JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
          () => console.log('[Tadraw] local track muted'),
        );
        localTracks.current[1].addEventListener(
          JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
          () => console.log('[Tadraw] local track stoped'),
        );
        localTracks.current[1].attach($('#localVideo1')[0]);
        conference.current?.addTrack(localTracks.current[1]);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    init(jitsiEvents);
    initConnection(roomName, connectionEvents);
    createLocalTracks();
    setupAudioDevices();
    window.addEventListener('beforeunload', unload);
    window.addEventListener('unload', unload);
    //changeAudioOutput();
    return () => {
      window.removeEventListener('beforeunload', unload);
      window.removeEventListener('unload', unload);
    };
  }, []);
};
