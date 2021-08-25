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
				<Nav.Link href="#" className="text-muted linksfooter">
					Contactar
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="#" className="text-muted linksfooter">
					Privacidad
				</Nav.Link>
			</Nav.Item>
			<Card.Footer className="text-muted linksfooter">
				&copy; {new Date().getFullYear()} Copyright: <a href="https://www.4trips.com"> 4 Trips</a>
			</Card.Footer>
		</div>
	</div>
);
//Cuando tengamos newsletter poner <Card.Footer></Card.Footer> después de </div> de línea 26 y la caja del newsletter en el div de los <Nav.Item>
