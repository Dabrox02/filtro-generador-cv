import config from "../../config.js";

export class SidebarComponent extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/`
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="${config.uri}/index.html" class="brand-link">
          <img src="https://img.icons8.com/?size=256&id=12KiRC81sMRC&format=png" alt="Libreria Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
          <span class="brand-text font-weight-light">CV Generator</span>
        </a>
  
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src="https://img.icons8.com/?size=256&id=iEBcQcM9rnZ9&format=png" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
              <a href="https://github.com/Dabrox02" target="_blank" class="d-block">Jaider Mendoza</a>
            </div>
          </div>
  
          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <a href="${config.uri}/index.html" class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p> Inicio </p>
                </a>
              </li>
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>
        `
  }

}

customElements.define("main-sidebar-component", SidebarComponent)