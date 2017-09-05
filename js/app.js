// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "https://code.jquery.com/jquery-3.2.1",
      "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
      "router": "../lib/router",
      "templater": "../lib/templater",
      "carga": "../app/carga/carga"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
