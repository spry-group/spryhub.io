SpryHub.SpryHubHost = 'https://api.spryhub.io';
SpryHub.GitHubHost = 'https://api.github.com';

SpryHub.Router.map(function() {
  this.resource('login', { path: '/' });
  this.resource('dashboard', function() {
    this.resource('project', { path: ':project_id'} );
    this.resource('selectRepos');
    this.resource('profile');
    this.resource('help');
  });
  this.resource('sprints');
});

SpryHub.AuthenticatedRoute = Ember.Route.extend({
  actions: {
    error: function(response, transition) {
      console.log('Encountered ERROR', response.status);
      if (response.status === 401) {
        this.controllerFor('application').set('isAuthenticated', null);

        if($.cookie('Access-Token')) {
          $.removeCookie('Access-Token');
        }

        this.transitionTo('login');
      } else {
        console.log('Non 401 error while tranisitiong to ' + transition.targetName +': ', response);
      }
    }
  }
});

SpryHub.DashboardRoute = SpryHub.AuthenticatedRoute.extend({
  model: function() {
    return this.store.find('project');
  },
  setupController: function(controller, model) {
    //We have to reset the model since we're over writing the auto initalized controller
    controller.set('content', model);
    this.store.find('sprint');
    this.store.find('backlog');

    this.set('authToken', this.controllerFor('login').get('authToken'));
  }
});

SpryHub.ProjectRoute = SpryHub.AuthenticatedRoute.extend({
  setupController: function(controller, model) {
    controller.set('content', model);

    var activeSprints = this.store.filter('sprint', function(sprint){
      return sprint.get("project") === model && sprint.get("completed") === false;
    });

    var completeSprints = this.store.filter('sprint', function(sprint){
      return sprint.get("project") === model && sprint.get("completed") === true;
    });

    var backlogs = this.store.filter('backlog', function(backlog){
      return backlog.get("project") === model;
    });

    controller.set('activeSprints', activeSprints);
    controller.set('completeSprints', completeSprints);
    controller.set('backlogs', backlogs);
  },
  renderTemplate: function() {
    this.render({ outlet: 'mainbar' });
  }
});

SpryHub.SelectReposRoute = SpryHub.AuthenticatedRoute.extend({
  setupController: function(controller, model) {
    controller.set('content', model);
    //Load the user's other repos so we can compare lists later
    var myStore = this.store;

    myStore.find('org').then(function(orgs) {
      orgs.forEach(function(org, index, enumerable) {
          //Ember-data really doesn't like non standard APIs
          //So we use ajax to go get org's repos and then add them to the store
          GetOrgRepo(myStore, Ember.get(org, "name"));
      });
    });

    this.store.find('sprint');

    controller.set('orgRepos', this.store.all('orgRepo'));
    controller.set('userRepos', this.store.find('repo'));
  },
  renderTemplate: function() {
    this.render({ outlet: 'mainbar' });
  }
});

SpryHub.ProfileRoute = SpryHub.AuthenticatedRoute.extend({
  model: function(){
    return this.store.find('user');
  },
  renderTemplate: function() {
    this.render({ outlet: 'mainbar' });
  }
});

SpryHub.HelpRoute = SpryHub.AuthenticatedRoute.extend({
  renderTemplate: function() {
    this.render({ outlet: 'mainbar' });
  }
});

SpryHub.LoginRoute = Ember.Route.extend({
  beforeModel: function() {
    if($.cookie('Access-Token')) {
      this.controllerFor('application').set('isAuthenticated', $.cookie('Access-Token'));
      this.transitionTo('dashboard');
    }
  }
});

SpryHub.GitHubAdapter = DS.RESTAdapter.extend({
  host: SpryHub.GitHubHost,
  headers: {
    Authorization: 'token ' + $.cookie('Access-Token'),
    Accept: "application/vnd.github.v3+json"
  }
});

SpryHub.RepoAdapter = SpryHub.GitHubAdapter.extend({ namespace: 'user' });

SpryHub.OrgAdapter = SpryHub.GitHubAdapter.extend({ namespace: 'user' });

SpryHub.OrgRepoAdapter = SpryHub.GitHubAdapter.extend({});

SpryHub.SprintsRoute = SpryHub.AuthenticatedRoute.extend({});

