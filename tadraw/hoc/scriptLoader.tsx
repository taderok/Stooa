import hoistStatics from 'hoist-non-react-statics';
import {useEffect, useRef, useState} from 'react';
export const cachedScripts: any[] = [];

export const scriptLoader =
  (...srcs: string[]) =>
  (WrappedComponent: any) => {
    const ScriptLoader = (props: any) => {
      const [scriptsLoaded, setScriptsLoaded] = useState(false);
      const [scriptsLoadedSuccessfully, setScriptsLoadedSuccessfully] =
        useState(false);
      const isMounted = useRef(false);

      const loadScript = (src: string) => {
        cachedScripts.push(src);

        const script = document.createElement('script');
        script.src = src;
        script.async = false;

        const promise = new Promise((resolve, reject) => {
          script.addEventListener('load', () => resolve(src));
          script.addEventListener('error', e => reject(e));
        }).catch(e => {
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          throw e;
        });

        document.body.appendChild(script);

        return promise;
      };
      useEffect(() => {
        isMounted.current = true;
        const promises = srcs
          .filter(src => !cachedScripts.includes(src))
          .map(src => loadScript(src));

        let success = true;
        Promise.all(promises)
          .catch(() => {
            success = false;
          })
          .then(() => {
            if (!isMounted.current) {
              return;
            }
            setScriptsLoaded(true);
            setScriptsLoadedSuccessfully(success);
          });
        return () => {
          isMounted.current = false;
        };
      }, []);

      return (
        <WrappedComponent
          {...{...props, scriptsLoaded, scriptsLoadedSuccessfully}}
        />
      );
    };

    return hoistStatics(ScriptLoader, WrappedComponent);
  };
