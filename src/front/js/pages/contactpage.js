import React from "react";


export function ContactPage(){



 
    return(
        <div>
            <h1></h1>
            
            <h2>Get in Touch</h2>
            <form action="submit_form.php" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <button type="submit">Send</button>
                
            </form>
       
            </div>     
    );
};
