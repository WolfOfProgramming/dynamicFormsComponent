export const isInputsCorrect = inputs => {
    const emptyInputs = getEmptyInputs(inputs);
    if (emptyInputs.length === 0) {
        return true;
    }
    return false;
};

export const createErrorParagraphs = inputs => {
    const emptyInputs = getEmptyInputs(inputs);
    const errorParagraph = /* HTML */ `
        <p class="form__error">The field cannot be empty</p>
    `;
    emptyInputs.forEach(emptyInput =>
        emptyInput.parentNode.insertAdjacentHTML('afterend', errorParagraph)
    );
};

const getEmptyInputs = inputs => {
    return Array.from(inputs).filter(input => input.value === '');
};
