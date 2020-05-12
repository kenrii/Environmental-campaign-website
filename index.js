const toggle = document.getElementsByClassName("toggle-button")[0]
const navLinks = document.querySelector(".nav-links ul")
const links = document.querySelectorAll(".nav-links ul li")
let cellCount = 3
let counter = 1124
let oilBarrels = 15090585140000


// Kauniit fadein animaatiot kun avataan mobiilinavigointi. Laittaa jokaiseen listan elementtiin fade-effectin.
toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    links.forEach(link => {
        link.classList.toggle("fade");
        link.addEventListener("click", () => {
            toggle.click();
        })
    })
})

// Lasketaan kuinka monta öljybarrelia on jäljellä. Loppuessa kokonaan pidetään 0:ssa ja lopetetaan setIntervali.
const oilCounter = () => {
    const minus = oilBarrels - 543
    if (minus > 0) {
        oilBarrels = minus
        document.getElementById("oilCounter").innerHTML ="🛢️ " + oilBarrels
    }else{
        oilBarrels = 0
        document.getElementById("oilCounter").innerHTML ="🛢️ " + oilBarrels
        clearInterval(oilTimer);
    }
}
let oilTimer = setInterval(oilCounter, 50)

// Syötetään karuselliin uusi vinkki-solu. Karusellissa on liikaa niitä, poistetaan yksi.
const addCarousel = () => {
    const submitValue = document.getElementById("submit").value
    if (submitValue.length < 5) {
        alert("Liian vähän merkkejä.")
    }else{
        var flkty = new Flickity(".carousel-vinkkinurkka", {
            initialIndex: cellCount})
        if (cellCount == 9) {
            flkty.remove(flkty.cells[0].element)
            cellCount--
        }
        document.getElementById("submit").value = ""
        const cellElement = [makeCell(submitValue)]
        flkty.append(cellElement)
    }
}

// Lisätään yksi uusi vinkki-solu karuselliin
const makeCell = (text) =>  {
    cellCount++
    let cell = document.createElement("div")
    cell.className = "carousel-cell"
    cell.id = "cell-vinkki"
    cell.textContent = text
    cell.style["font-size"] = "0.65em"
    cell.style["height"] = "11rem"
    return cell
}

// Lisää yhden osallistujan vaikuta-kohdan laskuriin.
const count = () => {
    return counter+=1
}

// Lisätään osallistuja jos luku on alle 1125(luku kun ei olla osallistuttu vielä)
const laskuri = () => {
    if (counter < 1125) {
        document.getElementById("counting").innerHTML = count()
        kiitosTeksti()
    }
}

// Kiitetään käyttäjää kampanjaan osallistumisesta. Tapahtuu, kun käyttäjä clikkaa vaikuta kohdan laskuria.
const kiitosTeksti = () => {
    let h2 = document.createElement("h2")
    let node = document.createTextNode("Kiitos osallistumisesta!")
    let vaikutaDiv = document.getElementById("vaikuta-content")
    h2.appendChild(node)
    vaikutaDiv.appendChild(h2)
}

// Smoothscroll, jonka pitäisi toimia kaikilla browsereilla.
const smoothScroll = (target, duration) => {
    let target2 = document.querySelector(target)
    let targetPos = target2.getBoundingClientRect().top + window.pageYOffset - 80;
    let startPos = window.pageYOffset
    let distance = targetPos - startPos
    let startTime = null
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        let timeElapsed = currentTime - startTime
        let run = ease(timeElapsed, startPos, distance, duration)
        window.scrollTo(0, run)

        if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }

    requestAnimationFrame(animation)
}

// Laitetaan jokaiseen sivun navigoinnissa olevaan sectioniin mahdollisuus smooth scrolliin.
let aloitussivu = document.querySelector("#ToAloitussivu")
aloitussivu.addEventListener("click", () => {
    smoothScroll("#Aloitussivu", 1000)
})

let kenelle = document.querySelector("#ToKenelle")
kenelle.addEventListener("click", () => {
    smoothScroll("#Kenelle", 1000)
})

let artikkelit = document.querySelector("#ToArtikkelit")
artikkelit.addEventListener("click", () => {
    smoothScroll("#Artikkelit", 1000)
})

let vaikuta = document.querySelector("#ToVaikuta")
vaikuta.addEventListener("click", () => {
    smoothScroll("#Vaikuta", 1000)
})

let tarinoita = document.querySelector("#ToTarinoita")
tarinoita.addEventListener("click", () => {
    smoothScroll("#Tarinoita", 1000)
})

let vinkkinurkka = document.querySelector("#ToVinkkinurkka")
vinkkinurkka.addEventListener("click", () => {
    smoothScroll("#Vinkkinurkka", 1000)
})

let liity = document.querySelector("#ToLiity")
liity.addEventListener("click", () => {
    smoothScroll("#Liity", 1000)
})

// Colorbox UKK esiin saamiseen
$(document).ready(function(){
    //Examples of how to assign the Colorbox event to elements
    $(".inline").colorbox({inline:true, width:"80%", height:"80%"});
    //Example of preserving a JavaScript event for inline calls.
    $("#click").click(function(){ 
    $('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
    return false;
    });
});