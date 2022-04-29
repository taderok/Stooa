

import React from 'react';

import { Input } from '@/types/input';
import InputField from '@/components/Common/Fields/Input';

const Textarea: React.FC<Input> = props => (
  <InputField className="textarea" as="textarea" {...props} />
);

export default Textarea;
