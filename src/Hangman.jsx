import React, { Component } from "react";
import './Hangman.css'
import img0 from "./0.jpg"
import img1 from "./1.jpg"
import img2 from "./2.jpg"
import img3 from "./3.jpg"
import img4 from "./4.jpg"
import img5 from "./5.jpg"
import img6 from "./6.jpg"
import {randomWord} from './word'

class Hangman extends Component {
    static defaultProps = {
        images: [img0, img1, img2, img3, img4, img5, img6],
        maxWrong: 6,
    }

    constructor(props) {
        super(props)
        this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() }
        this.handleGuess = this.handleGuess.bind(this)
        this.restart = this.restart.bind(this)

    }
    handleGuess(e) {
        let ltr = e.target.value
        this.setState((st) => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
        }))
    }

    guessedWord() {
        return this.state.answer.split("").map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"))
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
            <button key={ltr} value={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)}>{ltr}</button>
        ))
    }

restart(){
    this.setState({
        nWrong:0,
        guessed: new Set(),
        answer: randomWord(),
    })
}

    render() {
        let gameOver = this.state.nWrong >=this.props.maxWrong
        const altText = `Tahmin Sayacı, ${this.state.nWrong}/${this.props.maxWrong}`
        let isWinner = this.guessedWord().join("")=== this.state.answer
        let gameState = this.generateButtons()
        if (isWinner) gameState = "TEBRİKLER DİĞER KELİMEYE GEÇMEYE NE DERSİN?"
        if(gameOver) gameState="ÜZGÜNÜM KAYBETTİN..."
        return (
            <div className="Hangman">
                <h1>Adam Asmaca Oyunu</h1>
                <img src={this.props.images[this.state.nWrong]} alt={altText} />
                <p className="Hangman-wrong">Tahmin Sayacı: {this.state.nWrong}</p>
                <p className='Hangman-word'>
                    {!gameOver ? this.guessedWord() : this.state.answer}
                </p>
                <p className="Handman-btns">{gameState}</p>
                <button id='Hangman-restart' onClick={this.restart}>YENİ KELİME AL!</button>
            </div>
        )
    }


}
export default Hangman