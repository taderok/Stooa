import {useCallback, useRef} from 'react';
import {JitsiConnection} from '../types/JitsiMeetJS';
import useJitsiOptions from './useJitsiOptions';
type Events = {
  onConnectionEstablished: (connection: JitsiConnection) => void;
  onConnectionFailed: () => void;
  onConnectionDisconnected: () => void;
};
export default () => {
  const {connectionOptions} = useJitsiOptions();
  const rconnection = useRef<JitsiConnection>();
  const initConnection = useCallback((roomName: string, events: Events) => {
    const {
      events: {
        connection: {
          CONNECTION_ESTABLISHED,
          CONNECTION_FAILED,
          CONNECTION_DISCONNECTED,
        },
      },
    } = JitsiMeetJS;
    const connection = new JitsiMeetJS.JitsiConnection(
      null,
      null, //TODO:add auth
      connectionOptions(roomName),
    );

    connection.addEventListener(CONNECTION_ESTABLISHED, () => {
      console.log('[Tadraw] onConnectionEstablished');
      rconnection.current &&
        events.onConnectionEstablished(rconnection.current);
    });
    connection.addEventListener(CONNECTION_FAILED, events.onConnectionFailed);
    connection.addEventListener(
      CONNECTION_DISCONNECTED,
      events.onConnectionDisconnected,
    );
    rconnection.current = connection;
    connection.connect();
  }, []);

  return {initConnection};
};
