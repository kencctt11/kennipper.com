function sendMail(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    
    if (!name) {
        alert("Please fill in your Name before sending.");
        return;
    }
    if (!email) {
        alert("Please fill in your Email before sending.");
        return;
    }
    if (!message) {
        alert("Please fill in your Message before sending.");
        return;
    }
    // Disable the send button to prevent multiple clicks
    sendButton.disabled = true;
    sendButton.innerText = "Sending...";
   
    var param = {
        name: document.getElementById("name").value ,
        email: document.getElementById("email").value ,
        message: document.getElementById("message").value 
    };
    const serviceId = "service_c17ay9u";
    const templateId = "template_6my0v8m";

    emailjs
        .send(serviceId, templateId, param)
        .then((res) =>  {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your email has been sent")
        })
        .catch((err) => {
            console.log(err);
            alert("There was an error sending your email. Please try again.");
        })
        .finally(() => {
            // Re-enable the send button
            sendButton.disabled = false;
            sendButton.innerText = "Send";
        });
}