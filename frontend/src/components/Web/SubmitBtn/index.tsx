

import Button from '@/components/Common/Button';

const SubmitBtn = ({ text, disabled, ...props }) => {
  return (
    <Button size="large" type="submit" full {...props} disabled={disabled}>
      {text}
    </Button>
  );
};

export default SubmitBtn;
