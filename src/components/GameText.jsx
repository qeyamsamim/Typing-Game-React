import React from "react";

const GameText = ({data, input}) => {
    const userInput = input.split("");
    const text = data.join(" ").split("");

    return text.map((word, index) => {
        let color;
        if (index < userInput.length) {
            color = word === userInput[index] ? "green" :  "red";
        }
        return <span key={index} style={{color: color}}>{word}</span>
    });
}

export default GameText;