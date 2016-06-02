var app = angular.module('app', ['tracksJson', 'ui.bootstrap', 'listGenres', 'addTracks', 'createGenre', 'updateTrack', 'updateGenre']);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.controller('MainCtrl', function ($scope, JsonService, getGenresService, filterFilter) {
    $scope.values = [
        '1.0', '2.0', '3.0', '4.0', '5.0'
    ];

    $scope.invoke = function (id, title, genres, rating) {
        $scope.editId = id;
        $scope.editTitle = title;
        $scope.addGenres = genres;
        $scope.selectedGenres = [];
        for (var i = 0; i < genres.length; i++) {

            $scope.selectedGenres[i] = genres[i];
        }

        $scope.editRating = rating;
    };
    getGenresService.query(function (data) {
        $scope.genreInfo = data;
    });

    JsonService.query(function (data) {
        $scope.trackInfo = data;

        /****************************** pagination part starts ***************************/

        // create empty search model (object) to trigger $watch on update
        $scope.search = {};

        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.search = {};
        };

        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.trackInfo.length;
        $scope.entryLimit = 8; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.trackInfo, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);

        /************************** pagination part ends *****************************/

        /****************************** rating part starts ***************************/
        $scope.ratings = [{
            current: 5
            , max: 10
    }, {
            current: 3
            , max: 5
    }];

    });



});


app.controller('MainCtrlGenre', function ($scope, getGenresService, filterFilter) {

    $scope.invokeGenre = function (id, name) {
        $scope.editGenreId = id;
        $scope.editGenreName = name;

    };

    getGenresService.query(function (data) {
        $scope.genreInfo = data;

        /****************************** pagination part starts ***************************/

        // create empty search model (object) to trigger $watch on update
        $scope.search = {};

        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.search = {};
        };

        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.genreInfo.length;
        $scope.entryLimit = 8; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.genreInfo, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);

        /************************** pagination part ends *****************************/




    });



});

app.controller('AddTrackController', function ($scope, postTracksService) {

    $scope.values = [];


    $scope.saveTrack = function () {
        for (var i = 0; i < $scope.genre.length; i++) {
            $scope.values.push($scope.genre[i].id);
        }


        postTracksService.save({
            'title': $scope.title
            , 'rating': $scope.rating
            , 'genres': $scope.values



        }, function (response) {
            alert("Track Added Successfully......");
        });

    }

});
app.controller('AddGenreController', function ($scope, postGenreService) {

    $scope.saveGenre = function () {

        postGenreService.save({
            'name': $scope.genreName


        }, function (response) {
            alert("Genre Added Successfully......");
        });

    }

});

app.controller('UpdateTrackController', function ($scope, updateTrackService) {

    $scope.updateTrack = function () {
        $scope.values = [];
        for (var i = 0; i < $scope.selectedGenres.length; i++) {
            $scope.values.push($scope.selectedGenres[i].id);
        }
        updateTrackService.save({
                'id': $scope.editId
                , 'title': $scope.editTitle
                , 'rating': $scope.editRating
                , 'genres': $scope.values
            }
            , function (response) {
                alert("Updated Successfully.....");
            });

    }

});

app.controller('UpdateGenreController', function ($scope, updateGenreService) {

    $scope.updateGenre = function () {

        updateGenreService.save({
            'id': $scope.editGenreId
            , 'name': $scope.editGenreName

        }, function (response) {
            alert("Updated Successfully.....");
        });

    }

});


app.directive('starRating', function () {
    return {
        restrict: 'A'
        , template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>'
        , scope: {
            ratingValue: '='
            , max: '='
        }
        , link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});