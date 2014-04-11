SpryHub.Repo = DS.Model.extend({
  repo: DS.attr('string'),
  full_name: DS.attr('string'),
  owner: DS.attr('string'),
  url: DS.attr('string')
});

SpryHub.Org = DS.Model.extend({
  name: DS.attr('string'),
  repos: DS.hasMany('orgRepo')
});

SpryHub.OrgRepo = DS.Model.extend({
  repo: DS.attr('string'),
  full_name: DS.attr('string'),
  owner: DS.attr('string'),
  url: DS.attr('string'),
  org: DS.belongsTo('org')
});

SpryHub.Project = DS.Model.extend({
  owner: DS.attr('string'),
  repo: DS.attr('string'),
  averageVelocity: DS.attr('number'),
  repoUrl: function(){
    return 'http://github.com/' + this.get('owner') + '/' + this.get('repo');
  }.property('owner', 'repo'),
  activeSprintsUrl: function(){
    return this.get('repoUrl') + '/issues/milestones?state=open';
  }.property('repoUrl'),
  completeSprintsUrl: function(){
    return this.get('repoUrl') + '/issues/milestones?state=closed';
  }.property('repoUrl'),
  backlogsUrl: function(){
    return this.get('repoUrl') + '/issues?status=open';
  }.property('repoUrl')
});

SpryHub.Sprint = DS.Model.extend({
  project: DS.belongsTo('project'),
  name: DS.attr('string'),
  number: DS.attr('number'),
  ticketsOpen: DS.attr('number'),
  ticketsClosed: DS.attr('number'),
  pointsOpen: DS.attr('number'),
  pointsClosed: DS.attr('number'),
  completed: DS.attr('boolean'),
  repoUrl: function() {
    return this.get('project').get('repoUrl');
  }.property('repoUrl'),
  activeSprintUrl: function(){
    return this.get('repoUrl') + '/issues?milestone=' + this.get('number') + '&state=open';
  }.property('repoUrl', 'name'),
  completeSprintUrl: function(){
    return this.get('repoUrl') + '/issues?milestone=' + this.get('number') + '&state=closed';
  }.property('repoUrl'),
  issuesOpenUrl: function(){
    return this.get('completeSprintUrl') + '?milestone=' + this.get('name') + '&status=open';
  }.property('completeSprintUrl', 'name'),
  issuesClosedUrl: function(){
    return this.get('completeSprintUrl') + '?milestone=' + this.get('name') + '&status=closed';
  }.property('completeSprintUrl', 'name'),
  pointsCompleteUrl: function(){
    return this.get('completeSprintUrl') + '?milestone=' + this.get('name') + '&labels=points/*';
  }.property('completeSprintUrl', 'name'),
  ticketsCompleteUrl: function(){
    return this.get('completeSprintUrl') + '?milestone=' + this.get('name') + '&status=points/*';
  }.property('completeSprintUrl', 'name')
});

SpryHub.Backlog = DS.Model.extend({
  project: DS.belongsTo('project'),
  name: DS.attr('string'),
  readyIssues: DS.attr('number'),
  incompleteIssues: DS.attr('number'),
  readyPoints: DS.attr('number'),
  remainingSprints: DS.attr('number'),
  isGeneral: function() {
    if (this.get('name') === 'General' || this.get('name') === 'general') {
      return true;
    } else {
      return false;
    }
  }.property('name'),
  backlogUrl: function() {
    if (this.get('isGeneral')) {
      return this.get('project').get('repoUrl') + '/issues';
    } else {
      return this.get('project').get('repoUrl') + '/issues?labels=sow%2F' + this.get('name');
    }
  }.property('repoUrl', 'name', 'isGeneral'),
  issuesReadyUrl: function() {
    if (this.get('isGeneral')) {
      return this.get('backlogUrl') + '?labels!=sow/*&labels=points/*';
    } else {
      return this.get('project').get('repoUrl') + '/issues?labels=' + this.get('name') + '&labels=points/*';
    }
  }.property('repoUrl', 'name', 'isGeneral'),
  issuesIncompleteUrl: function() {
    if (this.get('isGeneral')) {
      return this.get('backlogUrl') + '?labels!=sow/*&labels!=points/*';
    } else {
      return this.get('project').get('repoUrl') + '/issues?' + this.get('name') + '&labels=!points/*';
    }
  }.property('repoUrl', 'name', 'isGeneral')
});

SpryHub.User = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string')
});