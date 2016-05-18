var rank = [];
var destination = 100;
var m = [];
var sho = [];
var Ta,Tb,Te,now,topsrc,leftsrc,rightsrc;
var life,score,flag;
function px2int(a){return parseInt(a.replace('px',''));}
function int2px(a){return a + 'px';}

function getStyle(element, attr)
{
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else{
        return window.getComputedStyle(element,null)[attr];
    }
}

function setStyle(element, attr, val)
{
    if(element.currentStyle){
        return element.currentStyle[attr] = val;
    }else{
        return window.getComputedStyle(element,null)[attr] = val;
    }
}

function newObj(x,y,w,h,color,img,op)
{
	var b = document.createElement("img");
	b.style.position = "absolute";
	b.style.left = int2px(x);
	b.style.top = int2px(y);
	b.style.width = int2px(w);
	b.style.height = int2px(h);
	b.style.backgroundColor = color;
	if(img)
		b.src = img;
	b.style['z-index'] = 1002;
	document.getElementById("game").appendChild(b);
	b.op = op;
	return b;
}

function movenemy1(ob)
{
	var T = setInterval(function(){
		var x = px2int(getStyle(ob,"top"));
		if(x >= 450)
		{
			clearInterval(T);
			ob.parentNode.removeChild(ob);
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
					m.splice(i,1);
			}
			return;
		}
		x += 5;
		ob.style.top = int2px(x);
		var flag = false;
		for(var i = 0; i < m.length; i++)
			if(m[i] == ob) flag = true;
		if(!flag)
		{
			clearInterval(T);
				return;
		}
		if(check(document.getElementById("user"),px2int(getStyle(ob,"left")),px2int(getStyle(ob,"top"))))
		{
			document.getElementById("Hit").play();
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
				{
					m.splice(i,1);
					ob.parentNode.removeChild(ob);
					life--;
					clearInterval(T);
				}
			}
		}
		if(life <= 0 || destination <= 0) clearInterval(T);
	},100);
	return T;
}

function movenemy2(ob)
{
	var T = setInterval(function(){
		var x = px2int(getStyle(ob,"left"));
		if(x >= 500)
		{
			clearInterval(T);
			ob.parentNode.removeChild(ob);
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
					m.splice(i,1);
			}
			return;
		}
		x += 5;
		ob.style.left = int2px(x);
		var flag = false;
		for(var i = 0; i < m.length; i++)
			if(m[i] == ob) flag = true;
		if(!flag)
		{
			clearInterval(T);
				return;
		}
		if(check(document.getElementById("user"),px2int(getStyle(ob,"left")),px2int(getStyle(ob,"top"))))
		{
			document.getElementById("Hit").play();
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
				{
					m.splice(i,1);
					ob.parentNode.removeChild(ob);
					life--;
					clearInterval(T);
				}
			}
		}
		if(life <= 0 || destination <= 0) clearInterval(T);
	},100);
	return T;
}

function movenemy3(ob)
{
	var T = setInterval(function(){
		var x = px2int(getStyle(ob,"left"));
		if(x <= -40)
		{
			clearInterval(T);
			ob.parentNode.removeChild(ob);
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
					m.splice(i,1);
			}
			return;
		}
		x -= 5;
		ob.style.left = int2px(x);
		var flag = false;
		for(var i = 0; i < m.length; i++)
			if(m[i] == ob) flag = true;
		if(!flag)
		{
			clearInterval(T);
				return;
		}
		if(ob && check(document.getElementById("user"),px2int(getStyle(ob,"left")),px2int(getStyle(ob,"top"))))
		{
			document.getElementById("Hit").play();
			for(var i = 0; i < m.length; i++)
			{
				if(m[i] == ob) 
				{
					m.splice(i,1);
					ob.parentNode.removeChild(ob);
					life--;
					clearInterval(T);
				}
			}
		}
		if(life <= 0 || destination <= 0) clearInterval(T);
	},100);
	return T;
}

function shot(ob)
{
	var T = setInterval(function(){
		var x = px2int(getStyle(ob,"top"));
		if(x <= 0)
		{
			clearInterval(T);
			ob.parentNode.removeChild(ob);
			for(var j = 0; j < sho.length; j++)
			{
				if(sho[j] == ob)
					sho.splice(j,1);
			}
			return;
		}
		for(var i = 0; i < m.length; i++)
		{
			var B = m[i];
			var flag = false;
			for(var j = 0; j < sho.length; j++)
				if(sho[j] == ob) flag = true;
			if(!flag)
			{
				clearInterval(T);
				return;
			}
			if(check(B,px2int(getStyle(ob,"left")),px2int(getStyle(ob,"top"))))
			{
				score++;
				document.getElementById("Hit").play();
				ob.parentNode.removeChild(ob);
				m[i].parentNode.removeChild(m[i]);
				m.splice(i,1);
				for(var j = 0; j < sho.length; j++)
				{
					if(sho[j] == ob)
						sho.splice(j,1);
				}
				clearInterval(T);
				return;
			}
		}
		x -= 10; 
		ob.style.top = int2px(x);
	},50);
	return T;
}

