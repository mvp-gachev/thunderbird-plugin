async function load() {
    var cache = "dDlsTFAvT1Q5alFXbGRVLzZ4RW56Vml3U2FaeS9tVCtlam5EQ2w4RWRTZz0=";
    var UserId = "2456";
    var url = "http://openbms.localtest/modules/email.mod.php";
    let tabs = await messenger.tabs.query({active: true, currentWindow: true});
    let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);
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
    //document.getElementById("karray").textContent = keys;
    myData += full.parts[0].parts[0].body+"vbokraan";
    //id
    myData += tabs[0].id+"vbokraan";
    myData += cache+"vbokraan"+UserId;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML =this.responseText;
        }
    };


    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(myData);

}

document.addEventListener("DOMContentLoaded", load);