(function() {
    'use strict';

    angular
        .module('clientAngular')
        .factory('GraphQL', graphqlService);

    function graphqlService() {

        var Request = function(url) {
            this.url = url;
        };

        Request.prototype.send = function(query) {
            var self = this;
            return new Promise(function(resolve, reject) {
                fetch(self.url, {
                        method: 'POST',
                        body: JSON.stringify({
                            "query": query
                        })
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        if (response.errors) {
                            reject(response.errors);
                        }
                        return resolve(response.data);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        };

        return Request;
    };
})();
