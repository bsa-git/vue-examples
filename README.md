# Vue-Examples

In this application, demonstrated some remarkable possibilities of the library [Vue.js](http://vuejs.org/).

Main features of the Vue.js:

- Reactivity.
- Components .
- Modularity.
- Animations.
- Routing.
- Stability.


## [Learn more...](http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/)

## Installing

### Compatibility Note

Vue.js does not support IE8 and below, because Vue.js uses ECMAScript 5 features 
that are un-shimmable in IE8. However Vue.js supports all [ECMAScript 5 compliant browsers](http://caniuse.com/#feat=es5).

### Release Notes

Detailed release notes for each version are available on [GitHub](https://github.com/vuejs/vue/releases).

### CDN
Available on [jsdelivr](http://cdn.jsdelivr.net/vue/1.0.26/vue.min.js) or 
[cdnjs](http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js) 
(takes some time to sync so the latest version might not be available yet).

Also available on [npmcdn](https://npmcdn.com/vue/dist/vue.min.js), 
which will reflect the latest version as soon as it is published to npm. 
You can also browse the source of the npm package at [npmcdn.com/vue/](https://npmcdn.com/vue/).

## Overview

Vue.js (pronounced /vjuː/, like view) is a library for building interactive web interfaces. 
The goal of Vue.js is to provide the benefits of reactive data binding and composable 
view components with an API that is as simple as possible.

Vue.js itself is not a full-blown framework - it is focused on the view layer only. 
It is therefore very easy to pick up and to integrate with other libraries or 
existing projects. On the other hand, when used in combination with proper tooling 
and supporting libraries, Vue.js is also perfectly capable of powering sophisticated 
Single-Page Applications.

If you are an experienced frontend developer and want to know how Vue.js compares 
to other libraries/frameworks, check out the [Comparison with Other Frameworks](http://vuejs.org/guide/comparison.html); 
if you are more interested about how Vue.js approaches larger-scale applications, 
check out the section on [Building Larger-Scale Applications](http://vuejs.org/guide/application.html).

## Examples

### TodoMVC

This example uses [Firebase](https://www.firebase.com/) as the data persistence backend. 
Example is a fully spec-compliant TodoMVC implementation in under minimum effective 
lines of JavaScript (excluding comments and blank lines).

### Markdown Editor

This is simple Markdown editor. [Markdown](http://daringfireball.net/projects/markdown/) 
is a way to style text on the web. You control the display of the document; 
formatting words as bold or italic, adding images, and creating lists are just a 
few of the things we can do with Markdown.

### GitHub Commits

This example fetches latest "Silex-MVC" commits data from GitHub’s API and displays 
them as a list. You can switch between the master and other branches. 
GitHub is a code hosting platform for version control and collaboration. 
It lets you and others work together on projects from anywhere.

### Firebase + Validation

This example uses [Firebase](https://www.firebase.com/) as the data persistence 
backend and syncs between clients in real time (you can try opening it in multiple browser tabs). 
In addition, it performs instant validation using computed properties and triggers 
CSS transitions when adding/removing items.

### Sort Grid Component

This is an example of creating a reusable grid component and using it with external data.

### Hacker News

This is a HackerNews clone built upon HN’s official [Firebase API](https://github.com/HackerNews/API), 
and using Asynchronous module definition (AMD) is a JavaScript specification 
that defines an API for defining code modules and their dependencies, and loading 
them asynchronously if desired.