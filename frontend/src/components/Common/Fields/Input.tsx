

import React from 'react';
import { Field, useField } from 'formik';

import { Input } from '@/types/input';
import { InputStyled } from '@/ui/Form';
import { ValidationError, ValidationIcon } from '@/ui/Validation';
import Icon from '@/components/Common/Fields/Icon';

const InputField: React.FC<Input> = ({
  className = '',
  label,
  variant = 'default',
  help,
  icon,
  as = 'input',
  validation = true,
  ...props
}) => {
  const [field, meta] = useField(props);
  const isFilled = meta.value ? meta.value.toString().trim().length !== 0 : false;
  const isValid = validation && meta.touched && !meta.error;
  const isInvalid = validation && meta.touched && meta.error;

  return (
    <InputStyled
      className={`${className} ${variant !== 'default' ? variant : ''} ${icon ? 'withicon' : ''}`}
    >
      {icon && <Icon variant={icon} className="icon" />}
      <Field
        {...field}
        {...props}
        as={as}
        className={`${isFilled || props.placeholder ? 'filled' : ''} ${isInvalid ? 'invalid' : ''}`}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {isValid && (
        <ValidationIcon>
          <Icon variant="checkmark" />
        </ValidationIcon>
      )}
      {isInvalid && (
        <>
          <ValidationIcon>
            <Icon variant="cross" />
          </ValidationIcon>
          <ValidationError>{meta.error}</ValidationError>
        </>
      )}
      {help && <p className="help body-sm">{help}</p>}
    </InputStyled>
  );
};

export default InputField;
