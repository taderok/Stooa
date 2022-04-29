

import Layout from '@/layouts/Default';

const Error = ({ message }) => {
  return (
    <Layout>
      <p>Error: {message}</p>
    </Layout>
  );
};

export default Error;
