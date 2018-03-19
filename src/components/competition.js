angular.module('footApp').component('competition', {
  bindings: { competitions: '<' },

  template: `
  <section class="section">
    <h2 class="title is-size-3">Leagues:</h2>
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-one-third" ng-repeat="competition in $ctrl.competitions">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <a class="card-title is-size-4" ui-sref="league-details({ leagueId: {{competition.id}} })">
                  League: {{competition.league}}
                </a>
                <div>
                  Number of teams: {{ competition.numberOfTeams }}
                </div>
                <div>
                  Current match day: {{ competition.currentMatchday }}
                </div>
                <div>
                  Total match days: {{ competition.numberOfMatchdays }}
                </div>
                <div>
                  Total number games: {{ competition.numberOfGames }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`
})
