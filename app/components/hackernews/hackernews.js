define([
    'vue',
    'app/components/hackernews/filters',
    'text!app/components/hackernews/hackernews.html',
    'css!app/components/hackernews/hackernews.css'
], function (Vue, filters, template) {

    // Create component class
    var Hackernews = Vue.extend({
        name: 'hackernews',
        template: template,
        created: function () {
            // register filters globally
            Vue.filter('fromNow', filters.fromNow);
            Vue.filter('domain', filters.domain);
        }
    });

    // Create and registration component
    Vue.component('hackernews', Hackernews);

    return Hackernews;
});
