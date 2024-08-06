
require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs" }});
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
			"atan2", "norm"
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
		value: hash || localStorage.getItem("code") || "(x, y, t) =>\n[cos(y*t),sin(x*t),1,sin(t)]",
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
	update();
});
