//code reused from https://www.geeksforgeeks.org/file-uploading-in-react-js/
//selectedFile holds the file uploaded 

import axios from 'axios';

import React,{Component} from 'react';

import calendar from './images/calendar.png';
import student from './images/students_books.png.png';


class App extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
	axios.post("api/uploadfile", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
<p>File Name: {this.state.selectedFile.name}</p>
		
<p>File Type: {this.state.selectedFile.type}</p>

			
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
    const mystyle = {
      color: "black",
      backgroundColor: "#faf6f3",
      padding: "30px",
      fontFamily: "Brush Script MT",
      "font-size" : "65px",
      
    };
	return (
		<div>
     
      <h1 id='center' style={mystyle}>Syllamate</h1>
     

      <div>
      <img className='student' src={student} id='left' alt = ''/> 
      

      
      <img className='calendar' src={calendar}  id='right' alt = ''/>
      </div>
      

			<div>
				<input type="file" onChange={this.onFileChange} />
				<button name='Upload' onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		</div>
	);
	}
}

export default App;
