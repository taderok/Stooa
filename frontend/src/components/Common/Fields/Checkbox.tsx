

import React from 'react';
import { Field, FieldAttributes, useField } from 'formik';

import { CheckboxStyled } from '@/ui/Form';
import { ValidationError } from '@/ui/Validation';

type Props = {
  label?: string;
} & FieldAttributes<Record<string, unknown>>;

const Checkbox: React.FC<Props> = ({ label, children, ...props }) => {
  const [field, meta] = useField<Record<string, unknown>>({ ...props, type: 'checkbox' });

  return (
    <CheckboxStyled>
      <Field
        className="switch-checkbox"
        {...field}
        {...props}
        type="checkbox"
        id={props.id || props.name}
      />
      {label && !children && (
        <label
          htmlFor={props.id || props.name}
          className="body-sm"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}
      {children && !label && (
        <label htmlFor={props.id || props.name} className="body-sm">
          {children}
        </label>
      )}
      {meta.touched && meta.error ? <ValidationError>{meta.error}</ValidationError> : null}
    </CheckboxStyled>
  );
};

export default Checkbox;
