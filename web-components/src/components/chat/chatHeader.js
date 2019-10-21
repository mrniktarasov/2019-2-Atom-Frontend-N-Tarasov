/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
      background: rgb(212, 1, 254);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      width: 100%;
    }
    .header {
        flex: auto;
        background: rgb(212, 1, 254);
        height: 10vh;
        width: 85%;
        text-align: center;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
    }

    .backButton {
        height: 50px;
        width: 50px;
        margin: 5px;
        padding: 15px;
        text-decoration: none;
        background-image: url(../src/static/images/backButton.png); 
        background-size: cover;
        z-index: 0;
        cursor: pointer;
        border-radius: 50px;
    }

    .backButton:hover {
        background-color: #760677;
    }

    .avatar {
        height: 70px;
        width: 70px;
        margin: 5px 15px; 
        border-radius: 50%;
        background-image: url(../src/static/images/avatar1); 
        background-size: cover;
    }

    .senderInfo {
        font-family: Segoe UI;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .name {
        font-size: 50px;
        line-height: 45px;
    }

    .lastTime {
        font-size: 10px;
        font-style: italic;
        margin-bottom: 10px;
    }

    </style>
    <div class="backButton"></div>
    <div class="header">
        <div class="avatar"></div>
        <div class="senderInfo">
            <div class="name">Dude</div>
            <div class="lastTime">last seen at 16:00</div>
        </div>
    </div>
`;

class ChatHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$backButton = this._shadowRoot.querySelector('.backButton');
    this.$avatar = this.shadowRoot.querySelector('.avatar');
    this.$name = this._shadowRoot.querySelector('.name');
    this.$date = this._shadowRoot.querySelector('.lastTime');

    this.$backButton.addEventListener('click', this._onGroupListIsReady.bind(this));
    document.addEventListener('messageFormIsReady', this._MessageFormIsReady.bind(this));
  }

  _onGroupListIsReady() {
    document.dispatchEvent(new Event('backToGroupList'));
  }

  _MessageFormIsReady(event) {
    this.$name.innerText = event.detail.name;
  }
}

customElements.define('chat-header', ChatHeader);
