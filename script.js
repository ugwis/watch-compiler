var xhr = new XMLHttpRequest();

const language = "cpp11"
const input = ""
const source_code = '%23include%20%3cbits%2fstdc%2b%2b%2eh%3e%0d%0a%0d%0ausing%20namespace%20std%3b%0d%0a%0d%0aint%20main%28%29%7b%0d%0acout%20%3c%3c%20%22Hello%2cWorld%22%20%3c%3c%20endl%3b%0d%0areturn%200%3b%0d%0a%7d'

var reqest_time;

xhr.onreadystatechange = function() {
    switch ( xhr.readyState ) {
        case 0:
            console.log( 'uninitialized!' );
            break;
        case 1:
            console.log( 'loading...' );
            break;
        case 2:
            console.log( 'loaded.' );
            break;
        case 3:
            console.log( 'interactive... '+xhr.responseText.length+' bytes.' );
            break;
        case 4:
            if( xhr.status == 200 || xhr.status == 304 ) {
                var data = xhr.responseText;
                console.log( 'COMPLETE! :'+data );
				var time = new Date() - request_time;
				document.getElementById(request_queries[queries_index].selector).children[1].innerHTML = time;
				xhr.abort();
				setTimeout(time_req, 1000);
				queries_index=(queries_index+1)%request_queries.length				
            } else {
                console.log( 'Failed. HttpStatus: '+xhr.statusText );
				setTimeout(time_req, 10000);
            }
            break;
    }
};

var request_queries = [
	{selector: "pretime", query: "language=" + language + "&source_code=" + source_code + "&input=" + input + "&precompile=true"},
	{selector: "exetime", query: "language=" + language + "&source_code=" + source_code + "&input=" + input + ""},
	{selector: "totaltime", query: "language=" + language + "&source_code=" + source_code + "&input=" + input + "&nocache=true"}
]

var queries_index = 0;

function time_req(){
	request_time = new Date();
	xhr.open( 'POST', 'https://compiler.ugwis.net/api/run', true );
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(request_queries[queries_index].query);
	console.log("time_req();");
}

window.onload = function(){
	time_req();
}
