// varibles
let cheeseCount = 0;

// dictionaries
let inventory = {
    knivies: {
        type: 'click',
        price: 1,
        quantity: 0,
        multiplier: 1.1
    },
    miners: {
        type: 'click',
        price: 5,
        quantity: 0,
        multiplier: 1.15
    },
    carts: {
        type: 'auto',
        price: 2,
        quantity: 0,
        multiplier: 1.2
    },
    graters: {
        type: 'auto',
        price: 3,
        quantity: 0,
        multiplier: 1.25
    }
}


// functions
function mine() {
    cheeseCount++
    document.getElementById('cheese').innerText = cheeseCount.toString();
}

function buyitem(key) {
    let item = inventory[key].price
    inventory[key].quantity++
        cheeseCount -= item
    console.log(cheeseCount)
        //  FIXME: come back to this anf fix the disable feature
    if (cheeseCount <= 0) {
        document.getElementById('disable').classList.add('disable')
        alert("you are going in the wrong way collect more cheese please")
    } else if (cheeseCount >= 0) {
        document.getElementById('disable').classList.add('enable')
    }

    drawInventory()
    statsMultiplier()
    document.getElementById('cheese').innerText = cheeseCount.toString();
}

function statsMultiplier() {
    for (let key in inventory) {
        let item = inventory[key]
        item.multipler += Math.floor(item.multiplier * item.quantity)
        console.log(item.multipler)

    }

}

function drawStats() {
    let template = ''
    for (let key in inventory) {
        let item = inventory[key]
        template += /*html*/ `
    <p> ${key} <span>${item.multiplier} </span></p>`
    }
    document.getElementById('stats').innerHTML = template
}

function drawInventory() {
    let template = ''
    for (let key in inventory) {
        let item = inventory[key]
        template += /*html*/ ` 
        <p> ${key}: <span id="${key}"> ${item.quantity} </span> </p>     
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
        <p> ${key}: <button id="disable" type="btn" class="bg-info" onclick="buyitem('${key}')">${item.price}</button></p>
        `
        } else {
            autotemplate += /*html*/ `
        <p> ${key}: <button id="disable" type="btn" class="bg-info" onclick="buyitem('${key}')">${item.price}</button></p>
        `
        }
    }

    document.getElementById('store-click').innerHTML = clicktemplate
    document.getElementById('store-auto').innerHTML = autotemplate
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



// page load call outs
drawStats()
drawInventory()
drawStore()