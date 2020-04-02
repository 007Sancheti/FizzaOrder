import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js'

/**
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath)
class PizzaApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
    min-height: 100vh;
    overflow: hidden;
        }
        header {
          background-color: #34abeb;
          display: grid;
          grid-template-rows: 100px;
          grid-template-columns: 200px 1fr 200px 100px;
        }
      
        #heading {
          color: white;
        }
      
        footer {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background-color:#34abeb;
          color: white;
          text-align: center;
        }
      
        iron-pages {
          margin-bottom: 74px;
        }
      </style>
      <header>
  <div id="heading">
    <h1>Pizza Order </h1>
  </div>
</header>
<app-location route={{route}}></app-location>
<app-route data="{{routeData}}" route="{{route}}" pattern="[[rootPath]]:page"></app-route>
<iron-pages selected={{page}} attr-for-selected="name" role="main">

  <registration-page name="registration-page"></registration-page>
  <login-page name="login-page"></login-page>
  <dashboard-page name="dashboard-page"></dashboard-page>
  <cart-page name="cart-page"></cart-page>
  <my-order name="my-order"></my-order>
  
</iron-pages>

<footer>
  <p>@copyright all right reserve Pizza Order App </p>
</footer>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        observer: '_changePage'
      },
      routeData: {
        type: Object
      }
    };
  }
  /**
  * complex observer
  */
  static get observers() {
    return ['_pageChanged(routeData.page)']
  }

  _pageChanged(page) {
    this.page = page || 'login-page';
  }
  /**
  * method of simple observer to change the page according the page name , calling the required page
  * @param {*} page
  */
  _changePage(page) {
    switch (page) {
      case 'registration-page':
        import('./registration-page.js');
        break;

      case 'login-page':
        import('./login-page.js');
        break;

      case 'dashboard-page':
        import('./dashboard-page.js');
        break;

      case 'cart-page':
        import('./cart-page.js');
        break;

      case 'my-order':
        import('./myorder-page.js');
        break;

    }
  }
}

window.customElements.define('pizza-app', PizzaApp);
