import React from 'react';
import './App.css';

function KrazyMindsEmailForm({ apiKey }) {


  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Form apiKey={apiKey} />
        </div>
      </div>
    </div>
  );
}

function Form({ apiKey }) {
  const [status, setStatus] = React.useState("compose");
  const [email, setEmail] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const formSubmit = async(e) => {
    e.preventDefault();
    console.log("Prevent Default");

    var url = "https://api.krazyminds.com/email-form";

    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(email) // body data type must match "Content-Type" header
    }).then(x => {
      setStatus("success");
    }).catch(e => {
      setStatus("error");
    });
  };

  const setField = (f, v) => {
    console.log(f, v);
    email[f] = v;
    setEmail(email);
  };

  if (status === "compose") {
    return (
      <form action="index.html" method="post" onSubmit={formSubmit}>
        <div className="row">
          <div className="form-group col-md-12" >
            <label for="name">Your Name</label>
            <input type="text" name="name" className="form-control" id="name" required onChange={(e) => setField("name", e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label for="name">Your Email</label>
            <input type="email" className="form-control" name="email" id="email" required onChange={(e) => setField("email", e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label for="name">Your Phone</label>
            <input type="phone" className="form-control" name="email" id="phone" required onChange={(e) => setField("phone", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label for="name">Subject</label>
          <input type="text" className="form-control" name="subject" id="subject" required onChange={(e) => setField("subject", e.target.value)} />
        </div>
        <div className="form-group">
          <label for="name">Message</label>
          <textarea className="form-control" name="message" rows="10" required onChange={(e) => setField("message", e.target.value)} ></textarea>
        </div>
        <div className="my-3">
          <div className="loading">Loading</div>
          <div className="error-message">Error sending message. Check internet connection.</div>
          <div className="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div className="text-center"><button type="submit">Send Message</button></div>
      </form>
    );
  }
  else if (status === "error") {
    return (<h2> Error. Chech Internet Connection </h2>);
  }
  else {
    return (<h2> Message Sent Successfully </h2>);
  }
}


export default KrazyMindsEmailForm;
