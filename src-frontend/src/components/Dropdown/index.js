import React from "react";

const options = [
    { label: "Pixabay", value: 0 },
  
    { label: "Pexels", value: 1 },
  
    { label: "Unsplash", value: 2 },
  
  ];

  export const Dropdown = ({ id, name, handleChange, selectedValue }) => (
    < >
        <select id={id} name={name} onChange={handleChange} value={selectedValue}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </ >
);


export const Fontsize = [
    { id : 1 , fontsize: 10},
    { id : 2 , fontsize: 12},
    { id : 3 , fontsize: 14},
    { id : 4 , fontsize: 16},
    { id : 5 , fontsize: 18},
    { id : 6 , fontsize: 20},
    { id : 7 , fontsize: 22},
    { id : 8 , fontsize: 24},
    { id : 9 , fontsize: 26},
    { id : 10 , fontsize: 28},
    { id : 11, fontsize: 30},
    { id : 12 , fontsize: 32},
]

// export default Dropdown;
