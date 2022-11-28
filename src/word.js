var TURKISH_WORDS = [
    'kalem',
    'gazete',
    'cetvel',
    'kumru',
    'termos',
]

function randomWord(){
    return TURKISH_WORDS[Math.floor(Math.random()* TURKISH_WORDS.length)]
}

export {randomWord}