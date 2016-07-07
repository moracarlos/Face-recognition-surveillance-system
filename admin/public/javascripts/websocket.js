// the URL of the WAMP Router (Crossbar.io)
 //
 var wsuri;
if (document.location.origin == 'file://') {
  wsuri = 'ws://127.0.0.1:8080/ws';
  console.log('option 1');
} else {
  wsuri = (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' +
              '127.0.0.1:8080' + '/ws';
}

// the WAMP connection to the Router
//
var connection = new autobahn.Connection({
  url: wsuri,
  realm: 'realm1'
});

// timers
//
var t1, t2;

// fired when connection is established and session attached
//
connection.onopen = function(session, details) {

  console.log('Connected');

  // SUBSCRIBE to a topic and receive events

  function on_frame(args) {
    var frame = args[0];
    var mJSON = JSON.parse(frame);
    var showImgStr = 'data:image/jpeg;base64,' + mJSON.image;
    $('#video').attr('src', showImgStr);
    console.log(mJSON.people[0]);
  }
  session.subscribe('com.example.onframe', on_frame).then(
       function(sub) {
         console.log('subscribed to topic');
       },
       function(err) {
         console.log('failed to subscribe to topic', err);
       }
    );

  // PUBLISH an event every second
  //

  session.publish('com.example.oncreate', ['Hello from JavaScript (browser)']);
  console.log('published to topic \'com.example.oncreate\'');
};

// fired when connection was lost (or could not be established)
//
connection.onclose = function(reason, details) {
  console.log('Connection lost: ' + reason);
  if (t1) {
    clearInterval(t1);
    t1 = null;
  }
  if (t2) {
    clearInterval(t2);
    t2 = null;
  }
};

// now actually open the connection
//
connection.open();
