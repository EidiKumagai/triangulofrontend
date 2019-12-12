import React, {useCallback} from 'react'
import { Component } from 'react';
import api from '../../containers/Page/api';
import { notification } from '../../components';
import { Modal, Button } from 'antd';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import Dropzone from './dropzone';
import Progress from './progress';
import './upload.css';
import img from './79-512.png';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        visible: false
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

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
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
          notification('success','Success !')
        }).catch(erro => {
          notification('error','Something is wrong, try again')
        });
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

    CommitFiles(){
      api.post('https://api-triangulo.herokuapp.com/pricerule', {

      }).then(res => {
        notification('success', 'Files commited');
      }).catch(error => {
        notification('error', 'Something is wrong, try again');
      });
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
          <div>
            <button
            disabled={this.state.files.length < 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            Upload
          </button>

          <br></br>
          <br></br>
          <button onClick={() => this.CommitFiles()}>Commit Files</button>
          </div>
          
        );
      }
    }
  
    render() {
      return (

        <div>
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
                    <button>Commit Files</button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
        
        <br/>
        <div>
          <Modal
            title="Helper to upload files"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div>
            <p>
            This manual help to execut the update for tables Price Rule list into application.
            </p>
              
            </div>
            

             
            <br/>  
            <p>1.	Extract reports lists of the Quickbooks.
            In the menu opened click in open Lists > Price Rule List 
            </p>
            <img src={img1} style={{width: "228px"}} alt="imagem1"/>
            <br/>
            <p>In the window Price Rule List click in reports, 
              perform this part two times one for Price Rules by Customer (Customers) report and other Item Price 
              by Price Rule (Itens) report if need.
            </p>
            <img src={img2} style={{width: "261px"}} alt="imagem2"/>

            <br/>
            <p>After open a Itens report or Costumer report, send for email as excel or extract a excel file.
            </p>

            <img src={img3}  alt="img3"/>
            <br/>
            <p>2.	This moment you already have the file in format excel, 
            and now you need rename the files .xlsx for agrees with application.</p>
            <br/>

            <p>Name for list of itens : <b>Itens.xlsx</b></p>
            <p>Name for list of costumers: <b>Costumers.xlsx</b></p>
            <br/>

            <p>Atention: Make sure that be rename the correct file. The system won´t make the update case the names haven´t been named corretly or the name file don´t agrees whit you context of the file.</p>
            

            <br/>
            <p>3. Slide or find the files and put on upload area and click on Upload button.</p> 
            
            <br/>
            <p>4. After followed all tutorial click on Commit Files button.</p>
            <br/>
            <p>Observation: Also can be update only a table one at a time</p>

          </Modal>
          <button onClick={this.showModal} > Helper</button>
        </div>

        </div>
      );
    }
  }


export default connect(
    null
)(Upload);