
const CELLS = 16, RADIUS = 10, SPACING = 2;
const SIZE = CELLS * RADIUS * 2 + (CELLS - 1) * SPACING;

let f = () => 0, t = new Date().getTime();

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
			const x = i * (diameter + SPACING) + RADIUS;
			const y = j * (diameter + SPACING) + RADIUS;
			let value;
			try { value = f(i, j, (new Date().getTime() - t) / 1000); }
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

function selection() {
	const text = window.editor.getModel().getValueInRange(window.editor.getSelection());
	document.getElementById("selected").innerText = text.length;
}

function update() {
	const value = window.editor.getValue().replace(/\^/g, "**").replace(/\$/g, "^");
	localStorage.setItem("code", window.editor.getValue());
	try { f = eval(window.editor.getValue()); } catch { }
	document.getElementById("length").innerText = value.length;
}

function share() {
	const text = "https://cristian-5.github.io/tinymat/#" + encodeURI(window.editor.getValue());
	navigator.clipboard.writeText(text);
	vanillaToast.show(
		'<a href="https://github.com/cristian-5/tinymat" tartget="_blank">👀 Link copied 📋. Leave a ⭐️ on 🐙</a>',
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
