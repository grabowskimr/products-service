import React from "react";
import DatePicker from 'react-datepicker';

const Input = (props) => {
	return (
		<div className="input-container">
			{props.label && <label>{props.label}:</label>}
			{props.type === 'select' ? 
				<select {...props}>
					{props.options ? props.options.map((opt) => (
						<option key={opt.id} value={opt.id}>{opt.name}</option>
					)) : <option>None</option>}
				</select> 
				: props.type === 'date' ? 
					<DatePicker className='date-picker' selected={props.value} {...props} /> 
				:
					<input type={props.type ? props.type : 'text'} {...props} />
			}
		</div>
	)
};

export default Input;