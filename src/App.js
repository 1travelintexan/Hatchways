import { Component } from 'react';
import './App.css';
import FetchData from './components/FetchData';


class App extends Component{
state = {
  loading: true,
  students: null,
  search: ''
}

//mounting the data
async componentDidMount(){
const url = 'https://api.hatchways.io/assessment/students'
const response = await fetch(url)
const data = await response.json()
  this.setState({students: data.students, loading: false})
}


render(){
  const {students} = this.state
  return (
    <div className="App">
      <FetchData 
        students = {students} />
    </div>
  );
}
}

export default App;
