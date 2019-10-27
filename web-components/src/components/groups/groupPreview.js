const template = document.createElement('template');
template.innerHTML = `
    <style>
      .preview {
        width: 100vw;
        height: 20vh;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-bottom: #d401fe36 solid 1px;
        z-index: 0;
        animation-name: appearence;
        animation-duration: 1s;
        transition: width 2s, background-color 1s;
      }

      @keyframes appearence {
        from {
          margin-left: 100%;
          opacity: 0;
        }

        to {
          margin-left: 0%;
          opacity: 1;
        }
      }

      .preview:active {
        background-color: #f3adf5;
        height: 19vh;
        width: 99vw;
      }

      .preview:hover {
        background-color: #fedbff;
        width: 90vw;
        height: 19vh;
      }

      .left-side-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .senderInfo {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .sender {
        font-size: 40px;
        color: black;
      }

      .metaInfo {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-right: 3vw;
      }
      
      .avatar {
        height: 10vh;
        width: 10vh;
        background-image: url(static/images/avatar1.svg);
        background-size: cover;
        margin: 20px;
        border-radius: 50%;
      }

      .avatar:hover {
        background-color: #fedbff;
      }

      .time {
        display: inline-block;
        font-size: 15px;
        font-style: italic;
      }
      .last-message {
        font-size: 30px;
        font-family: Segoe UI;
        line-height: 45px;
      }

      .readed {
        height: 40px;
        width: 40px;
        background-image: url(static/images/doubleTick.png);
        background-size: cover;
      }
      .key {
        display: none;
      }
      :host {
        display: inline-block;
      }
    </style>
    <div class="preview">
      <div class="left-side-wrap">
        <div class="avatar"></div>
        <div class="senderInfo">
          <div class="sender"></div>
          <div class="last-message"></div>
        </div>
      </div>
      <div class="metaInfo">
        <div class="time"></div>
        <div class="readed"></div>
      </div>
`;

class GroupPreview extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.IDgroups = 'IDgroups';

    this.$preview = this._shadowRoot.querySelector('.preview');
    this.$sender = this._shadowRoot.querySelector('.sender');
    this.$lastMessage = this._shadowRoot.querySelector('.last-message');
    this.$lastMessageTime = this._shadowRoot.querySelector('.time');

    this.$preview.addEventListener('click', this._onClick.bind(this));
    document.addEventListener('messageFormIsReady', this._onMessageFormISReady.bind(this));
  }

  _onClick() {
    document.dispatchEvent(new CustomEvent('goToChat', { detail: { key: this.key, IDgroups: this.IDgroups } }));
  }

  _onMessageFormISReady() {
    this.style.display = 'none';
  }
}

customElements.define('group-preview', GroupPreview);
