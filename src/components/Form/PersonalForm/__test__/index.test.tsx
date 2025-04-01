import { render } from '@testing-library/react';

// Components
import PersonalForm from '..';

const renderComponent = () => {
  return render(<PersonalForm />);
};

describe('PersonalForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
