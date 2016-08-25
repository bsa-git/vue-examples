
define([
    'vue',
    'app/components/todo/store',
    'firebase_api',
    'text!app/components/todo/todo.html',
    'css!app/components/todo/todo.css',
], function (Vue, todoStorage, firebase, template) {


    // Config Firebase
    var config = {
        apiKey: "AIzaSyCGZtiqaw_wqp2zrJwxK5cNByyJnzeuhvU",
        authDomain: "fb-todos-eca60.firebaseapp.com",
        databaseURL: "https://fb-todos-eca60.firebaseio.com",
        storageBucket: "fb-todos-eca60.appspot.com",
    };
    var fbApp = null;
    var dbFirebase = null;

    // Filters
    var filters = {
        all: function (todos) {
            return todos;
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed;
            });
        }
    };

    var ToDo = Vue.extend({
        name: 'todo',
        template: template,
        data: function () {
            return {
                todos: [], //todoStorage.fetch(),
                newTodo: '',
                editedTodo: null,
                visibility: 'all'
            }
        },
        created: function () {
            // Initialize Firebase
            if (!fbApp) {
                fbApp = firebase.initializeApp(config);
                dbFirebase = fbApp.database();
            }
        },
        ready: function () {
            var self = this;
            var keys = todoStorage.fetch();
            var tasksRef = dbFirebase.ref().child('tasks');
            tasksRef.on('child_added', function (data) {
                if (_.findWhere(keys, {key: data.key})) {
                    var task = {title: data.val().title, completed: data.val().completed, key: data.key};
                    self.todos.push(task);
                }
            });

        },
        // watch todos change for localStorage persistence
        watch: {
            todos: {
                handler: function (todos) {
                    var keys = [];
                    todos.forEach(function (todo) {
                        keys.push({key: todo.key});
                    });

                    todoStorage.save(keys);
                },
                deep: true
            }
        },
        // computed properties
        // http://vuejs.org/guide/computed.html
        computed: {
            filteredTodos: function () {
                return filters[this.visibility](this.todos);
            },
            remaining: function () {
                return filters.active(this.todos).length;
            },
            allDone: {
                get: function () {
                    return this.remaining === 0;
                },
                set: function (value) {
                    var self = this;
                    this.todos.forEach(function (todo) {
                        todo.completed = value;
                        self.toggleCompleted(todo);
                    });
                }
            },
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            addTodo: function () {
                var value = this.newTodo && this.newTodo.trim();
                if (!value) {
                    return;
                }
                // New task
                var newTask = {title: value, completed: false};
                // Add task to Firebase
                var self = this;
                var newTaskRef = dbFirebase.ref().child('tasks').push();
                newTaskRef.set(newTask)
                        .then(function () {
                            newTask['key'] = newTaskRef.key;
                            self.todos.push(newTask);
                            self.newTodo = '';
                            console.log('Add task succeeded');
                        })
                        .catch(function (error) {
                            console.log('Add task failed');
                        });
            },
            removeTodo: function (todo) {
                var self = this;
                var taskRef = dbFirebase.ref('tasks/' + todo.key);
                taskRef.remove()
                        .then(function () {
                            self.todos.$remove(todo);
                            console.log("Task remove succeeded.")
                        })
                        .catch(function (error) {
                            console.log("Task remove failed: " + error.message)
                        });
            },
            editTodo: function (todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo;
            },
            doneEdit: function (todo) {
                if (!this.editedTodo) {
                    return;
                }
                this.editedTodo = null;
                var title = todo.title.trim();
                if (title) {
                    var taskRef = dbFirebase.ref('tasks/' + todo.key);
                    taskRef.update({title: title, completed: todo.completed})
                            .then(function () {
                                todo.title = title;
                                console.log("Task update succeeded.")
                            })
                            .catch(function (error) {
                                console.log("Task update failed: " + error.message)
                            });
                } else {
                    this.removeTodo(todo);
                }
            },
            cancelEdit: function (todo) {
                this.editedTodo = null;
                todo.title = this.beforeEditCache;
            },
            removeCompleted: function () {
                var self = this;
                var tasksCompleted = filters.completed(this.todos);
                tasksCompleted.forEach(function (todo) {
                    self.removeTodo(todo);
                });

            },
            setFilter: function (value) {
                this.visibility = value;
            },
            toggleCompleted: function (todo) {
                var taskRef = dbFirebase.ref('tasks/' + todo.key);
                taskRef.update({title: todo.title, completed: todo.completed})
                        .then(function () {
                            console.log("Toggle completed succeeded.")
                        })
                        .catch(function (error) {
                            console.log("Toggle completed failed: " + error.message)
                        });
            },
        },
        // a custom directive to wait for the DOM to be updated
        // before focusing on the input field.
        // http://vuejs.org/guide/custom-directive.html
        directives: {
            'todo-focus': function (value) {
                if (!value) {
                    return;
                }
                var el = this.el;
                Vue.nextTick(function () {
                    el.focus();
                });
            }
        }
    })

    Vue.component('todo', ToDo);

    return ToDo;
});

