import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App.js';
import { renderComponent } from './test_helper';
import { history } from '../store';

enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  renderComponent(App, null, { history });
});
