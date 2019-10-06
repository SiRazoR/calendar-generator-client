import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import "../../styles/Table.scss";
import useMediaQuery from '@material-ui/core/useMediaQuery';

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function LecturesList(props) {
    return TransferList(convertLectureToReadableArray(props.getGroup), props)
}

const stringRepresentationOfDays =["", " on Sundays", " on Mondays", " on Tuesdays", " on Wednesdays", " on Thursdays", " on Fridays", " on Saturdays"];

function convertLectureToReadableArray(group) {
    let lectures = [];
    group.lecture.forEach(element => {
        lectures.push(element.name + stringRepresentationOfDays[element.dayOfTheWeek]);
    });
    return lectures
}

function setIgnoredLectures(props, ignoredLectures) {
    resetMandatory(props.getGroup.lecture);
    let days = [];
    let lectureNames = [];
    ignoredLectures.forEach(lecture => {
        stringRepresentationOfDays.forEach((day,numericDay) => {
            if(lecture.includes(day)){
                days.push(numericDay);
                lectureNames.push(lecture.split(day)[0]);
            }
        })
    });

    lectureNames.forEach((name, index) => {
        props.getGroup.lecture.forEach(lecture => {
            if (lecture.name == name && lecture.dayOfTheWeek == days[index]) {
                console.log("Ignore " + lecture.name + " on day " + lecture.dayOfTheWeek);
                lecture.mandatory = false
            }
        })
    })
}

function resetMandatory(lectures) {
    console.log("reset mandatory");
    lectures.forEach(lecture => {
        lecture.mandatory = true
    })
}

function TransferList(lectures, props) {
    const styles = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(lectures);
    const [right, setRight] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = items => intersection(checked, items).length;

    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        setIgnoredLectures(props, right.concat(leftChecked))
    };

    const handleCheckedLeft = () => {

        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        setIgnoredLectures(props, not(right, rightChecked))
    };


    const setDone = () => {
        console.log("Disable modification and send data to parent");
        setDisabled(true);
        props.setDone();
    };


    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={styles.cardHeader}
                disabled={disabled}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0 || disabled}
                        inputProps={{'aria-label': 'all lectures selected'}}
                    />
                }
                title={title}
                subheader={`${items.length} lectures`}
            />
            <Divider/>
            <List className={styles.list} dense component="div" role="list">
                {items.map(value => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" disabled={disabled} button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Card>
    );

    return (
        <div className={styles.card}>
        <Card>
            <CardHeader
                className={styles.cardHeader}
                title={<div className={styles.text}>
                    <h2>{props.getGroup.groupName} </h2>
                </div>}
            />
            <Divider/>

            <Grid
                container spacing={2}
                justify="center"
                alignItems="center"
                className={"root"}
                >
                <div className={"gridMediaQuerries"}>
                <Grid item>{customList('Generate calendar with', left)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <div className={"buttonsMediaQuerries"}>
                            <Button
                                variant="outlined"
                                size="small"
                                className={styles.button}
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                {useMediaQuery('(min-width:815px)')? "→" : "↓"}
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={styles.button}
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                {useMediaQuery('(min-width:815px)')? "←" : "↑"}
                            </Button>
                            <Button variant="contained" color="primary"
                                    disabled={disabled}
                                    onClick={setDone}>
                                Done
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid item>{customList('Ignore', right)}</Grid>
                </div>
            </Grid>

        </Card>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        //margin: 'auto',
    },
    card: {
        paddingBottom: "15px",
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto"
    },
    text: {
        textAlign: "center"
    },
    cardHeader: {
        padding: "8px",
    },
    list: {
        width: 350,
        height: 235,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));