import { Component, OnInit } from '@angular/core';
import { TypingGame } from '../TypingGame';
import { myTypingGames } from '../myTypingGames';
import { myHundredPassage } from '../hundredPassages';
import { Passage } from '../Passage'
import { WRITINGGENRES } from '../myWritingGenres';
import { Typer } from '../shared/typer.model';
import { TyperService } from '../shared/typer.service';
@Component({
  selector: './app-typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css'],
  providers: [TyperService]
})
export class TyperComponent implements OnInit {

  games = myTypingGames;
  selectedGame: TypingGame;
  writingGenrePrompt: string;

  myWritingGenres = WRITINGGENRES;
  selectedGenre: string;

  intro: string;
  chosenPassage: string;
  userTypedPassage: string;

  isButtonPressed: boolean;
  start: number;

  accuracy: number;
  wordPerMinute: number;
  typ: Typer;

  averageTyper: Typer;
  constructor(private typerService: TyperService) { }
  ngOnInit() { 
    this.reset();
  }


  startTimer(): void {
    if (this.start == null)
      this.start = new Date().getTime();
  }
  onSelect(game: TypingGame): void {
    if (this.intro == null) {
      this.selectedGame = game;
      if (this.selectedGame.name === 'UserInteractive') {
        this.writingGenrePrompt = 'We will measure your typing speed and accuracy after prompting you with a passage from the following writing genre: Economy, Biology, Psychology, and Fiction. Select from the options which one you would like.';
        this.intro = 'Below is your passage, the timer starts when you type your first letter, timer ends when you click "Done"';
      }

      else {
        this.intro = 'We will measure your accuracy and words/minute speed, a passage at random has been outputted, the timer will start when you type your first letter, timer ends when you click "Done".';
        var randomNumber = Math.random();
        var theRandomNumber = randomNumber * 100;
        var chosenNumber = Math.round(theRandomNumber);
        this.chosenPassage = myHundredPassage[chosenNumber].content;
      }
    }
  }


  onSelectPsychology(genre: string): void {
    if (this.selectedGenre == null) {
      this.selectedGenre = 'Psychology';
      var newRangeOfPassage: Passage[] = new Array(25);
      var k = 0;//keeps count of which index of the passage range I'm on
      for (var i = 0; i < 100; i++) {
        if (myHundredPassage[i].writingGenre == this.selectedGenre && k < 25) {
          newRangeOfPassage[k] = myHundredPassage[i];
          k++;
        }
      }

      var randomNumber = Math.random();
      var theRandomNumber = randomNumber * 100;
      var chosenNumber = Math.round(theRandomNumber);
      var upperBound = 4;
      var index = 0;
      while (chosenNumber >= upperBound) {
        upperBound += 4;//4 because each Passage has 4 times the probability of being selected at random since only 1/4 of selections remain
        index++;
      }
      this.chosenPassage = newRangeOfPassage[index].content;
    }
  }
  onSelectBiology(genre: string): void {
    if (this.selectedGenre == null) {
      this.selectedGenre = 'Biology';
      var newRangeOfPassage: Passage[] = new Array(25);
      var k = 0;//keeps count of which index of the passage range I'm on
      for (var i = 0; i < 100; i++) {
        if (myHundredPassage[i].writingGenre == this.selectedGenre && k < 25) {
          newRangeOfPassage[k] = myHundredPassage[i];
          k++;
        }
      }

      var randomNumber = Math.random();
      var theRandomNumber = randomNumber * 100;
      var chosenNumber = Math.round(theRandomNumber);
      var upperBound = 4;
      var index = 0;
      while (chosenNumber >= upperBound) {
        upperBound += 4;//4 because each Passage has 4 times the probability of being selected at random since only 1/4 of selections remain
        index++;
      }
      this.chosenPassage = newRangeOfPassage[index].content;
    }
  }
  onSelectEconomy(genre: string): void {
    if (this.selectedGenre == null) {
      this.selectedGenre = 'Economy';
      var newRangeOfPassage: Passage[] = new Array(25);
      var k = 0;//keeps count of which index of the passage range I'm on
      for (var i = 0; i < 100; i++) {
        if (myHundredPassage[i].writingGenre == this.selectedGenre && k < 25) {
          newRangeOfPassage[k] = myHundredPassage[i];
          k++;
        }
      }

      var randomNumber = Math.random();
      var theRandomNumber = randomNumber * 100;
      var chosenNumber = Math.round(theRandomNumber);
      var upperBound = 4;
      var index = 0;
      while (chosenNumber >= upperBound) {
        upperBound += 4;//4 because each Passage has 4 times the probability of being selected at random since only 1/4 of selections remain
        index++;
      }
      this.chosenPassage = newRangeOfPassage[index].content;
    }
  }
  onSelectFiction(genre: string): void {
    if (this.selectedGenre == null) {
      this.selectedGenre = 'Fiction';
      var newRangeOfPassage: Passage[] = new Array(25);
      var k = 0;//keeps count of which index of the passage range I'm on
      for (var i = 0; i < 100; i++) {
        if (myHundredPassage[i].writingGenre == this.selectedGenre && k < 25) {
          newRangeOfPassage[k] = myHundredPassage[i];
          k++;
        }
      }

      var randomNumber = Math.random();
      var theRandomNumber = randomNumber * 100;
      var chosenNumber = Math.round(theRandomNumber);
      var upperBound = 4;
      var index = 0;
      while (chosenNumber >= upperBound) {
        upperBound += 4;//4 because each Passage has 4 times the probability of being selected at random since only 1/4 of selections remain
        index++;
      }
      this.chosenPassage = newRangeOfPassage[index].content;
    }
  }
  finishedTyping(): void {
    if (this.isButtonPressed != true) {
      this.isButtonPressed = true;

      var wordSplitOriginalPassage = this.chosenPassage.split(" ");
      var inputValue = (<HTMLInputElement>document.getElementById("userInput")).value;
      var wordSplitTypedPassage = inputValue.split(" ");

      var countCorrectWords = 0;
      var countTotalWords = wordSplitOriginalPassage.length;
      try {
        for (var i = 0; i < wordSplitTypedPassage.length; i++) {
          if (wordSplitOriginalPassage[i] == wordSplitTypedPassage[i])
            countCorrectWords++;
        }
      }
      catch (e)//if the original passage is shorter than the input passage
      {
        for (var i = wordSplitOriginalPassage.length; i < wordSplitTypedPassage.length; i++) {
          countTotalWords++;//only increment the total words because having more words always means they are incorrect
        }
      }
      this.accuracy = countCorrectWords / countTotalWords * 100;


      var elapsedTimeInMilliseconds = new Date().getTime() - this.start;
      var elapsedTimeinMinutes = elapsedTimeInMilliseconds / 60000;// millisecond -> second is 1000, second -> minute is 60
      var wordCount = wordSplitTypedPassage.length;
      this.wordPerMinute = wordCount / elapsedTimeinMinutes;
      //backend add to typers collection
      this.typerService.selectedTyper = {
        accuracy: this.accuracy,
        wpmSpeed: this.wordPerMinute
      }
      this.typerService.postTyper(this.typerService.selectedTyper).subscribe((res) => {
      });
      //backend assign avgTyper data to be outputted in html
      this.typerService.getAverageTyper().subscribe((res) => {
        this.averageTyper = res as Typer;
      });
      
    }
  }
  reset(): void{
    this.typerService.selectedTyper = {
      accuracy: null,
      wpmSpeed: null
    }
  }
}
