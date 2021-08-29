// varibles
let cheeseCount = 0
let autoCollect = 0

// dictionaries
let inventory = {
    Daggers: {
        type: 'click',
        price: 25,
        quantity: 0,
        multiplier: 2
    },
    Rapiers: {
        type: 'click',
        price: 100,
        quantity: 0,
        multiplier: 4
    },
    Axes: {
        type: 'auto',
        price: 700,
        quantity: 0,
        multiplier: 3
    },
    Whips: {
        type: 'auto',
        price: 1500,
        quantity: 0,
        multiplier: 5
    }
}


// functions
function mine() {
    cheeseCount++
    document.getElementById('cheese').innerText = cheeseCount.toString();
}

function buyitem(key) {
    let item = inventory[key]
    if (cheeseCount >= item.price) {
        inventory[key].quantity++
            cheeseCount -= item.price
        item.price *= 2
        document.getElementById('disable').classList.add('enable')
    }
    drawInventory()
    drawStore()
    drawStats()
    document.getElementById('cheese').innerText = cheeseCount.toString();
}

function collectClickUpgrades() {
    for (let key in inventory) {
        let item = inventory[key]
        if (item.type === 'click') {
            Math.floor(cheeseCount += item.multiplier * item.quantity)
        }
    }
    document.getElementById('cheese').innerText = cheeseCount.toString();
}

function collectAutoUpgrades() {
    for (let key in inventory) {
        let item = inventory[key]
        if (item.type === 'auto') {
            Math.floor(cheeseCount += item.multiplier * item.quantity)
        }
    }
    document.getElementById('cheese').innerText = cheeseCount.toString();
}


function drawStats() {
    let template = ''
    for (let key in inventory) {
        let item = inventory[key]
        template += /*html*/ `
    <p class="main-theme"> ${key} : x<span>${item.multiplier} </span></p>`
    }
    document.getElementById('stats').innerHTML = template
}

function drawInventory() {
    let template = ''
    for (let key in inventory) {
        let item = inventory[key]
        template += /*html*/ ` 
        <p class="main-theme"> ${key}: <span id="${key}"> ${item.quantity} </span> </p>     
        `
    }
    document.getElementById('inventory').innerHTML = template
}

function drawStore() {
    let clicktemplate = ''
    let autotemplate = ''
    for (let key in inventory) {
        let item = inventory[key]
        if (item.type == 'click') {
            clicktemplate += /*html*/ `
        <button id="disable" type="btn" class="bg-info btn text-white text-center main-theme" onclick="buyitem('${key}')"><p> ${key}: ${item.price} </p></button>
        `
        } else {
            autotemplate += /*html*/ `
        <button id="disable" type="btn" class="bg-info btn text-white text-center main-theme" onclick="buyitem('${key}')"><p> ${key}: ${item.price} </p></button>
        `
        }
    }

    document.getElementById('store-click').innerHTML = clicktemplate
    document.getElementById('store-auto').innerHTML = autotemplate
}


function preventContext() {
    event.preventDefault()
}
// code graveyard
// btn.addEventListener("click", drawStore())
// if (cheeseCount === 0) {
//     btn.toggleAttribute('disable', true)
// } else {
//     btn.toggleAttribute('disable', false)
// }
// .classList.add('disable')
// .toggleAttribute('disable', true)
// const btn = document.getElementById('disabled')
// function statsMultiplier() {
//     for (let key in inventory) {
//         let item = inventory[key]
//         item.multiplier += Math.floor(item.multiplier * item.quantity)
//         console.log(item.multiplier)
//     }
// }
// collectAutoUpgrades()
//     //  FIXME: come back to this and fix the disable feature
//     document.getElementById('disable').classList.add('disable')
//     alert("you are going in the wrong way collect more cheese please")
// } else if (cheeseCount >= 0) {



// page load call outs
drawStats()
drawInventory()
drawStore()
setInterval(collectAutoUpgrades, 3000);