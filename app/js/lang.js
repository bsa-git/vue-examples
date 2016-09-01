define(['vue'], function (Vue) {
    /**
     * Lang - language functions
     *
     *
     * JavaScript
     *
     * @author   Sergii Beskorovainyi <bsa2657@yandex.ru>
     * @license  MIT <http://www.opensource.org/licenses/mit-license.php>
     * @link     https://github.com/bsa-git/vue-examples/
     */
    var Lang = Class.extend({
        init: function (app) {
            this.app = app;
            this.sys = app.$options.sys;
            //------------

            var locale = this.getLocale();
            if(locale){
                this.app.$set('locale', locale);
            }
            
            // Get translation data
            this.getTransData(this.app.$get('locale'));
        },
        /**
         * Get locale from jStorage database
         * 
         */
        getLocale: function ()
        {
            var locale = '';
            //-----------------
            // Find value in jStorage
            var translate = $.jStorage.get("trans");
            if (translate && translate.locale) {
                locale = translate.locale;
            }
            return locale;
        },
        /**
         * Get translation data from server
         * and save to jStorage database
         * 
         */
        getTransData: function (locale)
        {
            var ttl_jstorage = this.sys.settings['ttl_jstorage'];
            //--------------------
            try {
                var res = 'app/translations/msg.' + locale;
                require([res], function (resTrans) {
                    var trans = {
                        locale: locale,
                        values: resTrans
                    };
                    $.jStorage.set("trans", trans);
//                    $.jStorage.setTTL("trans", ttl_jstorage);
                    
                    // Create filter
//                    Vue.filter('trans', this.trans);
                });

            } catch (ex) {
                if (ex instanceof Error) {
                    this.sys.onFailure(ex.name + ": " + ex.message);
                }

            }
        },
        /**
         * Get translation value for id
         * and set value options 
         * 
         * @param String messageId
         * @param Object options {title: 'My Title' }
         * @returns String
         */
        trans: function (messageId, options)
        {
            var translate, tmpl, msg;
            var result = "";
            options = options || {};
            //-----------------------

            // Find value in jStorage
            translate = $.jStorage.get("trans");
            if (translate) {
                if (translate.values[messageId]) {
                    msg = translate.values[messageId];
                    tmpl = _.template(msg);
                    result = tmpl(options);
                }
            } 
            return result;
        }
    });

    return Lang;
});