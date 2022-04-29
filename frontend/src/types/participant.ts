

export interface Participant {
  id: string;
  name: string;
  linkedin: string;
  twitter: string;
  isModerator: boolean;
  isCurrentUser: boolean;
  guestId?: string;
  joined: boolean;
  isMuted: boolean;
  isVideoMuted: boolean;
}
