import React from "react";

const Input = (props) => {
	return (
		<div className="input-container">
			{props.label && <label>{props.label}:</label>}
			<input type={props.type ? props.type : 'text'} {...props} />
		</div>
	)
};

export default Input;