const userId = "1473951187673228853";

function getLatest(maxResults) {
	let url = 'https://www.googleapis.com/blogger/v3/blogs/' + userId 
	 + '/posts?key=' + "AIzaSyDyOzcQFTCjSmlT-nd5rbLXLca3glNkZhg" 
	 + '&fetchBodies=false'
	 + '&fetchImages=true';
	
	if(maxResults > 0) {
		url += '&maxResults=' + maxResults;
	}
	
	return fetch(url);
}

function getPostById(postId) {
	return fetch('https://www.googleapis.com/blogger/v3/blogs/' + userId + '/posts/' + postId + '?key=' + "AIzaSyDyOzcQFTCjSmlT-nd5rbLXLca3glNkZhg");
}

function setPosts(posts) {
	// to hold all the stuff we create
	var parent = document.getElementById("blogger");

	// if no posts
	if(!posts) {
		console.log("posts are null");
		return;
	}

	for(let i = 0; i < posts.length; i++) {
		var url = "muntins.html?post=" + posts[i].id;

		//outer div, each post we're showing
		var div = document.createElement("div");
		div.classList.add("trans-well");
		div.classList.add("row");

		// left col
		var colLeft = document.createElement("div");
		colLeft.classList.add("col-lg-4");
		// the link
		var link = document.createElement("a");
		link.href = url;
		// image in left col
		var img = document.createElement("img");
		img.classList.add("img-fluid");
		img.classList.add("thumbnail");
		if(typeof posts[i].images === "undefined") {
			img.src ="img/collie.jpg"
		}
		else {
			img.src = posts[i].images[0].url;
		}

		
		// right column
		var colRight = document.createElement("div");
		colRight.classList.add("col-lg-8");
		// the link
		var headerLink = document.createElement("a");
		headerLink.href = url;
		// the header
		var header = document.createElement("h3");
		header.classList.add("text-center");
		header.innerText = posts[i].title;

		headerLink.appendChild(header);

		link.appendChild(img);
		colLeft.appendChild(link);
		colRight.appendChild(headerLink);
		div.appendChild(colLeft);
		div.appendChild(colRight);
		parent.appendChild(div);
	}
}

function setPost(post) {
	var elem = document.getElementById("blog-container");
	elem.innerHTML = "";
	elem.classList.add("trans-well");
	
	var title = document.createElement("h1");
	title.innerText = post.title;
	title.classList.add("text-center");

	var body = document.createElement("div");
	body.innerHTML = post.content;

	var hr = document.createElement("hr");

	elem.appendChild(title);
	elem.appendChild(hr);
	elem.appendChild(body);
	elem.classList.add("box");
	console.log(post.content);
}

let url = new URL(window.location.href);
let query = url.searchParams.get("post");
// if there is a query, find it
if(query) {
	let callback = setPost;

	getPostById(query).then(function(response) {
		if(response.ok) {
			response.json().then(data => {
				//console.log(data);
				callback(data);
				
			});
		}
		else {
			console.log("problem fetching post")
		}
	});
}
else {
	let callback = setPosts;

	getLatest().then(function(response) {
		if(response.ok) {
			response.json().then(data => {
				callback(data.items);
			});
		}
		else {
			console.log("problem fetching latest posts")
		}
	});
}