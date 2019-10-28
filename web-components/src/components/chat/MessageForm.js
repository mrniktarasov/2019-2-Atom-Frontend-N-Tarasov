const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
          display: none;
        }
        form-input {
            width: auto;
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .result {
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 50px;
            overflow: hidden;
            overflow-y: auto;
            margin-bottom: 15vh;
            margin-top: 15vh;
        }
        
        input[type=submit] {
            visibility: collapse;
        }
        
        .mine-message {
            color:black; 
            background: #FFDAB9;
            border: .5em solid     #FFDAB9;
        }

        .not-mine-message {
            background: #E5E5EA;;
            color:black;
            border: .5em solid  #E5E5EA;;
        }
    </style>
    <form>
        <chat-header></chat-header>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$message = this._shadowRoot.querySelector('.result');
    this.separator = '&';

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));

    document.addEventListener('goToChat', this._onGoToChat.bind(this));
    document.addEventListener('groupListIsReady', this._onGroupListReady.bind(this));
  }

  connectedCallback() {
    const groupJSON = localStorage.getItem(this.IDgroups);
    if (groupJSON !== null) {
      const group = JSON.parse(groupJSON);
      const currentGroup = this.getCurrentGroup(group);
      if (currentGroup !== null) {
        for (let i = 0; i < currentGroup.messages.length; i += 1) {
          const $messageElement = document.createElement('message-box');
          const currentMessage = currentGroup.messages[i].split(`${this.separator}`);
          $messageElement.dateM = currentMessage[0];
          $messageElement.authorM = currentMessage[1];
          $messageElement.textM = currentMessage[2];
          this.$message.appendChild($messageElement);
        }
      }
    }
  }

  getCurrentGroup(group) {
    let currentGroup = null;
    for (let i = 0; i < group.length; i += 1) {
      if (group[i].key === this.key) {
        currentGroup = group[i];
        return currentGroup;
      }
    }
    return currentGroup;
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.$input.value.length > 0) {
      const groupJSON = localStorage.getItem(this.IDgroups);
      if (groupJSON !== null) {
        const group = JSON.parse(groupJSON);
        const currentGroup = this.getCurrentGroup(group);
        const author = 'you';
        const currentDate = new Date();
        const text = this.$input.value;
        const currentTime = [currentDate.getHours(), currentDate.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
        const $newMessage = document.createElement('message-box');
        $newMessage.dateM = currentTime;
        $newMessage.textM = text;
        $newMessage.authorM = author;
        this.$message.appendChild($newMessage);
        currentGroup.messages.push(`${currentTime}${this.separator}${author}${this.separator}${text}`);
        currentGroup.lastMessage = text;
        localStorage.setItem(this.IDgroups, JSON.stringify(group));
        this.$input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  _onGroupListReady() {
    this.$message.innerText = '';
    this.style.display = 'none';
  }

  _onGoToChat(event) {
    this.key = event.detail.key;
    this.IDgroups = event.detail.IDgroups;
    const groupJSON = localStorage.getItem(this.IDgroups);
    let currentGroup = null;

    if (groupJSON !== null) {
      const group = JSON.parse(groupJSON);
      currentGroup = this.getCurrentGroup(group);
      if (!Object.is(currentGroup, null)) {
        if (!Object.is(currentGroup.messages, undefined)) {
          for (let i = 0; i < currentGroup.messages.length; i += 1) {
            const $messageElement = document.createElement('message-box');
            const currentMessage = currentGroup.messages[i].split(`${this.separator}`);
            $messageElement.dateM = currentMessage[0];
            $messageElement.authorM = currentMessage[1];
            $messageElement.textM = currentMessage[2];
            this.$message.appendChild($messageElement);
          }
        }
        document.dispatchEvent(new CustomEvent('messageFormIsReady', {
          detail: { name: currentGroup.sender },
        }));
        this.style.display = 'block';
      }
    }
  }
}


customElements.define('message-form', MessageForm);
