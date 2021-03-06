// Icon pen.svg made by https://www.flaticon.com/authors/kiranshastry

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .add-group {
        height: 15vh;
        width: 15vh;
        margin-right: 5vh;
        margin-bottom: 5vw;
        text-decoration: none;
        background-size: cover;
        vertical-align: middle;
        cursor: pointer;
        background-image: url(static/images/pen.svg);
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: #fba304;
        border-radius: 15%;
        transition: width 1s, height 1s, background-color 1s, border-radius 1s;
        animation: pulse 2s;
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

    .add-group:hover {
        background-color: #ff7500;
        border-radius: 50%;
        animation: none;
    }

    .add-group:active {
      background-color: #c55c03;
      height: 14vh;
      width: 14vh;
    }
    </style>
    <svg class="add-group" viewBox="0 0 180 180"></svg>
`;

class Message extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('.add-group');
    this.IDgroups = 'IDgroups';

    this.$button.addEventListener('click', this._onClick.bind(this));
    document.addEventListener('messageFormIsReady', this._onMessageFormISReady.bind(this));
    document.addEventListener('backToGroupList', this._onBackToGroupList.bind(this));
  }

  _onClick() {
    const sender = prompt('Введите имя чата: ');
    if (Object.is(sender, null) || Object.is(sender, '')) {
      return 1;
    }
    const date = new Date();
    const key = date.getTime();
    const group = {
      key,
      date,
      sender,
      messages: [],
      lastMessage: 'Заглушка, чат пуст',
      lastMessageTime: [date.getHours(), date.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':'),
    };
    const groupsJSON = localStorage.getItem(this.IDgroups) === null ? [] : localStorage.getItem(this.IDgroups);
    if (groupsJSON.length > 0) {
      const groups = JSON.parse(groupsJSON);
      groups.push(group);
      localStorage.setItem(this.IDgroups, JSON.stringify(groups));
    } else {
      groupsJSON.push(group);
      localStorage.setItem(this.IDgroups, JSON.stringify(groupsJSON));
    }
    document.dispatchEvent(new Event('NewGroup'));
    return 0;
  }

  _onMessageFormISReady() {
    this.style.display = 'none';
  }

  _onBackToGroupList() {
    this.style.display = 'block';
  }
}

customElements.define('add-group', Message);
