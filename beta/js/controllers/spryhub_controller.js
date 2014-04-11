SpryHub.ApplicationController = Ember.ObjectController.extend({
    needs: ['login'],
    isAuthenticated: $.cookie('Access-Token'),
    actions: {
      logout: function() {
        this.set('isAuthenticated', null);

        if($.cookie('Access-Token')) {
          $.removeCookie('Access-Token');
        }

        this.transitionToRoute('login');
      }
    }
});

SpryHub.LoginController = Ember.ArrayController.extend({});

SpryHub.ProjectController = Ember.ObjectController.extend({
  actions: {
    removeRepo: function(owner, repo) {
      var self = this;
      $.ajax({
        url: SpryHub.SpryHubHost + '/api/1/repos/reporting/' + owner + '/' + repo,
        type: 'DELETE',
        contentType: "application/json",
        success: function() {
          alert('Removed ' + owner + '/' + repo + ' from your projects');
          var myProject = self.get('model');
          myProject.deleteRecord();
          self.transitionToRoute('dashboard');
        },
        error: function() {
          console.log('error');
        }
      });
    }
  }
});

SpryHub.RepoController = Ember.ObjectController.extend({
    actions: {
        addRepo: function(owner, repo) {
          self = this;
          $.ajax({
            url: SpryHub.SpryHubHost + '/api/1/repos/reporting/' + owner + '/' + repo,
            type: 'PUT',
            contentType: "application/json",
            success: function() {
              $.ajax({
                url: SpryHub.SpryHubHost + '/api/1/repos/report/' + owner + '/' + repo,
                type: 'GET',
                success: function(data) {
                  SeralizeProject([data], self.store);
                  self.store.push('project', {
                    id: data.owner + '%2F' + data.repo,
                    owner: data.owner,
                    repo: data.repo,
                    averageVelocity: data.velocity['3'] || 0
                  });
                  alert('Added ' + owner + '/' + repo + ' to your projects.');
                },
                error: function(xhr) {
                  console.log('Error getting report');
                }
              });
            },
            error: function(xhr) {
              console.log('error');
              console.log(xhr);
              console.log(xhr.responseText);
            }
          });
        }
    }
});