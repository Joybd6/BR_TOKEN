
let checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change",handleChange);

chrome.storage.local.get(["br_token_active"],(result)=>{
    if(result.br_token_active==true)
    {
        checkbox.checked=true;
    }
    else
    {
        checkbox.checked=false;
    }
})


function handleChange() {
    if (checkbox.checked)
    {
        chrome.storage.local.set({"br_token_active":true},()=>{

        })
    }
    else
    {
        chrome.storage.local.set({"br_token_active":false},()=>{
            
        })
    }
}