const config = {
  PUBLIC_JITSI_HOST: '192.168.100.3:8243',
  PUBLIC_XMPP_DOMAIN: 'meet.jitsi',
  PUBLIC_XMPP_GUEST_DOMAIN: 'guest.meet.jitsi',
  PUBLIC_XMPP_MUC_DOMAIN: 'muc.meet.jitsi',
  PUBLIC_XMPP_AUTH_DOMAIN: 'auth.meet.jitsi',
};
export default () => {
  const connectionOptions = (roomName: string) => ({
    hosts: {
      domain: config.PUBLIC_XMPP_DOMAIN,
      authdomain: config.PUBLIC_XMPP_AUTH_DOMAIN,
      muc: config.PUBLIC_XMPP_MUC_DOMAIN,
    },
    serviceUrl: `wss://${config.PUBLIC_JITSI_HOST}/xmpp-websocket?room=${roomName}`,
    deploymentInfo: {},
  });
  const initOptions = {disableAudioLevels: true};
  const roomOptions = {
    videoQuality: {
      preferredCodec: 'VP8',
    },
    p2p: {
      enabled: false,
      preferredCodec: 'VP8',
    },
  };

  return {
    connectionOptions,
    initOptions,
    roomOptions,
  };
};
