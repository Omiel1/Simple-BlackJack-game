const inputBtn = document.getElementById('save-button');
const deleteBtn = document.getElementById('delete-button');
const saveTabBtn = document.getElementById('save-tab');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const divContainer = document.getElementById('container');

let myLeads = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage != null)
{
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value ='';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
    render(myLeads);
});

deleteBtn.addEventListener('dblclick', function() {
    localStorage.removeItem("myLeads");
    ulEl.innerHTML = '';
    myLeads = [];
});

saveTabBtn.addEventListener('click', function() {
    browser.tabs.query({active: true, currentWindow: true})
  .then(tabs => {
    for (const tab of tabs) {
      myLeads.push(tab.url);
      localStorage.setItem('myLeads', JSON.stringify(myLeads));
      render(myLeads);
    }
  });
})

function onGot(tabInfo) {
    console.log(tabInfo);
  }
  
function onError(error) {
    console.log(`Error: ${error}`);
}

function render(leads){
    let listItems = "";
    for(let i = 0; i< leads.length; i++){
        listItems += `
        <li>
            <a href='${leads[i]}' target='blank'> ${leads[i]} </a>
        </li>`;
    }
    
    ulEl.innerHTML = listItems;
}

