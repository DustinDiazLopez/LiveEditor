var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});

peer.on('open', function(id) {
  console.log('Your peer ID is: ' + id);
  $('#pid').val(id);
});

peer.on('connection', connect);
function connect(c) {
  conn = c;
  $('#rid').val(conn.peer);

  $('#rid').prop('disabled', true);
  $('#rid').addClass("disabled");
  $('#connect').prop('disabled', true);
  $('#connect').addClass("btn-warning disabled");
  $('#connect').val('Connecting...');

  conn.on('data', function(data) {
    $('#typing').fadeIn('fast');
    clearContents(document.getElementById('inputText'));
    $('#inputText').val($('#inputText').val() + data);
    setTimeout(function() {
      $('#typing').fadeOut('fast');
    }, 1000);
    //$('#inputText').delay(5000).removeClass("is-valid");
  });
  $('#connect').removeClass("btn-warning");
  $('#connect').removeClass("btn-secondary");
  $('#connect').addClass("btn-success");
  $('#connect').val('Connected!');
  document.getElementById('rid-label').innerHTML = "Connected to "
}

$().ready(function() {
  $('#connect').click(function() {
    $('#connect').addClass("btn-warning disabled");
    $('#connect').val('Connecting...');
    var c = peer.connect($('#rid').val());
    c.on('open', function() {
      connect(c);
    });
  });

  $('#inputText').keyup(function(e) {
    var content = $('#inputText').val();
    conn.send(content);
  });
});

function clearContents(element) {
  element.value = '';
}
