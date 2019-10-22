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
            min-height: 700px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 50px;
            overflow: hidden;
            overflow-y: auto;
            margin-bottom: 80px;
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
    this.IDMessages = 'ID-messages';
    this.separator = '&';

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));

    document.addEventListener('goToChat', this._onGoToChat.bind(this));
    document.addEventListener('groupListIsReady', this._onGroupListReady.bind(this));

    const arrMessages = localStorage.getItem(this.key);
    if (arrMessages !== null) {
      const arr = JSON.parse(arrMessages);
      for (let i = 0; i < arrMessages.length; i += 1) {
        const $messageElement = document.createElement('message-box');
        const currentMessage = arr[i].split(`${this.separator}`);
        $messageElement.dateM = currentMessage[0];
        $messageElement.authorM = currentMessage[1];
        $messageElement.textM = currentMessage[2];
        this.$message.appendChild($messageElement);
      }
    }
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.$input.value.length > 0) {
      const author = 'you';
      const currentDate = new Date();
      const text = this.$input.value;
      const currentTime = [currentDate.getHours(), currentDate.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
      const $newMessage = document.createElement('message-box');
      $newMessage.dateM = currentTime;
      $newMessage.textM = text;
      $newMessage.authorM = author;
      const jsonArr = localStorage.getItem('ID-messages') === null ? [] : localStorage.getItem('ID-messages');
      if (jsonArr.length > 0) {
        const arrMessages = JSON.parse(jsonArr);
        arrMessages.push(`${currentTime}${this.separator}${author}${this.separator}${text}`);
        localStorage.setItem('ID-messages', JSON.stringify(arrMessages));
      } else {
        jsonArr.push(`${currentTime}${this.separator}${author}${this.separator}${text}`);
        localStorage.setItem('ID-messages', JSON.stringify(jsonArr));
      }
      this.$message.appendChild($newMessage);
      this.$input.value = '';
      window.scrollTo(0, document.body.scrollHeight);
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
    const IDgroups = event.detail.IDgroups;
    const groupJSON = localStorage.getItem(IDgroups);
    let currentGroup = null;

    if (groupJSON !== null) {
      const group = JSON.parse(groupJSON);
      for (let i = 0; i < group.length; i += 1) {
        if (group[i].key === this.key) {
          currentGroup = group[i];
        }
      }
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
