let buttons = document.getElementsByClassName("more");
let recipes = document.querySelectorAll(".after");
let lastOpen;

function seeRecipe(i) {
    if (lastOpen!==undefined){
        recipes[lastOpen].style.opacity="0";
        recipes[lastOpen].style.maxHeight="0";
        buttons[lastOpen].parentElement.style.overflow="hidden";
        if(lastOpen==i) {
            lastOpen=undefined;
            return;
        }
    }
    if (lastOpen!=i) {
        buttons[i].parentElement.style.overflow="visible";
        recipes[i].style.maxHeight="1000px";
        recipes[i].style.opacity="1";
        lastOpen=i;
    }
}

function myFunction() {
    for (let i=0; i<buttons.length; i++) {
        let row=4+2*Math.floor((i/3));
        if (x.matches) {
            row=5+2*i;
        } else if (y.matches){
            row=4+2*i;
            if(i>2){
                row=10+2*Math.floor((i-3)/2);
            }
        }
        recipes[i].style.gridRow=row;
        buttons[i].onclick = () => { 
            seeRecipe(i);
        }
    }
}

let x = window.matchMedia("(max-width: 768px)")
let y = window.matchMedia("(max-width: 1000px)")
myFunction(x, y);
x.addListener(()=>{myFunction()});
y.addListener(myFunction);

const formularz=document.querySelector("#formularz");
const flex=document.querySelector("#flex");
const plus=document.querySelector("#plus");
const dodaj=document.querySelector("nav input");
formularz.onclick = () => {
    formularz.style.opacity="0";
    setTimeout( () => {formularz.style.display="none"}, 500);
}
formularz.style.cursor="pointer";
flex.style.cursor="initial";
flex.onclick = (e) => {
    e.stopPropagation();
}
plus.onclick = makeFormVisible;
dodaj.onclick = makeFormVisible;
function makeFormVisible(){
    formularz.style.display="flex";
    setTimeout( () => {formularz.style.opacity="1";}, 300);
}

function checkEmpty(pole) {
    if(pole.value==="") {
        document.querySelector(`#i${pole.id}`).innerHTML="to pole jest wymagane";
        return false;
    }
    else {
        document.querySelector(`#i${pole.id}`).innerHTML="";
        return true;
    }
}
const checkLink = function(pole) {
    if(pole.value.startsWith("https://")){
        document.querySelector(`#i${pole.id}`).innerHTML="";
        return true;
    }
    else{
        document.querySelector(`#i${pole.id}`).innerHTML="zdjecie musi miec bezpieczny link";
        return false;
    }
}
function checkHack(pole) {
    if(!/[<>]/.test(pole.value)) {
        document.querySelector(`#i${pole.id}`).innerHTML="";
        return true;
    }
    document.querySelector(`#i${pole.id}`).innerHTML="dozwolone litery i cyfry oraz znaki: .,-=+/\\;*";
    return false;
}

const form=document.querySelector("#form");
//przykladowe dane w formularzu
form.nazwa.value="Naleśniki";
form.link.value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBR5_vPbC2jFmb47xcdE4XvBxOTEhACynb4Pc2JYZ9YUi0-asWw&s";
form.skladniki.value=`-Mrożony szpinak1 opak.
-Naturalnie smaczne Spaghetti Bolognese Knorr1 opak.
-Sos do warzyw na ciepło do szpinaku czosnkowo-serowy Knorr1 opak. 
-Gotowe naleśniki8 szt. 
-Mozzarella1 szt. 
-Żółty ser150 g`;
form.przepis.value=`Krok 1-Cebulę pokrój w kostkę i podsmaż na oleju a następnie dodaj odcedzony szpinak. Sos do szpinaku wymieszaj ze śmietaną i dodaj na patelnię. 
Krok 2-Całość zagotuj, wystudź i wymieszaj z tartym żółtym serem. 
Krok 3-Farsz zawiń w naleśniki zakładając wszystkie boki do środka. Gotowe naleśniki ułóż w naczyniu żaroodpornym. 
Krok 4-Knorr Naturalnie smaczne - Spaghetti Bolognese wymieszaj z 200 ml wody oraz pokrojonymi pomidorami z puszki i zagotuj. Zalej nim naleśniki, a na wierzchu ułóż plastry sera mozzarella. Naleśniki piecz około 20 minut w nagrzanym do 200 stopni C piekarniku.`;

const end=document.querySelector("#end");
form.onsubmit = () => {
    if(checkLink(form.link) && checkEmpty(form.link) && checkEmpty(form.nazwa) && checkHack(form.przepis) && checkHack(form.skladniki) && checkHack(form.nazwa)) {
        addNewRecipe();
        formularz.style.opacity="0";
        setTimeout( () => {formularz.style.display="none"}, 500);
    }
    return false;
    //return true send form and run php
}

function insert_br(text)
{
	var normalized_Enters = text.replace(/(\r\n|\n)/g, "\\r\\");
    var text_with_br = normalized_Enters.replace(/\\r\\/g, "<br />");
	return text_with_br;
}

function addNewRecipe() {
    const text=`<div class="main przepis"><p class="title">${form.nazwa.value}</p> <img src="${form.link.value}"><button class="more">Przygotowanie</button><div id="svg" title="Usuń przepis"><svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path></svg></div></div><div class="after"><mark>Składniki:</mark>${form.skladniki.value}<mark>Przygotowanie:</mark>${form.przepis.value}</div>`;
    let text2=insert_br(text);
    console.log(text);
    console.log(text2);
    end.insertAdjacentHTML("beforebegin",
    text2);
    buttons = document.getElementsByClassName("more");
    recipes = document.querySelectorAll(".after");
    myFunction();
    addDeleteOption();
}

form.link.onblur = () => {
    checkEmpty(form.link) && checkLink(form.link);
}

form.nazwa.onblur = () => {
    checkEmpty(form.nazwa);
    checkHack(form.nazwa);
}

form.przepis.onblur = () => {
    checkHack(form.przepis);
}

form.skladniki.onblur = () => {
    checkHack(form.skladniki);
}

function addDeleteOption() {
    const deletee=document.querySelectorAll("#svg");
    for (let i=0; i<deletee.length; i++) {
        const przepisy=document.querySelectorAll(".przepis");
        deletee[i].onclick = () => {
            recipes[i+3].remove();
            przepisy[i+3].remove();
            buttons = document.getElementsByClassName("more");
            recipes = document.querySelectorAll(".after");
            myFunction();
            addDeleteOption();
            if(lastOpen==i+3) lastOpen=undefined;
        }
    }
}
addDeleteOption();