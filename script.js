var animalPopulation = 0;

var allAnimals = [];


$(document).ready(function() {

    var tigger = new Tiger("Tigger");
    var pooh = new Bear("Pooh");
    var rarity = new Unicorn("Rarity");
    var gemma = new Giraffe("Gemma");
    var stinger = new Bee("Stinger");
    allAnimals = [tigger, pooh, rarity, gemma, stinger];
    listAnimals();
    $("#animalCreator").click(function() {
        createAnimal();
    });
    $("#feeder").click(function() {
        feedAnimals();
    });
});


function createAnimal(){
    var type = $("#animal").val();
    if(type == 0 ){
        alert("Please select an animal");
        return false;
    }
    var animal;
    var name = $("#animalName").val();
    if(name == "" ){
        alert("Please input a name");
        return false;
    }
    switch(parseInt(type)){
        case 0:
            break;
        case 1:
            animal = new Tiger(name);
            break;
        case 2:
            animal = new Bear(name);
            break;
        case 3:
            animal = new Unicorn(name);
            break;
        case 4:
            animal = new Giraffe(name);
            break;
        case 5:
            animal = new Bee(name);
            break;
    }
    allAnimals.push(animal);
    listAnimals();
    $("#yourFeed").append(animal.name + " the " + animal.constructor.name + " has been created" + "<br>");
}

function feedAnimals(){
    var food = $("#food").val();
    if(food == 0 ){
        alert("Please select a food");
    } else {
        $("#yourFeed").empty();
        for(var i = 0; i < allAnimals.length; i++){
            allAnimals[i].eat(food);
        }
    }
}

function listAnimals(){
    $("#animalHolder").empty();
    for(var i = 0; i < allAnimals.length; i++){
        $("#animalHolder").append("<div onclick='deleteAnimal(this)'>" + allAnimals[i].name + " the " + allAnimals[i].constructor.name + "; Favorite " +
            "Food: " + allAnimals[i].favoriteFood + "<br><br></div>");
    }
}

function deleteAnimal(animal){
    var h = animal.innerHTML;
    var name = h.substring(0, h.indexOf(" "));
    for(var i = 0; i < allAnimals.length; i++){
        if(name == allAnimals[i].name){
            $("#yourFeed").append(allAnimals[i].name + " the " + allAnimals[i].constructor.name + " has been deleted" + "<br>");
            allAnimals.splice(i ,1);
        }
    }
    listAnimals();
}

class Animal {
    constructor(name,favoriteFood) {
        this.name = name;
        this.favoriteFood = favoriteFood;
        animalPopulation++;
    }
    sleep(){
        $("#yourFeed").append(this.name + " sleeps for 8 hours" + "<br>");
    }
    eat(food){
        $("#yourFeed").append(this.name + " eats " + food  + "<br>");
        if(food == this.favoriteFood){
            $("#yourFeed").append("YUM!!! " + this.name + " wants more " + food + "<br>");
        } else {
            this.sleep(this.name);
        }
    }
    static getPopulation() {
        return animalPopulation;
    }
}


class Tiger extends Animal {
    constructor(name){
        super(name, "meat");
    }
}

class Bear extends Animal{
    constructor(name){
        super(name, "fish");
    }
    sleep(){
        $("#yourFeed").append(this.name + " hibernates for 4 months" + "<br>");
    }
}

class Unicorn extends Animal{
    constructor(name){
        super(name, "marshmallows");
    }
    sleep(){
        $("#yourFeed").append(this.name + " sleeps in a cloud" + "<br>");
    }
}

class Giraffe extends Animal{
    constructor(name){
        super(name, "leaves");
    }
    eat(food){
        if(food == this.favoriteFood){
            super.eat("leaves");
            this.sleep(this.name);
        } else {
            $("#yourFeed").append("YUCK!!! " + this.name + " will not eat " + food + "<br>");
        }
    }
}

class Bee extends Animal{
    constructor(name){
        super(name, "pollen");
    }
    eat(food){
        if(food == this.favoriteFood){
            super.eat("pollen");
            this.sleep(this.name);
        } else {
            $("#yourFeed").append("YUCK!!! " + this.name + " will not eat " + food + "<br>");
        }
    }
    sleep(){
        $("#yourFeed").append(this.name + " never sleeps <br>");
    }
}
