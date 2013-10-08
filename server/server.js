var http=require('http');
var https=require('https');
var fs=require('fs');
var qs=require('querystring');

var filename='data.txt';

if (!fs.existsSync(filename)) fs.appendFileSync(filename,'');
Backend={};

Backend.save=function(obj)
  {
  var time=new Date().toISOString();

  var str=fs.readFileSync(filename).toString();
  
  
  if (str==='') { data={}; } else { data=JSON.parse(str); }
	data[obj.id]={'state':obj.state,'time':time,'lastModified':time,'name':obj.name,'isDone':obj.isDone};

	fs.writeFileSync(filename,JSON.stringify(data));
	
	return JSON.stringify(data);
  };

Backend.show=function()
  {
  var str=fs.readFileSync(filename).toString();
	if(str==='')
	  {  
      return '{}';
	  }
	else
	  {
	  var data=JSON.parse(str);
	  }
	  
	return JSON.stringify(data);
  };


http.createServer(function(request,response)
  {
  var url=request.url;
  var post='';
  var origin;
  if (typeof(request.headers.origin)=='undefined') { origin=''; } else { origin=request.headers.origin; }
  if(request.method=='POST')
    {
    var body='';
    request.on('data',function(data)
	  {
	  body+=data;
	  if (body.length>100000) { request.connection.destroy(); }
	  });
	request.on('end',function()
	  {
	  post=JSON.parse(body);
      switch(url)
        {
   	    case '/state.php':
		response.writeHead(200,{'Content-type':'application/json; charset=utf-8','Access-Control-Allow-Origin':origin,'X-Powered-By': 'Express','Cache-Control': 'no-cache','Pragma': 'no-cache','Expires': '0'});
        response.end(Backend.save(post));
	    break;
	    default:
	    request.connection.destroy();
	    }
	  });
    }
  else
    {
	if(request.method=='GET')
    {
	response.writeHead(200,{'Content-type':'application/json; charset=utf-8','Access-Control-Allow-Origin':origin,'X-Powered-By': 'Express','Cache-Control': 'no-cache','Pragma': 'no-cache','Expires': '0'});
    response.end(Backend.show());
	}
	else
	{
	response.writeHead(200,{'Allow': 'OPTIONS,POST','Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'accept,content-type'});
	response.end();
	}
	}
  }).listen(12345);