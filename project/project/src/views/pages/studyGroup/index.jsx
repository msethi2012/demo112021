import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table, Modal, Button, Form, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Sidebar from "../../layout/sidebar";
import Navbar from "../../layout/navbar";
import Pagehead from "../../layout/pagehead";
import Footer from "../../layout/footer";
import students from './students'
function diff_years(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));
   
 }

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      students: students,
      errorMsg: '',
      showDelete: false
    };
  }

  openDeleteMd(student, index) {
    this.setState({ ...this.state, currentStudent: student, currentIndex: index, showDelete: true })
  }

  closeDeleteMd() {
    this.setState({ ...this.state, currentStudent: {}, showDelete: false })
  }

  deleteStudent() {
    let students = this.state.students
    students.splice(this.state.currentIndex, 1);
    this.setState({ ...this.state, currentStudent: {}, showDelete: false, students })
  }

  openAddMd(student, index) {
    this.setState({ ...this.state, currentStudent: student, currentIndex: index, showAdd: true })
  }

  closeAddMd() {
    this.setState({ ...this.state, currentStudent: {}, showAdd: false, errorMsg:'' })
  }

  addStudent() {
    let {name, location, email, dob} = this.state.currentStudent
    if(!name || name.length<3) {
      this.setState({...this.state, errorMsg:'Name Should be Atleast 3 character long'})
      return
    }

    if(!name || name.length<3) {
      this.setState({...this.state, errorMsg:'Place Should be Atleast 3 character long'})
      return
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(email)) {
      this.setState({...this.state, errorMsg:'Invalid Email Format'})
      return
    }

    if(!emailPattern.test(email)) {
      this.setState({...this.state, errorMsg:'Invalid Email Format'})
      return
    }
    if(!this.state.selectedDate) this.state.selectedDate= new Date()
    if(diff_years(this.state.selectedDate, new Date())<18) {
      this.setState({...this.state, errorMsg:'Student Should be grater than 18 years'})
      return
    }

    let students = this.state.students
    if (!this.state.currentStudent.sex) this.state.currentStudent.sex = 'Male'
    students.push(this.state.currentStudent);
    this.setState({ ...this.state, currentStudent: {}, showAdd: false, students })
  }

  setDate(dateIn) {

    let date = new Date(dateIn);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    date = [day, mnth, date.getFullYear()].join("/");

    this.setState({ ...this.state, currentStudent: { ...this.state.currentStudent, dob: date }, selectedDate: dateIn })
  }

  setValue(ev) {
    this.setState({ ...this.state, currentStudent: { ...this.state.currentStudent, [ev.target.name]: ev.target.value } })
  }

  render() {
    return (
      <>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Pagehead header="Study Group" />

              {/* Content Area */}
              <div className="content-pad">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Leader</th>
                      <th>Subject</th>
                      <th>Date of Study group</th>
                      <th>Enrolled Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.students.map(((student, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.leader}</td>
                          <td>{student.subject}</td>
                          <td>{student.dateOS}</td>
                          <td>{student.sCount}</td>
                        </tr>
                      )
                    }))}
                  </tbody>
                </Table>
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <Modal
          show={this.state.showDelete}
          onHide={this.closeDeleteMd.bind(this)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Student</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.showDelete && <p>Are you sure want to delete student with name <b>{this.state.currentStudent.name}</b> and email id <b>{this.state.currentStudent.email}</b></p>}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeDeleteMd.bind(this)} variant="secondary">Close</Button>
            <Button onClick={this.deleteStudent.bind(this)} variant="danger">Delete</Button>
          </Modal.Footer>

        </Modal>

        <Modal
          show={this.state.showAdd}
          onHide={this.closeAddMd.bind(this)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              { this.state.errorMsg ? <Alert variant="danger" onClose={() => {}}>
                  {this.state.errorMsg}
               </Alert> : null }
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={this.setValue.bind(this)} name="name" type="name" placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Sex</Form.Label>
                <Form.Select onChange={this.setValue.bind(this)} name="sex" className="form-control" aria-label="Sex">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Place of Birth</Form.Label>
                <Form.Control onChange={this.setValue.bind(this)} name="location" type="place" placeholder="Enter Birth Place" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date of Birth </Form.Label>
                <DatePicker className="form-control" onSelect={this.setDate.bind(this)} selected={this.state.selectedDate} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.setValue.bind(this)} name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeAddMd.bind(this)} variant="secondary">Close</Button>
            <Button onClick={this.addStudent.bind(this)} variant="success">Add</Button>
          </Modal.Footer>

        </Modal>



      </>
    );
  }
}

export default Index;
