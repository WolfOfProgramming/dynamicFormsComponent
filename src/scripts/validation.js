export const isInputsCorrect = inputs => {
    const emptyInputs = Array.from(inputs).filter(input => input.value === '');
    if (emptyInputs.length === 0) {
        return true;
    }
    return false;
};

export const createErrorParagraphs = inputs => {
    const emptyInputs = Array.from(inputs).filter(input => input.value === '');
    const errorParagraph = /* HTML */ `
        <p class="form__error">The field cannot be empty</p>
    `;
    emptyInputs.forEach(emptyInput =>
        emptyInput.parentNode.insertAdjacentHTML('afterend', errorParagraph)
    );
};
