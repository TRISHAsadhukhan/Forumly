<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Collab Editor</title>
<link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/editor/editor.main.min.css">
<style>
  #terminal {
    height: 200px;
    border: 1px solid black;
    padding: 5px;
    overflow: auto;
    white-space: pre-wrap;
    font-family: monospace;
    background-color: #1e1e1e;
    color: #ffffff;
  }
</style>
</head>
<body>
<select id="language" onchange="changeLanguage(this.value)">
  <option value="python">Python</option>
  <option value="javascript">JavaScript</option>
  <option value="c">C</option>
  <option value="cpp">C++</option>
  <option value="java">Java</option>
</select>
<div id="container" style="height:400px;border:1px solid black;"></div>
<form action="/Handler" method="post" >
	<textarea type="text" id="code" name="code" style="display:none"></textarea>
	<button onclick="sendCode()" type="button">Exec</button>
	<button onclick="sendCode1()" >Exec1</button>
	

</form>

<div id="terminal" contenteditable="false">Output:</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js"></script>
<script>
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
let editor;
require(["vs/editor/editor.main"], () => {
  editor = monaco.editor.create(document.getElementById('container'), {
    value: 'print("Hello World")',
    language: 'python',
    theme: 'vs-dark',
  });
});

function changeLanguage(lang) {
  monaco.editor.setModelLanguage(editor.getModel(), lang);
}

function sendCode() {
  const code = editor.getValue()
  console.log(editor.getValue());
  fetch('/codeExec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code: code })
  }).then(response => response.text())
  .then(data => document.getElementById('terminal').textContent = 'Output:\n' + data)
  .catch((error) => {
    console.error('Error:', error);
  });
}
function sendCode1() {
	  document.getElementById("code").value=editor.getValue()
	}
</script>
</body>
</html>