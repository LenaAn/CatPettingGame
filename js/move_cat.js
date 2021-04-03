const cat = document.getElementById('myCat');
alert(cat);

const handler = () => {
	cat.style.position = "absolute";
	// TODO: set relative position
	cat.style.left =  Math.random() * 1000 + "px";
	cat.style.top =  Math.random() * 1000 + "px";
}

cat.addEventListener('click', handler);