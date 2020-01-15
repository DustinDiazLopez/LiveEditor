$(document).ready(function() {
  var code = $(".codemirror-textarea")[0];
  var editor = CodeMirror.fromTextArea(code, {
    mode: "css",
    lineNumbers: true,
    tabSize: 4,
    extraKeys:{"Ctrl-Space":"autocomplete"}
  });
});
