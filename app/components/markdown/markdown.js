define([
    'vue',
    'marked',
    'text!app/components/markdown/markdown.html',
    'css!app/components/markdown/markdown.css'
], function (Vue, marked, template) {

    // Create component class
    var Markdown = Vue.extend({
        name: 'markdown',
        template: template,
        data: function () {
            return {
                input: ''
            }
        },
        filters: {
            marked: marked
        },
        created : function () {
            this.$set('input', '# Hello!');
        }
    })

    // Create and registration component
    Vue.component('markdown', Markdown);

    return Markdown;
});
