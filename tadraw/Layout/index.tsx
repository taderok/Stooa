import {ReactNode} from 'react';
import {scriptLoader} from '../hoc/scriptLoader';
const scripts = ['/vendor/jquery.min.js', '/vendor/lib-jitsi-meet.min.js'];
interface Props {
  scriptsLoaded: boolean;
  scriptsLoadedSuccessfully: boolean;
  children: ReactNode;
}
const Layout: React.FC<Props> = ({
  scriptsLoaded,
  scriptsLoadedSuccessfully,
  children,
}) => {
  if (!scriptsLoaded) return <div> loading</div>;
  if (!scriptsLoadedSuccessfully) return <div>error</div>;

  return <>{children}</>;
};
export default scriptLoader(...scripts)(Layout);
