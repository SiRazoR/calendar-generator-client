import React from 'react';
import LecturesList from "../components/lecturesSelection/LecturesList";
import axios from "axios";
import Loader from 'react-loader-spinner'

export default class LecturesSelection extends React.Component {

    state = {
        dataMounted: false,
        completed: false,
        numberOfCompletedModifications: 0,
        simpleScheduleGroupsId: [],
        simpleSchedule: [],
        complexSchedule: []
    };
    async componentDidMount() {
        console.log("Mounted with groups: " + JSON.stringify(this.props.getSelectedGroups));
        let groupsThatWillBeModified = this.getGroupsThatWillBeModified(this.props.getSelectedGroups);
        groupsThatWillBeModified.forEach(async (group) => {
                console.log("Fetching data for group: " + group.selectedGroup);
                await axios.get('https://uek-calendar-generator.herokuapp.com/calendar/distinct/' + group.selectedGroup)
                    .then(response => {
                        this.state.simpleSchedule.push({
                            groupId: response.data.groupId,
                            groupName: group.groupName,
                            lecture: response.data.lecture
                        });
                        if (this.state.simpleSchedule.length === groupsThatWillBeModified.length) {
                            console.log("Finished fetching data");
                            this.setState({dataMounted: true});
                        }
                    })
                ;
            }
        );
    }

    getGroupsThatWillBeModified = (groups) => {
        let newList = [];
        let groupIds = [];
        groups.forEach(group => {
            if (!groupIds.includes(group.selectedGroup) && group.willModify === true) {
                console.log("Found group " + group.selectedGroup + " that will be modified");
                newList.push(group);
                groupIds.push(group.selectedGroup);
            } else if (!groupIds.includes(group.selectedGroup) && group.willModify === false) {
                console.log("Found group that will not be modified: " + group.selectedGroup + ", full schedule will be generated");
                this.state.simpleScheduleGroupsId.push(group.selectedGroup)
            }
        });
        if (this.state.simpleScheduleGroupsId.length === groups.length) {
            console.log("List contains only groups with full schedule thad don't need modification. Build schedule");
            this.buildSchedule()
        }
        console.log("Distinct mandatory groups " + groupIds);
        return newList;
    };

    buildSchedule = () => {
        let complexSchedule = {
            groups: []
        };
        console.log("Check if there are schedules that were modified");
        if (this.state.simpleSchedule.length !== 0) {
            this.state.simpleSchedule.forEach(schedule => {
                complexSchedule.groups.push({
                    groupId: schedule.groupId,
                    lecture: schedule.lecture
                });
            })
        }

        console.log("Check if there are schedules that will not be modified");
        if (this.state.simpleScheduleGroupsId.length === 0) {
            this.prepareDataForFinishPage(complexSchedule)
        } else {
            this.state.simpleScheduleGroupsId.forEach((id) => {
                axios.get('https://uek-calendar-generator.herokuapp.com/calendar/distinct/' + id)
                    .then(response => {
                        complexSchedule.groups.push({
                            groupId: response.data.groupId,
                            lecture: response.data.lecture
                        });
                        console.log("Finished fetching, proceed to prepareDataForFinishPage");
                        this.prepareDataForFinishPage(complexSchedule)
                    });
            })
        }
    };

    prepareDataForFinishPage = (complexSchedule) => {
        let baseURL = "https://uek-calendar-generator.herokuapp.com/calendar/modified/";
        axios.post('https://uek-calendar-generator.herokuapp.com/calendar/complex', complexSchedule)
            .then(response => {
                this.props.setGeneratedLink(baseURL + response.data.id);
            });
        this.setState({completed: true});
        this.props.setStepTwoCompleted(true);
        this.props.setActiveStep(this.props.getActiveStep + 1)
    };

    setDone = () => {
        ++this.state.numberOfCompletedModifications;
        if (this.state.numberOfCompletedModifications === this.state.simpleSchedule.length) {
            this.buildSchedule()
        }
    };

    renderLectures = () => {
        let groupsList = [];
        this.state.simpleSchedule.forEach((group) => {
            groupsList.push(<LecturesList setDone={this.setDone} getGroup={group}/>);
        });
        return groupsList
    };

    render() {
        return (
            <React.Fragment>
                {this.state.dataMounted === true &&
                this.renderLectures()
                }

                {this.state.dataMounted === false &&
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height="100"
                    width="100"
                />}
            </React.Fragment>
        );
    }
}
    const styles = {
        list: {
            backgroundColor:"gray"
        }};
