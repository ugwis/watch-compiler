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
				document.getElementById('spr').innerHTML = time + " sec/req"
				setTimeout(time_req, 1000);
            } else {
                console.log( 'Failed. HttpStatus: '+xhr.statusText );
            }
            break;
    }
};

function time_req(){
	request_time = new Date();
	xhr.open( 'POST', 'https://compiler.ugwis.net/api/run', false );
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("language=" + language + "&source_code=" + source_code + "&input=" + input)
	console.log("time_req();");
	document.getElementById('rps');
}

window.onload = function(){
	time_req();
}
