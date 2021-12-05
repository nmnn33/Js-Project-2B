//Tänne käyttäjän tiedot
var todoObjectList = [];
//Luokka Todo_Class, jonka sisälle funktioita
class Todo_Class {
    constructor(item) {
        this.ulElement = item;
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
            //pusketaan todoObjectList ensimmäiseksi luomamme objekti, jotta se näkyy listan yläpuolella
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
            delBtn.on("click", function (event) {
                const deleteId = $(event.target).attr("data-id");
                myTodoList.deleteElement(deleteId);
            })
            //Li elemenetti merkataan tehdyksi / ei tehdyksi
            liElement.on("click", function (event) {
                const selectedId = $(event.target).attr("data-id");
                myTodoList.done_undone(selectedId);
            })
            //Jos on tehtynä aktivitetti, merkataan se checked
            if (object_item.isDone) {
                liElement.addClass("checked")
            }
            $("#myUl").append(liElement);
        })
    }
    //Kun klikataan aktiveettiin, se lasketaan tehdyksi/ei tehdyksi objektissa ja näytetään lista
    done_undone(x) {
        const selectedTodoIndex = todoObjectList.findIndex((item) => item.id == x);
        console.log(todoObjectList[selectedTodoIndex].isDone);
        //chekataan , että onko jo checked tai ei, ja merkataan checked jos ei ole ja jos on niin merkataan ei checked
        todoObjectList[selectedTodoIndex].isDone == false ? todoObjectList[
            selectedTodoIndex].isDone = true : todoObjectList[selectedTodoIndex].isDone = false;
        this.display();
    }

    //Poistetaan aktiviteettia objektista roskista painamalla ja näytetään lista
    deleteElement(z) {
        const selecteddelIndex = todoObjectList.findIndex((item) => item.id == z);
        todoObjectList.splice(selecteddelIndex, 1);
        myTodoList.display();
    }
    //Kun sivusto latautuu, tulostetaan lista localstoragesta.
    displayLoad() {
        console.log("toimii displayLoad()");
        //Pyyhitään ul elementin sisältö, jotta rakennetaan uusi lista
        $("#myUl").html("");
        var aktiviteetti = JSON.parse(localStorage.getItem("data"));
        console.log(aktiviteetti);
        //Jokaista objektia kohti, luodaan li elementti, jossa delete roskis nappi
        aktiviteetti.forEach((object_item) => {
            //li elementtiin aktiviteetin nimi ja id saadaan todoObject:sta, sama delete napille
            const liElement = $('<li>' + object_item.todoText + '</li>');
            const delBtn = $("<i></i>");

            liElement.attr('data-id', object_item.id);
            delBtn.attr('data-id', object_item.id);
            delBtn.addClass("fas fa-trash-alt");
            //Lisätään li elementtiin delete nappi
            liElement.append(delBtn);
            //Kun painetaan roskista, poistuu roskis elementti
            delBtn.on("click", function (event) {
                const deleteId = $(event.target).attr("data-id");
                myTodoList.deleteElement(deleteId);
            })
            //Li elemenetti merkataan tehdyksi / ei tehdyksi
            liElement.on("click", function (event) {
                const selectedId = $(event.target).attr("data-id");
                myTodoList.done_undone(selectedId);
            })
            //Jos on tehtynä aktivitetti, merkataan se checked
            if (object_item.isDone) {
                liElement.addClass("checked")
            }
            $("#myUl").append(liElement);
        })
        //Lisätään localstoragessa oleva objektimme meidän todoObjectList, jotta display() toimii
        todoObjectList = aktiviteetti.slice();
    }
}

//Tallennetaan todoObjectList local storageen nappia painaen
function save() {
    console.log("tallennetaan...");
    console.log(todoObjectList);
    localStorage.setItem("data", JSON.stringify(todoObjectList));
    /*Testattiin
    var dataV = JSON.parse(localStorage.getItem("data"));
    console.log("täälyä tutlatlta");
    console.log(dataV);
    */
}



//Muuttujia ja constantteja
const lista = $("#myUl");
const nappi = $("#btn");
//Luokka käyttöön
myTodoList = new Todo_Class(lista);

//Document ready, eventhandlereille
$(document).ready(function () {
    $("#btn").click(myTodoList.add);
    $("#tallennus").click(save);
    myTodoList.displayLoad();
});