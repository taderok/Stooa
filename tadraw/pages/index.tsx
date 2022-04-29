import type { NextPage } from 'next';
import useJitsi from '../hooks/useJitsi';

const Home: NextPage = () => {
  useJitsi('ghassen');
  return <h1>test</h1>;
};

export default Home;
