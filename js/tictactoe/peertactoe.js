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
    console.log(data[0]);
    console.log(data[1]);
    setBoard(data[0]); //sets the board state of the other player
    setNextplayer(data[1]);
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
    //console.log('[CLICK] next player is:' + getNextplayer());
    try {
      conn.send([newBoard(), getNextplayer()]); //sends the new board state when the overlay is clicked
    } catch (ignored) {}
  });

  $('body').keyup(function(e){
    if(e.keyCode == 13) { //Enter keycode
        //console.log('Enter key pressed');
        keyPressed(); //from tictactoe.js
        try {
          conn.send([newBoard(), 'X']); //sends the new board state after reset
      } catch(ignored) {}
    }
  });
});
