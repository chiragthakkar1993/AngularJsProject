angular.module('tracksJson', ['ngResource'])
    .factory('JsonService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/tracks', {}, {
            getData: {
                method: 'GET'
                , isArray: true
            }
        });
    });

angular.module('listGenres', ['ngResource'])
    .factory('getGenresService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/genres', {}, {
            getData: {
                method: 'GET'
                , isArray: true
            }
        });
    });

angular.module('addTracks', ['ngResource'])
    .factory('postTracksService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/tracks', {}, {
            save: {
                method: 'POST'
                , isArray: false
            }

        });
    });
angular.module('updateTrack', ['ngResource'])
    .factory('updateTrackService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/tracks/:id', {
            id: '@id'
        }, {
            update: {
                method: 'POST'
                , isArray: false
            }

        });
    });
angular.module('createGenre', ['ngResource'])
    .factory('postGenreService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/genres', {}, {
            save: {
                method: 'POST'
                , isArray: false
            }

        });
    });
angular.module('updateGenre', ['ngResource'])
    .factory('updateGenreService', function ($resource) {
        return $resource('http://104.197.128.152:8000/v1/genres/:id', {
            id: '@id'
        }, {
            update: {
                method: 'POST'
                , isArray: false
            }

        });
    });