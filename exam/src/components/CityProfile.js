import React from 'react';
import { Link } from 'react-router-dom';

export default function CityProfile(props) {
	const data = props.data;
	return <div>{data.name}</div>;
}
