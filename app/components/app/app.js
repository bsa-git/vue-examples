define([
    // Vue.js
    'vue',
    // Layout templates
    'text!app/components/app/templates/navbar.html',
    'text!app/components/app/templates/header.html',
    'text!app/components/app/templates/msgbox.html',
    'text!app/components/app/templates/footer.menu.html',
    'text!app/components/app/templates/footer.privacy.html',
], function (Vue, navbar, header, msgbox, footer_menu, footer_privacy) {

    var App = Vue.extend({
        name: 'app',
        ready: function () {

            this.$options.methods.getComp = _.bind(this.$options.methods.getComp, this);

//            this.$options.methods.setMsg({
//                type: 'danger',
//                title: 'Ошибка',
//                msg: 'Прошу внимание... ОШИБКА!!!'
//            });
        },
        data: function () {
            return {
                users: [1, 2],
            }
        },
        // methods
        methods: {
            getComp: function (name, childrens) {
                var result = null;
                var self = this;
                var childrens_ = childrens ? childrens : this.$children;
                _.each(childrens_, function (children) {

                    if (children.$children.length) {
                        self.getComp(name, children.$children);
                    }

                    if (children.$options.name === name) {
                        result = children;
                        return;
                    }

                });
                return result;
            },
            setMsg: function (params) {
                var msgbox = this.getComp('app-msgbox');
                msgbox.$set('type', params.type);
                msgbox.$set('title', params.title);
                msgbox.$set('msg', params.msg);
            }
        },
        components: {
            'app-navbar': {
                name: 'app-navbar',
                template: navbar,
            },
            'app-header': {
                name: 'app-header',
                template: header
            },
            'app-msgbox': {
                name: 'app-msgbox',
                template: msgbox,
                data: function () {
                    return {
                        type: '',
                        title: '',
                        msg: ''
                    }
                },
            },
            'app-footer-menu': {
                name: 'app-footer-menu',
                template: footer_menu
            },
            'app-footer-privacy': {
                name: 'app-footer-privacy',
                template: footer_privacy
            },
        }
    })

    return App;
});
