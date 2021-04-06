function catIsGone() {
	cat.style.display = "none";
}

const cat = document.getElementById('myCat');

const changePositionHandler = () => {
	cat.style.position = "absolute";
	// TODO: account for cat size when calculating position
	cat.style.left =  Math.random() * 95 + "%";
	cat.style.top =  Math.random() * 95 + "%";
}

const resetTimerHandler = () => {
	window.clearTimeout(timeoutHandle);
	timeoutHandle = window.setTimeout(catIsGone, 1000);
}


timeoutHandle = window.setTimeout(catIsGone, 1000);
cat.addEventListener('click', changePositionHandler);
cat.addEventListener('click', resetTimerHandler);
