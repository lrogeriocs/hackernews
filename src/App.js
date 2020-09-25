import React, {Component} from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

function isSearched(searchTerm) {
    return function (item) {
        return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}

const otherInternal = 'Another state'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: list,
            searchTerm: '',
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {

        //First refactoring
        /* function isNotId(item){
             return item.objectID !=id;
         }
         const updatedList = this.state.list.filter(isNotId);*/

        //second refactoring
        //const isNotId = item => item.objectID !=id;
        //const updatedList = this.state.list.filter(isNotId);

        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({list: updatedList});
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }


    render() {
        const {searchTerm, list} = this.state;
        return (
            <div className="page">
                <div className="interactions">
                <Search value={searchTerm}
                        onChange={this.onSearchChange}
                />
                Search
                </div>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>

            /* <div className="App">
                 <form>
                     <input type="text" onChange={this.onSearchChange} value={searchTerm}/>
                 </form>
                 {list.filter(isSearched(searchTerm)).map(item =>
                     <div key={item.objectID}>
                         <span>
                             <a href={item.url}>{item.title}</a>
                         </span>
                         <span>{item.author}</span>
                         <span>{item.num_comments}</span>
                         <span>{item.points}</span>
                         <span>
                             <button onClick={()=>{
                                 this.onDismiss(item.objectID)
                             }} type="button">
                                 Dismiss
                             </button>
                         </span>
                     </div>
                )}
             </div>*/
        );
    }
}

const Search = ({value, onChange, children}) =>
            <form>{children}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>


const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
        { list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID} className="table-row">
              <span style={{width: '40%'}}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={{width: '30%'}}>
                  {item.author}
              </span>
              <span style={{width:'10%'}}>
                  {item.num_comments}
              </span>
              <span style={{width:'10%'}}>
                  {item.points}
              </span>
              <span style={{width: '10%'}}>
                 <Button
                     onClick={() => onDismiss(item.objectID)}
                     className="button-inline"
                    >
                     Dismiss
                 </Button>
             </span>
            </div>
        )}
    </div>


class Button extends Component {
    render() {
        const {
            onClick,
            className ='',
            children,
        } = this.props;
        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        );
    }
}

export default App;
