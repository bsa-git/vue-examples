define([
    'vue',
    'app/components/hackernews/store',
    'text!app/components/hackernews/userview/userview.html',
    'css!app/components/hackernews/userview/userview.css'
], function (Vue, store, template) {

    // Create component class
    var UserView = Vue.extend({
        name: 'userview',
        template: template,
        props: {
            comment: Object
        },
        data: function () {
            return {
                user: {}
            }
        },
        route: {
            data: function (transition) {
                return {
                    user: store.fetchUser(transition.to.params.id)
                }
            },
        }
    });

    // Create and registration component
    Vue.component('userview', UserView);

    return UserView;
});

