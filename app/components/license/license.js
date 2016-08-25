define([
    'vue', 
    'marked',
    'text!LICENSE.md',
], function (Vue, marked, license) {

    // Create component class
    var License = Vue.extend({
        name: 'license',
        template:  '<div class="markdown-body">' + marked(license) + '</div>',
    })

    // Create and registration component
    Vue.component('license', License);
    
    return License;
});
