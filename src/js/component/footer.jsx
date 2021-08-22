import React from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "../../styles/footer.scss";
import facebook from "../../img/facebook.png";

export const Footer = () => (
	<div className="footer">
		<div className="d-flex flex-row-reverse">
			<Nav.Item>
				<img src={facebook} />
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="#" className="text-muted">
					Contactar
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="#" className="text-muted">
					Privacidad
				</Nav.Link>
			</Nav.Item>
		</div>
		<Card.Footer className="text-muted">
			{" "}
			&copy; {new Date().getFullYear()} Copyright: <a href="https://www.4trips.com"> 4 Trips</a>
		</Card.Footer>
	</div>
);
