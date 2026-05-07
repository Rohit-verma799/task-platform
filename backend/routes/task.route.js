import express from 'express'
import {authenticated} from '../middleware/authenticated.js'
import {createTask, getTask, getTaskById, startTask} from '../controllers/task.controller.js'
const Router = express.Router();

Router.post('/createtask', authenticated, createTask)
Router.get('/gettask', authenticated,getTask)
Router.get('/getTaskById/:id', authenticated,getTaskById)
Router.post('/:id/run', authenticated,startTask)

export default Router