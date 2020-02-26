const React = require("react");
const qs = require("qs");


function TwitterFilter(props) {

	const [Userid, setUserid] = React.useState("");
    //const [msg, setmsg]= React.userState("");
    //update filter id every time the client type something in
    const updateid = (event) => {
        setUserid(event.target.value);
    }

    //link with server to update the server which user we picked
    const asyncFilter = () => {
       if (props.onFiltered) props.onFiltered(Userid); 
        
    }

    const handleSubmit = (event) => {
        asyncFilter();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Filter:
                <input type="text" value={Userid} onChange={updateid}/>
            </label>
            <input type="submit" value="Search"/>
          
        </form>
    );
}

	

module.exports = TwitterFilter;