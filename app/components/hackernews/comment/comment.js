define([
    'vue',
    'app/components/hackernews/store',
    'text!app/components/hackernews/comment/comment.html',
    'css!app/components/hackernews/comment/comment.css'
], function (Vue, store, template) {

    // Create component class
    var Comment = Vue.extend({
        name: 'comment',
        template: template,
        props: {
            comment: Object
        },
        data: function () {
            return {
                childComments: [],
                open: true
            };
        },
        created: function () {
            if (this.comment.kids) {
                store.fetchItems(this.comment.kids).then(function (comments) {
                    this.childComments = comments;
                });
            }
        }
    });

    return Comment;
});


