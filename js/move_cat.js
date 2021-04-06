const cat = document.getElementById('myCat');

const handler = () => {
	cat.style.position = "absolute";
	// TODO: account for cat size when calculating position
	cat.style.left =  Math.random() * 95 + "%";
	cat.style.top =  Math.random() * 95 + "%";
}

cat.addEventListener('click', handler);