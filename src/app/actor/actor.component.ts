import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../datatbase.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName: string = "";
  movieName: string = "";
  movieYear: number = 0;
  bYear: number = 0;
  actorId: string = "";
  yearBefore: number = 0;
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Get all Actors
  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Create a new Movie, POST request
  onSaveMovie(){
    let obj = { title: this.movieName, year: this.movieYear};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    })
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Movie
  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    })
  }
  onDeleteBeforeMovie(target){
    this.dbService.deleteBeforeMovie(target).subscribe(result => {
      this.onGetMovies();
    })
  }

  onAddMovieToActor(actorName,movieName){
    this.dbService.addMovieToActor(actorName,movieName).subscribe(result => {
      this.onGetActors();
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}