/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .groups-header {
            background-color: rgb(212, 1, 254);
            height: 130px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
        }
        .hamburger {
            position: relative;
            display: block;
            width: 130px;
            height: 130px;
            text-decoration: none;
            background-image: url(../src/static/images/hamburgerButton.png);
            background-size: cover;
            cursor: pointer;
        }

        .hamburger:hover {
            background-color: #760677;
        }

        .mes-and-burg-wrap {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            align-items: center;
        }
        .messeger {
            color: white;
            font-size: 5vh;
            font-weight: bold;
            margin-left: 5vh;
        }

        .search-button {
            height: 60px;
            width: 60px;
            margin-right: 20px;
            background-image: url(static/images/searchButton.png);
            background-size: cover;
            cursor: pointer;
        }

        .search-button:hover {
            background-color: #760677;
        }
        
    </style>
    <div class="groups-header">
        <div class="mes-and-burg-wrap">
            <div class="hamburger"></div>
            <p class="messeger">Messeger</p>
        </div>    
        <div class="search-button"></div>
    </div>
`;

class GroupsHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('groups-header', GroupsHeader);
