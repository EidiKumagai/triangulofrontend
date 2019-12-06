import React, {useCallback} from 'react'
import { Component } from 'react';
import api from '../../containers/Page/api';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import Dropzone from './dropzone';
import Progress from './progress';
import './upload.css';
import img from './79-512.png';

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false
      };
  
      this.onFilesAdded = this.onFilesAdded.bind(this);
      this.uploadFiles = this.uploadFiles.bind(this);
      this.sendRequest = this.sendRequest.bind(this);
      this.renderActions = this.renderActions.bind(this);
    }
  
    onFilesAdded(files) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
    }
  
    async uploadFiles() {
      this.setState({ uploadProgress: {}, uploading: true });
      const promises = [];
      this.state.files.forEach(file => {
        promises.push(this.sendRequest(file));
      });
      try {
        await Promise.all(promises);
  
        this.setState({ successfullUploaded: true, uploading: false });
      } catch (e) {
        // Not Production ready! Do some error handling here instead...
        this.setState({ successfullUploaded: true, uploading: false });
      }
    }
  
    sendRequest(file) {

      var formData = new FormData();
      
        formData.append("File", file)
        
         var config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
         } 
        console.log(formData);

      
        api.post('https://api-triangulo.herokuapp.com/upload', formData).then((resp) => {
          console.log(resp);
        })
      // return new Promise((resolve, reject) => {
      //   const req = new XMLHttpRequest();
  
      //   req.upload.addEventListener("progress", event => {
      //     if (event.lengthComputable) {
      //       const copy = { ...this.state.uploadProgress };
      //       copy[file.name] = {
      //         state: "pending",
      //         percentage: (event.loaded / event.total) * 100
      //       };
      //       this.setState({ uploadProgress: copy });
      //     }
      //   });
  
      //   req.upload.addEventListener("load", event => {
      //     const copy = { ...this.state.uploadProgress };
      //     copy[file.name] = { state: "done", percentage: 100 };
      //     this.setState({ uploadProgress: copy });
      //     resolve(req.response);
      //   });
  
      //   req.upload.addEventListener("error", event => {
      //     const copy = { ...this.state.uploadProgress };
      //     copy[file.name] = { state: "error", percentage: 0 };
      //     this.setState({ uploadProgress: copy });
      //     reject(req.response);
      //   });
  
      //   const formData = new FormData();
      //   formData.append("file", file, file.name);
        
      //   console.log(formData);
      //   api.post('https://api-triangulo.herokuapp.com/upload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      //   // req.open("POST", "https://api-triangulo.herokuapp.com/upload");
      //   // req.send(formData);
      // });
    }
  
    renderProgress(file) {
      const uploadProgress = this.state.uploadProgress[file.name];
      if (this.state.uploading || this.state.successfullUploaded) {
        return (
          <div className="ProgressWrapper">
            <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
            <img
              className="CheckIcon"
              alt="done"
              src={img}
              style={{
                opacity:
                  uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
              }}
            />
          </div>
        );
      }
    }
  
    renderActions() {
      if (this.state.successfullUploaded) {
        return (
          <button
            onClick={() =>
              this.setState({ files: [], successfullUploaded: false })
            }
          >
            Clear
          </button>
        );
      } else {
        return (
          <button
            disabled={this.state.files.length < 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            Upload
          </button>
        );
      }
    }
  
    render() {
      return (
        <div className="Upload">
          <span className="Title"></span>
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading || this.state.successfullUploaded}
              />
            </div>
            <div className="Files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      );
    }
  }


export default connect(
    null
)(Upload);