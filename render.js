import Game from "./game.js";
let game = new Game(4);


export async function getDog() {
    const result = await axios({
        method: 'get',
        url: 'https://dog.ceo/api/breeds/image/random',
      });

      return result.data.message;
};

export async function getJoke() {
    const result = await axios({
        method: 'get',
        url: 'https://official-joke-api.appspot.com/random_joke',
      });

      return result.data.setup + " " + result.data.punchline;
};


export const renderBoard = function(game) {
    let won = "...";
    let over = "...";
    if (game.wonFlag) {
        won = "Yes! :)";
    }
    if (game.overFlag) {
        over = "Yes :(";
    }
    
    return (
        `<div class ="wholeGame"> 
        
        <div class = "title"> <img src="title2.png" width="500" alt="Find the Bone!"> </div>
        <div class = "story"> <p> <b>Backstory: </b> One day, you suddenly wake up as a dog. How/why? That's not important (and also idk). The first thing you want to do as a dog is find the bone that's buried somewhere in the backyard. However, if you dig too many holes, your owner will get mad :( </p>
        <div class = "instructions"> <p> <b> How to Play: </b>Click the plot of land you want to dig. You can only dig 3 holes. Good luck! </p>
        <div class = "notes"> <p> <b> P.S.: </b>To replay as the same dog, click the Play Again button. To steal another dog's identity, click the other button. </p>
        <div class = "notes"> <p> <b> P.P.S.: </b>To make things a little more difficult, you can't see where you've already dug lol. Checking Digs Left gives you a clue as to whether you've already dug that plot of land or not. </p>

        <div class="gameStateInfo">
        <table><tbody>
        <tr><td><div class = "score"> <b> Digs left: </b> ${game.triesLeft}</div></td> 
        <td><div class = "won"> <b> Did you find the bone? </b> ${won}</div></td> 
        <td><div class = "over"> <b> Did you run out of digs? </b> ${over}</div></td>
        <td> <div class="resetButton"><button class="reset" type="button">Play Again</button></div> </td>
        <td> <div class="refreshButton"><button class="refresh" type="button">Turn into Another Dog</button></div> </td></tr>
        </tbody>
        </table>
        </div>


        <div class="grid-container">
        <div class="grid-item"><button id="0" class="cell" type="button" data-index="0"></button></div>
        <div class="grid-item"><button id="1" class="cell" type="button" data-index="1"></button></div>
        <div class="grid-item"><button id="2" class="cell" type="button" data-index="2"></button></div>
        <div class="grid-item"><button id="3" class="cell" type="button" data-index="3"></button></div>
        <div class="grid-item"><button id="4" class="cell" type="button" data-index="4"></button></div>
        <div class="grid-item"><button id="5" class="cell" type="button" data-index="5"></button></div>
        <div class="grid-item"><button id="6" class="cell" type="button" data-index="6"></button></div>
        <div class="grid-item"><button id="7" class="cell" type="button" data-index="7"></button></div>
        <div class="grid-item"><button id="8" class="cell" type="button" data-index="8"></button></div>
        <div class="grid-item"><button id="9" class="cell" type="button" data-index="9"></button></div>
        <div class="grid-item"><button id="10" class="cell" type="button" data-index="10"></button></div>
        <div class="grid-item"><button id="11" class="cell" type="button" data-index="11"></button></div>
        <div class="grid-item"><button id="12" class="cell" type="button" data-index="12"></button></div>
        <div class="grid-item"><button id="13" class="cell" type="button" data-index="13"></button></div>
        <div class="grid-item"><button id="14" class="cell" type="button" data-index="14"></button></div>
        <div class="grid-item"><button id="15" class="cell" type="button" data-index="15"></button></div>

        </div>
        
        </div>
        `
        );
};

export const handleResetButtonPress = function(event) {
    let newCreatedGame = new Game(4);
    game = newCreatedGame;
    let newGame = renderBoard(newCreatedGame);
    let toReplace = document.getElementsByClassName("wholeGame")[0];
    $(toReplace).replaceWith(newGame);
};

export const handleRefreshButtonPress = function(event) {
    window.location.reload();
};


export const handleMove = function(event) {
    let newGame = renderBoard(game);
    let toReplace = document.getElementsByClassName("wholeGame")[0];
    $(toReplace).replaceWith(newGame);
};

export const handleTry = function(event) {
    if (game.wonFlag || game.overFlag) {
        alert("Stop digging! >:( ")
        return;
    }

        let value = event.target.getAttribute('data-index');
        game.click(value);
        handleMove();
        document.getElementById(value).disabled = true;
    
}

export const renderGame = function() {
    const $root = $('#root');

    $root.append(renderBoard(game));

    getDog().then(function(result) {
        let theDog = result;
        console.log(theDog);
        let dog = `<figure><img id="dogPic" src="${theDog}" width="275" alt="doggo"><figcaption> This is you btw. </figcaption></figure>`
        $(".title").append(dog);
        return (
            dog
            );
        });

        getJoke().then(function(result) {
            let theJoke = result;
            console.log(theJoke);
            let joke = `<div class = "joke"> <p> Here's a free joke! No need to win the game to get this treat b/c you're such a good doggo.</p> <p> ${theJoke} </p> </div>`
            $root.append(joke);
            return (
                joke
                );
            });

    $(document).on('click', '.reset', handleResetButtonPress);
    $(document).on('click', '.cell', handleTry);
    $(document).on('click', '.refresh', handleRefreshButtonPress);
}

$(function() {
    renderGame();
});
