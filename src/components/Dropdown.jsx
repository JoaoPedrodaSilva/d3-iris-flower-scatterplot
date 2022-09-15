export const Dropdown = ({ options, id, label, selectedOption, setAttribute }) => {
    return (
        <form>
            <label htmlFor={id}>{label}: </label>
            <select id={id} onChange={event => setAttribute(event.target.value)}>
                <option value="">--Select an attribute--</option>

                {options.map((option, index) => (
                    <option key={index} value={option.value} defaultValue={selectedOption === option.value}>{option.label}</option>
                ))}

            </select>
        </form >
    )
}
