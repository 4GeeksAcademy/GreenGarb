import React, { Component } from "react";
export const Footer = () => {
	const year = new Date().getFullYear();

	return (<footer className="footer text-center">{`Copyright © Upbeat Code ${year}`}</footer>)
};



