document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 5
    const squares = []
    let score = 0
    const candyColors = [
        'url(images/cat.png)',
        'url(images/cow.png)',
        'url(images/dog.png)',
        'url(images/fox.png)',
        'url(images/hamster.png)',
        'url(images/owl.png)'
    ]
//board
function createBoard() {
for (let i = 0; i < width*width; i++){
    const square = document.createElement('div')
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)
    scoreDisplay.innerHTML = score
    let randomColor = Math.floor (Math.random() * candyColors.length)
    // console.log(randomColor)
    square.style.backgroundImage = candyColors [randomColor]
    grid.appendChild(square)
    squares.push(square)
    }
}
createBoard()

//Drag
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.ondragstart = () => false
//squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

squares.forEach(square => square.addEventListener('pointerdown', myPointerDown))
squares.forEach(square => square.addEventListener('pointerup', myPointerUp))
squares.forEach(square => square.addEventListener('pointermove', myPointerMove))
 squares.forEach(square => square.addEventListener('pointercancel ', (event) => {
    console.log('Pointer Cancel');
  }))

function myPointerUp(e){
    console.log('up', this.style.backgroundImage)
 
}


function myPointerDown(e){
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
}


function myPointerMove(e){
    //console.log('pointer move', e.layerX)
}

//  function dragStart(){
    
//     colorBeingDragged = this.style.backgroundImage
//     squareIdBeingDragged = parseInt(this.id)

//  }

 function dragEnd(){
  console.log(this.id, ' dragEnd')   
    //validation
    let validMoves  = [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width,
        squareIdBeingDragged +1,
        squareIdBeingDragged +width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)
    if (squareIdBeingReplaced && validMove){
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove){
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged

    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

function dragOver(e){
    e.preventDefault()
    //console.log(this.id, ' dragOver')    
}

function dragEnter(e){
    e.preventDefault()
    //console.log(this.id, ' dragEnter')  
}

function dragLeave(){
    //console.log(this.id, ' dragLeave')
}

function dragDrop(){
   // console.log(this.id, ' dragDrop')  
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    score -=3
    scoreDisplay.innerHTML = score
}

//drop candies

function moveDown (){
    for (i = 0; i < 20; i++){
        if (squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                let randomColor = Math.floor (Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
             }
        }
    }
}



// check
// check for three

function checkRowForThree (){
    for (i = 0; i < 23; i++){
        let rowOfThree = [i, i + 1, i + 2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [3, 4, 8, 9, 13, 14, 18, 19, 23, 24]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForThree()

function checkColumnForThree (){
    for (i = 0; i < 15; i++){
        let columnOfThree = [i, i + width, i + width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForThree()

// check for four

function checkRowForFour (){
    for (i = 0; i < 21; i++){
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 18, 19, 23, 24]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFour()

function checkColumnForFour (){
    for (i = 0; i < 9; i++){
        let columnOfFour = [i, i + width, i + width*2, i + width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForFour()



// check for five

function checkRowForFive (){
    for (i = 0; i < 20; i++){
        let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 23, 24]
        if (notValid.includes(i)) continue

        if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 5
            scoreDisplay.innerHTML = score
            rowOfFive.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFive()

function checkColumnForFive (){
    for (i = 0; i < 4; i++){
        let columnOfFive = [i, i + width, i + width*2, i + width*3, i + width*4]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 5
            scoreDisplay.innerHTML = score
            columnOfFive.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForFive()






window.setInterval(function(){
  
    checkRowForFive()
    checkColumnForFive() 
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveDown()
}, 100)


})



