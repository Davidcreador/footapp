angular.module('footApp').component('teamMatches', {
  bindings: { teamMatches: '<' },
  controller: function($scope, localService) {
    this.reverse = false;

    this.sortBy = function() {
      this.reverse = !this.reverse;
    };
  },
  template: `
    <section class="section">
      <div class="container">
        <button style="margin-bottom: 30px;" class="button is-info" ng-click="$ctrl.sortBy()">Order by</button>
        <span class="sortorder" ng-class="{reverse: $ctrl.reverse}"></span>
        <h2 class="title">Team matches</h2>

        <div class="columns is-multiline">
          <div class="column is-half" ng-show="$ctrl.teamMatches.length" ng-repeat="team in $ctrl.teamMatches | orderBy:propertyName:$ctrl.reverse">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <h3>Match: {{team.homeTeamName}} vs {{team.awayTeamName}}</h3>
                  <div>
                    Match day: {{team.matchday}}
                  </div>
                  <div>
                    Match status: {{team.status}}
                  </div>
                  <div>
                    Goals Away Team: {{team.result.goalsAwayTeam}}
                  </div>
                  <div>
                    Goals Home Team: {{team.result.goalsHomeTeam}}
                  </div>
                  <div>
                    Match Date: {{team.date | date:"MM/dd/yyyy 'at' h:mma"}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
});