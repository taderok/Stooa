

import ButtonJoin from '@/components/App/ButtonJoin';
import { render, screen } from '@testing-library/react';

describe('Unit test of button join', () => {
  it('should render the `button`', () => {
    render(<ButtonJoin />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
