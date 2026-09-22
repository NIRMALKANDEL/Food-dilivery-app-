import { useEffect, useState } from "react";

// Standard Luhn checksum — catches obviously-mistyped card numbers. This is
// client-side format validation only; it says nothing about whether a card
// is real, funded, or authorized (there is no payment gateway behind this).
const passesLuhn = (digitsOnly) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = Number(digitsOnly[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const isExpiryValid = (mmYY) => {
  const match = /^(\d{2})\/(\d{2})$/.exec(mmYY);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const expiry = new Date(year, month, 0, 23, 59, 59);
  return expiry >= new Date();
};

// method: "cod" | "card"
// onSelectMethod(method), onValidityChange(boolean) — the parent only ever
// learns whether the card fields are valid, never their actual values; card
// details are validated here and then discarded, never lifted to
// Checkout.jsx state, Redux, or localStorage.
const PaymentMethod = ({ method, onSelectMethod, onValidityChange }) => {
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [touched, setTouched] = useState(false);

  const digitsOnly = card.number.replace(/\D/g, "");
  const cardValid =
    digitsOnly.length >= 13 &&
    digitsOnly.length <= 19 &&
    passesLuhn(digitsOnly) &&
    isExpiryValid(card.expiry) &&
    /^\d{3,4}$/.test(card.cvv) &&
    card.name.trim().length > 1;

  useEffect(() => {
    onValidityChange(method === "cod" ? true : cardValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, cardValid]);

  const formatCardNumber = (raw) =>
    raw
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="font-bold text-ink mb-3">Payment</h2>

      <div className="flex flex-col gap-2 mb-3">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink">
          <input
            type="radio"
            name="paymentMethod"
            checked={method === "cod"}
            onChange={() => onSelectMethod("cod")}
            className="accent-brand w-4 h-4"
          />
          Cash on Delivery
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink">
          <input
            type="radio"
            name="paymentMethod"
            checked={method === "card"}
            onChange={() => onSelectMethod("card")}
            className="accent-brand w-4 h-4"
          />
          Credit / Debit card
        </label>
      </div>

      {method === "card" && (
        <div className="border-t pt-3 flex flex-col gap-2">
          <div className="bg-accent-light text-accent-dark text-xs rounded-lg p-2">
            Test mode — this is a mock payment form. No real transaction is
            made and no card details are stored or sent anywhere.
          </div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Card number"
            value={card.number}
            onChange={(e) => {
              setTouched(true);
              setCard({ ...card, number: formatCardNumber(e.target.value) });
            }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <input
            type="text"
            placeholder="Name on card"
            value={card.name}
            onChange={(e) => {
              setTouched(true);
              setCard({ ...card, name: e.target.value });
            }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => {
                setTouched(true);
                setCard({ ...card, expiry: formatExpiry(e.target.value) });
              }}
              className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <input
              type="password"
              inputMode="numeric"
              placeholder="CVV"
              maxLength={4}
              value={card.cvv}
              onChange={(e) => {
                setTouched(true);
                setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") });
              }}
              className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>
          {touched && !cardValid && (
            <p className="text-xs text-red-500">
              Enter a valid card number, name, expiry, and CVV.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