if (SpryHub.UseFixtureData === true) {
  SpryHub.ProjectAdapter = DS.FixtureAdapter.extend();
  SpryHub.SprintAdapter = DS.FixtureAdapter.extend();
  SpryHub.BacklogAdapter = DS.FixtureAdapter.extend();
} else {
  SpryHub.ProjectAdapter = DS.RESTAdapter.extend({
    buildURL: function(type, id) {
      return SpryHub.SpryHubHost + '/api/1/repos/report';
    }
  });
  SpryHub.UserAdapter = DS.RESTAdapter.extend({
    buildURL: function(type, id) {
      return SpryHub.SpryHubHost + '/api/1/user';
    }
  });
}

SpryHub.ApplicationSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {

    if (type.toString() === 'SpryHub.Repo') {
      return {repo: SeralizeRepo(payload)};

    } else if (type.toString() === 'SpryHub.Org') {
      return {org: SeralizeOrg(payload)};

    } else if (type.toString() === 'SpryHub.Project') {
      return {project: SeralizeProject(payload, this.store)};

    } else if (type.toString() === 'SpryHub.User') {
      return {user: SeralizeUser(payload)};

    } else {
      return payload;

    }
  }
});


function GetOrgRepo(myStore, orgName) {
  $.ajax({
    url: SpryHub.GitHubHost + '/orgs/' + orgName + '/repos',
    type: 'GET',
    headers: {
      Authorization: 'token ' + $.cookie('Access-Token'),
      Accept: "application/vnd.github.v3+json"
    },
    dataType: 'json',
    success: function(data) {
      $.each(data, function(i, repo) {
        if(repo.has_issues) {
          myStore.push('orgRepo', {
            id: repo.owner.login + '_' + repo.name,
            repo: repo.name,
            full_name: repo.full_name,
            owner: repo.owner.login,
            url: 'https://github.com/' + repo.full_name,
            org: repo.owner.login
          });
        }
      });
    },
    error: function(xhr) {
      console.log('Error: ', xhr);
    }
  });
}

function SeralizeRepo(payload) {
  var normalizedPayload = [];

  $.each(payload, function(i, repoObject) {
    if(repoObject.has_issues) {
      normalizedPayload.push({
        id: repoObject.owner.login + '_' + repoObject.name,
        repo: repoObject.name,
        full_name: repoObject.full_name,
        owner: repoObject.owner.login,
        fullName: repoObject.full_name,
        url: 'https://github.com/' + repoObject.full_name
      });
    }
  });

  return normalizedPayload;
}

function SeralizeOrg(payload) {
  var normalizedPayload = [];

  $.each(payload, function(i, orgObject) {
    normalizedPayload.push({
      id: orgObject.login,
      name: orgObject.login
    });
  });

  return normalizedPayload;
}

function SeralizeProject(payload, myStore) {
  var normalizedPayload = [];

  $.each(payload, function(i, project) {
    $.each(project.activeSprints, function(i, activeSprint) {
      var myActiveSprint = myStore.push('sprint', {
        id: project.owner + '%2F' + project.repo + '%2F' + activeSprint.name,
        project: project.owner + '%2F' + project.repo,
        name: activeSprint.name,
        number: activeSprint.number,
        ticketsOpen: activeSprint.ticketsOpen,
        ticketsClosed: activeSprint.ticketsClosed,
        pointsOpen: activeSprint.pointsOpen,
        pointsClosed: activeSprint.pointsClosed,
        completed: false
      });
    });

    $.each(project.completeSprints, function(i, completeSprint) {
      myStore.push('sprint', {
        id: project.owner + '%2F' + project.repo + '%2F' + completeSprint.name,
        project: project.owner + '%2F' + project.repo,
        name: completeSprint.name,
        number: completeSprint.number,
        ticketsOpen: null,
        ticketsClosed: completeSprint.ticketsClosed,
        pointsOpen: null,
        pointsClosed: completeSprint.pointsClosed,
        completed: true
      });
    });

    $.each(project.backlog, function(i, backlog) {
      myStore.push('backlog', {
        id: project.owner + '%2F' + project.repo + '%2F' + backlog.name,
        project: project.owner + '%2F' + project.repo,
        name: backlog.name,
        readyIssues: backlog.readyIssues,
        incompleteIssues: backlog.incompleteIssues,
        readyPoints: backlog.readyPoints,
        remainingSprints: backlog.remainingSprints
      });
    });

    normalizedPayload.push({
      id: project.owner + '%2F' + project.repo,
      owner: project.owner,
      repo: project.repo,
      averageVelocity: project.velocity['3'] || 0
    });
  });

  return normalizedPayload;
}

function SeralizeUser(userObject) {
  var normalizedPayload = [{
    id: userObject.github_login,
    name: userObject.github_login,
    email: userObject.github_primary_email
  }];

  return normalizedPayload;
}