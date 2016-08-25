define([
    'vue',
    'text!app/components/github/github.html',
    'css!app/components/github/github.css'
], function (Vue, template) {

    var apiURL = 'https://api.github.com/repos/bsa-git/silex-mvc/commits?per_page=5&sha=';

    // Create component class
    var GitHub = Vue.extend({
        name: 'github',
        template: template,
        data: function () {
            return {
                branches: ['master', 'gh-pages'],
                currentBranch: 'master',
                commits: null
            }
        },
        filters: {
            truncate: function (v) {
                var newline = v.indexOf('\n')
                return newline > 0 ? v.slice(0, newline) : v
            },
            formatDate: function (v) {
                return v.replace(/T|Z/g, ' ')
            }
        },
        created: function () {
            // Fetch data from GitHub
            this.fetchData()
        },
        watch: {
            currentBranch: 'fetchData'
        },
        methods: {
            fetchData: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                var currentBranch = self.$get('currentBranch') ? self.$get('currentBranch') : 'master';
                xhr.open('GET', apiURL + currentBranch)
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
//                    console.log(response);
                    self.$set('commits', response);
                }
                xhr.send()
            }
        }
    })

    // Create and registration component
    Vue.component('github', GitHub);

    return GitHub;
});
