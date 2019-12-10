import React from 'react';
import PaperClipImg from '../../../../static/images/PaperClip.ico';
import styles from './PaperClip.module.css';

export function PaperClip(props) {
	const setMenuVis = props.setMenuVis;
	const menuVis = props.menuVis;
	const microref = React.createRef();

	React.useEffect(() => {
		window.addEventListener(
			'click',
			handleOtherClick.bind(null, menuVis, setMenuVis, microref),
		);
	}, [menuVis, setMenuVis, microref]);

	function handleClick() {
		if (menuVis === true) {
			setMenuVis(false);
		} else {
			setMenuVis(true);
		}
	}

	return (
		<img
			alt="PaperClip"
			ref={microref}
			src={PaperClipImg}
			className={styles.paperClip}
			onClick={handleClick}
		/>
	);
}

function handleOtherClick(menuVis, setMenuVis, microref, event) {
	if (event.target.className !== styles.paperClip) {
		if (menuVis === true) {
			setMenuVis(false);
		}
	}
}
