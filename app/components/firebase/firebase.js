define([
    'vue',
    'firebase',
    'text!app/components/firebase/firebase.html',
], function (Vue, Firebase, template) {


    var baseURL = 'https://vue-demo.firebaseIO.com/'
    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var Users = null;

    // Create component class
    var FirebaseUsers = Vue.extend({
        name: 'firebase',
        sys: null,
        template: template,
        data: function () {
            return {
                users: [],
                newUser: {
                    name: '',
                    email: ''
                }
            }
        },
        created: function () {
            try
            {   
                // Set alias for sys
                this.$options.sys = this.$router.app.$options.sys;
                
                /**
                 * Setup firebase sync
                 */
                Users = new Firebase(baseURL + 'users');
                var self = this;
                Users.on('child_added', function (snapshot) {
                    var item = snapshot.val();
                    item.id = snapshot.key();
                    self.users.push(item);
                });

                Users.on('child_removed', function (snapshot) {
                    var id = snapshot.key();
                    self.users.some(function (user) {
                        if (user.id === id) {
                            self.users.$remove(user);
                            return true;
                        };
                    });
                });
            } catch (ex) {
                if (ex instanceof Error) {
                    this.$options.sys.onFailure(ex.name + ": " + ex.message);
                }

            }
        },
        // computed property for form validation state
        computed: {
            validation: function () {
                return {
                    name: !!this.newUser.name.trim(),
                    email: emailRE.test(this.newUser.email)
                };
            },
            isValid: function () {
                var validation = this.validation;
                return Object.keys(validation).every(function (key) {
                    return validation[key];
                });
            }
        },
        // methods
        methods: {
            addUser: function () {
                if (this.isValid) {
                    Users.push(this.newUser);
                    this.newUser.name = '';
                    this.newUser.email = '';
                }
            },
            removeUser: function (user) {
                new Firebase(baseURL + 'users/' + user.id).remove();
            }
        }
    });

    // Create and registration component
    Vue.component('firebase', FirebaseUsers);

    return FirebaseUsers;
});
