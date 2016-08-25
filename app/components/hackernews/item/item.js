define([
    'vue',
    'text!app/components/hackernews/item/item.html',
    'css!app/components/hackernews/item/item.css'
], function (Vue, template) {

    // Create component class
    var Item = Vue.extend({
        name: 'item',
        template: template,
        props: {
            item: Object,
            index: Number
        },
        computed: {
            href: function () {
                return this.item.url || ('/hackernews/item/' + this.item.id)
            },
            showInfo: function () {
                return this.item.type === 'story' || this.item.type === 'poll'
            },
            showDomain: function () {
                return this.item.type === 'story'
            }
        }
    });

    return Item;
});

