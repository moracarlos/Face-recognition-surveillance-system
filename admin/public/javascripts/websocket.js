// the URL of the WAMP Router (Crossbar.io)
 //
 var wsuri;
 if (document.location.origin == "file://") {
    wsuri = "ws://192.168.146.1:8080/ws";
    console.log('option 1');
 } else {
    console.log('option 2');
    wsuri = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" +
                '192.168.146.1:8080' + "/ws";
 }

 // the WAMP connection to the Router
 //
 var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
 });

 // timers
 //
 var t1, t2;


 // fired when connection is established and session attached
 //
 connection.onopen = function (session, details) {

    console.log("Connected");

    // SUBSCRIBE to a topic and receive events
    //
    function on_counter (args) {
       var counter = args[0];
       //console.log("on_counter() event received with counter " + counter );
       $('#video').attr('src', counter)
    }
    session.subscribe('com.example.oncounter', on_counter).then(
       function (sub) {
          console.log('subscribed to topic');
       },
       function (err) {
          console.log('failed to subscribe to topic', err);
       }
    );


    // PUBLISH an event every second
    //

    session.publish('com.example.onhello', ['Hello from JavaScript (browser)']);
    console.log("published to topic 'com.example.onhello'");
 };

 // fired when connection was lost (or could not be established)
 //
 connection.onclose = function (reason, details) {
    console.log("Connection lost: " + reason);
    if (t1) {
       clearInterval(t1);
       t1 = null;
    }
    if (t2) {
       clearInterval(t2);
       t2 = null;
    }
 }

 // now actually open the connection
 //
 connection.open();