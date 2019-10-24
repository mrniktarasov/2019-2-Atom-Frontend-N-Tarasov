/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    .groups {
      height: 100vh;
      width: 100vw;
      margin-top: 130px;
      display: flex;
      flex-direction: column;
    }
    </style>
    <div class="groups"></div>
`;

class GroupList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$groups = this._shadowRoot.querySelector('.groups');
    this.IDgroups = 'IDgroups';

    document.addEventListener('DOMContentLoaded', this._onDOMLoaded.bind(this));
    document.addEventListener('NewGroup', this._onNewGroup.bind(this));
    document.addEventListener('backToGroupList', this._onBackToGroupList.bind(this));
  }

  _onDOMLoaded() {
    const groupsJSON = localStorage.getItem(this.IDgroups);
    if (groupsJSON !== null) {
      const groups = JSON.parse(groupsJSON);
      for (let i = 0; i < groups.length; i += 1) {
        const $groupElem = document.createElement('group-preview');
        $groupElem.$sender.innerText = groups[i].sender;
        $groupElem.$lastMessage.innerText = groups[i].lastMessage;
        $groupElem.$lastMessageTime.innerText = groups[i].lastMessageTime;
        $groupElem.key = groups[i].key;
        this.$groups.appendChild($groupElem);
      }
    }
  }

  _onNewGroup(event) {
    event.preventDefault();
    const group = JSON.parse(localStorage.getItem(this.IDgroups));
    const $newGroup = document.createElement('group-preview');
    $newGroup.$sender.innerText = group[group.length - 1].sender;
    $newGroup.$lastMessage.innerText = group[group.length - 1].lastMessage;
    $newGroup.$lastMessageTime.innerText = group[group.length - 1].lastMessageTime;
    $newGroup.key = group[group.length - 1].key;
    this.$groups.appendChild($newGroup);
  }

  _onBackToGroupList() {
    const groupsJSON = localStorage.getItem(this.IDgroups);
    if (groupsJSON !== null) {
      const groups = JSON.parse(groupsJSON);
      for (let i = 0; i < groups.length; i += 1) {
        const $groupElem = document.createElement('group-preview');
        $groupElem.$sender.innerText = groups[i].sender;
        $groupElem.$lastMessage.innerText = groups[i].lastMessage;
        $groupElem.$lastMessageTime.innerText = groups[i].lastMessageTime;
        $groupElem.key = groups[i].key;
        this.$groups.appendChild($groupElem);
      }
    }
    document.dispatchEvent(new Event('groupListIsReady'));
    this.style.display = 'block';
  }
}

customElements.define('group-list', GroupList);
