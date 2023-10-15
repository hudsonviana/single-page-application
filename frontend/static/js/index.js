import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';
import PostView from './views/PostView.js';

const pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: '/posts/:id/:dcode', view: PostView },
    { path: '/settings', view: Settings },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

  // 404
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  // disabled links
  const mainRoutePath = (routePath) => {
    let secondSlash = routePath.indexOf('/', routePath.indexOf('/') + 1);
    return routePath.substring(0, secondSlash !== -1 ? secondSlash : routePath.length);
  };

  const links = [...document.querySelectorAll('nav a')];
  links.forEach((link) => {
    if (link.getAttribute('href') === mainRoutePath(match.route.path)) link.classList.add('isDisabled');
    else link.classList.remove('isDisabled');
  });

  // Render View
  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
