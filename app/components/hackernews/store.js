define([
    'firebase',
    'events',
    'es6_promise'
], function (Firebase, EventEmitter, ES6Promise) {

    var api = new Firebase('https://hacker-news.firebaseio.com/v0');
    var itemsCache = Object.create(null);
    var store = new EventEmitter();
    var storiesPerPage = store.storiesPerPage = 30;

    var topStoryIds = [];


    /**
     * Subscribe to real time updates of the top 100 stories,
     * and cache the IDs locally.
     */
    api.child('topstories').on('value', function (snapshot) {
        topStoryIds = snapshot.val();
        store.emit('topstories-updated');
    });

    /**
     * Fetch an item data with given id.
     *
     * @param {Number} id
     * @return {Promise}
     */
    store.fetchItem = function (id) {
        return new ES6Promise.Promise(function (resolve, reject) {
            if (itemsCache[id]) {
                resolve(itemsCache[id]);
            } else {
                api.child('item/' + id).once('value', function (snapshot) {
                    var story = itemsCache[id] = snapshot.val();
                    resolve(story);
                }, reject);
            }
        });
    };

    /**
     * Fetch the given list of items.
     *
     * @param {Array<Number>} ids
     * @return {Promise}
     */
    store.fetchItems = function (ids) {
        if (!ids || !ids.length) {
            return ES6Promise.Promise.resolve([]);
        } else {
            return ES6Promise.Promise.all(ids.map(function (id) {
                return store.fetchItem(id);
            }));
        }
    };

    /**
     * Fetch items for the given page.
     *
     * @param {Number} page
     * @return {Promise}
     */
    store.fetchItemsByPage = function (page) {
        var start = (page - 1) * storiesPerPage;
        var end = page * storiesPerPage;
        var ids = topStoryIds.slice(start, end);
        return store.fetchItems(ids);
    };

    /**
     * Fetch a user data with given id.
     *
     * @param {Number} id
     * @return {Promise}
     */

    store.fetchUser = function (id) {
        return new ES6Promise.Promise(function (resolve, reject) {
            api.child('user/' + id).once('value', function (snapshot) {
                resolve(snapshot.val());
            }, reject);
        });
    };

    // Exposed public methods
    return store;
});


