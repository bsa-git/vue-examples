define(['vue', 'text!app/components/home/home.html'], function (Vue, template) {

    // Create component class
    var Home = Vue.extend({
        name: 'home',
        template: template,
    })

    // Create and registration component
    Vue.component('home', Home);
    
    return Home;
});
