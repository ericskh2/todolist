import { Box, Grid, IconButton, ListItem, ListItemText } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {FC, ChangeEvent, useState} from 'react';
import { ITask } from '../ITask';

interface IProps {
    task: ITask;
    completeTask(key: string): void;
    canRemove: boolean;
}

const TodoTask = ({task, completeTask, canRemove}: IProps) => {

    return (
    <Box display="flex" justifyContent="center">
        <ListItem className="task"
            key={task.taskId}
            disableGutters
            value={task.taskId}
            secondaryAction={
                canRemove ? 
            <IconButton value={task.taskId} onClick={(event)=>{completeTask(event.currentTarget.value);}}>
                <DeleteIcon/>
            </IconButton> : <Box></Box>
            }
        >
            <Grid container textAlign="center">
                <Grid item xs={6}><h3 style={{fontWeight:'normal'}}>{task.taskName}</h3></Grid>
                <Grid item xs={3}><h3 style={{fontWeight:'normal'}}>{task.deadLine.getMonth()+1} / {task.deadLine.getDate()}</h3></Grid>
                <Grid item xs={3}><h3 style={{fontWeight:'normal'}}>{task.deadLine.getHours()}:{task.deadLine.getMinutes()}</h3></Grid>
            </Grid>
        </ListItem>
    </Box>
    );
}

export default TodoTask;