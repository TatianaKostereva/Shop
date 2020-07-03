import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraPhotos: false,
      cinema: false,
    }
  }

  render() {
    const classNameCameraPhotos = `dropdown-menu ${this.state.cameraPhotos && "show"}`;
    const classNameCinema = `dropdown-menu ${this.state.cinema && "show"}`;

    return (
      <ul className ="list-group sidebar">
        <li className="list-group-item dropdown" data-menu-to="cameraPhotos" onPointerEnter = {this.showDropdownMenu} onPointerLeave = {this.hideDropdownMenu}>
          <a className="nav-link dropdown-toggle" id="cameraPhotos">Camera &amp; Photo</a>
          <ul className={classNameCameraPhotos}>
           <li data-id="cameraPhotos_accessories" className="dropdown-item"><a>Accessories</a></li>
          </ul>
        </li>

        <li className="list-group-item dropdown"  data-menu-to="cinema" onPointerEnter = {this.showDropdownMenu} onPointerLeave = {this.hideDropdownMenu}>
          <a className="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
          <ul className={classNameCinema}>
           <li data-id="cinema_audio" className="dropdown-item"><a>Audio</a></li>
           <li data-id="cinema_video" className="dropdown-item"><a>Video</a></li>
          </ul>
        </li>
      </ul>
    )
  }

  showDropdownMenu = (event) => {
    const currentMenuIndex = event.currentTarget.dataset.menuTo;

    this.setState({
      [currentMenuIndex]: true,
    });

    const backdrop = document.querySelector('.backdrop');
    backdrop.classList.add('show');
  };

  hideDropdownMenu = (event) => {
    const currentMenuIndex = event.currentTarget.dataset.menuTo;

    this.setState({
      [currentMenuIndex]: false,
    });

    const backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('show');
  };
}

export default Menu;

