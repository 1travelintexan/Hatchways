import React, { Component } from "react";
import logo1 from "../grey-plus.png";
import logo2 from "../minus.png";

class FetchData extends Component {
  state = {
    students: null,
    search: "",
    searchTag: "",
    showTests: false,
  };

  //set students with state
  componentDidMount() {
    const { students } = this.props;
    this.setState({
      students: students,
    });
  }

  //onchange function to handle search
  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  //onchange function to handle tag search
  handleSearchTag = (e) => {
    this.setState({ searchTag: e.target.value });
  };
  //toggle grades
  onToggle = (e, elem) => {
    if (this.state.showTests === true) {
      this.setState({ showTests: false });
    } else {
      this.setState({ showTests: true });
    }
  };

  //toggle tag and search
  handleAddTag = (e, elem) => {
    e.preventDefault();
    let newTag = e.target.tag.value;
    this.setState({
      students: (this.state.students[elem.id - 1].tags = [newTag]),
    });
    console.log("state", this.state.students);
  };

  render() {
    const { students } = this.props;
    const { search, searchTag } = this.state;
    let filteredStudents = students;
    let filteredTags = [];

    //filter search for students
    if (!students) {
      <div>Loading...</div>;
    } else {
      for (let i = 0; i < filteredStudents.length; i++) {
        let fullName =
          filteredStudents[i].firstName + " " + filteredStudents[i].lastName;
        filteredStudents[i].fullName = fullName;
      }

      filteredStudents = students.filter((student) => {
        return (
          student.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      });
    }

    // //filter tags search
    // if (filteredTags.length == 0) {
    //     <div>No Tags</div>;
    //   } else {
    //     filteredTags = students.filter((student) => {
    //       return (
    //         student.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    //       );
    //     });
    //   }

    return (
      <div className="page">
        <div className="search">
          <input
            type="text"
            placeholder="Search by name"
            onChange={this.handleSearch.bind(this)}
          />
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by tag"
            className="search"
            onChange={this.handleSearchTag.bind(this)}
          />
        </div>
        {!filteredStudents ? (
          <div>Loading... </div>
        ) : (
          filteredStudents.map((elem, index) => {
            return (
              <div key={index} className="student">
                <div className="image-student">
                  <img
                    className="image"
                    src={elem.pic}
                    alt="pic"
                    height="100px"
                  />
                </div>
                <div className="names">
                  <h1>
                    {elem.firstName} {elem.lastName}
                  </h1>
                  <div className="indent">
                    <p>Email: {elem.email}</p>
                    <p>Company: {elem.company}</p>
                    <p>Skill: {elem.skill}</p>
                    <p>
                      Average:{" "}
                      {elem.grades.reduce((a, b) => Number(a) + Number(b)) /
                        elem.grades.length}
                    </p>
                    {!elem.tags ? null : (
                      <div className="tag"> {elem.tags}</div>
                    )}
                    <form onSubmit={(e) => this.handleAddTag(e, elem)}>
                      <input
                        type="text"
                        name="tag"
                        placeholder="Add a tag"
                        className="tag-input"
                        width={200}
                      />
                    </form>
                    <div>
                      {!this.state.showTests
                        ? null
                        : elem.grades.map((grade, i) => {
                            return (
                              <div key={i}>
                                <p>
                                  Test {i + 1}:{grade}%
                                </p>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="logo">
                  {this.state.showTests ? (
                    <img
                      src={logo2}
                      width="50"
                      height="50"
                      alt="minus-pic"
                      onClick={(e) => this.onToggle(e, elem)}
                    />
                  ) : (
                    <img
                      src={logo1}
                      width="50"
                      height="50"
                      alt="plus-pic"
                      onClick={(e) => this.onToggle(e, elem)}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
export default FetchData;
