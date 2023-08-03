import './App.css';
import DataForm from "./DataForm";

function App() {
    return (
        <div className="App">
            <div className="content">
                <div className="header">
                    <h3 className="logo">Patient Register</h3>
                </div>
                <DataForm/>
                <div className="footer">
                    <p className="footer">patient reg form &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
