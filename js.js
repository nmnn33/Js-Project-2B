//Tänne käyttäjän tiedot
const todoObjectList = [];
//Luokka Todo_Class, jonka sisälle funktioita
class Todo_Class {
    constructor(item) {
        this.ulElement =item;
    }
    //Lisää-nappia painamalla lisätään aktiviteetti
    add() {
        //Muuttujia
        const todoInput = $("#tekeminen");
        const errorMessage = $("#errorZone");
        //Tarkastetaan tyhjä ja virheellinen syöte, jos virheellinen, tulee esiin virhe message
        if (todoInput.val().length < 3) {
            todoInput.css({ 'border': '2px dashed red', 'color': 'red' });
            errorMessage.css({ 'display': 'block', 'color': 'red', 'font-size': '18px' });
        }
        //Kun ei ole virheellinen syöte, poistetaan virhe message muutokset
        else {
            todoInput.css({ 'border': '', 'color': 'black' });
            errorMessage.css({ 'display': 'none' });
            //Luodaan todoObject, joka menee talteen localstorageen
            //id = listan numero objekti, todoText = se, mitä käyttäjä teki, isDone = onko tehty
            const todoObject = {
                id: todoObjectList.length,
                todoText: todoInput.val(),
                isDone: false
            }

            todoObjectList.unshift(todoObject);
            console.log(todoObjectList);
            myTodoList.display();
            todoInput.val("");
        }
    }
    //Näytetään div sisälle lista aktiviteettaja jotka ovat interaktiivisia
    display() {
        console.log("toimii display()");
        //Pyyhitään ul elementin sisältö, jotta rakennetaan uusi lista
        $("#myUl").html("");
        //Jokaista objektia kohti, luodaan li elementti, jossa delete roskis nappi
        todoObjectList.forEach((object_item) => {
            //li elementtiin aktiviteetin nimi ja id saadaan todoObject:sta, sama delete napille
            const liElement = $('<li>' + object_item.todoText + '</li>');
            const delBtn = $("<i></i>");

            liElement.attr('data-id', object_item.id);
            delBtn.attr('data-id', object_item.id);
            delBtn.addClass("fas fa-trash-alt");
            //Lisätään li elementtiin delete nappi
            liElement.append(delBtn);
            //Kun painetaan roskista, poistuu roskis elementti
            delBtn.on("click", function (e) {
                const deleteId = e.target.attr("data-id");
                myTodoList.remove(deleteId);
            })
            //Li elemenetti postuu roskiksen mukana
            liElement.on("click", function (e) {
                const deleteId = e.target.attr("data-id");
                myTodoList.remove(deleteId);
            })
            //Jos on tehtynä aktivitetti, merkataan se checked
            if (object_item.isDone) {
                liElement.addClass("checked")
            }
            $("#myUl").append(liElement);
        })
    }
    //Kun klikataan aktiveettiin, se lasketaan tehdyksi/ei tehdyksi
    done_undone(x) {
    }

    //Poistetaan aktiviteettia roskista painamalla
    deleteElement(z) {
    }

}
//Muuttujia ja constantteja
const lista = $("#myUl");
const nappi = $("#btn");
//Luokka käyttöön
myTodoList = new Todo_Class(lista);

//Document ready, eventhandlereille
$(document).ready(function () {
    $("#btn").click(myTodoList.add);
});


//Lisää-nappia painamalla lisätään aktiviteetti
/*
function add() {
    const lisäys = $("#tekeminen");
    const errorMessage = $("#errorZone");
    //Tarkastetaan tyhjä ja virheellinen syöte
    if (lisäys.val().length < 3) {
        lisäys.css({ 'border': '2px dashed red', 'color': 'red' });
        errorMessage.css({ 'display': 'block', 'color': 'red', 'font-size': '18px' });
    }
    //Kun ei ole virheellinen syöte
    else {
        lisäys.css({ 'border': 'none', 'color': 'black' });
        errorMessage.css({ 'display': 'none' });
        //Luodaan todoObject, joka menee talteen localstorageen
        //id = listan numero objekti, todoText = se, mitä käyttäjä teki, isDone = onko tehty
        const todoObject = {
            id: todoObjectList.lenght,
            todoText: todoInput,
            isDone: false,
        }

        todoObjectList.unshift(todoObject);
        this.display();
        lisäys.value = "";
    }
}*/