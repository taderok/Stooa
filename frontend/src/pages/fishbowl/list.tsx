

import FishbowlList from '@/components/App/FishbowlList';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = dynamic(import('@/layouts/Default'), { loading: () => <div /> });

const List = () => {
  return (
    <Layout>
      <FishbowlList />
      <ToastContainer className="toastify-custom" />
    </Layout>
  );
};

export default List;
