const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm");
const TwitterFilter = require("./TwitterFilter");



/* the main page for the index route of this app */
const RootComponent = function() {

	const [tweets,setTweets] = React.useState([]);

	const doFetchTweets = async() =>{
		//fetch the data
		const response = await fetch("/api/tweets");
		const data = await response.json();
		setTweets(data);
	
	};

	const fetchFilteredTweets_user = async(userid) =>{
		//fetch the filtered data from whatever userid specified
		const response = await fetch("/api/users/"+userid); //how does root component know which userId?
		const data = await response.json();
		setTweets(data);
	};
/*
	const fetchFilteredTweets_msg = async(msg) =>{
		//fetch the filtered data from whatever userid specified
		const response = await fetch("/api/msgs/"+msg); //how does root component know which userId?
		const data2 = await response.json();
		setTweets(data2);
	};
	
	*/
	const fetchDeletedTweets = async (user,message) =>{
		//fetch the filtered data from whatever userid specified
		
		const response = await fetch("/api/delete/"+user+"/"+message); //how does root component know which userId?
		//doFetchTweets();
		console.log("deleted"+user+" "+message);
		const response2 = await fetch("/api/tweets"); //how does root component know which userId?
		const data = await response2.json();
		
		//console.log(JSON.stringify(data));
	    setTweets(data);
	   

	};
	 

	//whatever inside would only run once
	React.useEffect(()=>{
		doFetchTweets();

	},[])//state that's listening (rerun everytime this state is changing), empty bracket means only run once

	return (
	    <div>
	      <h1>Dumb Twitter</h1>

	      <p>Your app here</p>

	      <ClockFace language="fr" />
	      <TwitterForm onTweeted = {doFetchTweets}/>
	      <TwitterFilter onFiltered = {fetchFilteredTweets_user} /> 
	      <TwitterList tweets = {tweets} onDeleted = {fetchDeletedTweets}/>
	    </div>
	  );
	}


module.exports = RootComponent;