function makebg()
{
	var gamebg = document.getElementById("gamebg");
	var T = setInterval(function(){
		var x = px2int(getStyle(gamebg,"top"));
		x += 5;
		now--;
		if(x == 0) 
			x = -450;
		if(now == 0)
			clearInterval(T);
		gamebg.style.top = int2px(x);
	},200);
	return T;
}

function makeenemy()
{
	T = setInterval(function(){
		var x = Math.round(Math.random()*10) % 3;
		switch (x)
		{
			case 0:
				var i = Math.round(Math.random()*10) % 7;
				var ob = new newObj(70 * i,0,70,70,"",topsrc,0);
				ob.T = movenemy1(ob);
				m.push(ob);
				break;
			case 1:
				var i = Math.round(Math.random()*10);
				var ob = new newObj(0,40 * i,40,40,"",leftsrc,1);
				ob.T = movenemy2(ob);
				m.push(ob);
				break;
			case 2:
				var i = Math.round(Math.random()*10);
				var ob = new newObj(410,40 * i,40,40,"",rightsrc,2);
				ob.T = movenemy3(ob);
				m.push(ob);
				break;
		}
	},1000);
	return T;
}

function pause()
{
	if(flag)
	{
		clearInterval(Ta);
		clearInterval(Tb);
		clearInterval(Te);
		document.getElementById("bgaudio").pause();
		document.getElementById("start").style.display="block";
		document.getElementById("ranklist").style.display="block";
		document.getElementById("stop").style.display="block";
		for(var i = 0; i < m.length; i++)
			clearInterval(m[i].T);
		for(var i = 0; i < sho.length; i++)
			clearInterval(sho[i].T);
	}
	else 
	{
		Ta = statu();
		Tb = makebg();
		Te = makeenemy();
		document.getElementById("bgaudio").play();
		document.getElementById("start").style.display="none";
		document.getElementById("ranklist").style.display="none";
		document.getElementById("stop").style.display="none";
		for(var i = 0; i < m.length; i++)
		{
			var x = m[i];
			switch(x.op)
			{
				case 0:
					x.T = movenemy1(x);
					break;
				case 1:
					x.T = movenemy2(x);
					break;
				case 2:
					x.T = movenemy3(x);
			}
		}
		for(var i = 0; i < sho.length; i++)
		{
			var x = sho[i];
			x.T = shot(x);
		}
	}
	flag = flag == true ? false : true;
}
function check(ob,x,y)
{
	var top = px2int(getStyle(ob,"top"));
	var left = px2int(getStyle(ob,"left"));
	var height = px2int(getStyle(ob,"height"));
	var width = px2int(getStyle(ob,"width"));
	if(y > (top + height)) return false;
	if(y < top) return false;
	if(x > (left + width)) return false;
	if(x < left) return false;
	return true;
}

function checkboom()
{
	for(var i = 0; i < m.length; i++)
	{
		if(check(document.getElementById("user"),px2int(getStyle(m[i],"left")),px2int(getStyle(m[i],"top"))))
		{
			document.getElementById("Hit").play();
			life--;
			m[i].parentNode.removeChild(m[i]);
			clearInterval(m[i].T);
			m.splice(i,1);
		}
	}
}

function end()
{
	pause();
	document.getElementById("restart").style.display = "block";
	document.getElementById("restartcontent").innerHTML = "Game over, your score : " + score + " points <br> Please press Space button to restart the game."
	var person = new Object();
	person.name = prompt("You got " + score + " points.Please input your name:");
	person.score = score;
	rank.push(person);
}

function kd()
{
	if(getStyle(document.getElementById("gameArea"),"display") == "none") 
		return false;
	if(!flag && event.keyCode != 32)
		return false;
	if(life <= 0 || now <= 0)
	{
		if(event.keyCode == 32)
			start();
		return;
	}
	var G = document.getElementById("user");
	switch(event.keyCode)
	{
		case 37:
			var x = px2int(getStyle(G,"left")) - 20;
			x = x >= 0 ? x : 0;
			G.style.left = int2px(x);
			checkboom();
			break;
		case 39:
			var x = px2int(getStyle(G,"left")) + 20;
			x = x >= 430 ? 430 : x;
			G.style.left = int2px(x);
			checkboom();
			break;
		case 38:
			var x = px2int(getStyle(G,"top")) - 20;
			x = x >= 0 ? x : 0;
			G.style.top = int2px(x);
			checkboom();
			break;
		case 40:
			var x = px2int(getStyle(G,"top")) + 20;
			x = x >= 380 ? 380 : x;
			G.style.top = int2px(x);
			checkboom();
			break;
		case 32:
			pause();
			break;
		case 82:
			for(var i = 0; i < m.length; i++)
			{
				document.getElementById("Hit").play();
				m[i].parentNode.removeChild(m[i]);
				clearInterval(m[i].T);
				m.splice(i,1);
			}
			break;
		case 88:
			document.getElementById("Shoot").play();
			var x = px2int(getStyle(document.getElementById("user"),"top")) - 10;
			var y = px2int(getStyle(document.getElementById("user"),"left")) + 33;
			var ob = newObj(y,x,5,10,"white","",-1);
			ob.T = shot(ob);
			sho.push(ob);
			break;
	}
}
function statu()
{
	var T = setInterval(function(){
		document.getElementById("life").innerHTML = "Life: 20 / " + life;
		document.getElementById("score").innerHTML = "Score: " + score;
		document.getElementById("destination").innerHTML = "Destination: " + now;
	},50);
	return T;
}

