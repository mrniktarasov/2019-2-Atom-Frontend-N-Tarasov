/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
			width: auto;
		}

		form {
			width: 100%;
			height: 100%;
   			background: #FFF;
			border-radius: 10px;
			display: flex;
			justify-content: center;   
			flex-direction: column;
		}

		.result {
			width: 100%;
			min-height: 700px;
			display: flex;
			flex: auto;
			flex-wrap: wrap;
			flex-direction: column-reverse;
			align-content: flex-end;
			overflow-y: auto;
			padding: 0;
		}

        
        input[type=submit] {
            visibility: collapse;
		}
		
		.mine-message {
			color:black; 
			background: #FFDAB9;
			border: .5em solid 	#FFDAB9;
		}

		.not-mine-message {
			background:	#E5E5EA;;
			color:black;
			border: .5em solid 	#E5E5EA;;
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
		this.separator = '!@#$';

		this.$form.addEventListener('submit', this._onSubmit.bind(this));
		this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
	}

	connectedCallback() {
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length - 1; i++) {
					const key = localStorage.key(i);
					const $messageElement = document.createElement('message-box');
					const currentMessage = localStorage.getItem(key);
					const messageInfoArray = currentMessage.split(this.separator);
					const dateString = new Date(messageInfoArray[1]);
					$messageElement.dateM = [dateString.getHours(), dateString.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
					$messageElement.authorM = messageInfoArray[2];
					$messageElement.textM = messageInfoArray[3];
					//if (messageInfoArray[2] === 'you') {
					//$messageElement.classList.add('mine-message');
					//} else {
					//$messageElement.classList.add('not-mine-message');
					//}
					this.$message.appendChild($messageElement);
				}
			this.$message.scrollTop = Infinity;
		}
	} 

	_onSubmit(event) {
		event.preventDefault();
		if (this.$input.value.length > 0) {
			const author = 'you';
			const date = new Date();
			const timestampID = date.getTime();
			const text = this.$input.value;
			const $newMessage = document.createElement('message-box');
			$newMessage.dateM = [date.getHours(), date.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');;
			$newMessage.textM = text;
			$newMessage.authorM = author;
			$newMessage.classList.add('mine-message');
			const savedStr = timestampID + this.separator + date + this.separator + author + this.separator + text;
			localStorage.setItem(timestampID, savedStr);
			this.$message.appendChild($newMessage);
			this.$input.value = '';
			this.$message.scrollTop = Infinity;
		}
	}

	_onKeyPress(event) {
		if (event.keyCode === 13) {
			this.$form.dispatchEvent(new Event('submit'));
		}
	}
}

customElements.define('message-form', MessageForm);
