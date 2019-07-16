import React from "react";
import DatePicker from 'react-datepicker';

const Input = (props) => {
	return (
		<div className="input-container">
			{props.label && <label>{props.label}:</label>}
			{props.type === 'select' ? 
				<select {...props}>
					<option value="">Brak</option>
					{props.options ? props.options.map((opt) => (
						<option key={opt.id} value={opt.id}>{opt.name}</option>
					)) : <option>None</option>}
				</select> 
				: props.type === 'textarea' ? 
					<textarea {...props}/>
				: props.type === 'date' ? 
					<DatePicker className='date-picker' selected={props.value} {...props} /> 
				:
					<input type={props.type ? props.type : 'text'} {...props} className={`${props.linestyle ? 'linestyle' : null}`}/>
			}
		</div>
	)
};

export default Input;