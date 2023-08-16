import React, { Component } from "react";

<<<<<<< HEAD
export const Footer = () => (
	<footer className="footer mt-5 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			Ricardo and The Crew 
		</p>
	</footer>
);
=======
export const Footer = () => {
	const year = new Date().getFullYear();

	return (<footer className="footer text-center">{`Copyright © Upbeat Code ${year}`}</footer>)
};





>>>>>>> refs/remotes/origin/main
