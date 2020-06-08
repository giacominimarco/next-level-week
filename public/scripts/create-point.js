function populaUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //função anonima que esta retornando um valor
        .then(states => {
            for( const state of states){   
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
                console.log(ufSelect) 
            }
        })
}

populaUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedStade = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedStade].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/mesorregioes`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" 
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) //função anonima que esta retornando um valor
        .then(cities => {
            for( const city of cities){   
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta, pegando todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItems)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItem = []

function handleSelectedItems(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    console.log('itemId: ', itemId)

    //verificar se existe itens selecionados, se sim,
    //pegar os itens selecionados
    const alreaySelected = selectedItem.findIndex( item => {
        const itemFound = item == itemId // será true ou false
        return itemFound 
    })

    //se já estiver selecionado , tirar da seleção
    if(alreaySelected >= 0 ){
        //tirar da seleção
        const filteredItems = selectedItem.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        selectedItem = filteredItems
    } else {
        //se não estiver selecionado adicionar á seleção
        selectedItem.push(itemId)
    }

    console.log('selectedItem: ', selectedItem)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItem
}
    