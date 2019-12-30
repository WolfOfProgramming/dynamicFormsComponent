const formContainer = document.querySelector('.form__container');
const addButton = document.querySelector('.form__button--add');
const submitButton = document.querySelector('.form__button--submit');
const MAX_INPUT_COUNT = 6;

const regEx = /.+?(?=[?]passwords=)/;

let activeInputs = 0;

const checkInputs = inputs => {
    const emptyInputs = Array.from(inputs).filter(input => input.value === '');
    if (emptyInputs.length > 0) {
        const errorParagraph = /* HTML */ `
            <p class="form__error">The field cannot be empty</p>
        `;
        emptyInputs.forEach(emptyInput =>
            emptyInput.parentNode.insertAdjacentHTML('afterend', errorParagraph)
        );
        return false;
    }
    return true;
};

const deleteErrorParagraphs = () => {
    const formSections = document.querySelectorAll('.form__section');
    formSections.forEach(formSection => {
        if (formSection.querySelector('.form__error')) {
            const formError = formSection.querySelector('.form__error');
            formSection.removeChild(formError);
        }
    });
};

const updateCoutner = result => {
    if (result) {
        activeInputs += 1;
    } else {
        activeInputs -= 1;
    }
};

const updateNumbers = () => {
    const spans = document.querySelectorAll('.form__number');
    spans.forEach((span, index) => (span.textContent = index + 1));
};

const generateInput = activeInputs => {
    let formDeleteButton = '';
    let defaultInputText = '';
    if (activeInputs > 0) {
        formDeleteButton = /* HTML */ `
            <button class="form__delete" type="button"></button>
        `;
    } else {
        defaultInputText = 'It is default input text.';
    }
    console.log(defaultInputText);
    const formInput = /* HTML */ `
        <section class="form__section">
            <label class="form__label" for="input"
                >Input
                <span class="form__number">${activeInputs + 1}</span></label
            >
            <div class="form__wrapper">
                <input
                    class="form__input"
                    type="text"
                    name="input"
                    value="${defaultInputText}"
                />
                ${formDeleteButton}
            </div>
        </section>
    `;
    formContainer.insertAdjacentHTML('beforeend', formInput);

    const currentElement = formContainer.lastElementChild;
    if (currentElement.querySelector('.form__delete')) {
        currentElement
            .querySelector('.form__delete')
            .addEventListener('click', e => {
                e.target.parentNode.parentNode.remove();
                deleteErrorParagraphs();
                updateNumbers();
                updateCoutner(false);
            });
    }
    console.log(currentElement);
    currentElement.querySelector('.form__input').focus();
    currentElement.querySelector('.form__input').select();

    updateCoutner(true);
};

generateInput(activeInputs);

addButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form__input');
    deleteErrorParagraphs();
    if (activeInputs < MAX_INPUT_COUNT && checkInputs(inputs)) {
        generateInput(activeInputs);
    }
});

submitButton.addEventListener('click', e => {
    e.preventDefault();
    deleteErrorParagraphs();
    const inputs = document.querySelectorAll('.form__input');
    if (checkInputs(inputs)) {
        let url = document.URL;
        if (url.match(regEx)) {
            url = url.match(regEx);
        }
        const inputsValues = [];
        inputs.forEach(input => inputsValues.push(input.value));
        url += '?passwords=';
        url += inputsValues.join(';');
        window.location.href = url;
    }
});
