//code reused from https://www.geeksforgeeks.org/file-uploading-in-react-js/
//selectedFile holds the file uploaded 

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import React,{Component} from 'react';


import calendar from './images/calender.png';
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

	// Hides the download button when the file is changed. 
	document.getElementById("downloadButton").style.display='none';

	// Hides the error message when file is changed
	document.getElementById('error').style.display='none';

	};
  
	// On file upload (click the upload button)
	onFileUpload = () => {

		// checks if the file has the .pdf extension
		if (this.state.selectedFile != null && this.state.selectedFile.name.split(".").pop().toLowerCase() === "pdf"){

			// Scrolls to the Download button at the bottom of the page
			document.getElementById('downloadButton').scrollIntoView();

			// Shows the download button
			document.getElementById("downloadButton").style.display='block';

			// guid or uuid generator
			uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

			// Create an object of formData
			const formData = new FormData();
			
			// Update the formData object
			formData.append(
				"file",
				this.state.selectedFile
			);
			
			// this id is fileName + guid
			const id = this.state.selectedFile.name + "" + uuidv4();


			// Details of the uploaded file
			console.log(this.state.selectedFile);
			
			// Request made to the backend api
			// Send formData object
			axios.post("/uploadfile", formData).then((response) => response.json())
					.then((result) => {
						console.log('Success:', result);
					})
					.catch((error) => {
						console.error('Error:', error);
					});
		}else{
			document.getElementById('error').style.display='block';
		}
	};

  // This is what happens after you press the download button.
  downloadFile = () => {

  }
	render() {
	
		
	
    const styleTitle = {
      color: "#a2a09f",
      backgroundColor: "#faf6f3",
      padding: "30px",
      fontFamily: "Brush Script MT",
      "font-size" : "70px",
      marginTop: 0
    };

    const styleButton = {
      color: "#a2a09f",
      backgroundColor: "#faf6f3",
      padding: "30px",
      fontFamily: "Brush Script MT",
      "font-size" : "70px",
      marginTop: 0
    };

	const errorMessage = "You need to upload a pdf file!";
    
	return (
		<div>
     
      <h1 id='center' style={styleTitle}>Syllamate</h1>
     

      <div>
      <img className='student' src={student} id='left' alt = ''/> 
      

      
      <img className='calendar' src={calendar}  id='right' alt = ''/>
      </div>
      

			<div>
			<input id="file-upload" type="file" onChange={this.onFileChange} />
			{errorMessage && <div id='error' hidden> {errorMessage} </div>}

        <br></br>
		
			  <button style={styleButton} name='Upload' id='rcorners3' onClick={this.onFileUpload}>
          
				Upload!
				</button>

			</div>
      <div id='center'>
      <button  style={styleButton} className='downloadButton' id='downloadButton' hidden onClick={this.downloadFile}>Get your schedule!</button>
      </div>
		</div>


	);
	}
}

export default App;
