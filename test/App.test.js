import App from '../src/App.js';
import { renderComponent } from './TestHelper';
import { history } from '../src/store';

jest.mock('../src/actions/deploy.js', () => {}, { virtual: true });
jest.mock('../src/actions/explorer.js', () => {}, { virtual: true });
jest.mock('../src/actions/simExchange.js', () => {}, { virtual: true });
jest.mock('../src/actions/testQuery.js', () => {}, { virtual: true });

it('renders without crashing', () => {
  renderComponent(App, null, { history });
});
