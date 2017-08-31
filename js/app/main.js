define(["jquery", "jquery.alpha", "jquery.beta","templater","router"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
    });
    router();
});
