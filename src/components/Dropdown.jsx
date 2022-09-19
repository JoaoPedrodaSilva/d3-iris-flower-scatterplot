export const Dropdown = ({ options, id, label, selectedOption, setAttribute }) => {
    return (
        <form>
            <label htmlFor={id}>{label}: </label>
            <select id={id} onChange={event => setAttribute(event.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option.value} selected={selectedOption === option.value}>{option.label}</option>
                ))}

            </select>
        </form >
    )
}
