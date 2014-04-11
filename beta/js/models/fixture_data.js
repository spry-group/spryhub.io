
/*****************************
*        Fixture Data        *
*****************************/

SpryHub.Project.FIXTURES = [
  {
      id: 'org1_repo1',
      owner: 'org1',
      repo: 'repo1',
      averageVelocity: 12,
      backlogs: ['org1_repo1_General', 'org1_repo1_sow/frontend'],
      activeSprints: ['org1_repo1_Sprint5', 'org1_repo1_Sprint6'],
      completeSprints: ['org1_repo1_Sprint4', 'org1_repo1_Sprint3', 'org1_repo1_Sprint2', 'org1_repo1_Sprint1']
  },
  {
      id: 'org1_repo2',
      owner: 'org1',
      repo: 'repo2',
      averageVelocity: 15,
      backlogs: ['org1_repo2_General', 'org1_repo2_sow/backend'],
      activeSprints: ['org1_repo2_Sprint4', 'org1_repo2_Sprint3'],
      completeSprints: ['org1_repo2_Sprint2', 'org1_repo2_Sprint1']
  },
  {
      id: 'org2_repo6',
      owner: 'org2',
      repo: 'repo6',
      averageVelocity: 21,
      backlogs: ['org2_repo6_General', 'org2_repo6_sow/frontend'],
      activeSprints: ['org1_repo6_Sprint20', 'org1_repo6_Sprint19'],
      completeSprints: ['org1_repo6_Sprint18']
  }
];

SpryHub.Sprint.FIXTURES = [
  {
      id: 'org1_repo1_Sprint6',
      project: 'org1_repo1',
      name: 'Sprint6',
      ticketsOpen: 1,
      ticketsClosed: 7,
      pointsOpen: 2,
      pointsClosed: 16,
      completed: false
  }, {
      id: 'org1_repo1_Sprint5',
      project: 'org1_repo1',
      name: 'Sprint5',
      ticketsOpen: 3,
      ticketsClosed: 6,
      pointsOpen: 8,
      pointsClosed: 15,
      completed: false
  }, {
      id: 'org1_repo1_Sprint4',
      project: 'org1_repo1',
      name: 'Sprint4',
      ticketsOpen: 0,
      ticketsClosed: 6,
      pointsOpen: 0,
      pointsClosed: 18,
      completed: true
  }, {
      id: 'org1_repo1_Sprint3',
      project: 'org1_repo1',
      name: 'Sprint3',
      ticketsOpen: 0,
      ticketsClosed: 6,
      pointsOpen: 0,
      pointsClosed: 12,
      completed: true
  }, {
      id: 'org1_repo1_Sprint2',
      project: 'org1_repo1',
      name: 'Sprint2',
      ticketsOpen: 0,
      ticketsClosed: 5,
      pointsOpen: 0,
      pointsClosed: 10,
      completed: true
  }, {
      id: 'org1_repo1_Sprint1',
      project: 'org1_repo1',
      name: 'Sprint1',
      ticketsOpen: 0,
      ticketsClosed: 6,
      pointsOpen: 0,
      pointsClosed: 3,
      completed: true
  }, {
      id: 'org1_repo2_Sprint4',
      project: 'org1_repo2',
      name: 'Sprint4',
      ticketsOpen: 4,
      ticketsClosed: 7,
      pointsOpen: 5,
      pointsClosed: 13,
      completed: false
  }, {
      id: 'org1_repo2_Sprint3',
      project: 'org1_repo2',
      name: 'Sprint3',
      ticketsOpen: 8,
      ticketsClosed: 10,
      pointsOpen: 8,
      pointsClosed: 10,
      completed: false
  }, {
      id: 'org1_repo2_Sprint2',
      project: 'org1_repo2',
      name: 'Sprint2',
      ticketsOpen: 0,
      ticketsClosed: 2,
      pointsOpen: 0,
      pointsClosed: 4,
      completed: true
  }, {
      id: 'org1_repo2_Sprint1',
      project: 'org1_repo2',
      name: 'Sprint1',
      ticketsOpen: 0,
      ticketsClosed: 2,
      pointsOpen: 0,
      pointsClosed: 3,
      completed: true
  }, {
      id: 'org1_repo6_Sprint20',
      project: 'org2_repo6',
      name: 'Sprint20',
      ticketsOpen: 30,
      ticketsClosed: 6,
      pointsOpen: 18,
      pointsClosed: 13,
      completed: false
  }, {
      id: 'org1_repo6_Sprint19',
      project: 'org2_repo6',
      name: 'Sprint19',
      ticketsOpen: 7,
      ticketsClosed: 2,
      pointsOpen: 14,
      pointsClosed: 2,
      completed: false
  }, {
      id: 'org1_repo6_Sprint18',
      project: 'org2_repo6',
      name: 'Sprint18',
      ticketsOpen: 0,
      ticketsClosed: 14,
      pointsOpen: 0,
      pointsClosed: 20,
      completed: true
  }
];

SpryHub.Backlog.FIXTURES = [
    {
        id: 'org1_repo1_General',
        project: 'org1_repo1',
        name: 'General',
        readyIssues: 27,
        incompleteIssues: 13,
        readyPoints: 48,
        remainingSprints: 3
    }, {
        id: 'org1_repo1_sow/frontend',
        project: 'org1_repo1',
        name: 'sow/frontend',
        readyIssues: 12,
        incompleteIssues: 6,
        readyPoints: 8,
        remainingSprints: 1
    }, {
        id: 'org1_repo2_General',
        project: 'org1_repo2',
        name: 'General',
        readyIssues: 12,
        incompleteIssues: 2,
        readyPoints: 31,
        remainingSprints: 6
    }, {
        id: 'org1_repo2_sow/backend',
        project: 'org1_repo2',
        name: 'sow/backend',
        readyIssues: 1,
        incompleteIssues: 1,
        readyPoints: 20,
        remainingSprints: 7
    }, {
        id: 'org2_repo6_General',
        project: 'org2_repo6',
        name: 'General',
        readyIssues: 1,
        incompleteIssues: 15,
        readyPoints: 1,
        remainingSprints: 2
    }, {
        id: 'org2_repo6_sow/frontend',
        project: 'org2_repo6',
        name: 'sow/frontend',
        readyIssues: 1,
        incompleteIssues: 0,
        readyPoints: 1,
        remainingSprints: 1
    }
];