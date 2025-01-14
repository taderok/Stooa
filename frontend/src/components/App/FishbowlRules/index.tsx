

import ArrowRight from '@/ui/svg/arrow-right.svg';
import { List, Title } from '@/components/App/FishbowlRules/styles';
import Button from '@/components/Common/Button';

const FishbowlRules = ({ action }) => {
  return (
    <>
      <Title className="title-sm">📐The 3 fishbowl rules</Title>
      <List>
        <li className="body-sm">
          Everyone is welcomed to participate both as a speaker and as an observer.
        </li>
        <li className="body-sm">
          Feel free to occupy a “seat” whenever you want to engage in the discussion.
        </li>
        <li className="body-sm">
          It should always be an empty “seat”. Should someone occupies a seat, another speaker
          should leave.
        </li>
      </List>
      <Button full onClick={action}>
        <span>Join the conversation</span>
        <ArrowRight />
      </Button>
    </>
  );
};

export default FishbowlRules;
