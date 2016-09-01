requirejs.config({
    baseUrl: '',
    paths: {
        css: "app/js/lib/requirejs/css.min", //requirejs plugin for load css
        text: "app/js/lib/requirejs/text", //requirejs plugin for load text
        vue: 'app/js/lib/vue/vue.min',
        vue_router: 'app/js/lib/vue-router/vue-router.min',
        marked: 'app/js/lib/marked/marked.min',
        firebase: 'app/js/lib/firebase/firebase',
        firebase_api: 'app/js/lib/firebase/firebase.api',
        underscore: 'app/js/lib/underscore/underscore.min',
        extend_class: 'app/js/lib/ExtendClass/Extend.class',
        storage: 'app/js/lib/jstorage/jstorage.min',
        json: 'app/js/lib/json/json2',
        events: 'app/js/lib/events/events',
        es6_promise: 'app/js/lib/es6-promise/es6-promise.min',
    },
    shim: {
        'vue_router': {
            exports: 'VueRouter',
        },
        'firebase': {
            exports: 'Firebase',
        },
        'firebase_api': {
            exports: 'firebase',
        },
        'underscore': {
            exports: '_'
        },
        'json': {
            exports: 'JSON'
        },
        'storage': {
            deps: ['json']
        },
        'events': {
            exports: 'EventEmitter'
        },
        'app/components/app/app': {
            deps: ['extend_class', 'underscore', 'storage']
        },
    }
});
require([
    // Vue.js
    'vue',
    // Vue-Router
    'app/js/lib/vue-router/vue-router.min',
    // Components
    'app/components/app/app',
    'app/components/home/home',
    'app/components/readme/readme',
    'app/components/license/license',
    'app/components/todo/todo',
    'app/components/markdown/markdown',
    'app/components/github/github',
    'app/components/firebase/firebase',
    'app/components/grid/grid',
    'app/components/hackernews/hackernews',
    'app/components/hackernews/newsview/newsview',
    'app/components/hackernews/itemview/itemview',
    'app/components/hackernews/userview/userview',
],
        function (Vue, VueRouter, App, Home, Readme, License, ToDo, Markdown, GitHub, FirebaseUsers, Grid, Hackernews, NewsView, ItemView, UserView) {

//            Vue.config.devtools = false;

            // Use plugin - VueRouter
            Vue.use(VueRouter);
            // create a router instance
            var router = new VueRouter();
            // define some routes.
            router.map({
                '/': {
                    name: 'home',
                    component: Home,
                    title: 'Home'
                },
                '/home': {
                    name: 'home',
                    component: Home,
                    title: 'Home'
                },
                '/readme': {
                    name: 'readme',
                    component: Readme,
                    title: 'Readme.md',
                },
                '/license': {
                    name: 'license',
                    component: License,
                    title: 'License.md'
                },
                '/todo': {
                    name: 'todo',
                    component: ToDo,
                    title: 'ToDo MVC',
                    test: true
                },
                '/markdown': {
                    name: 'markdown',
                    component: Markdown,
                    title: 'Markdown Editor',
                    test: true
                },
                '/github': {
                    name: 'github',
                    component: GitHub,
                    title: 'GitHub Commits',
                    test: true
                },
                '/firebase': {
                    name: 'firebase',
                    component: FirebaseUsers,
                    title: 'Firebase + Validation',
                    test: true
                },
                '/grid': {
                    name: 'firebase',
                    component: Grid,
                    title: 'Grid Component',
                    test: true
                },
                '/hackernews': {
                    name: 'hackernews',
                    component: Hackernews,
                    title: 'Hacker News',
                    test: true,
                    subRoutes: {
                        '/news/:page': {
                            component: NewsView
                        },
                        '/user/:id': {
                            component: UserView
                        },
                        '/item/:id': {
                            component: ItemView
                        }
                    },
                },
            });

            // Global before hook to the router,
            // which will be called before 
            // every route transition starts
            router.beforeEach(function () {
                router.app.$options.sys.resetMsg();
            })

            // now we can start the app!
            // router will create an instance of App and mount to
            // the element matching the selector #app.
            router.start(App, 'body');

        });
