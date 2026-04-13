import * as React from 'react';

import * as ReactDOMServer from 'react-dom/server';

import { FormChild, FormChildProps } from '..';

import './styles.scss';

export interface Props extends React.PropsWithChildren<{}> {
  components: Array<FormChild>;
  submitted?: boolean;
  header: string;
}

interface AnyObject {
  [key: string]: any;
}

function filterObjectsByProperty<T extends AnyObject>(array: T[], propertyName: keyof T): T[] {
  const seen = new Set<any>();
  return array.filter(item => {
    const propertyValue = item[propertyName];
    if (seen.has(propertyValue)) {
      return false;
    } else {
      seen.add(propertyValue);
      return true;
    }
  });
}

const ValidationSummary: React.FC<Props> = ({ submitted, components, header }: Props) => {
  if (submitted) {
    const componentsWithErrors = sortComponentsWithErrorsByApperanceInDOM(getComponentsWithErrors(components));
    const listItems = filterObjectsByProperty(componentsWithErrors.map((el) => el.props), 'id').map((el: FormChildProps) => {
      let validationMessage;
      if (el.label) {
        validationMessage = el.label;
      } else if (el.legend) {
        validationMessage = el.legend;
      }

      // In case the validationMessage is a JSX.Element (with possibly an
      // arbitrary DOM structure)
      let elementAsString = validationMessage;
      if (React.isValidElement(validationMessage)) {
        const element = validationMessage as JSX.Element;
        elementAsString = ReactDOMServer.renderToStaticMarkup(element);
      }

      const rawText = elementAsString != null ? elementAsString.replace(/<.*?>/g, ' ') : null;
      validationMessage = <span>{rawText}</span>;

      const handleScrollToElement = () => {
        const id = `${el.id}-wrapper`
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }

      return (
        <li key={el.id} className="mol_validation-summary__listitem">
          <span className="mol_validation-summary__link" onClick={handleScrollToElement}>
            {validationMessage}
          </span>
        </li>
      );
    });
    if (componentsWithErrors.length) {
      return (
        <div className="mol_validation-summary">
          <h3 className="mol_validation-summary__header">{header}</h3>
          <ul className="mol_validation-summary__list">{listItems}</ul>
        </div>
      );
    }
  }
  return null;
};

function getComponentsWithErrors(components: Array<FormChild>) {
  const componentsWithErrors = components.filter((c: FormChild) => {
    const componentToValidate = c && c.getWrappedInstance ? c.getWrappedInstance() : c;
    if (
      (componentToValidate && componentToValidate.props && componentToValidate.props.isValid && !componentToValidate.props.isValid()) ||
      (componentToValidate && componentToValidate.isValid && !componentToValidate.isValid())
    ) {
      return true;
    }
  });
  return componentsWithErrors;
}

function sortComponentsWithErrorsByApperanceInDOM(components: Array<FormChild>) {
  return components.sort((a, b) => {
    const el1 = document.getElementById(`${a.props.id}-wrapper`);
    const el2 = document.getElementById(`${b.props.id}-wrapper`);

    if (el1 && el2) {
      const compare = el1.compareDocumentPosition(el2);
      if (compare === 2) {
        return 1;
      } else if (compare === 4) {
        return -1;
      }
    }
    return 0;
  });
}

export default ValidationSummary;
