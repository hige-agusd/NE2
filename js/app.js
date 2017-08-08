// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "https://code.jquery.com/jquery-3.2.1",
      "router": "../lib/router",
      "templater": "../lib/templater"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
