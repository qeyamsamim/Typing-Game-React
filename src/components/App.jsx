import React, { useEffect, useRef, useState } from "react";
import RandomWords from "random-words";
import GameText from "./GameText";
import SpeedIndicator from "./SpeedIndicator";
import Footer from "./Footer";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BsFillKeyboardFill, BsFillAlarmFill } from "react-icons/bs";
import InitialGameText from "./InitialGameText";
import NumOfWordsInput from "./NumOfWordsInput";

const App = () => {
    const [numOfWords, setNumOfWords] = useState("");
    const [text, setText] = useState([]);
    const [countDown, setCountDown] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [correctChars, setCorrectChars] = useState(0);
    const [timing, setTiming] = useState(0);
    const [gameStatus, setGameStatus] = useState({
        started: false,
        finished: false
    });
    const inputText = useRef(null);

    const generateRandomWords = () => {
        return new Array(parseInt(numOfWords)).fill(null).map(() => RandomWords());
    }

    useEffect(() => {
        if (gameStatus.started) {
            inputText.current.focus();
        }
    }, [gameStatus]);

    const handleStartGame = () => {
        const timer = Math.floor((numOfWords / 43) * 60);

        if (!gameStatus.started) {
            setGameStatus({started: true});
            setText(generateRandomWords());
            setCountDown(timer);
        }
        if (gameStatus.finished) {
            setUserInput("");
            setTiming(0);
            setCountDown(timer);
            setText(generateRandomWords());
        }
        setTime(timer);
        const interval = setInterval(() => {
            setCountDown(prevCount => {
                if (prevCount === 0) {
                    clearInterval(interval);
                    setCountDown(0);
                    setNumOfWords(0);
                    setGameStatus({finished: true});
                } else {
                    return prevCount - 1;
                }
            })
        }, 1000);
    }

    const setTime = (timer) => {
        const interval = setInterval(() => {
            setTiming(prevTiming => {
                if (prevTiming === timer) {
                    clearInterval(interval);
                    setTiming(timer);
                } else {
                    return prevTiming + 1;
                }
            })
        }, 1000);
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
        setCorrectChars(countCorrectChars(e.target.value));
    }

    const countCorrectChars = (userText) => {
        const gameText = text.join(" ").replace(" ", "");
        return userText.replace(" ",  "").split("").filter((c, i) => c === gameText[i]).length;
    }

    const handleNumOfWordChange = (e) => {
        setNumOfWords(e.target.value);
    }

    return <Container className="mt-5 cotainer-margin-bottom">
        <style type="text/css">
        {`
            body {
                background: #fff8f3;
            }
            .btn-primary, .btn-primary:disabled {
                background-color: #7d537f;
                border-color: #7d537f;
                color: #fbeee3;
                box-shadow: 0 2px 5px #ccc;
            }
            .btn-primary:hover {
                background-color: #fbeee3;
                border: 1px solid #7d537f;
                color: #7d537f;
            }.
        `}
        </style>
        <Row>
            <Col md={8} className="mx-auto">
                <Row className="text-center mb-4">
                    <h1><BsFillKeyboardFill className="mb-2" /> TYPING GAME</h1>
                </Row>
                <Row className="mb-3">
                    <Col md={5}>
                    <h5 className="mt-2"><BsFillAlarmFill className="timer-icon mb-1"/> {countDown}s</h5>
                    </Col>
                    <Col md={4}>
                        <NumOfWordsInput onChange={handleNumOfWordChange} value={numOfWords} readOnly={gameStatus.started} />
                        {((numOfWords < 10 && numOfWords !== 0 && numOfWords) || numOfWords > 250) && 
                        <small>Please enter a number between 10-250!</small>}
                    </Col>
                    <Col md={3}>
                        <div className="d-grid">
                            <Button 
                                className="btn-primary"
                                size="sm"
                                disabled={gameStatus.started || (numOfWords < 10 || numOfWords > 250)} 
                                onClick={handleStartGame}>
                                {!gameStatus.finished ? "Start Game" : "Restart"}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <div className="game-text">
                    { (gameStatus.started || gameStatus.finished) ? 
                    <GameText data={text} input={userInput} /> : 
                    <InitialGameText />
                    }
                </div>
                <Row className="mx-0 my-4">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        rows={5}
                        onChange={handleUserInput} 
                        value={userInput} 
                        ref={inputText} 
                        readOnly={!(gameStatus.started) || (gameStatus.finished)}
                        />
                </Row>
                <Row>
                    <Col md={8}>
                        <SpeedIndicator chars={correctChars} allChars={userInput} time={timing}/>
                    </Col>
                </Row>
                <Footer />
            </Col>
        </Row>
    </Container>
}

export default App;