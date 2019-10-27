const template = document.createElement('template');
template.innerHTML = `
    <style>
    .header {
        flex: auto;
        background: rgb(212, 1, 254);
        height: 15vh;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        color: white;
        align-items: center;
        left: 0;
        top: 0;
        position: fixed;
        z-index: 0;
    }

    .back-button-wrap {
      height: 15vh;
      width: 15vh;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color 1s, border-radius 1s;
      animation: pulse 2s;
    }

    .back-button-wrap:hover {
      background-color: #760677;
      border-radius: 50%;
    }
    
    .backButton {
        height: 80%;
        width: 80%;
        text-decoration: none;
        background-size: cover;
        z-index: 0;
        border-radius: 50%;
        transition: background-color 1s;
    }

    .backButton:hover {
        background-color: #760677;
    }

    .backButton:active {
      background-color: rgb(165, 0, 197);
      height: 70%;
      width: 70%;
    }

    .avatar-and-sender-wrap {
      display: flex;
      flex-direction: row;
    }

    .avatar {
        height: 10vh;
        width: auto;
        margin-right: 10px; 
        border-radius: 50%;
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
        font-size: 2vh;
        font-style: italic;
        margin-bottom: 10px;
    }

    .three-dots-wrap {
      height: 15vh;
      width: 15vh;
      cursor: pointer;
      transition: background-color 1s, border-radius 1s;
      animation: pulse 2s;
    }

    .three-dots-wrap:hover {
      background-color: #760677;
      border-radius: 50%;
    }

    .three-dots-wrap:active {
      background-color: rgb(165, 0, 197);
      height: 14vh;
    }

    .three-dots {
      margin: 2vh;
    }

    @keyframes pulse {
      0% {
          box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(204,169,44, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(204,169,44, 0);
        }
    }

    </style>
    <div class="header">
      <div class="back-button-wrap">
        <img class="backButton" src="static/images/backButton.png">
      </div>
      <div class="avatar-and-sender-wrap">
        <img class="avatar" src="static/images/avatar1.svg">
        <div class="senderInfo">
          <div class="name">Dude</div>
          <div class="lastTime">last seen at 16:00</div>
        </div>
      </div>
      <div class="three-dots-wrap">
        <img class="three-dots" src="static/images/3dots.svg">
      </div>
    </div>
`;

class ChatHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$backButton = this._shadowRoot.querySelector('.back-button-wrap');
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
