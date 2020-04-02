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



/**
 * @customElement
 * @polymer
 */
class CartPage extends PolymerElement {
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

    
      </style>
      <app-location route={{route}}></app-location>
      <h2> My Cart </h2>
      <div id="buttons">
      <paper-button raised class="custom indigo" id='home' on-click="_handleDashboard">Home</paper-button>
      <paper-button raised class="custom indigo" id='logout' on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
    </div>

    <table>
  <tr>
        <th>pizza Name</th>
        <th>Unit Price</th>
        <th>Rating</th>
        <th>Size</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Total Amount</th>
  </tr>

    <template is="dom-repeat" items={{userData}} as="historyData">
        <tr>
            <td>{{historyData.pizzaName}}</td>
            <td>{{historyData.price}} </td>
            <td>{{historyData.rating}}</td>
            <td>{{historyData.size}}  </td>
            <td>{{historyData.description}}  </td> 
            <td>{{historyData.quantity}}  </td> 
            <td>{{historyData.totalAmount}} ₹ </td> 
              
        </tr>
  </template>
</table>

      <paper-button raised class="custom" on-click="_handleBuy">Buy Now</paper-button>
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
    // this.addEventListener('user-details',(e)=>this._handleResponse(e));
  }


  connectedCallback() {
    super.connectedCallback();
    this.userData = JSON.parse(sessionStorage.getItem('food'));
     let emailId=sessionStorage.getItem('emailId');
    this.postObj={emailId,userData:this.userData}
    console.log(this.userData);



  }
  _handleLogout() {
    sessionStorage.clear();
  }
  _handleBuy() {
    alert('successfully buy');
    console.log(this.postObj);

    this._makeAjax(`http://localhost:3000/orders`, "post", this.postObj);
    this.set('route.path', './dashboard-page');


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
    console.log(event.detail.response);
  }


}

window.customElements.define('cart-page', CartPage);
