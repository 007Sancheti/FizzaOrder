import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-card/paper-card.js';



/**
 * @customElement
 * @polymer
 */
class MyOrder extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }            
        table, td, th {  
            border: 1px solid rgb(0, 0, 0);
            text-align: left;
            border-style: dashed;
          }
          
          table {
            border-collapse: collapse;
            margin-top:20px;
            margin-bottom:20px;
            width: 100%;
          }
          
          th, td {
            padding: 15px;
          }
         
          #buttons{
            position:absolute;
            top:50px;
            left:1100px;
          }
         
          paper-button {
            text-align: center;
            background-color:#34abeb;
            color:white;
          }

          a{
            text-decoration:none;
            color:white;
          }
          #spin{
            position:fixed;
            margin-left:50%;
            top:50%;
        }
        paper-card{
            width:100%;
            margin:2px;
            background-color:#34abeb;
        }
        h2{
            text-align:center;
        }

    
      </style>
      <app-location route={{route}}></app-location>
      <div id="buttons">
      <paper-button raised class="custom indigo" id='home' on-click="_handleDashboard">Home</paper-button>
      <paper-button raised class="custom indigo" id="logout" on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
    </div>

    <h2> My Order List </h2>


    <template is="dom-repeat" items="{{userData}}">
    <paper-card>
      <div id="left">
        <h3>Pizza Name: {{item.pizzaName}}</h3>
        <h3>price: {{item.price}}</h3>
        <h3>rating:{{item.rating}}</h3>
        <h3>size:{{item.size}}</h3>
        <h3>description:{{item.description}}</h3>
        <h3>Total Quantity:{{item.quantity}}</h3>
        <h3>Total Amount:{{item.totalAmount}} INR</h3>

      </div>
    </paper-card>  
    </template>   
   
 
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      <paper-spinner id="spin" active={{waiting}}></paper-spinner>
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
  }
  static get properties() {
    return {
      action: {
        type: String,
        value: 'List'
      },
      userData: {
        type: Array,
        value: []
      }
    };
  }
  ready() {
    super.ready();
    this.email = sessionStorage.getItem('emailId');
  }


  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`http://localhost:3000/orders?emailId=${this.email}`, "get", null);
  }

  _handleLogout(){
    sessionStorage.clear();
    this.set('route.path', './login-page');
  }

  _handleDashboard() {
    this.set('route.path', './dashboard-page');
  }

  /**
   * calling main ajax call method 
   * @param {String} url 
   * @param {String} method 
   * @param {Object} postObj 
   */
  _makeAjax(url, method, postObj) {
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }

  /**
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        console.log(event);
        this.userData = event.detail.response[0].userData;
        this.waiting = false;
        console.log(this.userData);
    }


  }


}

window.customElements.define('my-order', MyOrder);
