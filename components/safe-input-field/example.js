import * as React from 'react';
import { isValid } from '@helsenorge/core-utils/string-utils';
import { debounce } from '@helsenorge/core-utils/debounce';
import SafeInputField from './index';
export const SafeInputFieldExample = () => {
    const [inputValue, setInputValue] = React.useState('');
    const [answer, setAnswer] = React.useState({ valueQuantity: { value: undefined } });
    const onBlur = () => {
        const info = console;
        info.log('Input feltet har mistet fokus');
    };
    const getValue = () => {
        if (answer && answer.valueQuantity !== undefined && answer.valueQuantity !== null) {
            return answer.valueQuantity.value;
        }
    };
    const onBlurValidator = (value) => {
        const info = console;
        info.log('onBlurValidator: ', value);
        return new Promise(resolve => {
            setTimeout(() => {
                if (value !== 'b') {
                    resolve(false);
                }
                resolve(true);
            }, 1000);
        });
    };
    const onFocus = () => {
        const info = console;
        info.log('Feltet har fått fokus');
    };
    const changeValidator = (value) => {
        const info = console;
        info.log('onChangeValidator: ', value);
        return value !== 'a'; // For demo
    };
    const handleChange = (event) => {
        const info = console;
        info.log('Feltet har ny verdi', event);
        const target = event.target;
        setAnswer({ valueQuantity: { value: Number(target.value) } });
    };
    const debouncedHandleChange = (event) => {
        debounce(() => handleChange(event), 250, false);
    };
    const valQuantity = getValue();
    return (React.createElement("div", null,
        'Størrelse på input feltet settes enten ved prop xsmall - xlarge, eller ved å sette en maks lengde på input',
        React.createElement(SafeInputField, { size: 'xSmall', id: "exampleSafeInputField", value: "", disabled: false, className: "mittTestInputFelt", onFocus: onFocus, onChange: handleChange, onChangeValidator: changeValidator, onBlurValidator: onBlurValidator, errorMessage: "Denne verdien er ikke gyldig", onBlur: onBlur, showLabel: true, inputName: "TestInput", label: "xSmall", inputTestId: "SafeInputField", validationTestId: "Validation", labelTestId: "Label" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'small', showLabel: true, label: "small", inputName: "TestInput3" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'medium', showLabel: true, label: "medium", inputName: "TestInput4" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'large', showLabel: true, label: "large", inputName: "TestInput5" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'xLarge', showLabel: true, label: "xLarge", inputName: "TestInput6" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'medium', showLabel: true, label: "maxLength 5", inputName: "TestInput7", maxLength: 5 }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'medium', showLabel: true, label: "max 5", max: 5, type: 'number', inputName: "TestInput9" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { disabled: true, size: 'medium', showLabel: true, label: "Deaktivert felt", inputName: "TestInput10" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { placeholder: 'Placeholder tekst', inputName: "TestInput11" }),
        React.createElement("br", null),
        React.createElement(SafeInputField, { value: "", size: 'medium', showLabel: true, label: "validerer ulovlige tegn (bruker util isValid). tillater ikke html-tags eller emoticons", inputName: "TestInput12", onChangeValidator: isValid }),
        React.createElement("div", null,
            React.createElement(SafeInputField, { value: inputValue || '', label: 'State styres av ekstern komponent, og value settes fra prop', placeholder: 'placeholder', onBlur: onBlur, onSubmitValidator: string => !!string, isRequired: true }),
            React.createElement("br", null),
            React.createElement("button", { onClick: () => setInputValue('TEST') }, "Sett inn 'TEST'"),
            React.createElement("button", { onClick: () => setInputValue('') }, "Sett inn tom string")),
        React.createElement(SafeInputField, { size: "xSmall", type: "number", id: 'test-id', inputName: 'test-id', value: valQuantity !== undefined ? valQuantity + '' : '', showLabel: true, label: 'Label', subLabel: 'SubLAbel', isRequired: true, placeholder: 'quantity', max: 650, min: 1, onBlur: handleChange, errorMessage: 'Obs: error', pattern: '^[+-]?[0-9]+$', className: "page_skjemautfyller__quantity", validateOnExternalUpdate: true }),
        React.createElement("button", { onClick: () => setAnswer({ valueQuantity: { value: 33 } }) }, "Sett inn '33'"),
        React.createElement("button", { onClick: () => setAnswer({ valueQuantity: { value: 0 } }) }, "Sett inn '0'"),
        React.createElement("button", { onClick: () => setAnswer({ valueQuantity: { value: undefined } }) }, "Sett inn 'undefined'"),
        React.createElement("button", { onClick: () => setAnswer({ valueQuantity: { value: 44444 } }) }, "Sett inn '44444'"),
        React.createElement(SafeInputField, { type: "text", id: 'input-field-id', inputName: 'nput-field-id', value: valQuantity, showLabel: true, label: 'Debounce input', subLabel: 'sublabel', isRequired: true, placeholder: 'debounce', minLength: 1, maxLength: 60, onChange: (event) => {
                event.persist();
                debouncedHandleChange(event);
            }, errorMessage: 'feil', className: "page_skjemautfyller__input", validateOnExternalUpdate: true, stringOverMaxLengthError: 'for mye tekst' })));
};
export default SafeInputFieldExample;
//# sourceMappingURL=example.js.map