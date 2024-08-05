
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
			if (Array.isArray(value)) {
				value = value.flat(5);
				switch (value.length) {
					case 1: fill(value[0]); break;
					case 2: fill(value[0]); diameter *= value[1]; break;
					case 3: fill(value[0], value[1], value[2]); break;
					case 4: fill(value[0], value[1], value[2]); diameter *= value[3]; break;
				}
			} else fill(value);
			circle(x, y, diameter);
		}
	}
}

function update() {
	try {
		f = eval("(x, y, t) => (" + document.getElementById("code").value + ")");
	} catch { }
}
