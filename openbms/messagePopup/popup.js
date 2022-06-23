async function load() {
    var cache = "dDlsTFAvT1Q5alFXbGRVLzZ4RW56Vml3U2FaeS9tVCtlam5EQ2w4RWRTZz0=";

    // For test purpose replace upper one with yours got from outlook bas file
    var UserId = "2456";
    // id from medewerkers


    // The user clicked our button, get the active tab in the current window using
    // the tabs API.

    let tabs = await messenger.tabs.query({active: true, currentWindow: true});

    // Get the message currently displayed in the active tab, using the
    // messageDisplay API. Note: This needs the messagesRead permission.
    // The returned message is a MessageHeader object with the most relevant
    // information.
    let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

    // Update the HTML fields with the message subject and sender.
    document.getElementById("subject").textContent = message.subject;
    document.getElementById("from").textContent = message.author;
    document.getElementById("to").textContent = message.recipients[0];
    //
    let myData = message.recipients[0]+"vbokraan";
    // add date
    myData += message.date.toLocaleDateString("nl")+" "+message.date.getHours()+":"+message.date.getMinutes()+"vbokraan";
    // add date
    myData += message.date.toLocaleDateString("nl")+" "+message.date.getHours()+":"+message.date.getMinutes()+"vbokraan";
    // all email
    myData += message.recipients+", "+message.author+"vbokraan";
    // subject
    myData += message.subject+"vbokraan";
    // Request the full message to access its full set of headers.
    let full = await messenger.messages.getFull(message.id);
    //let keys = Object.keys(full);
    //document.getElementById("karray").textContent = keys;
    // let keys = await messenger.messages.getRaw(message.id);;
    // let keys = Object.keys(full.parts[0].parts[0]);
    let keys = full.parts[0].parts[0].body;
    document.getElementById("karray").textContent = keys;
    myData += full.parts[0].parts[0].body+"vbokraan";
    //id
    myData += tabs[0].id+"vbokraan";
    myData += cache+"vbokraan"+UserId;
    document.getElementById("received").textContent = full.headers.received[0];

    document.getElementById("mydata").textContent = myData;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("demo").innerHTML = this.responseText;
     }
    xhttp.open("POST", "http://openbms.localtest/modules/email.mod.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(myData);

}

document.addEventListener("DOMContentLoaded", load);