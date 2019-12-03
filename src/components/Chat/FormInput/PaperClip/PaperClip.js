import React from 'react';
import PaperClipImg from '../../../../static/images/PaperClip.ico';
import styles from './PaperClip.module.css';

export function PaperClip(props) {
	const setMenuVis = props.setMenuVis;
	const menuVis = props.menuVis;

	function handleOtherClick(event) {
		if (event.target.className !== styles.paperClip) {
			if (menuVis === true) {
				setMenuVis(false);
			}
		}
	}

	React.useEffect(() => {
		window.addEventListener('click', handleOtherClick);

		return () => {
			window.removeEventListener('click', handleOtherClick);
		};
	}, []);

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
			src={PaperClipImg}
			className={styles.paperClip}
			onClick={handleClick}
		/>
	);
}
