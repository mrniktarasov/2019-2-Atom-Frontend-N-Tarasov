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
			margin-top: 220px;
			margin-bottom: 80px;
		}

		.header {
			background: rgb(212, 1, 254);
            height: 250px;
            width: 100%;
            position: fixed;
            top: 0;
            text-align: center;
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
			<div class='header'></div>
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

		this.$form.addEventListener('submit', this._onSubmit.bind(this));
		this.$form.addEventListener('keypress', this._onKeyPress.bind(this));

		for (let element = 0; element < localStorage.length - 1; element += 1) {
			const $messageElement = document.createElement('message-box');
			const currentMessage = localStorage.getItem(`ID-${element}`);
			const messageIntoArray = currentMessage.split('&');
			$messageElement.dateM = messageIntoArray[0];
			$messageElement.authorM = messageIntoArray[1];
			$messageElement.textM = messageIntoArray[2];
			this.$message.appendChild($messageElement);
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
			localStorage.setItem(`ID-${(localStorage.length - 1).toString()}`, `${currentTime}&${author}&${text}`);
			this.$message.appendChild($newMessage);
			this.$input.value = '';
		}
	}

	_onKeyPress(event) {
		if (event.keyCode === 13) {
			this.$form.dispatchEvent(new Event('submit'));
		}
	}
}

customElements.define('message-form', MessageForm);
