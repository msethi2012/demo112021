import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Sidebar from "../../layout/sidebar";
import Navbar from "../../layout/navbar";
import Pagehead from "../../layout/pagehead";
import Footer from "../../layout/footer";
import students from "./students";
import { useParams } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      students: students,
      student:{},
      showDelete: false,
    };
  }

  componentDidMount() {
    let students = this.state.students
    const { id } = this.props.match.params;
    let student = students.filter((st,index)=>index==id)[0]
    this.setState({...this.state, student:student},()=>{
      new Date(String(this.state.student.dob).split('/')[2],String(this.state.student.dob).split('/')[1]-1,String(this.state.student.dob).split('/')[0])
    })
  }

  openDeleteMd(student, index) {
    this.setState({
      ...this.state,
      currentStudent: student,
      currentIndex: index,
      showDelete: true,
    });
  }

  closeDeleteMd() {
    this.setState({ ...this.state, currentStudent: {}, showDelete: false });
  }

  deleteStudent() {
    let students = this.state.students;
    students.splice(this.state.currentIndex, 1);
    this.setState({
      ...this.state,
      student: {
        name:'',
        dob:'',
        location:'',
        sex:'',
        email:''
      },
    });
  }

  setDate(date) {
    this.setState({...this.state, student: {...this.student, dob:date} })
  }

  setValue(ev){
    this.setState({...this.state, student: {...this.student, [ev.target.name]:ev.target.value} })
  }

  render() {
    return (
      <>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Pagehead header="Update Student" />

              {/* Content Area */}
              <div className="content-pad max500">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={this.state.student.name} onChange={this.setValue.bind(this)} name="name" type="name" placeholder="Enter name" />
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
                    <Form.Control defaultValue={this.state.student.location} onChange={this.setValue.bind(this)} name="location" type="place" placeholder="Enter Birth Place" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date of Birth </Form.Label>
                    <DatePicker className="form-control" selected={new Date()}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.setValue.bind(this)} defaultValue={this.state.student.email} name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>


                  <Button variant="primary" type="submit" onClick={this.state.updateStudent}>
                    Submit
                  </Button>
                </Form>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default Index;
