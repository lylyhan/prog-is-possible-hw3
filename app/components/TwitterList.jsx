const React = require("react");



function TwitterList(props) {
	
	const listComponents = props.tweets.map((tweet,idx)=>{
		return <li key={idx}>{tweet.user}:{tweet.message} <button key={idx} onClick = {()=> props.onDeleted(tweet.user,tweet.message)}>delete!</button></li>

	})


	return <ul>
		{listComponents}	
	</ul>

}

module.exports = TwitterList;

