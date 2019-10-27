const template = document.createElement('template');
template.innerHTML = `
    <style>
        .groups-header {
            background-color: rgb(212, 1, 254);
            height: 15vh;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            z-index: 0;
        }
        .hamburger {
            position: relative;
            display: block;
            height: 100%;
            text-decoration: none;
            background-size: cover;
            cursor: pointer;
            vertical-align: middle;
            transition: background-color 1s, border-radius 1s;
            animation: pulse 2s;
        }

        .hamburger:hover {
            background-color: #760677;
            border-radius: 50%;
            animation: none;
        }

        .hamburger:active {
            background-color: rgb(165, 0, 197);
            height: 14vh;
        }

        .mes-and-burg-wrap {
            width: 15vh;
            height: 15vh;
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
        
        .search-wrap {
            height: 15vh;
            width: 15vh;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 1s, border-radius 1s;
            animation: pulse 2s;
        }

        .search-wrap:hover {
            background-color: #760677;    
            border-radius: 50%;      
        }

        .search-wrap:active {
            background-color: rgb(165, 0, 197);
            height: 14vh;
            width: 14vh;
        }

        .search-button {
            height: 40%;
            background-size: cover;
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
    <div class="groups-header">
        <div class="mes-and-burg-wrap">
            <img class="hamburger" src="static/images/hamburgerButton.png">
            <p class="messeger">Messenger</p>
        </div>
        <div class="search-wrap">
            <img class="search-button" src="static/images/searchButton.png">
        </div>   
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
