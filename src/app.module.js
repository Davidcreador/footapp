'use strict';

// Define the `footApp` module
var footApp = angular.module('footApp', ['ui.router', 'ui.bootstrap']);

footApp.config(function($stateProvider) {
  var states = [
    {
      name: 'home',
      url: '',
      redirectTo: 'dashboard'
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      component: 'competition',
      resolve: {
        competitions: function(CompetitionService) {
          return CompetitionService.getAllCompetition();
        }
      }
    },
    {
      name: 'league-details',
      url: '/league-details/{leagueId}',
      component: 'leagueDetails',
      resolve: {
        teams: function(CompetitionService, $transition$) {
          return CompetitionService.getLeague($transition$.params().leagueId);
        }
      }
    },
    {
      name: 'favorites',
      url: '/favorites',
      component: 'favorites',
      params: { team: null, }
    },
    {
      name: 'team-matches',
      url: '/team-matches/:id',
      component: 'teamMatches',
      resolve: {
        teamMatches: function(CompetitionService, $transition$) {
          return CompetitionService.getTeamMatches($transition$.params().id);
        }
      }
    },
    {
      name: 'league-details.team',
      url: '/team',
      params: { team: null, },
      onEnter: function($stateParams, $state, $modal, $window) {
        $modal.open({
          resolve: {
            players: function(CompetitionService) {
              var teamId = $stateParams.team.id;
              return CompetitionService.getPlayers(teamId);
            }
          },
          template: 
            `<div class="show">
                <div class="modal-header ng-scope">
                  <h3 class="title" id="modal-title">{{ team.teamName }}</h3>
                </div>
                <div class="modal-body">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">
                        <div ng-show="team.crestURI !== null">
                          <img width="100" height="100" src="{{ team.crestURI }}" />
                        </div>
                        <h3>Basic information</h3>
                        <div>
                          Team Name: {{team.teamName}}
                        </div>
                        <div>
                          Team Position: {{ team.position }}
                        </div>
                        <div>
                          Points: {{ team.points }}
                        </div>
                        <div>
                          Games lost: {{ team.losses }}
                        </div>
                        <div>
                          Games won: {{ team.wins }}
                        </div>
                        <div>
                          Games tied: {{ team.draws }}
                        </div>
                        <div>
                          Total goals difference: {{ team.goalDifference }}
                        </div>
                        <h3>Away</h3>
                        <div>
                          Total goals scored at away: {{ team.away.goals }}
                        </div>
                        <div>
                          Total goals against at away: {{ team.away.goalsAgainst }}
                        </div>
                        <div>
                          Total games lost at away: {{ team.away.losses }}
                        </div>
                        <div>
                          Total games won at away: {{ team.away.wins }}
                        </div>
                        <div>
                          Total games tied at away: {{ team.away.draws }}
                        </div>
                        <h3>Home</h3>
                        <div>
                          Total goals scored at home: {{ team.home.goals }}
                        </div>
                        <div>
                          Total goals against at home: {{ team.home.goalsAgainst }}
                        </div>
                        <div>
                          Total games lost at home: {{ team.home.losses }}
                        </div>
                        <div>
                          Total games won at home: {{ team.home.wins }}
                        </div>
                        <div>
                          Total games tied at home: {{ team.home.draws }}
                        </div>

                        <h3 class="title">Players</h3>
                        <div ng-repeat="player in players" class="list-group-item">
                          <div>
                            Name: {{ player.name }}
                          </div>
                          <div>
                            Position: {{ player.position }}
                          </div>
                          <div>
                            Jersey number: {{ player.jerseyNumber }}
                          </div>
                          <div>
                          Date of birth: {{ player.dateOfBirth }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button class="button is-primary is-fullwidth" ng-click="dismiss()">Dismisss</button>
                </div>
            </div>`,
          controller: function($window, $scope, $state, CompetitionService, players) {
            $scope.state = $state.current;
            $scope.params = $stateParams;
            $scope.team = $stateParams.team;
            $scope.players = players;
            
            $scope.dismiss = function () {
              $scope.$dismiss('clicked cancel');
            };
          }
        }).result.then(function (result) {
          console.log('result ->' + result);
        }, function (result) {
          console.log('dismiss ->' + result);
        }).finally(function () {
          // handle finally
          return $window.history.back();
        });
      }
    }
  ];

  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});

var config = {
  cache: true,
  dataType: 'json',
  headers: {
    'X-Response-Control': 'full',
    'X-Auth-Token': 'b14fea36d44d45608da38b9501015f20'
  }
 };

footApp.run(function($http) {
  delete $http.defaults.headers.common["X-Requested-With"];
  $http.get('http://api.football-data.org/v1/competitions', config);
});