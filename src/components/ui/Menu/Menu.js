import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: null,
    };
  }

  render() {
    const { menu } = this.props;

    return (
      <ul className="list-group sidebar">
        {menu.map((item) => {
          const className = `dropdown-menu ${(item.id === this.state.currentItem) && 'show'}`;
          return (
            <li className="list-group-item dropdown" data-menu-to={item.id} key={item.id} onPointerEnter={this.showDropdownMenu} onPointerLeave={this.hideDropdownMenu}>
              <a className="nav-link dropdown-toggle" id="cameraPhotos">{item.title}</a>

              <ul className={className}>
                {item.children.map((child) => (
                  <li data-id={child.id} key={child.id} className="dropdown-item"><a>{child.title}</a></li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  showDropdownMenu = (event) => {
    const currentMenuIndex = event.currentTarget.dataset.menuTo;

    this.setState({
      currentItem: currentMenuIndex,
    });

    this.props.setShowBackDrop(true);
  };

  hideDropdownMenu = (event) => {
    const currentMenuIndex = event.currentTarget.dataset.menuTo;

    this.setState({
      currentItem: null,
    });

    this.props.setShowBackDrop(false);
  };
}

Menu.propTypes = {
  setShowBackDrop: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default Menu;
