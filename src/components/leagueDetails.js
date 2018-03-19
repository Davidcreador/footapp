angular.module('footApp').component('leagueDetails', {
  bindings: { teams: '<' },
  controller: function($state, $stateParams, localService) {
    var leagueId = $stateParams.leagueId;
    this.reverse = false;

    this.sortBy = function() {
      this.reverse = !this.reverse;
    };

    this.show = function (team) {
      $state.go('league-details.team', { team:team });
    };

    this.favorite = function (team) {
      team.leagueId = leagueId;
      localService.setObject(team.id, team);
    };
  },
  template: `
    <section class="section">
      <div class="container">
        <button style="margin-bottom: 30px;" class="button is-info" ng-click="$ctrl.sortBy()">Order by</button>
        <span class="sortorder" ng-class="{reverse: $ctrl.reverse}"></span>
        <div class="columns is-multiline">
          <div class="column is-one-third" ng-repeat="team in $ctrl.teams | orderBy:propertyName:$ctrl.reverse">
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
                </div>
                <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
                  <button type="button" class="button is-primary" ng-click="$ctrl.show(team)">See more...</button>
                  <button class="button is-danger" ng-click="$ctrl.favorite(team)">Favorite</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`
});