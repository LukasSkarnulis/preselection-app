import React from "react";
import "./Dancers.css";
import {Route, Link} from "react-router-dom";
import AddDancer from "../AddDancer/AddDancer";
import EditDancer from "../EditDancer/EditDancer";
import Top4 from "../Top4/Top4";
import Top8 from "../Top8/Top8";
import Top16 from "../Top16/Top16";
import Top32 from "../Top32/Top32";

class Dancers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addJudges: false,
            name: "",
            score1: "",
            score2: "",
            score3: "",
            score4: "",
            score5: "",
            totalScore: 0,
            dancers: [],
    }
}
componentDidMount() {
  this.getFromLocalStorage();
}
addToLocalStorage() {
  localStorage.setItem("dancers", JSON.stringify(this.state.dancers));
}
getFromLocalStorage() {
  if (localStorage.dancers) {
    const localData = JSON.parse(localStorage.getItem("dancers"))
    this.setState({dancers: localData})
    } else {
      console.log("doesnt work");
    }
}
removeFromLocalStorage() {
  localStorage.clear();
  window.location.reload(false);
}
handleFormSubmit = (e) => {
    if (!this.canBeSubmitted()) {
        e.preventDefault();
        return alert("Please fill all empty text spaces");
      } 
    e.preventDefault();
    const dancers = [...this.state.dancers];
    dancers.push({
        name: this.state.name,
        score1: this.state.score1,
        score2: this.state.score2,
        score3: this.state.score3,
        score4: this.state.score4,
        score5: this.state.score5,
    });
    this.setState({ dancers, 
      name: "", score1: "", score2: "", score3: "", score4: "", score5: "",},
      () => this.addToLocalStorage())
  }
handleEditFormSubmit = (index, e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return alert("Please fill all empty text spaces");
    } 
    e.preventDefault();
    let dancers = [...this.state.dancers];
    dancers.splice(index, 1, {name: this.state.name,
      score1: this.state.score1,
      score2: this.state.score2,
      score3: this.state.score3,
      score4: this.state.score4,
      score5: this.state.score5})
    this.setState({ dancers, name: "", score1: "", score2: "", score3: "", score4: "", score5: ""},
    () => this.addToLocalStorage())
    }
canBeSubmitted() {
    const {name, score1, score2, score3, score4, score5} = this.state;
    if (!this.state.addJudges) {
    return (name.length > 0 && 
      score1.length > 0 && 
      score2.length > 0 && 
      score3.length > 0 
    ) } else if (this.state.addJudges) {
      return (name.length > 0 && 
      score1.length > 0 && 
      score2.length > 0 && 
      score3.length > 0 &&
      score4.length > 0 &&
      score5.length > 0 )
    }
  }
calculateScore() {
        const dancers = this.state.dancers;
        const calculatedDancers = dancers.map(dancer => {
            let scoreSum = parseInt(dancer.score1, 10) + parseInt(dancer.score2, 10) + parseInt(dancer.score3, 10) + (dancer.score4 === "" ? 0 : parseInt(dancer.score4, 10)) + (dancer.score5 === "" ? 0 : parseInt(dancer.score5, 10));
            return { ...dancer, totalScore: scoreSum }
       })
       this.setState({ dancers: calculatedDancers })
    }
handleInputChange = (e) => {
        this.setState({...this.state,
        [e.target.name]: e.target.value || 0})
      };
addJudges() {
  const addJudges = this.state.addJudges;
  this.setState({addJudges: !addJudges})
}
deleteDancer = (delIndex) => {
  let dancers = [...this.state.dancers].filter((dancer, index) => index !== delIndex);
  this.setState({ dancers },
    () => this.addToLocalStorage());
};
render() {
        const dancers = this.state.dancers;
        const display = {
            display: "none"
        }
        const none = {};
        return (
          <div>
          <div className="header-buttons">
          <button className="judges-button" onClick={() => this.addJudges()}>{this.state.addJudges ? `3 Judges` : `5 Judges`}</button>
          <button className="reset-button" onClick={() => { if (window.confirm('This will remove all dancers. Are you sure?')) this.removeFromLocalStorage()}}>Reset</button>
          </div>
            <div className="dancersList">
            <table className="dancersTable">
                    <tr>
                        <th>Name</th>
                        <th>Score 1</th>
                        <th>Score 2</th>
                        <th>Score 3</th>
                        <th style={this.state.addJudges ? none : display} >Score 4</th>
                        <th style={this.state.addJudges ? none : display} >Score 5</th>
                    </tr>
                    {dancers.map((dancer, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}. {dancer.name}</td>
                                <td>{dancer.score1}</td>
                                <td>{dancer.score2}</td>
                                <td>{dancer.score3}</td>
                                <td style={this.state.addJudges ? none : display}>{dancer.score4}</td>
                                <td style={this.state.addJudges ? none : display}>{dancer.score5}</td>
                                <div className="list-boxes">
                        <Link to={{ pathname: "/edit", state: { prodIndex: index }}} ><button className="edit-button">Edit</button></Link>
                        <button className="delete-button" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteDancer(index) }}>Delete</button></div>
                            </tr>
                        )
                    })}
                </table>
                </div>
            <Link to={{ pathname: "/add"}} ><button className="add-button">Add Dancer</button></Link>
            <Link to={{ pathname: "/top4" }} ><button className="top4-button" style={dancers.length < 4 ? display : none} onClick={() => {this.calculateScore()}}>Make Top 4</button></Link>
            <Link to={{ pathname: "/top8" }} ><button className="top8-button" style={dancers.length < 8 ? display : none}  onClick={() => {this.calculateScore()}}>Make Top 8</button></Link>
            <Link to={{ pathname: "/top16" }} ><button className="top16-button" style={dancers.length < 16 ? display : none}  onClick={() => {this.calculateScore()}}>Make Top 16</button></Link>
            <Link to={{ pathname: "/top32" }} ><button className="top32-button" style={dancers.length < 32 ? display : none}  onClick={() => {this.calculateScore()}}>Make Top 32</button></Link>
            <Route path="/add" render={(props) => <AddDancer {...props}
            dancers={this.state.dancers}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            addToLocalStorage={this.addToLocalStorage}
            getFromLocalStorage={this.getFromLocalStorage}
            newName={this.state.name}
            newScore1={this.state.score1}
            newScore2={this.state.score2}
            newScore3={this.state.score3}
            newScore4={this.state.score4}
            newScore5={this.state.score5}
            addJudges={this.state.addJudges} />} />
            <Route path="/edit" render={(props) => <EditDancer {...props} 
            dancers={this.state.dancers}
            handleInputChange={this.handleInputChange}
            handleEditFormSubmit={this.handleEditFormSubmit}
            editName={this.state.name}
            editScore1={this.state.score1}
            editScore2={this.state.score2}
            editScore3={this.state.score3}
            editScore4={this.state.score4}
            editScore5={this.state.score5}
            addJudges={this.state.addJudges} />} />
            <Route path="/top4" render={(props) => <Top4 {...props} 
            dancers={this.state.dancers} />} />
            <Route path="/top8" render={(props) => <Top8 {...props} 
            dancers={this.state.dancers} />} />
            <Route path="/top16" render={(props) => <Top16 {...props} 
            dancers={this.state.dancers} />} />
            <Route path="/top32" render={(props) => <Top32 {...props} 
            dancers={this.state.dancers} />} />
            </div>
        )
    }
};
export default Dancers;

