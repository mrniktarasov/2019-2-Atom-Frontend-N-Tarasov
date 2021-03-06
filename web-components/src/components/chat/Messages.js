const template = document.createElement('template');
template.innerHTML = `
  <style>
    .mes-box {
      background: #FFDAB9; 
      border-radius: 15%;
      width: auto;
      padding: 15px;
      margin-bottom: 50px;
      max-width: 50vw;
      word-wrap: break-word;
      display: flex;
      align-items: flex-end;
      animation-name: messageOut;
      animation-duration: 1s;
    }

    @keyframes messageOut {
      from {
        opacity: 0;
        width: 0 vh;
      }

      to {
        opacity: 1;
        width: auto;
      }
    }

    .mes-author {
      display: none;
    }

    .mes-date {
      display: inline-block;
      font-size: 10px;
      font-style: italic;
    }

    .mes-text {
      font-size: 4vh;
      font-family: Segoe UI;
      line-height: 45px;
      color: black; 
      background: #FFDAB9;
      border: .5em solid     #FFDAB9;
      max-width: 700px;
    }
    
    </style>
  <div class = "mes-box">
    <span class="mes-author"></span>
    <p class="mes-text"></p>
  <span class="mes-date"></span>
  </div>
`;

class Message extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$author = this._shadowRoot.querySelector('.mes-author');
    this.$text = this._shadowRoot.querySelector('.mes-text');
    this.$date = this._shadowRoot.querySelector('.mes-date');
  }

  static get observedAttributes() {
    return ['author', 'text', 'date'];
  }

  attributeChangedCallback(attr, newValue) {
    if (attr === 'author') {
      this.$author.setAttribute(attr, newValue);
    } else if (attr === 'text') {
      this.$text.setAttribute(attr, newValue);
    } else if (attr === 'date') {
      this.$date.setAttribute(attr, newValue);
    }
  }

  set authorM(newValue) {
    this.$author.innerHTML = newValue;
  }

  set textM(newValue) {
    this.$text.innerHTML = newValue;
  }

  set dateM(newValue) {
    this.$date.innerHTML = newValue;
  }

  get authorM() {
    return this.$author.value;
  }

  get textM() {
    return this.$text.value;
  }

  get dateM() {
    return this.$date.value;
  }
}

customElements.define('message-box', Message);
