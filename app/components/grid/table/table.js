define([
    'vue',
    'text!app/components/grid/table/table.html'
], function (Vue, template) {

    // Create component class
    var SortTable = Vue.extend({
        name: 'table',
        template: template,
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function () {
            var sortOrders = {}
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        methods: {
            sortBy: function (key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        }
    })

    // Create and registration component
//    Vue.component('table', SortTable);

    return SortTable;
});
