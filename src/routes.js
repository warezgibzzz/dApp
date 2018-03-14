import * as Containers from './containers';
import Landing from './components/Landing';


export const routes = [
  {
    component: Landing,
    exact: true,
    path: '/',
  },
  {
    component: Containers.DeployContainer,
    path: '/contract/deploy',
  },
  {
    component: Containers.FindContainer,
    path: '/contract/find',
  },
  {
    component: Containers.ExplorerContainer,
    path: '/contract/explorer',
  },
  {
    component: Containers.SimExchangeContainer,
    path: '/exchange',
  },
  {
    component: Containers.TestQueryContainer,
    path: '/test',
  }
];
