/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
// Icon pen.svg made by https://www.flaticon.com/authors/kiranshastry

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .add-group {
        height: 140px;
        width: 140px;
        margin-right: 40px;
        margin-bottom: 40px;
        background-image: url(../src/static/images/pen.svg);
        background-size: cover;
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: #fba304;
        border-radius: 20px;
    }

    .add-group:hover {
        background-color: #ff7500;
    }
    </style>
    <div class="add-group"></div>
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
  }

  _onMessageFormISReady() {
    this.style.display = 'none';
  }

  _onBackToGroupList() {
    this.style.display = 'block';
  }
}

customElements.define('add-group', Message);
