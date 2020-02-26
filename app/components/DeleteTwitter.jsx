const React = require("react");
const qs = require("qs");


function DeleteTwitter(props) {

	const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    const asyncSubmit = async () => {
       
        if (props.onDeleted) props.onDeleted();
        
    }

    const handleSubmit = (event) => {
        asyncSubmit();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User: 
                <input type="text"value={user} onChange={updateUser}/>
            </label>
            <label>
                Message: 
                <input type="text" value={message} onChange={updateMessage}/>
            </label>
            <input type="submit" value="delete"/>
        </form>
    );
}

	

module.exports = DeleteTwitter;