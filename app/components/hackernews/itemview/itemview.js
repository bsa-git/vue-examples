define([
    'vue',
    'app/components/hackernews/store',
    'app/components/hackernews/item/item',
    'app/components/hackernews/comment/comment',
    'text!app/components/hackernews/itemview/itemview.html',
    'css!app/components/hackernews/itemview/itemview.css'
], function (Vue, store, Item, Comment, template) {

    // Create component class
    var ItemView = Vue.extend({
        name: 'itemview',
        template: template,
        components: {
            'item': Item,
            'comment': Comment
        },
        data: function () {
            return {
                item: {},
                comments: [],
                pollOptions: null
            };
        },
        route: {
            data: function (transition) {
                var self = this;
                return store.fetchItem(transition.to.params.id).then(function (item) {
                    self.item = item;
                    store.fetchItems(item.kids).then(function (comments) {
                        self.comments = comments
                    });
                    if(item.type === 'poll'){
                        store.fetchItems(item.parts).then(function (pollOptions) {
                        self.pollOptions =  pollOptions;
                    });
                    }else{
                        self.pollOptions = null;
                    }
                });

            },
        },
        computed: {
            isJob: function () {
                return this.item.type === 'job'
            },
            hasText: function () {
                return this.item.hasOwnProperty('text')
            }
        }
    });

    // Create and registration component
    Vue.component('itemview', ItemView);

    return ItemView;
});

