import { useState } from "react";
import './index.css'

export const Generator = () => {

    const lowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const upperCaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?", "~"];

    const [length, setLength] = useState('12');
    const [opportunity, setOpportunity] = useState([[], [], [], []]);
    const [password, setPassword] = useState('')

    const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);

    const toggleOpportunity = (index, content) => {
        setOpportunity(prevState =>
            prevState.map((arr, i) =>
                i === index
                    ? (arr.length === 0 ? content : [])
                    : arr
            )
        );
    };

    const lengthSlider = (e) => setLength(e.target.value)

    const generatePassword = () => {
        let notEmptyArrays = []
        let newPassword = ''
        for (let i = 0; i < 4; i++) {
            if (opportunity[i].length !== 0) {
                notEmptyArrays.push(i)
            }
        }

        if (!notEmptyArrays.length) {
            alert("Choose at least one opportunity for your password!")
        } else {

            for (let i = 0; i < length; i++) {
                let randomInnerArr = notEmptyArrays[Math.floor(Math.random() * notEmptyArrays.length)];
                let randomSign = opportunity[randomInnerArr][Math.floor(Math.random() * opportunity[randomInnerArr].length)];
                newPassword += randomSign
            }
            setPassword(newPassword);
            console.log(password);
        }
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(password)
            .then(() => {
                console.log('Text kopiert:', password);
                setCopiedMessageVisible(true);

                setTimeout(() => {
                    setCopiedMessageVisible(false);
                }, 1000);
            })
            .catch(err => {
                console.error('Fehler beim Kopieren des Textes:', err);
            });
    };

    return (
        <div className="container">
            <div className="pasword-generator">
                <h1 className="header" data-shadow="Password Generator">Password Generator</h1>
                <div className="password-form">
                    <div className="password">{password}</div>
                    <button type="button" className="copy-button" onClick={copyPassword}>Copy</button>
                </div>
                {copiedMessageVisible && (
                    <div className="copied-message">Password copied</div>
                )}
                <div className="check-buttons">
                    <label>
                        <input type="checkbox" name="lowerCaseLetters" onChange={() => toggleOpportunity(0, lowerCaseLetters)} />
                        <span>Lowercase letters</span>
                    </label>
                    <label>
                        <input type="checkbox" name="upperCaseLetters" onChange={() => toggleOpportunity(1, upperCaseLetters)} />
                        <span>Uppercase letters</span>
                    </label>
                    <label>
                        <input type="checkbox" name="digits" onChange={() => toggleOpportunity(2, digits)} />
                        <span>Digits</span>
                    </label>
                    <label>
                        <input type="checkbox" name="specialCharacters" onChange={() => toggleOpportunity(3, specialCharacters)} />
                        <span>Special Chars</span>
                    </label>
                </div>
                <div className="length-slider">
                    <h3>Password Length:</h3>
                    <input type="range" min="4" max="20" value={length} onChange={lengthSlider} />
                    <span>{length}</span>
                </div>
                <div className="generate-button">
                    <button className="generate-button" onClick={generatePassword}>Generate</button>
                </div>
            </div>
        </div>
    );
}