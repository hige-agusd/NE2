// A hash to store our routes:
var routes = {};
// The route registering function:
function route (path, templateId, controller) {
  routes[path] = {templateId: templateId, controller: controller};
}

route('/', 'home', function () {});
route('/login', 'login', function () {});
route('/page1', 'template1', function () {
    this.greeting = 'Hello world!';
    this.moreText = 'Bacon ipsum...';
});
route('/carga', 'carga', function () {
  console.log('carrrrga')
  requirejs(["carga"], function() { });
});
route('/page2', 'template2', function () {
    this.heading = 'I\'m page two!';
});

var el = null;
function router () {
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Do we have both a view and a route?
    if (el && route.controller && route.templateId) {
        // Render route template with John Resig's template engine:
        el.innerHTML = tmpl(route.templateId, new route.controller());
    }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
