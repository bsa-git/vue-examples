define([
    'vue',
    'app/components/hackernews/store',
    'app/components/hackernews/item/item',
    'text!app/components/hackernews/newsview/newsview.html',
    'css!app/components/hackernews/newsview/newsview.css'
], function (Vue, store, Item, template) {

    // Create component class
    var NewsView = Vue.extend({
        name: 'newsview',
        template: template,
        components: {
            'item': Item
        },
        data: function () {
            return {
                page: 1,
                items: []
            }
        },
        route: {
            data: function (transition) {
                var self = this;
                // This is the route data hook. It gets called every time the route
                // changes while this component is active.
                // 
                // What we are doing:
                // 
                // 1. Get the `to` route ;
                // 2. Get the `page` param and cast it to a Number;
                // 3. Fetch the items from the store, which returns a Promise containing
                //    the fetched items;
                // 4. Chain the Promise and return the final data for the component.
                //    Note we are waiting until the items are resolved before resolving
                //    the entire object, because we don't want to update the page before
                //    the items are fetched.
                var page = +transition.to.params.page;
                store.fetchItemsByPage(page).then(function (items) {
                    self.page = page;
                    self.items = items;
                });
            },
        },
        created: function () {
            store.on('topstories-updated', this.update);
        },
        destroyed: function () {
            store.removeListener('topstories-updated', this.update);
        },
        methods: {
            update: function () {
                var self = this;
                store.fetchItemsByPage(this.page).then(function (items) {
                    self.items = items;
                });
            }
        },
        filters: {
            formatItemIndex: function (index) {
                return (this.page - 1) * store.storiesPerPage + index + 1;
            }
        }
    });

    // Create and registration component
    Vue.component('newsview', NewsView);

    return NewsView;
});

