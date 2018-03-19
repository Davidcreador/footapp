angular.module('footApp').service('CompetitionService', function($http) {
  var API_URL = 'http://api.football-data.org/v1/';
  var config = {
    cache: true,
    dataType: 'json',
    headers: {
      'X-Response-Control': 'full',
      'X-Auth-Token': 'b14fea36d44d45608da38b9501015f20'
    }
  };

  var service = {
    getAllCompetition: function() {
      return $http.get(`${API_URL}competitions`, config).then(function(resp) {
        return resp.data;
      });
    },
    
    getLeague: function(id) {
      return $http.get(`${API_URL}competitions/${id}/leagueTable`, config).then(function(res) {
        var teams = res.data.standing.map(function(team) {
          var arr = team._links.team.href.split('/');
          var teamId = arr[arr.length - 1];
          team.id = teamId;
          return team;
        });
        return teams;
      });
    },

    getPlayers: function(id) {
      return $http.get(`${API_URL}teams/${id}/players`, config).then(function(res) {
        return res.data.players;
      });
    },

    getTeamMatches: function(id) {
      return $http.get(`${API_URL}teams/${id}/fixtures/`, config).then(function(res) {
        return res.data.fixtures;
      });
    }
  }
  
  return service;
})
