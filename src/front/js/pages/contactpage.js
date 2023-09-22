import React from "react";
import "../../styles/contacpage.css";


export function ContactPage(){



 
    return(
        <div className="contact mb-5 content-container">
        
            
        
            <form className= "page justify-content-center" action="submit_form.php" method="post">
            <h2 className="container mt-4 ps-5" > Get in Touch </h2>
            <div style={{width: 'fit-content'}}>
                <label for="name">Name:</label>
                <input className="w-100" type="text" id="name" placeholder="Your Name" name="name" required/>
                <label for="email">Email:</label>
                <input className="w-100" type="email" id="email" name="email"placeholder="Your email here" required/>
                <label for="message">Message:</label>
                <textarea id="message" name="message" placeholder="Write your message here" rows="4" required></textarea>
                <div className="d-flex justify-content-end mb-3">
                <button type="submit" className="send btn btn-success" >Send</button>
                </div>
            </div>
            </form>
       
            </div>     
    );
};
