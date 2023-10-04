import mirIcon from "../images/mir.svg";
import visaIcon from "../images/visa.svg";
import mastercardIcon from "../images/mastercard.svg";
import maestroIcon from "../images/maestro.svg";

export const paymentMethodOptions = {
  "MIR": {
    number: "1234 56•• •••• 1234",
    validity: "01/30",
    icon: mirIcon,
    alt: "Банковская карта Мир",
    cssClass: "credit-card-icon__mir-img card-image-result"
  },
  "VISA": {
    number: "1234 56•• •••• 1234",
    validity: "01/30",
    icon: visaIcon,
    alt: "Банковская карта Visa",
    cssClass: "credit-card-icon__visa-img card-image-result"
  },
  "MasterCard": {
    number: "1234 56•• •••• 1234",
    validity: "01/30",
    icon: mastercardIcon,
    alt: "Банковская карта MasterCard",
    cssClass: "credit-card-icon__mastercard-img card-image-result"
  },
  "Maestro": {
    number: "1234 56•• •••• 1234",
    validity: "01/30",
    icon: maestroIcon,
    alt: "Банковская карта Maestro",
    cssClass: "credit-card-icon__maestro-img card-image-result"
  },
};