function start()
{
	var pic = document.getElementsByClassName("active");
	if(pic.length <= 0)
	{
		alert("Please chose an aircraft !");
		return false;
	}
	document.getElementById("stop").style.display="none";
	document.getElementById("restart").style.display = "none";
	document.getElementById("showranklist").style.display = "none";
	document.getElementById("bgaudio").play();
	now = destination;
	life = 20;
	flag = true;
	score = 0;
	Ta = clearInterval(Ta);
	Tb = clearInterval(Tb);
	Te = clearInterval(Te);
	for(var i = 0; i < m.length; i++)
	{
		m[i].parentNode.removeChild(m[i]);
		clearInterval(m[i].T);
	}
	for(var i = 0; i < sho.length;i++)
	{
		sho[i].parentNode.removeChild(sho[i]);
		clearInterval(sho[i].T);
	}
	m.splice(0,m.length);
	sho.splice(0,sho.length);
	document.getElementById("start").style.display="none";
	document.getElementById("ranklist").style.display="none";
	var user = document.getElementById("user");
	user.src = pic[0].childNodes[0].src;
	user.style.top = "350px";
	user.style.left = "210px";
	var game = document.getElementById("gameArea");
	game.style.display = "block";
	game.focus();
	Ta = statu();
	Tb = makebg();
	topsrc = "./images/default enemy.png";
	leftsrc = "./images/left enemy.png";
	rightsrc = "./images/right enemy.png";
	var uploadsrc = document.getElementById("monster");
	if(uploadsrc) topsrc = uploadsrc.src;
	Te = makeenemy();
	var T = setInterval(function(){
		if(life <= 0 || now <= 0)
		{
			end();
			clearInterval(T);
		}
	},200);
}

function rule()
{
	var x = document.getElementById("gameArea");
	if(x.style.display != "none" && flag) 
		pause();
	document.getElementById("bg").style.display ="block";
    document.getElementById("showrule").style.display ="block";
}

function ranklist()
{
	var x = document.getElementById("gameArea");
	if(x.style.display != "none" && flag) 
		pause();
	rank.sort(function(a,b)
	{
		return a.score < b.score;
	});
	var text = "<h3>Rank</h3>";
	for(var i = 0; i < 5; i++)
	{
		if(i >= rank.length)
			text += "<p>Rank" + (i + 1) + " : XXXXX 0 </p>"; 
		else
			text += "<p>Rank" + (i + 1) + " : " + rank[i].name + " " + rank[i].score; 
	}
	text += "<button id=\"close\" onclick=\"closed()\">Return</button>"
	document.getElementById("showranklist").innerHTML = text;
	document.getElementById("showranklist").style.display = "block";
}

function chose(element)
{
	var x = document.getElementsByClassName("end");
	if(x.length > 0)
	{
		x[0].className = "";
	}
	var x = document.getElementsByClassName("active");
	if(x.length > 0)
	{
		x[0].style.border="solid 2px white";
		x[0].className = "end";
	}
	element.className = "active";
	element.style.border="solid 2px #5cb85c";
}

function closed()
{
    document.getElementById("bg").style.display = "none";
    document.getElementById("showrule").style.display ="none";
    document.getElementById("showranklist").style.display ="none";
    document.getElementById("gameArea").focus();
}

function handleFileSelect(evt)
{
	document.getElementById("dropbox").innerHTML="";
	evt.stopPropagation();
	evt.preventDefault();
	var file = evt.dataTransfer.files;
	var reader = new FileReader();
	reader.onload = (function(theFile) {
	    return function(e) {
	        var span = document.createElement('span');
	        span.innerHTML = ['<img id=\"monster\" src="', e.target.result,
	            '" title="', theFile.name, '"/>'].join('');
	        document.getElementById('dropbox').appendChild(span);
		};
	})(file[0]);
	reader.readAsDataURL(file[0]);
}

function handleDragOver(evt)
{
	evt.stopPropagation();
	evt.preventDefault();
}

var dropZone = document.getElementById("dropbox");
dropZone.addEventListener('dragover',handleDragOver,false);
dropZone.addEventListener('drop',handleFileSelect,false);