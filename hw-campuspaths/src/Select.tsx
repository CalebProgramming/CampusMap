/*
 * Select boxes for start and end buildings
 * Allows user to pick start and end buildings
 * and update data to our App
 */

import React, {Component} from 'react';

interface SelectListProps {
    onClear: () => any;//call back when click clear
    onChangeStart: (start : string) => any;//call back start box value when click clear
    onChangeEnd: (end : string) => any;//call back end box value when click clear
    startName : string; //start building's name
    endName : string;// end building's name
    currName : string;//current building name
}

interface SelectListState {
    buildingList : Map<string, string>;// store every building's short name
}

/**
 * A text field that allows the user to enter the list of edges.
 * Also contains the buttons that the user will use to interact with the app.
 */
class SelectList extends Component<SelectListProps, SelectListState> {

    constructor(props : any) {
        super(props);
        this.state = {
            buildingList : new Map<string, string>(),
        }
    }


    componentDidMount() {
        this.findBuildings();
    }

    render() {
        let startOptions : any = [];
        // startOptions.push(<option key={-1} value={""}>Please select a start building</option>);
        for (let entry of this.state.buildingList.keys()) {
            startOptions.push(<option key={"start : " + entry} value={entry}>{this.state.buildingList.get(entry)}</option>);
        }

        let endOptions : any = [];
        // endOptions.push(<option key={-1} value={""}>Please select an end building</option>);
        for (let entry of this.state.buildingList.keys()) {
            endOptions.push(<option key={"end : " + entry} value={entry}>{this.state.buildingList.get(entry)}</option>);
        }

        return (
            <div>
                <div id="buildingInfo">
                    <div id="startName">
                        <h3>Start Building Name: {this.state.buildingList.get(this.props.startName) + " (" + this.props.startName + ")"}</h3>
                    </div>
                    <div id="endName">
                        <h3>End Building Name: {this.state.buildingList.get(this.props.endName) + " (" + this.props.endName + ")"}</h3>
                    </div>
                    <div id="currName">
                        <h3>Current Building Name: {this.state.buildingList.get(this.props.currName) + " (" + this.props.currName + ")"}</h3>
                    </div>
                </div>
                <div id="select-list">
                    <h4>Start Building</h4>
                    <input id="start" value={this.props.startName} type="text" list="startList" onChange={(e) => this.props.onChangeStart(e.target.value)}/>
                    <datalist id={"startList"}>
                        {
                            startOptions
                        }
                    </datalist>
                    <h4>End Building</h4>
                    <input id="end" value={this.props.endName} type="text" list="endList" onChange={(e) => this.props.onChangeEnd(e.target.value)}/>
                    <datalist id={"endList"}>
                        {
                            endOptions
                        }
                    </datalist>
                    <br/>
                    <button onClick={() => {
                        // this.clearSelect();
                        this.props.onClear()}}>Clear Lines</button>
                </div>
                <div id="Help">
                    <h2>How to use Husky Campus Map?</h2>
                    <p>1. Move Your Mouse On the Map to Locate the Building You Want!</p>
                    <p>2. Click Two Buildings to See the Shortest Path Between Them!</p>
                    <p>3. Select Two Buildings From the Dropdown Boxes to See the Shortest Path Between Them!</p>
                </div>
            </div>
        );
    }

    clearSelect() {
        // @ts-ignore
        console.log(document.getElementById("start").val(""));
        // @ts-ignore
        // document.getEleme
    }


    findBuildings = async () => {
        // This does the exact same thing as makeRequestLong(), in the exact same way.
        // It's just written using a much shorter syntax with less unnecessary variables.
        // The following is basically exactly the structure of what you're going to what to
        // use in HW9 to make a request: you can model your code off of this.
        // Make sure you understand how it works, so you can modify it to do what you want!
        try {
            let response = await fetch("http://localhost:4567/allBuildings");
            if (!response.ok) {
                alert("The status is wrong! Expected: 200, Was: " + response.status);
                return;
            }
            let json = await response.json();
            let map : Map<string, string> = new Map<string, string>();
            for (var entry in json) {
                map.set("", "Please Select a Building!");
                map.set(entry, json[entry]);
            }
            this.setState({buildingList : map});
        } catch (e) {
            alert("There was an error contacting the server.");
            console.log(e);
        }
    }
}

export default SelectList;
