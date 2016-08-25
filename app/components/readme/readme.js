define([
    'vue', 
    'marked',
    'text!README.md',
], function (Vue, marked, readme) {

    // Create component class
    var Readme = Vue.extend({
        name: 'readme',
        template:  '<div class="markdown-body">' + marked(readme) + '</div>',
    })

    // Create and registration component
    Vue.component('readme', Readme);
    
    return Readme;
});
