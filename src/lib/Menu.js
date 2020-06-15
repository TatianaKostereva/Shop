class Menu {
  constructor(element) {
    this.element = element;
    this.show();
  }

  render() {
    const template = `
    <ul class="list-group sidebar">
      <li class="list-group-item dropdown">
        <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
        <ul class="dropdown-menu">   
         <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
        </ul>
      </li>
    
      <li class="list-group-item dropdown">
        <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
        <ul class="dropdown-menu">   
         <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
         <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
        </ul>
      </li>
    </ul>
    `;

    this.element.innerHTML = template;
  }

  dropdownMenu() {
    const mainMenuItems = this.element.querySelectorAll('.list-group-item');

    for (const item of mainMenuItems) {
      item.addEventListener('pointerenter', () => {
        item.querySelector('.dropdown-menu').classList.add('show');
      });

      item.addEventListener('pointerleave', () => {
        item.querySelector('.dropdown-menu').classList.remove('show');
      });
    }
  }

  darkenBackdrop() {
    const mainMenuItems = this.element.querySelectorAll('.list-group-item');

    for (const item of mainMenuItems) {
      const backdrop = document.querySelector('.backdrop');

      item.addEventListener('pointerenter', () => {
        backdrop.classList.add('show');
      });

      item.addEventListener('pointerleave', () => {
        backdrop.classList.remove('show');
      });
    }
  }

  show() {
    this.render();
    this.dropdownMenu();
    this.darkenBackdrop();
  }
}

export default Menu;
