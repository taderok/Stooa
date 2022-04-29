

export interface User {
  id?: string;
  guestId?: string;
  nickname?: string;
  name?: string;
  audioInput?: MediaDeviceInfo;
  audioOutput?: MediaDeviceInfo;
  videoInput?: MediaDeviceInfo;
  audioMuted?: boolean;
  videoMuted?: boolean;
}

export interface UserRepository {
  clearUser: () => void;
  getUser: () => User;
  getUserAudioInput: () => MediaDeviceInfo | null;
  getUserAudioMuted: () => boolean;
  getUserAudioOutput: () => MediaDeviceInfo | null;
  getUserGuestId: () => string | null;
  getUserNickname: () => string | null;
  getUserVideoInput: () => MediaDeviceInfo | null;
  getUserVideoMuted: () => boolean;
  handleUserJoin: (id: string, user: User) => void;
  handleUserLeft: (id: string, user: User) => void;
  setUser: (value: User) => void;
  setUserAudioInput: (audioInput: MediaDeviceInfo) => void;
  setUserAudioMuted: (audioMuted: boolean) => void;
  setUserAudioOutput: (audioOutput: MediaDeviceInfo) => void;
  setUserVideoInput: (videoInput: MediaDeviceInfo) => void;
  setUserVideoMuted: (videoMuted: boolean) => void;
  setUserNickname: (nickname: string) => void;
}
