angular.module('footApp').component('favorites', {
  bindings: { favorites: '<' },
  controller: function(localService) {
    this.reverse = false;
    this.teams = localService.getAll();
    this.sortBy = function() {
      this.reverse = !this.reverse;
    };
  },
  template: `
    <section class="section">
      <h2 class="title is-size-3">Leagues:</h2>
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-third" ng-show="$ctrl.teams.length" ng-repeat="team in $ctrl.teams">
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
                    <a ui-sref="league-details({ leagueId: {{team.leagueId}} })">League</a>
                  </div>
                  <div>
                    <a ui-sref="team-matches({ id: {{team.id}} })">Team matches</a>
                  </div>
                <div ng-show="$ctrl.teams.length === 0">
                  <h3>No favorites yet!</h3>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`
});