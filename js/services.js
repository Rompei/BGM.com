'use strict'

const API_KEY = "AIzaSyAv9QHftFDcf10H7Ye2lxJKH1fiXFDuEUw"

angular.module('bgm-app')
.factory('VisitorService', function($http){
  var visitor = function(){
    return $http.post('http://medianet.inf.uec.ac.jp/~t1310077/api/visitor.php')
      .then(function(response){
        return response.data;
      });
  };
  return {
    visitor: visitor
  };
})


.factory('YouTubeSearchService', function($http){
  var search = function(params){
    return $http.get('https://www.googleapis.com/youtube/v3/search', {params: params})
      .then(function(response){
        return response.data;
      });
  };
  return {
    search: search
  };
})

.factory('YouTubeVideoService', function($http){
  var video = function(params){
    return $http.get('https://www.googleapis.com/youtube/v3/videos', {params: params})
      .then(function(response){
        return response.data;
      });
  };
  return {
    video: video
  };
})

.factory('iTunesRankingService', function($http){
  var search = function(genreId, country){
    var url = 'https://itunes.apple.com/' + country + '/rss/topsongs/limit=100/genre=' + genreId + '/json';
    return $http.get(url).then(function(response){
      var data = response.data;
      var entries = new Array();
      for(var i=0; i<data.feed.entry.length; i++){
        var pushedData = {
          title: data.feed.entry[i]['im:name'].label,
          artist: data.feed.entry[i]['im:artist'].label,
          thumbnail: data.feed.entry[i]['im:image'][2].label,
          publishedAt: data.feed.entry[i]['im:releaseDate'].attributes.label
        };
        entries.push(pushedData);
      }

      return entries
    });
  };
  return {
    search : search
  };
})

.factory('AnimeService', function($http){
  var list = function(params){
    return $http.get('http://api/moemoe.tokyo/anime/v1', {params: params})
      .then(function(response){
        return response.data;
      });
  };
  return {
    list: list
  };
});
