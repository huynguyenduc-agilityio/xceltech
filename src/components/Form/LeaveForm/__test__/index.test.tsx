import { render } from '@testing-library/react';

// Components
import LeaveForm from '..';

const renderComponent = () => {
  return render(<LeaveForm />);
};

describe('LeaveForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
