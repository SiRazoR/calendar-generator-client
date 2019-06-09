import React from 'react';
import LecturesList from "../components/lecturesSelection/LecturesList";
import axios from "axios";
import Loader from 'react-loader-spinner'
import Paper from "@material-ui/core/Paper";

const styles = {
};
const dayOfWeek = ["Sobota","Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek"];

export default class LecturesSelection extends React.Component {

    state = {
        dataMounted: false,
        lectures: [],
        days: [],
        mandatory: []
    };

    constructor(props) {
        super(props);
    }
    dayOfWeekAsInteger = (day) => {
        return dayOfWeek[day]
    };

    componentDidMount() {
        axios.get('https://uek-calendar-generator.herokuapp.com/calendar/distinct/140781')
            .then( data => {
                let lectures = [];
                data.data.lecture.forEach(item => {
                    lectures.push(this.dayOfWeekAsInteger(item.dayOfTheWeek) + ": " + item.name)
                });
                this.setState({lectures: lectures});
                this.setState({dataMounted: true});
                console.log("Finished fetching data.")
            });
    }

    //do pobrania lektur
    mandatoryLectures = (value) => {
        console.log("build request with: " + value)
    };

    displayLectureList = () => {
        console.log("received groups " + this.props.getSelectedGroups);
        let groupsList = [];
        this.props.getSelectedGroups.forEach( group => {
            groupsList.push(<LecturesList setMandatory={this.mandatoryLectures} lectures={this.state.lectures}/>)
        });
        return groupsList

    };

    render() {
        return (
            <React.Fragment>
            {this.state.dataMounted === true &&
                this.displayLectureList()
            }

            {this.state.dataMounted === false &&
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height="100"
                    width="100"
                /> }
            </React.Fragment>
        );
    }
}