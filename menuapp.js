/* MENU APP */

//Create a menu-driven app using prompts to manage teams and players on those teams

//make classes to structure our players and teams

class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
    describe() {
        return `${this.name} plays ${this.position}`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.players = []; //blank array to contain all the players on the team
    }
    addPlayer(player) {
        if (player instanceof Player) { //make sure it's actually a player and not a random string or something
            this.players.push(player); //push to players array
        } else {
            throw new Error(`You can only add an instance of Player. Argument is not a player: ${Player}`);
        }    
    }
    describe() {
        return `${this.name} has ${this.players.length} players`;  //name  of team and how many players
    }
}


//menu itself and what drives all the choices

class Menu {
    constructor() {
        this.teams = []; //initialize teams
        this.selectedTeam = null; //which team is selected; none to start
    }
    start() { //starts menu application, entry point
        let selection = this.showMainMenuOptions(); //first, list methods that don't exist but that we think we're going to need to build out menu and then implement methods - TOP-DOWN DEVELOPMENT APPROACH
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); //keep this in loop but outside of switch, so it keeps looping as long as something that is 1-4 is selected
        }

        alert('Goodbye'); //shows when 0 is selected

    }

    //Now, we need to build the methods that we chose to fill out the program
    showMainMenuOptions() { //returning input from prompt
        return prompt (` 
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
    `);    
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
        0) back
        1) create player
        2) delete player
        --------------------
        ${teamInfo}`
        );
    }
    
    displayTeams() {
        let teamString = ''; //need to build a string that has all information for team, so start with a blank string

        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n'; //concatenate all info for teams; use index i to indentify index of each team and then grab the name of each team and then adds a new line
        }
        alert(teamString); //now print string
    }

    createTeam() {
        let name = prompt('Enter name for new team:'); //let user enter team name
        this.teams.push(new Team(name)); //create new instance of the Team class and push the name of the new team name to the array containing the teams
    }

    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        //validate input
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }
    viewTeam() {
        let index = prompt('Enter the index of the team you wish to view:'); //find out which team the user wishes to view
        if (index > -1 && index < this.teams.length) { //validate the user input
            this.selectedTeam = this.teams[index]; //set selected team to the team the user chose
            let description = 'Team Name: ' + this.selectedTeam.name + '\n'; //build description for that team

            //now create a loop to to add a description of all the players on the team, build the list of all the team players
            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name + ' - ' +
                    this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description); //display the team and show all the options for the team
            switch (selection) { //submenu of the full menu
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
    }
}
    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        //create name and position to create a new instance of the player and push it to whichever team is selected
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        //validate input
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1); //removes one element at specified index
        }
    }

}    


//need to create an instance of the menu; call/invoke it
let menu = new Menu();
menu.start(); //starts the menu app

/* IT WORKS *INSERT EVIL LAUGH HERE* */
