define([
    // Vue.js
    'vue',
    // Layout templates
    'text!app/components/app/templates/navbar.html',
    'text!app/components/app/templates/header.html',
    'text!app/components/app/templates/footer.menu.html',
    'text!app/components/app/templates/footer.privacy.html',
], function (Vue, navbar, header, footer_menu, footer_privacy) {

    var App = Vue.extend({
        name: 'app',
        components: {
            'app-navbar': {
                template: navbar,
            },
            'app-header': {
                template: header
            },
            'app-footer-menu': {
                template: footer_menu
            },
            'app-footer-privacy': {
                template: footer_privacy
            },
        }
    })

    return App;
});
