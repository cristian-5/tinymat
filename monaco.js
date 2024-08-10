
require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs" }});
require([ "vs/editor/editor.main" ], function() {
	monaco.editor.defineTheme('sunburst', {
		"base": "vs-dark",
		"inherit": true,
		"rules": [
			{ "background": "000000", "token": "" },
			{ "foreground": "aeaeae", "fontStyle": "italic", "token": "comment" },
			{ "foreground": "3387cc", "token": "constant" },
			{ "foreground": "89bdff", "token": "entity" },
			{ "foreground": "ff4280", "token": "keyword" },
			{ "foreground": "65b042", "token": "string" },
			{ "foreground": "3e87e3", "token": "variable" },
			{ "foreground": "ddf2a4", "token": "string constant" },
			{ "foreground": "8a9a95", "token": "string variable" },
			{ "foreground": "dad085", "token": "support.function" },
			{ "foreground": "cf6a4c", "token": "support.constant" },
		],
		"colors": {
			"editor.foreground": "#F8F8F8",
			"editor.background": "#000000",
			"editor.selectionBackground": "#DDF0FF33",
			"editor.lineHighlightBackground": "#FFFFFF0D",
			"editorCursor.foreground": "#A7A7A7",
			"editorWhitespace.foreground": "#CAE2FB3D"
		}
	});
	monaco.languages.register({ id: "golfjs" });
	monaco.languages.setLanguageConfiguration("golfjs", {
		comments: {
			lineComment: '//',
			blockComment: ['/*', '*/']
		},
		brackets: [
			['{', '}'],
			['[', ']'],
			['(', ')']
		],
		autoClosingPairs: [
			{ open: '[', close: ']' },
			{ open: '{', close: '}' },
			{ open: '(', close: ')' },
			{ open: "'", close: "'", notIn: ['string', 'comment'] },
			{ open: '"', close: '"', notIn: ['string'] }
		],
		surroundingPairs: [
			{ open: '{', close: '}' },
			{ open: '[', close: ']' },
			{ open: '(', close: ')' },
			{ open: '"', close: '"' },
			{ open: "'", close: "'" }
		],
		folding: {
			markers: { start: /\{/, end: /\}/ },
			offSide: true
		},
		comments: {
			blockComment: [ '/*', '*/' ],
			lineComment: '//'
		}
	});
	monaco.languages.setMonarchTokensProvider("golfjs", {
		brackets: [
			{ token: 'delimiter.curly', open: '{', close: '}' },
			{ token: 'delimiter.parenthesis', open: '(', close: ')' },
			{ token: 'delimiter.square', open: '[', close: ']' },
			{ token: 'delimiter.angle', open: '<', close: '>' }
		],
		keywords: [
			"pi", "e",
			"abs", "ceil", "clamp", "exp", "floor", "fract", "isinf",
			"isnan", "log", "log2", "log10", "max", "min", "mix", "noise",
			"pow", "round", "sign", "smoothstep", "sqrt", "step", "trunc",
			"acos", "acosh", "asin", "asinh", "atan", "atanh", "cos", "cosh",
			"degrees", "deg", "radians", "rad", "sin", "sinh", "tan", "tanh",
			"atan2", "norm", "lerp", "cotan", "sec", "cosec", "hypot"
		],
		tokenizer: {
			root: [
				[/[a-zA-Z_]\w*/, {
					cases: {
						'@keywords': { token: 'keyword.$0' },
						'@default': 'identifier'
					}
				}],
				{ include: '@whitespace' },
				[/\d+\.\d+/, "number.float"],
				[/\d+/, "number"],
				[/'[^\\']'/, "string.char"],
				[/"[^\\"]*"/, "string"],
				[/[~!%^&*\+\=\|\-]+/, "delimiter"],
				[/\./, "delimiter.period"],
				[/\,/, "delimiter.comma"],
				[/;/, "delimiter.semicolon"],
				[/<<|>>/, "delimiter.angle"],
				[/\/\/.*$/, "comment"],
				[/\//, "delimiter"],
			],
			comment: [
				[/[^\/*]+/, 'comment' ],
				[/\/\*/,    'comment', '@push' ], // nested comment
				["\\*/",    'comment', '@pop'  ],
				[/[\/*]/,   'comment' ]
			],
			whitespace: [
				[/[ \t\r\n]+/, 'white'],
				[/\/\*/,       'comment', '@comment' ],
				[/\/\/.*$/,    'comment'],
			],
		}
	});
	let hash = "";
	if (window.location.hash.length > 1) hash = decodeURI(window.location.hash.substring(1));
	window.editor = monaco.editor.create(document.getElementById("monaco"), {
		value: hash || localStorage.getItem("code") || "(j,i,t)=>norm(sin(j)*norm(t),norm(t+j),norm(t*i),sin(t*(i+j)/5))",
		language: "golfjs",
		codeLens: false,
		cursorStyle: "line",
		quickSuggestions: true,
		contextmenu: false,
		minimap: { enabled: false },
		fontSize: 16,
		automaticLayout: true,
		insertSpaces: false,
		stickyScroll: { enabled: false },
		selectOnLineNumbers: true,
		lineNumbers: "off",
		theme: "sunburst",
		renderWhitespace: "all",
		scrollbar: {
			vertical:"hidden",
			horizontal: "hidden",
			handleMouseWheel: false,
		},
		wordWrap: "on",
		showFoldingControls: "never",
		scrollBeyondLastLine: false,
		renderLineHighlight: "none",
		renderValidationDecorations: "off",
		renderFinalNewline: "off",
		guides: { highlightActiveBracketPair: false },
		overviewRulerLanes: 0,
	});
	window.editor.onDidChangeModelContent(update);
	window.editor.onDidChangeCursorSelection(selection);
	monaco.languages.registerCompletionItemProvider("golfjs", {
		provideCompletionItems(_model, _position, _context, _token) {
			return ({ incomplete: true, suggestions: [
				// constants:
				{
					label: "pi",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Ratio of a circle's circumference to its diameter; approximately `3.14159`." }
				}, {
					label: "e",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Euler's number and the base of natural logarithms; approximately `2.718`." }
				}, {
					label: "ln10",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Natural logarithm of `10`; approximately `2.303`." }
				}, {
					label: "ln2",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Natural logarithm of `2`; approximately `0.693`." }
				}, {
					label: "log2e",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Base `2` logarithm of `e`; approximately `1.443`." }
				}, {
					label: "log10e",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Base `10` logarithm of `e`; approximately `0.434`." }
				}, {
					label: "sqrt2",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Square root of `2`; approximately `1.414`." }
				}, {
					label: "sqrt1_2",
					kind: monaco.languages.CompletionItemKind.Constant,
					documentation: { value: "Square root of `1/2`; approximately `0.707`." }
				},
				// basic functions:
				{
					label: "abs",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction abs(x: number): number\nfunction abs(...values: [number]): [number]\n```\n---\nThe absolute value of `x`. If `x` is negative (including `-0`), returns `-x`. Otherwise, returns `x`. The result is therefore always a positive number or `0`." }
				}, {
					label: "ceil",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction ceil(x: number): number\nfunction ceil(...values: [number]): [number]\n```\n---\nThe smallest integer greater than or equal to `x`." }
				}, {
					label: "clamp",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction clamp(x: number, min: number, max: number): number\n```\n---\nIf `x` is less than `min`, returns `min`. If `x` is greater than `max`, returns `max`. Otherwise, returns `x`." }
				}, {
					label: "exp",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction exp(x: number): number\nfunction exp(...values: [number]): [number]\n```\n---\nA nonnegative number representing `e` to the power `x`, where `e` is the base of the natural logarithm." }
				}, {
					label: "floor",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction floor(x: number): number\nfunction floor(...values: [number]): [number]\n```\n---\nThe largest integer smaller than or equal to `x`." }
				}, {
					label: "fract",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction fract(x: number): number\nfunction fract(...values: [number]): [number]\n```\n---\nThe fractional part of `x`." }
				}, {
					label: "hypot",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction hypot(...values: [number]): [number]\n```\n---\nThe square root of the sum of squares of the given arguments." }
				}, {
					label: "hypotenuse",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Hypotenuse, same as `hypot`.\n**Type Alias**." }
				}, {
					label: "log",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction log(x: number): number\nfunction log(...values: [number]): [number]\n```\n---\nThe natural logarithm (base `e`) of `x`. If `x` is `±0`, returns `-Infinity`. If `x` < `0`, returns `NaN`." }
				}, {
					label: "log2",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction log2(x: number): number\nfunction log2(...values: [number]): [number]\n```\n---\nThe base `2` logarithm of `x`. If `x` < `0`, returns `NaN`." }
				}, {
					label: "log10",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction log10(x: number): number\nfunction log10(...values: [number]): [number]\n```\n---\nThe base `10` logarithm of `x`. If `x` < `0`, returns `NaN`." }
				}, {
					label: "max",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction max(...values: [number]): [number]\n```\n---\nThe largest of the given numbers." }
				}, {
					label: "min",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction min(...values: [number]): [number]\n```\n---\nThe smallest of the given numbers." }
				}, {
					label: "mix",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction mix(a: number, b: number, t: number): number\n```\n---\nLinear interpolation of `a` and `b` by a factor of `t`." }
				}, {
					label: "lerp",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Linear interpolation, same as `mix`.\n**Type Alias**." }
				}, {
					label: "rand",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction rand(): number\n```\n---\nA floating-point, pseudo-random number between `0` (inclusive) and `1` (exclusive)." }
				}, {
					label: "random",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Random number, same as `rand`.\n**Type Alias**." }
				}, {
					label: "noise",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Random number, same as `rand`.\n**Type Alias**." }
				}, {
					label: "pow",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction pow(x: number, y: number): number\n```\n---\nA number representing base `x` taken to the power of exponent `y`." }
				}, {
					label: "round",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction round(x: number): number\nfunction round(...values: [number]): [number]\n```\n---\nThe value of `x` rounded to the nearest integer." }
				}, {
					label: "sign",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction sign(x: number): number\nfunction sign(...values: [number]): [number]\n```\n---\nA number representing the sign of `x`: `1` if positive, `-1` if negative, `0` otherwise." }
				}, {
					label: "smooth",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction smooth(a: number, b: number, t: number): number\n```\n---\nSmooth Hermite interpolation between `0` and `1` when `a` < `x` < `b` with threshold `t`." }
				}, {
					label: "smoothstep",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Smooth Hermite interpolation, same as `smooth`.\n**Type Alias**." }
				}, {
					label: "sqrt",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction sqrt(x: number): number\nfunction sqrt(...values: [number]): [number]\n```\n---\nThe square root of `x`, a nonnegative number. If `x` < `0`, returns `NaN`." }
				}, {
					label: "step",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction step(t: number, x: number): number\n```\n---\nReturns `0` if `x` < `t`, and `1` otherwise." }
				}, {
					label: "trunc",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction trunc(x: number): number\nfunction trunc(...values: [number]): [number]\n```\n---\nTruncates (cuts off) the fractional part of `x`." }
				}, {
					label: "truncate",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Truncation, same as `trunc`.\n**Type Alias**." }
				}, {
					label: "norm",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction norm(x: number): number\nfunction norm(...values: [number]): [number]\n```\n---\nNormalizes `x` to the range `0...1`, same as `sin(x) * .5 + .5`." }
				},
				// trigonometric functions:
				{
					label: "acos",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction acos(x: number): number\nfunction acos(...values: [number]): [number]\n```\n---\nArc cosine of `x` in radians. If `x` is outside the range `[-1, 1]`, returns `NaN`." }
				}, {
					label: "acosh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction acosh(x: number): number\nfunction acosh(...values: [number]): [number]\n```\n---\nInverse hyperbolic cosine of `x`." }
				}, {
					label: "asin",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction asin(x: number): number\nfunction asin(...values: [number]): [number]\n```\n---\nArc sine of `x` in radians. If `x` is outside the range `[-1, 1]`, returns `NaN`." }
				}, {
					label: "asinh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction asinh(x: number): number\nfunction asinh(...values: [number]): [number]\n```\n---\nInverse hyperbolic sine of `x`." }
				}, {
					label: "atan",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction atan(x: number): number\nfunction atan(...values: [number]): [number]\n```\n---\nArc tangent of `x` in radians." }
				}, {
					label: "atanh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction atanh(x: number): number\nfunction atanh(...values: [number]): [number]\n```\n---\nInverse hyperbolic tangent of `x`." }
				}, {
					label: "cos",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction cos(x: number): number\nfunction cos(...values: [number]): [number]\n```\n---\nCosine of `x` in radians." }
				}, {
					label: "cosh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction cosh(x: number): number\nfunction cosh(...values: [number]): [number]\n```\n---\nHyperbolic cosine of `x`." }
				}, {
					label: "deg",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction deg(x: number): number\n```\n---\nConverts an angle in radians to degrees." }
				}, {
					label: "degrees",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Degrees, same as `deg`.\n**Type Alias**." }
				}, {
					label: "rad",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction rad(x: number): number\n```\n---\nConverts an angle in degrees to radians." }
				}, {
					label: "radians",
					kind: monaco.languages.CompletionItemKind.TypeParameter,
					documentation: { value: "Radians, same as `rad`.\n**Type Alias**." }
				}, {
					label: "sin",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction sin(x: number): number\nfunction sin(...values: [number]): [number]\n```\n---\nSine of `x` in radians." }
				}, {
					label: "sinh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction sinh(x: number): number\nfunction sinh(...values: [number]): [number]\n```\n---\nHyperbolic sine of `x`." }
				}, {
					label: "tan",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction tan(x: number): number\nfunction tan(...values: [number]): [number]\n```\n---\nTangent of `x` in radians." }
				}, {
					label: "tanh",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction tanh(x: number): number\nfunction tanh(...values: [number]): [number]\n```\n---\nHyperbolic tangent of `x`." }
				}, {
					label: "cotan",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction cotan(x: number): number\nfunction cotan(...values: [number]): [number]\n```\n---\nCotangent of `x` in radians." }
				}, {
					label: "sec",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction sec(x: number): number\nfunction sec(...values: [number]): [number]\n```\n---\nSecant of `x` in radians." }
				}, {
					label: "cosec",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction cosec(x: number): number\nfunction cosec(...values: [number]): [number]\n```\n---\nCosecant of `x` in radians." }
				}, {
					label: "atan2",
					kind: monaco.languages.CompletionItemKind.Function,
					documentation: { value: "```ts\nfunction atan2(y: number, x: number): number\n```\n---\nArc tangent of `y/x` in radians, using the signs of both arguments to determine the quadrant of the result." }
				},
			]});
		}
	});
	update();
});

function getGolfJSCompletionProvider(monaco) {

}
