import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <ul className ="list-group sidebar">
      <li className="list-group-item dropdown" onPointerEnter = {this.showDropdownMenu} onPointerLeave = {this.hideDropdownMenu}>
        <a className="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
        <ul className="dropdown-menu">
         <li data-id="cameraphotos_accessories" className="dropdown-item"><a>Accessories</a></li>
        </ul>
      </li>
    
      <li className="list-group-item dropdown" onPointerEnter = {this.showDropdownMenu} onPointerLeave = {this.hideDropdownMenu}>
        <a className="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
        <ul className="dropdown-menu">
         <li data-id="cinema_audio" className="dropdown-item"><a>Audio</a></li>
         <li data-id="cinema_video" className="dropdown-item"><a>Video</a></li>
        </ul>
      </li>
    </ul>
    )
  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    event.currentTarget.querySelector('.dropdown-menu').classList.add('show');

    const backdrop = document.querySelector('.backdrop');
    backdrop.classList.add('show');
  };

  hideDropdownMenu = (event) => {
    event.preventDefault();
    event.currentTarget.querySelector('.dropdown-menu').classList.remove('show');

    const backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('show');
  };
}

export default Menu;

