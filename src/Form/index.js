import React, { useState } from "react";
import Result from "./Result";
import { Clock } from "./Clock";
import { Wrapper, Legend, Fieldset, Button, ResultBlock, Field, Loading, Failure } from "./styled";
import load from './load.gif';

const Form = ({ calculateResult, result, exchangeRates }) => {
    const [currency, setCurrency] = useState("EUR");
    const [amount, setAmount] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        calculateResult(currency, amount);
    }

    return (
        <Wrapper onSubmit={onSubmit}>
            {exchangeRates.state === "loading"
                ? (<>
                    <Loading> <Legend >Przelicznik walut</Legend>
                        Poczekaj chwilkę, ładuję dane z currencyapi.com <br />
                        <img src={load} alt='cirle' width='50' height='50' />
                    </Loading>
                </>
                )
                : (
                    exchangeRates.state === "error"
                        ? (
                            <Failure>ups... Coś poszło nie tak 😏 Sprawdź połącznie z internetem</Failure>
                        )
                        : (
                            <>
                                <Fieldset>
                                    <Legend >Przelicznik walut</Legend>
                                    <Clock />
                                    <p>
                                        <label>
                                            Kwota w PLN*:{" "}
                                            <Field
                                                value={amount}
                                                onChange={({ target }) => setAmount(target.value)}
                                                placeholder="Wpisz kwotę w PLN"
                                                type="number"
                                                step="0.01"
                                                min="1"
                                                required />
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            Wybierz walutę:{" "}
                                            <Field
                                                as="select"
                                                value={currency}
                                                onChange={({ target }) => setCurrency(target.value)}
                                            >
                                                {Object.keys(exchangeRates.rates).map(((currency) => (
                                                    <option
                                                        key={currency}
                                                        value={currency}
                                                    >
                                                        {currency}
                                                    </option>
                                                )))}
                                            </Field>
                                        </label>
                                    </p>
                                </Fieldset>
                                <ResultBlock>
                                    <p> <strong>Otrzymasz:</strong></p>
                                    <Result
                                        result={result}
                                        exchangeRates={exchangeRates}
                                    />
                                </ResultBlock>
                                <Button type="submit">Przelicz</Button>
                            </>
                        )
                )
            }
        </Wrapper>
    )
};

export default Form;