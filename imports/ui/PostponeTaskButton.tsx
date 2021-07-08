import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import UpdateIcon from "@material-ui/icons/Update";
import { Meteor } from "meteor/meteor";
import { Task, TasksCollection } from "../db/Task";

const MILLIS_PER_HOUR = 60 * 60 * 1000;
const MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR;
const MILLIS_PER_WEEK = 7 * MILLIS_PER_DAY;

export function PostponeTaskButton({ taskId }: { taskId: string }): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const postponeClicked = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const closePostponeMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setAnchorEl(null);
        e.stopPropagation();
    };

    const postponeBy = (millisecondsToPostponeBy: number) => {
        const task: Task | undefined = TasksCollection.findOne(taskId);
        if (task === undefined || task.plannedDate === undefined) {
            return;
        }
        const newDate = new Date(task.plannedDate.getTime() + millisecondsToPostponeBy);
        Meteor.call("tasks.setPlannedDate", taskId, newDate);
    }

    return (<IconButton aria-label="postpone" onClick={postponeClicked}>
        <UpdateIcon />
        <Menu
            id="postpone-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closePostponeMenu}
        >
            <MenuItem onClick={(e) => { postponeBy(MILLIS_PER_HOUR); closePostponeMenu(e); }} > +1 hour</MenuItem>
            <MenuItem onClick={(e) => { postponeBy(MILLIS_PER_DAY); closePostponeMenu(e); }}>+1 day</MenuItem>
            <MenuItem onClick={(e) => { postponeBy(MILLIS_PER_WEEK); closePostponeMenu(e); }}>+1 week</MenuItem>
        </Menu>
    </IconButton >
    );
}
