import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/iron-pages/iron-pages.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-slider/paper-slider.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';



/**
* @customElement
* @polymer
*/
class DashboardPage extends PolymerElement {
  static get template() {
    return html`
<style>
    :host {
        display: block;
    }
  
    
    #dialog{
        width:50%;
        border-radius:20px;
      }
      
    h2{
        text-align:center;
    }
    
    #buttons{
        position:absolute;
        top:50px;
        left:1000px;
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
</style>

<app-location route="{{route}}">
</app-location>

<div id="buttons">

<paper-button class="custom" id='myOrder' on-click="_handleMyorder">My Order</paper-button>


  <paper-button id='cart' on-click="_handleMycart">Cart</paper-button>
  <paper-button class="custom" id='login' on-click="_handleLogout"><a name="login-page"
href="[[rootPath]]login-page">Logout</a></paper-button>
</div>

<h2>Pizza Order list </h2>

<paper-dialog id="dialog">
<paper-dialog-scrollable>
<iron-icon icon="icons:clear" on-click="_handleCross"></iron-icon>


<h1> Cart </h1>
Pizza Name: {{selectedItem.pizzaName}}<br>
 Quantity:<paper-icon-button id="addBtn" on-click="_handleAdd" data-set$={{index}} icon="add"></paper-icon-button>{{userQuantity}}<paper-icon-button id="addBtn" data-set$={{index}} on-click="_handleRemove" icon="remove"></paper-icon-button><br>
 Total Price :{{b}}  </br></br>

 <paper-button type="submit" id="buyNow" on-click="_handleCart">Add to Cart</paper-button>

  <h3>  {{message}} </h3>
   
  </paper-dialog-scrollable>
  
</paper-dialog>




<iron-form id="form1">
<paper-tabs selected={{selected}}>
    <paper-tab>Veg Pizza</paper-tab>
    <paper-tab>NonVeg Pizza</paper-tab>
</paper-tabs>

<iron-pages selected={{selected}}>
    <div>
        <form>
        <template is="dom-repeat" items="{{vegPizza}}">
        <paper-card>
          <div id="left">
            <h3>Pizza Name: {{item.pizzaName}}</h3>
            <h3>price: {{item.price}}</h3>
            <h3>rating:{{item.rating}}</h3>
            <h3>size:{{item.size}}</h3>
            <h3>description:{{item.description}}</h3>
            <paper-button id="cart" raised on-click="_handleQuantity">Add</paper-button>
          </div>
        </paper-card>  
        </template>   
        </form>
    </div>
    <div>
    <form>
    <template is="dom-repeat" items="{{nonVeg}}">
    <paper-card>
      <div id="left">
        <h3>Pizza Name: {{item.pizzaName}}</h3>
        <h3>price: {{item.price}}</h3>
        <h3>rating:{{item.rating}}</h3>
        <h3>size:{{item.size}}</h3>
        <h3>description:{{item.description}}</h3>
        <paper-button id="cart" raised on-click="_handleQuantity">Add</paper-button>
      </div>
    </paper-card>  
    </template>   
    </form>
    
       
    </div>
   
</iron-pages>
</iron-form>

        <iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type='application/json'>
        </iron-ajax>
        <paper-spinner id="spin" active={{waiting}}></paper-spinner>
        <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>

        

        `;
  }
  static get properties() {
    return {
      selected: {
        type: Object
      },

      action: {
        type: String,
        value: 'List'
      },
      cartProducts: {
        type: Array,
        value: []
      },
      selectedItem: {
        type: Object,
        value: {}
      },
      vegPizza: {
        type: Array,
        value: [{ "pizzaName": 'onion pizza', "price": '200 INR', "rating": '4.5', "size": '9 inch', "description": 'Veg' },
        { "pizzaName": 'Tomato pizza', "price": '400 INR', "rating": '3.5', "size": '8 inch', "description": 'Veg' }]
      },
      nonVeg: {
        type: Array,
        value: [{ "pizzaName": 'PEPPER BARBECUE CHICKEN', "price": '400 INR', "rating": '3.5', "size": '8 inch', "description": 'Non Veg' },
        { "pizzaName": 'Chicken Golden Delight', "price": '500 INR', "rating": '3.0', "size": '9 inch', "description": 'Non Veg' }]
      },

    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.selected = 0;
  }
  _handleLogout() {
    sessionStorage.clear();
  }
  _handleMyorder() {
    this.set('route.path', './my-order')

  }

  _handleCross() {
    this.$.dialog.close();

  }
  _handleAdd() {

    if (this.userQuantity < 10)
      this.userQuantity += 1;
    console.log(this.selectedItem.price);
    this.b = parseInt(this.selectedItem.price) * this.userQuantity;
    console.log(this.b);
  }

  _handleRemove() {
    if (this.userQuantity > 0)
      this.userQuantity -= 1;
    if (this.b > 0)
      this.b = this.b - parseInt(this.selectedItem.price);

  }

  _handleQuantity(event) {
    this.userQuantity = 0;
    this.$.dialog.open();
    this.selectedItem = event.model.item;
  }
  _handleCart(event) {
    this.selectedItem.quantity = this.userQuantity;
    this.selectedItem.totalAmount = this.b;
    this.cartProducts.push(this.selectedItem);
    console.log(this.cartProducts);
    sessionStorage.setItem('food', JSON.stringify(this.cartProducts));
    this.$.dialog.close();

  }
  _handleMycart() {
    this.set('route.path', './cart-page')
  }

  /**
* getting response from server and storing user data and id in session storage
* @param {*} event 
*/
  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        console.log('abc');
        this.waiting = false;
        console.log(event.detail.response);
        this.selected = event.detail.response;
    }
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
}

window.customElements.define('dashboard-page', DashboardPage);