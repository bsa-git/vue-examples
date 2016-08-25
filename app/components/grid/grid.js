define([
    'vue',
    'app/components/grid/table/table',
    'text!app/components/grid/grid.html',
    'css!app/components/grid/grid.css',
], function (Vue, table, template) {

    // Create component class
    var Grid = Vue.extend({
        name: 'grid',
        template: template,
        data: function () {
            return {
                searchQuery: '',
                gridColumns: ['name', 'power'],
                gridData: [
                    {name: 'Chuck Norris', power: Infinity},
                    {name: 'Bruce Lee', power: 9000},
                    {name: 'Jackie Chan', power: 7000},
                    {name: 'Jet Li', power: 8000}
                ]
            }
        },
        components: {
            'grid-table': table
        }
    })
    // Create and registration component
    Vue.component('grid', Grid);
    return Grid;
});
