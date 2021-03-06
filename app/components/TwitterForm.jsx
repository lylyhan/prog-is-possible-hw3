const React = require("react");
const qs = require("qs");


function TwitterForm(props) {

	const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }
    
// this function post to database by fetching json in tweets(who are states too) and update the state 
    const asyncSubmit = async () => {
        const response = await fetch('/api/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({user, message})),
        });
        if (response.status === 200) {
            setUser("");
            setMessage("");
            if (props.onTweeted) props.onTweeted();//??? where is this function defined
        }
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
            <input type="submit" value="Submit"/>
        </form>
    );
}


module.exports = TwitterForm;