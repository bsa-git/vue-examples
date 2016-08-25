define([], function () {

    var urlParser = document.createElement('a');

    // Methods
    var domain = function (url) {
        urlParser.href = url;
        return urlParser.hostname;
    };
    var fromNow = function (time) {
        var between = Date.now() / 1000 - Number(time);
        if (between < 3600) {
            return pluralize(Math.floor(between / 60), ' minute')
        } else if (between < 86400) {
            return pluralize(Math.floor(between / 3600), ' hour')
        } else {
            return pluralize(Math.floor(between / 86400), ' day')
        }
    };

    function pluralize(time, label) {
        if (time === 1) {
            return time + label;
        }

        return time + label + 's';
    }

    // Exposed public methods
    return {
        domain: domain,
        fromNow: fromNow
    }
});
