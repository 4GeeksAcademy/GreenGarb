import React from "react";
import "../../styles/contacpage.css";


export function ContactPage(){



 
    return(
        <div className="contact mb-5 content-container">
        
            
        
            <form className= "page justify-content-center" action="submit_form.php" method="post">
            <h2 className="container mt-4 ps-5" > Get in Touch </h2>
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Your Name" name="name" required/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email"placeholder="Your email here" required/>
                <label for="message">Message:</label>
                <textarea id="message" name="message" placeholder="Write your message here" rows="4" required></textarea>
                <div>
                <button type="submit" className="send btn btn-success">Send</button>
                </div>
            </form>
       
            </div>     
    );
};
