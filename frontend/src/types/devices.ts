

import { Dispatch, SetStateAction } from 'react';

export interface Devices {
  audioOutputDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
}

export interface DevicesCtx {
  selectAudioOutputDevice: (deviceId: string) => void;
  selectAudioInputDevice: (deviceId: string) => void;
  selectVideoDevice: (deviceId: string) => void;
  setDevices: Dispatch<SetStateAction<Devices>>;
  audioOutputDevice: MediaDeviceInfo;
  audioInputDevice: MediaDeviceInfo;
  videoDevice: MediaDeviceInfo;
  devices: Devices;
}

export interface DevicesRepository {
  changeDevice: (device: MediaDeviceInfo) => Promise<void>;
  loadDevices: (callback: (newDevices: MediaDeviceInfo[]) => void) => void;
  clean: (callback: (newDevices: MediaDeviceInfo[]) => void) => void;
}
