const express = require('express');
const helmet = require('helmet');
const bodyParser = express.json();

const Actions = require('./data/helpers/actionModel.js');
const Projects = require('./data/helpers/projectModel.js')

const server = express();


// MiddleWare
server.use(helmet());
server.use(bodyParser);


// ------ Actions CRUD Operations ------ //

// Actions Get
server.get('/api/actions', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error retrieving actions"
            })
        })
});

// Actions Insert
server.post('/api/actions', (req, res) => {
    const {project_id, description, notes} = req.body;
    Actions.insert(req.body)
        .then(action => {
            if(action) {
                res.status(201).json(action);
            } else {
                res.status(400).json({
                    message: 'Please provide a project ID, along with a description, and notes.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the action to the database.'
            })
        })
});

// Actions Update
server.put('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if(changes) {
        Actions.update(id, changes)
            .then(updatedAction => {
                if(updatedAction) {
                    res.status(200).json(updatedAction);
                } else {
                    res.status(404).json({
                        message: 'The action with the specified ID does not exist.'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'The action could not be modified.'
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide a project ID, along with a description, and notes.'
        })
    }
});

// Actions Remove
server.delete('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    Actions.remove(id)
        .then(deletedAction => {
            if(deletedAction) {
                res.status(200).json(deletedAction);
            } else {
                res.status(404).json({
                    message: 'The action with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The action could not be removed'
            })
        })
});


// ------ Projects CRUD Operations ------ //

// Projects Get
server.get('/api/projects', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error retrieving projects"
            })
        })
});

// Projects Get for a single project
server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    Projects.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error retrieving projects"
            })
        })
});

// Projects Insert
server.post('/api/projects', (req, res) => {
    const {name, description} = req.body;
    Projects.insert(req.body)
        .then(project => {
            if(project) {
                res.status(201).json(project);
            } else {
                res.status(400).json({
                    message: 'Please provide a name, along with a description.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the project to the database.'
            })
        })
});

// Projects Update
server.put('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if(changes) {
        Projects.update(id, changes)
            .then(updatedProject => {
                if(updatedProject) {
                    res.status(200).json(updatedProject);
                } else {
                    res.status(404).json({
                        message: 'The project with the specified ID does not exist.'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'The project could not be modified.'
                })
            })
    } else {
        res.status(400).json({
            message: 'Please provide a name, along with a description.'
        })
    }
});

// Projects Remove
server.delete('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    Projects.remove(id)
        .then(deletedProject => {
            if(deletedProject) {
                res.status(200).json(deletedProject);
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The project could not be removed'
            })
        })
});

// Projects getProjectActions
server.get('/api/projects/:projectId/actions', (req, res) => {
    const {projectId} = req.params;
    Projects.getProjectActions(projectId)
        .then(projectActions => {
            if(projectActions) {
                res.status(200).json(projectActions);
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'The project doesnt have any actions' 
            })
        })
});


module.exports = server;