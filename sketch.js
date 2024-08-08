
const CELLS = 16, RADIUS = 10, SPACING = 2;
const SIZE = CELLS * RADIUS * 2 + (CELLS - 1) * SPACING;

let f = () => 0, start = Date.now(), textparams = [];

function setup() {
	createCanvas(SIZE, SIZE, document.getElementById("box"));
	colorMode(RGB, 1);
	noStroke();
}

function draw() {
	background(0);
	for (let i = 0; i < CELLS; i++) {
		for (let j = 0; j < CELLS; j++) {
			let diameter = RADIUS * 2;
			const x = j * (diameter + SPACING) + RADIUS;
			const y = i * (diameter + SPACING) + RADIUS;
			let value, t = (Date.now() - start) / 1000;
			try { value = f(...order(i, j, t, x / SIZE, 1 - y / SIZE)); }
			catch { value = 0; }
			try {
				if (Array.isArray(value)) {
					value = value.flat();
					switch (value.length) {
						case 1: fill(value[0]); break;
						case 2: fill(value[0]); diameter *= value[1]; break;
						case 3: fill(value[0], value[1], value[2]); break;
						case 4: fill(value[0], value[1], value[2]); diameter *= value[3]; break;
					}
				} else fill(value);
				circle(x, y, clamp(diameter, 0, RADIUS * 2));
			} catch { }
		}
	}
}

/// orders parameters based on the order given by textparams
function order(i, j, t, u, v) {
	let result = textparams.slice();
	for (let k = 0; k < result.length; k++) {
		const x = u - 0.5, y = v - 0.5;
		switch (result[k]) {
			case "n": result[k] = i * CELLS + j; break;
			case "x": result[k] = x; break; // cartesian x (-0.5...+0.5)
			case "y": result[k] = y; break; // cartesian y (-0.5...+0.5)
			case "t": result[k] = t; break; // time in seconds
			case "i": result[k] = i; break; // screen y integer index
			case "j": result[k] = j; break; // screen x integer index
			case "u": result[k] = u; break; // 3rd quadrant x (0...1)
			case "v": result[k] = v; break; // 3rd quadrant y (0...1)
			case "r": result[k] = sqrt(x * x + y * y); break; 
			case "p": result[k] = atan2(y, x); break;
			default:  result[k] = 0;
		}
	}
	return result;
}

function selection() {
	const text = window.editor.getModel().getValueInRange(window.editor.getSelection());
	document.getElementById("selected").innerText = text.length;
}

function update() {
	window.history.pushState("", document.title, window.location.pathname + window.location.search);
	const value = window.editor.getValue().replace(/\^/g, "**").replace(/\$/g, "^").replace(/°/g, "*radian");
	localStorage.setItem("code", value);
	try {
		f = eval(value);
		// run parameter analisys only when the function is valid
		textparams = value.match(/^\(?.*?\)?\s*=>/);
		if (textparams !== null) {
			textparams = textparams[0].replace(/\s/g, "").replace(/^\(/, "").replace(/\)?=>/, "");
			textparams = textparams.split(",");
		} else textparams = [];
	} catch { }
	document.getElementById("length").innerText = value.length;
}

function share() {
	const text = "https://cristian-5.github.io/tinymat/#" + encodeURI(window.editor.getValue());
	navigator.clipboard.writeText(text);
	vanillaToast.show(
		'<a href="https://github.com/cristian-5/tinymat" target="_blank">👀 Link copied 📋. Leave a ⭐️ on 🐙</a>',
		{ duration: 5000, fadeDuration: 500 }
	);
}

function minify() {
	const lines = window.editor.getValue().replace(/\/\*.*\*\//g, "").split("\n");
	let minified = "";
	for (const line of lines) {
		if (/^\s*\/\//.test(line) || line.includes('"') || line.includes("'")) continue;
		minified += line.replace(/\s/g, "")
			.replace(/(\D|^)0+\.(\d)/g, "$1.$2")
			.replace(/\.(\d+?)0+(\D)/g, ".$1$2")
			.replace(/\.0+(\D)/g, "$1")
			.replace(/(\D)0+(\d+)(\D)/g, "$1$2$3")
			+ "\n";
	}
	window.editor.setValue(minified.trim());
}
