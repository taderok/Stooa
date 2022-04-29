

const connectionOptions = roomName => ({
  hosts: {
    domain: process.env.NEXT_PUBLIC_XMPP_DOMAIN,
    anonymousdomain: process.env.NEXT_PUBLIC_XMPP_GUEST_DOMAIN,
    authdomain: process.env.NEXT_PUBLIC_XMPP_AUTH_DOMAIN,
    muc: process.env.NEXT_PUBLIC_XMPP_MUC_DOMAIN
  },
  serviceUrl: `wss://${process.env.NEXT_PUBLIC_JITSI_HOST}/xmpp-websocket?room=${process.env.NEXT_PUBLIC_JITSI_ROOM_PREFIX}${roomName}`,
  deploymentInfo: {}
});

const initOptions = { disableAudioLevels: true };
const roomOptions = {
  videoQuality: {
    preferredCodec: 'VP8'
  },
  p2p: {
    enabled: false,
    preferredCodec: 'VP8'
  }
};

export { connectionOptions, initOptions, roomOptions };
