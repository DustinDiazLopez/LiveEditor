var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});

function newBoard() {
  return getBoard(); //from tictactoe.js
}

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
    console.log('data');
    console.log(data);
    setBoard(data); //sets the board state of the other player
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

  $('#overlay').click(function(e) {
    console.log('click');
    console.log(newBoard());
    conn.send(newBoard()); //sends the new board state when the overlay is clicked
  });

  $('body').keyup(function(e){
    console.log(e.keyCode);
    if(e.keyCode == 13) { //Enter keycode
        keyPressed(); //from tictactoe.js
        conn.send(newBoard()); //sends the new board state after reset
    }
  });
});
