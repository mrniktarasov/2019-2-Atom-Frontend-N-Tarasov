/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    .groups-panel {
      background-color: white;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
    }
    </style>
    <div class="groups-panel">
      <groups-header></groups-header>
      <group-list></group-list>
      <add-group></add-group>
    </div>
`;

class GroupsPanel extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$groupPanel = this._shadowRoot.querySelector('.groups-panel');
    document.addEventListener('messageFormIsReady', this._onMessageFormIsReady.bind(this));
    document.addEventListener('groupListIsReady', this._onGroupListIsReady.bind(this));
  }

  _onMessageFormIsReady() {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  _onGroupListIsReady() {
    this.style.display = 'block';
  }
}

customElements.define('groups-panel', GroupsPanel);
