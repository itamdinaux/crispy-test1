import React from 'react'
import {Link} from "gatsby"

const MainMenu = () => {
 return (
  <ul>
   <li><Link to="/">Accueil</Link></li>
   <li><Link to="/pizza">Pizzas</Link></li>
   <li><Link to="/pain">Pain</Link></li>
   <li><Link to="/salade">Salade</Link></li>
   <li><Link to="/dessert">Déssert</Link></li>
   <li><Link to="/boisson">Boisson</Link></li>
  </ul>
 )
}

export default MainMenu
