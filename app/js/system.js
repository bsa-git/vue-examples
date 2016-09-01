define([], function () {
    /**
     * System - system functions
     *
     *
     * JavaScript
     *
     * @author   Sergii Beskorovainyi <bsa2657@yandex.ru>
     * @license  MIT <http://www.opensource.org/licenses/mit-license.php>
     * @link     https://github.com/bsa-git/silex-mvc/
     */
    var System = Class.extend({
        init: function (app) {
            this.app = app;
            this.settings = {
                message_box: 'msg-box',
                ttl_jstorage: 3600000   // 1h=3600000
            };
            //---------------
            try {
                // Init template
                this.initTemplate();
            } catch (ex) {
                if (ex instanceof Error) {
                    this.onFailure(ex.name + ": " + ex.message);
                }
            } finally {
            }
        },
        /** Function template settings
         *
         *   var tmpl = _.template("Hello {{ name }}!");
         *   return tmpl({name : "Mustache"});
         *   // returns "Hello Mustache!"
         *   OR
         *   return _.template("Hello {{ name }}!")({name : "Mustache"});
         *   // returns "Hello Mustache!"
         *   
         **/
        initTemplate: function ()
        {
            _.templateSettings = {
                interpolate: /\{\{([\s\S]+?)\}\}/g, ///<%=([\s\S]+?)%>/g
                evaluate: /<%([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        },
        //====== MESSAGE FUNCTIONS ====//
        setMsg: function (params) {
            var msgbox = this.getComp('app-msgbox');
            msgbox.$set('type', params.type);
            msgbox.$set('title', params.title);
            msgbox.$set('msg', params.msg);
        },
        resetMsg: function () {
            this.setMsg({type: '', title: '', msg: ''});
        },
        //====== ADD FUNCTIONS ====//
        getComp: function (name, childrens) {
            var result = null;
            var self = this;
            var childrens_ = childrens ? childrens : this.app.$children;
            _.each(childrens_, function (children) {

                if (children.$children.length) {
                    self.getComp(name, children.$children);
                }

                if (children.$options.name === name) {
                    result = children;
                    return;
                }

            });
            return result;
        },
        //====== ERROR FUNCTIONS ====//
        /**
         * Error event
         * 
         * @param object message
         * @returns void
         */
        onFailure: function (message) {

            if (_.isString(message)) {
                this.setMsg({
                    type: 'danger',
                    title: 'Oh snap',
                    msg: message
                });
                return;
            }

            if (_.isObject(message) && message.responseJSON) {
                this.onFailure(message.responseJSON);
                return;
            }

            if (_.isObject(message) && message.responseText) {
                this.onFailure(message.responseText);
                return;
            }
        }
    });

    return System;
});
