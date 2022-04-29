type Options = {
  devices: string[];
};
export interface JitsiMeetJS {
  logLevels: {
    ERROR: any;
  };
  createLocalTracks: (options: Options) => Promise<JitsiLocalTrack[]>;
  setLogLevel: (loglevel: any) => any;
  init: (options: any) => any;
  JitsiConnection: any;
  mediaDevices: JitsiMediaDevices;
  events: {
    mediaDevices: {
      PERMISSION_PROMPT_IS_SHOWN: any;
      USER_MEDIA_SLOW_PROMISE_TIMEOUT: any;
      PERMISSIONS_CHANGED: any;
      DEVICE_LIST_CHANGED: any;
    };
    connection: JitsiConnection;
    conference: {
      TRACK_ADDED: any;
      CONFERENCE_JOINED: any;
      USER_JOINED: any;
      USER_LEFT: any;
      TRACK_REMOVED: any;
      TRACK_MUTE_CHANGED: any;
      DISPLAY_NAME_CHANGED: any;
      TRACK_AUDIO_LEVEL_CHANGED: any;
      PHONE_NUMBER_CHANGED: any;
    };
    track: {
      TRACK_AUDIO_LEVEL_CHANGED: any;
      TRACK_MUTE_CHANGED: any;
      LOCAL_TRACK_STOPPED: any;
      TRACK_AUDIO_OUTPUT_CHANGED: any;
    };
  };
  //Track : any
}
export interface JitsiMediaDevices {
  setAudioOutputDevice: (deviceId: string) => void;
  addEventListener: (eventName: string, handler: any) => any;
  isDeviceChangeAvailable: (a: 'input' | 'output' | undefined) => boolean;
  enumerateDevices: (cb: EnumerateDevicesCallback) => void;
}
export interface JitsiConnection {
  CONNECTION_ESTABLISHED: any;
  CONNECTION_FAILED: any;
  CONNECTION_DISCONNECTED: any;
  initJitsiConference: (roomName: string, roomOptions: any) => JitsiConference;
  disconnect: () => void;
  removeEventListener: (eventName: string, handler: any) => void;
}
export interface JitsiConference {
  join: () => any;
  on: (event: string, cb: ConferenceEventCallback) => any;
  setReceiverVideoConstraint: (n: number) => any;
  addTrack: (track: JitsiLocalTrack) => any;
  leave: () => void;
  getPhoneNumber: () => any;
  getPhonePin: () => any;
}
export interface JitsiTrack {
  getType: () => 'video' | 'audio';
  isMuted: () => boolean;
  attach: (container: HTMLElement) => void;
  detach: (container: JQuery<HTMLElement>) => void;
  getId: () => string;
  isLocal: () => boolean;
  addEventListener: (eventName: string, handler: any) => any;
}
export interface JitsiTrackError {}
export interface JitsiLocalTrack extends JitsiTrack {
  mute: () => Promise<any>;
  unmute: () => Promise<any>;
  dispose: () => Promise<any>;
}
export interface JitsiRemoteTrack extends JitsiTrack {
  getParticipantId: () => string;
}
export interface ConferenceEventCallback {
  (...args: any[]): any;
}

export interface JitsiMediaDeviceInfo {
  label: string;
  kind: 'audioinput' | 'videoinput' | 'audiooutput';
  deviceId: string;
  groupId: string;
}
export interface EnumerateDevicesCallback {
  (devices: JitsiMediaDeviceInfo[]): void;
}
