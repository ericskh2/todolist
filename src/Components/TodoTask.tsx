import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {FC, ChangeEvent, useState} from 'react';
import { ITask } from '../Interfaces';

interface IProps {
    task: ITask;
    completeTask(key: string): void;
}

const TodoTask = ({task, completeTask}: IProps) => {

    return (
    <Box display="flex" justifyContent="center">
        <ListItem className="task"
            key={task.taskId}
            disableGutters
            value={task.taskId}
            secondaryAction={
            <IconButton value={task.taskId} onClick={(event)=>{completeTask(event.currentTarget.value);}}>
                <DeleteIcon/>
            </IconButton>
            }
        >
            <ListItemText primary={`${task.taskName} ${task.deadLine}`} />
        </ListItem>
    </Box>
    );
}

export default TodoTask;