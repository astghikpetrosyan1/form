import * as React from 'react';

import classNames from 'classnames';

import { CheckBox } from '../checkbox';
import MainImage, { ExtensionValue } from '../form/main-image';
import ValidationError from '../form/validation-error';
import { Sublabel } from '../label/sublabel';
// @ts-ignore
import NoImage from "../../img/no-image.jpg"
import { fileType, IExtentionType } from '../../utility/utils';

export interface Option {
  /** Unik Id for Checbox'en */
  id: string;
  /** Label som vises ved elementen */
  label: string;
  /** Om checkbox'en er checked som default */
  checked?: boolean;
  /** image of package */
  image?: string;
  /* Sendes videre til Checkbox i helpButton property */
  hjelpetrigger?: JSX.Element;
  /** Om checkbox'en er disabled */
  disabled?: boolean;
  /**
   * List of extension to check images, show hide conditions
   */
  extension?: ExtensionValue[];
}

interface Props {
  /** Unik Id for Checbox gruppen */
  id: string;
  /** En Array med alle Checbox'en inkl. options */
  checkboxes: Array<Option>;
  /** Function som kalles onChange */
  handleChange: (id: string) => void;
  /** Viser blå Checkboxer istedenfor default lilla stil */
  isStyleBlue?: boolean;
  /** legger en kommentar etter helpButton på checkbox gruppen */
  legend?: string | JSX.Element;
  /** ekstra CSS-class som legges på <legend> */
  legendClassName?: string;
  /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <legend> til dette feltet */
  subLabel?: string | JSX.Element;
  /**  Function som kalles ved validation */
  onValidated?: (valid: boolean | undefined) => void;
  /**  Melding som vises ved validation feil */
  errorMessage?: string;
  /** Om det er påkrevd å huke av boksen */
  isRequired?: boolean;
  /** Label som vises ved required validation feilmelding */
  requiredLabel?: string;
  /** Ekstra label som vises ved required validation feilmelding */
  optionalLabel?: string;
  /** Settes til true for å vise ekstra label */
  showRequiredLabel?: boolean;
  /** Settes til true for å vise ekstra optional label */
  showOptionalLabel?: boolean;
  /** Maks antall bokser som det er tillatt å huke av */
  max?: number;
  /** Minst antall bokser som det er påkrevd å huke av */
  min?: number;
  /** Extra CSS-classer som legges på wrapper */
  className?: string;
  /** Om det skal legges på en ekstra wrapper etter fieldset */
  hasInnerWrapper?: boolean;
  /* Om det skal legges en atom_helptrigger button */
  helpButton?: JSX.Element;
  /* Selve hjelpElement */
  helpElement?: JSX.Element;
  /** Update valid-state also when component is not updated through component */
  validateOnExternalUpdate?: boolean;
  /** Id som benyttes for å hente ut CheckboxGroup i automatiske tester */
  checkboxGroupTestId?: string;
  /** Id som benyttes for å hente ut Checkbox i automatiske tester */
  checkboxTestId?: string;
  /** Id som benyttes for å hente ut ValidationError i automatiske tester */
  validationTestId?: string;
  /** ClassName til fieldset taggen */
  fieldsetClassName?: string;
  /**
   * image is main image src
   */
  image?: string,
  /**
   * text is required label
   */
  text?: string,

  /**
   * List of extension to check images, show hide conditions
   */
  extension?: ExtensionValue[];
}

interface State {
  valid: boolean;
  validated: boolean;
}

export default class CheckBoxGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      valid: true,
      validated: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.checkboxes !== this.props.checkboxes) {
      this.setState({ valid: this.validate(this.state.validated) }, this.notifyValidated);
    }
  }

  validateField(): Promise<void> {
    const valid = this.validate(true);

    return new Promise<void>((resolve: () => void) => {
      this.setState({ validated: true, valid }, () => {
        this.notifyValidated();
        resolve();
      });
    });
  }

  isValid(): boolean {
    return this.state.valid;
  }

  validate = (validated?: boolean) => {
    if (this.props.isRequired && validated && !this.props.checkboxes.some(el => el.checked === true)) {
      return false;
    } else if (this.props.max && this.props.checkboxes.filter(el => el.checked === true).length > this.props.max) {
      return false;
    } else if (this.props.min && validated && this.props.checkboxes.filter(el => el.checked === true).length < this.props.min) {
      return false;
    }
    return true;
  };

  notifyValidated = () => {
    if (this.props.onValidated) {
      this.props.onValidated(this.state.valid);
    }
  };

  renderHelp() {
    if (this.props.helpElement) {
      return this.props.helpElement;
    }
  }

  renderImage() {
    return <MainImage extension={this.props.extension} />;
  }

  renderLegend(): JSX.Element | null {
    const {
      legend,
      legendClassName,
      isRequired,
      requiredLabel,
      optionalLabel,
      showRequiredLabel,
      showOptionalLabel,
      helpButton,
      subLabel,
    } = this.props;
    if (!legend) {
      return null;
    }

    return (
      <legend className={legendClassName}>
        {legend}
        {isRequired && requiredLabel && showRequiredLabel ? <em> {requiredLabel}</em> : ''}
        {!isRequired && optionalLabel && showOptionalLabel ? <em> {optionalLabel}</em> : ''}
        {helpButton}
        {subLabel && <Sublabel sublabelText={subLabel} />}
      </legend>
    );
  }

  render() {
    const { validateOnExternalUpdate } = this.props;
    const showChoiceImage = this.props.extension ? this.props.extension.find((extension) => extension.url === IExtentionType.choiceImage)?.valueBoolean : false

    const checkboxes = this.props.checkboxes.map(el => {
      const choiceImage = el.extension ? el.extension.find((extension) => extension.url === IExtentionType.image)?.valueString : ""
      return (
        <div key={el.id} className="choice-image-card">
          { showChoiceImage ? (
            <div className="file-list">
              { !choiceImage ? (
                <img src={NoImage} alt='' width="223px" height="200px" style={{ objectFit: 'contain' }} />
              ) : fileType(choiceImage) === 'image' ? (
                <img src={choiceImage || NoImage} alt='' width="223px" height="200px" style={{ objectFit: 'contain' }} />
              ) : fileType(choiceImage) === 'video' ? (
                <video controls style={{ width: '100%' }}>
                  <source src={choiceImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null }
            </div>
          ) : null }
          <div className="checkbox-container">
            <CheckBox
              label={el.label}
              id={`${this.props.id}-${el.id}`}
              checked={el.checked}
              onChange={() => this.props.handleChange(el.id)}
              helpButton={el.hjelpetrigger}
              disabled={el.disabled}
              validateOnExternalUpdate={validateOnExternalUpdate}
              checkboxTestId={`${this.props.checkboxTestId}-${el.id}`}
              isStyleBlue={this.props.isStyleBlue}
            />
          </div>
        </div>
      );
    });

    const classes = classNames({ 'mol_validation--active': !this.state.valid }, this.props.className);

    return (
      <div className={`mol_validation ${classes}`} id={`${this.props.id}-wrapper`}>
        <ValidationError
          isValid={this.state.valid}
          error={this.props.errorMessage ? this.props.errorMessage : ''}
          testId={this.props.validationTestId}
        />
        <fieldset className={this.props.fieldsetClassName} data-testid={this.props.checkboxTestId}>
          {this.renderLegend()}
          {this.renderHelp()}
          {this.renderImage()}
          <div className="group-container">
            {this.props.hasInnerWrapper ? <div className="atom_checkboxgroup__innerwrap">{checkboxes}</div> : checkboxes}
          </div>
        </fieldset>
      </div>
    );
  }
}
