import React from 'react';
import LecturesList from "../components/lecturesSelection/LecturesList";
import axios from "axios";
import Loader from 'react-loader-spinner'

export default class LecturesSelection extends React.Component {

    state = {
        dataMounted: false,
        lectures: [],
        days: [],
        mandatory: []
    };

    async componentDidMount() {
        console.log("Mounted with groups " + this.props.getSelectedGroups);
          this.props.getSelectedGroups.forEach( async (group) => {
            console.log("Fetching data for group: " + group );
              await axios.get('https://uek-calendar-generator.herokuapp.com/calendar/distinct/' + group)
                .then( data => {
                    let lectures = [];
                    //TODO let dayOfWeek = ["Sobota","Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek"];
                    data.data.lecture.forEach(item => {
                        lectures.push(item.dayOfTheWeek + ": " + item.name)
                    });
                    console.log("Generated list for group: " + group + " --> with data: " + lectures);
                    this.state.lectures = [...this.state.lectures,lectures];
                    if(this.state.lectures.length ===  this.props.getSelectedGroups.length){
                        console.log("Finished fetching data");
                        this.setState({dataMounted: true});
                    }
                })
              ;
        }
        );
    }

    //do pobrania lektur
    mandatoryLectures = (value) => {
        console.log("build request with: " + value)
    };

    displayLectureList = () => {
        console.log("Display lectures for groups: " + this.props.getSelectedGroups);
        let groupsList = [];
        this.props.getSelectedGroups.forEach( (group,index) => {
            groupsList.push(<LecturesList setMandatory={this.mandatoryLectures} lectures={this.state.lectures[index]} group={group}/>);
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