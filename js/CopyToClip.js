function copyToClip() {
  var copyText = document.getElementById('pid');
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  document.getElementById('btn-copy').innerHTML = 'Copied!';
}
