async function load() {
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
    // Request the full message to access its full set of headers.
    let full = await messenger.messages.getFull(message.id);
    document.getElementById("received").textContent = full.headers.received[0];

    const xhttp = new XMLHttpRequest();
    console.log("CP2");
    xhttp.onload = function() {
        console.log("CP3");
        document.getElementById("demo").innerHTML = this.responseText;
        console.log("CP13:" +this.responseText);
    }
    console.log("CP4");
    xhttp.open("POST", "http://openbms.localtest/modules/email.mod.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("CP5");
    xhttp.send(message.recipients[0]);

}

document.addEventListener("DOMContentLoaded", load);