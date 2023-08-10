import React from "react";
import "../../styles/contacpage.css";


export function ContactPage(){



 
    return(
        <div className="contact">
        
            
        
            <form action="submit_form.php" method="post">
            <h2>Get in Touch</h2>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <button type="submit" className="send">Send</button>
                
            </form>
       
            </div>     
    );
};
